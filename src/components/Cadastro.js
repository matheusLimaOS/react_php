import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import InputMask from "react-input-mask";
import ReactLoading from 'react-loading'; 

export default function App() {
    let [nome,setNome] = useState("");
    let [cpf,setCPF] = useState("");
    let [rg,setRG] = useState("");
    let [cep,setCEP] = useState("");
    let [logradouro,setLogradouro] = useState("");
    let [complemento,setComplemento] = useState("");
    let [setor,setSetor] = useState("");
    let [cidade,setCidade] = useState("");
    let [telefones,setTelefones] = useState([]);
    let [dadosGravados,setDadosGravados] = useState([]);
    let [selectedUF,setSelectedUF] = useState("");
    let [id,setId] = useState(0);
    let [change,setChange] = useState(false);
    let [loading,setIsLoading] = useState(false);
    let ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    useEffect(()=>{
        let arr = [];
        for(let i=0; i<5;i++){
            arr.push({
                id:0,
                telefone:"",
                descricao:""
            })
        }
        setId(0);
        setNome('');
        setCPF('');
        setRG('');
        setCEP('');
        setLogradouro('');
        setComplemento('');
        setSetor('');
        setCidade('');
        setChange(false);
        setSelectedUF('');
        setTelefones(arr);
    },[change])

    useEffect(()=>{
        async function getDados(){
            setIsLoading(true);
            let response = await axios.get(`http://localhost:8000/Submit.php/listAllUsers`);
            setIsLoading(false);
            let arr = []
            response.data.forEach(res => {
                let telefones = JSON.parse(res.telefones);
                if(telefones[0]===null){
                    telefones=[];
                }
                let obj = {
                    id: res.id,
                    nome: res.nome,
                    cpf: res.cpf,
                    cep: res.cep,
                    rg: res.rg,
                    telefones: telefones
                }
                arr.push(obj);
            });
            setDadosGravados(arr);
        }
        getDados();
    },[change])

    return (
        <Container>
            <>
                <Titulo>
                    <h1>
                        Cadastro de pessoa
                    </h1>
                </Titulo>
            </>
            <ContainerTop>
                <ContainerForm>
                    <form action="http://localhost:8000/Submit.php" method="POST" onSubmit={(e)=>handleSubmit(e,nome,cpf,rg,cep,logradouro,complemento,setor,cidade,telefones,selectedUF,id,setChange,setIsLoading)}>
                        <Input>
                            <label htmlFor="nome" >Nome:</label>
                            <input required name="nome" value={nome} onChange={(e)=>{setNome(e.target.value)}} type="text"></input>
                        </Input>
                        <Input>
                            <label htmlFor="cpf" >CPF:</label>
                            <InputMask required name="cpf" mask="999.999.999-99" value={cpf} onChange={(e)=>{setCPF(e.target.value)}} type="text"></InputMask>
                        </Input>
                            
                        <Input>
                            <label htmlFor="rg" >RG:</label>
                            <input required name="rg" value={rg} onChange={(e)=>{setRG(e.target.value)}} type="text"></input>
                        </Input>
                        
                        <Subtitulo>
                            <h3>
                                Endereço
                            </h3>
                        </Subtitulo>
                        <Input>
                            <label htmlFor="cep" >CEP:</label>
                            <InputMask required mask="99999-999" name="cep" value={cep} onChange={(e)=>{setCEP(e.target.value)}} type="text"></InputMask>
                        </Input>
                        <Input>
                            <label htmlFor="logradouro" >Logradouro:</label>
                            <input required name="logradouro" value={logradouro} onChange={(e)=>{setLogradouro(e.target.value)}} type="text"></input>
                        </Input>
                        
                        <Input>
                            <label htmlFor="complemento" >Complemento:</label>
                            <input required name="complemento" value={complemento} onChange={(e)=>{setComplemento(e.target.value)}} type="text"></input>
                        </Input>
                        <Input>
                            <label htmlFor="setor">Setor:</label>
                            <input required name="setor" value={setor} onChange={(e)=>{setSetor(e.target.value)}} type="text"></input>
                        </Input>
                        
                        <Input>
                            <label htmlFor="cidade">Cidade:</label>
                            <input required name="cidade" value={cidade} onChange={(e)=>{setCidade(e.target.value)}} type="text"></input>
                        </Input>
                        
                        <Input>
                            <label htmlFor="uf">UF:</label>
                            <select required value={selectedUF} onChange={(e)=>{setSelectedUF(e.target.value)}}>
                                {
                                    ufs.map((uf) => {
                                        return(
                                            <option key = {uf} value={uf}>{uf}</option>
                                        )
                                    })
                                }
                            </select>
                        </Input>
                        <ContainerBotoesForm>
                            <ButtonCadastro type="submit">Cadastrar</ButtonCadastro>
                            <ButtonDeletar disabled={id===0 ? true : false} onClick={(e)=>{deletePessoa(e,id,setChange,setIsLoading)}}>Deletar</ButtonDeletar>
                        </ContainerBotoesForm>
                    </form>
                </ContainerForm>
                <ContainerTelefones>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Telefone
                                </th>
                                <th>
                                    Descrição
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    telefones.map((telefone,i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <InputMask
                                                        
                                                        mask="(99) 9999-9999"
                                                        name="telefone" 
                                                        value={telefone.telefone} 
                                                        onChange={(e)=>{
                                                            let arr = [...telefones];
                                                            arr[i].telefone = e.target.value;
                                                            setTelefones(arr);
                                                        }} 
                                                        type="text"/>
                                                </td>
                                                <td>
                                                    <input 
                                                        name="descricao" 
                                                        value={telefone.descricao} 
                                                        onChange={(e)=>{
                                                            let arr = [...telefones];
                                                            arr[i].descricao = e.target.value;
                                                            setTelefones(arr);
                                                        }} 
                                                        type="text"/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                    <ContainerBotoesTelefones>
                        <button onClick={()=>{
                            
                            if(telefones.length > 5){
                                let arr = [...telefones];
                                arr.pop();
                                setTelefones(arr);
                                
                            }
                            
                        }
                        }>
                            <FcDeleteRow/>
                        </button>
                        <button onClick={()=>{
                            
                            let arr = [...telefones];
                            
                            arr.push({
                                id:0,
                                telefone:"",
                                descricao:""
                            });
                            setTelefones(arr);
                        }}>
                            <FcAddRow/>
                        </button>
                    </ContainerBotoesTelefones>
                </ContainerTelefones>
            </ContainerTop>
            <ContainerBottom>
                {
                    loading === true ? 
                        <ReactLoading type="spin" color="#274472" height={150} width={150} /> 
                        :
                        dadosGravados.length === 0 ?
                            <p>Não há dados cadastrados</p>
                        :
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            CPF
                                        </th>
                                        <th>
                                            RG
                                        </th>
                                        <th>
                                            CEP
                                        </th>
                                        <th>
                                            Telefone/Descrição
                                        </th>
                                        <th>
                                            <p></p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dadosGravados.map((dadoGravado)=>{
                                            return (
                                                <tr key={dadoGravado.id}>
                                                    <td>
                                                        
                                                            {dadoGravado.nome}
                                                    
                                                    </td>
                                                    <td>
                                                        
                                                            {dadoGravado.cpf}
                                                        
                                                        
                                                    </td>
                                                    <td>
                                                        
                                                            {dadoGravado.rg}
                                                        
                                                    </td>
                                                    <td>
                                                        
                                                            {dadoGravado.cep}
                                                        
                                                    </td>
                                                    <td>
                                                        {
                                                            dadoGravado.telefones.map((telefone,i)=>{
                                                                return(
                                                                    <>
                                                                        {telefone.telefone + " / " +  telefone.descricao}
                                                                        <br></br>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        <ContainerBotaoEditar>
                                                            <button 
                                                                onClick={()=>{
                                                                    handleClick(
                                                                        dadoGravado.id,
                                                                        setNome,
                                                                        setCPF,
                                                                        setRG,
                                                                        setCEP,
                                                                        setLogradouro,
                                                                        setComplemento,
                                                                        setSetor,
                                                                        setCidade,
                                                                        setSelectedUF,
                                                                        setTelefones,
                                                                        setId,
                                                                        setIsLoading
                                                                    );
                                                                }}
                                                            >
                                                                <AiOutlineEdit/>
                                                            </button>
                                                        </ContainerBotaoEditar>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                }    
            </ContainerBottom>
        </Container>
    )
}

async function handleSubmit(e,nome,cpf,rg,cep,logradouro,complemento,setor,cidade,telefones,selectedUF,id,setChange,setIsLoading){
    e.preventDefault();
    if(id === 0 ){
        try{
            setIsLoading(true);
            await axios.post(`http://localhost:8000/Submit.php`,{nome,cpf,rg,cep,logradouro,complemento,setor,cidade,telefones,selectedUF});
            setIsLoading(false);
            setChange(true);
        }
        catch(e){
            alert(e);
        }
    }
    else{
        try{
            setIsLoading(true);
            await axios.put(`http://localhost:8000/Submit.php`,{id,nome,cpf,rg,cep,logradouro,complemento,setor,cidade,telefones,selectedUF});
            setIsLoading(false);
            setChange(true);
        }
        catch(e){
            alert(e);
        }
    }

}

async function deletePessoa(e,id,setChange,setIsLoading){
    e.preventDefault();
    if(id === 0 ){
        alert("Não foi possivel deletar!");
    }
    else{
        try{
            setIsLoading(true);
            let res = await axios.delete(`http://localhost:8000/Submit.php/`+id);
            setIsLoading(false);
            console.log(res);
            setChange(true);
        }
        catch(e){
            alert(e);
        }
    }

}

async function handleClick(userId,setNome,setCPF,setRG,setCEP,setLogradouro,setComplemento,setSetor,setCidade,setSelectedUF,setTelefones,setId,setIsLoading){
    setIsLoading(true);
    let response = await axios.get(`http://localhost:8000/Submit.php?userId=`+userId);
    setIsLoading(false);
    let res = response.data[0];
    
    let telefones = JSON.parse(res.telefones);
    let telefonesDescricao = [];
    let tam = 5;
    if(telefones.length > tam){
        tam = telefones.length;
    }

    for(let i=0;i<tam;i++){
        telefonesDescricao.push({
            id: (telefones[i]?.id === undefined ? 0 : telefones[i].id),
            idPessoa: (telefones[i]?.pessoaid === undefined ? '' : telefones[i].pessoaid),
            telefone: (telefones[i]?.telefone === undefined ? '' : telefones[i].telefone),
            descricao: (telefones[i]?.descricao === undefined ? '' : telefones[i].descricao)
        })
    }
    
    setId(Number(res.id));
    setNome(res.nome);
    setCPF(res.cpf);
    setRG(res.rg);
    setCEP(res.cep);
    setLogradouro(res.logradouro);
    setComplemento(res.complemento);
    setSetor(res.setor);
    setCidade(res.cidade);
    setSelectedUF(res.uf);
    setTelefones(telefonesDescricao);
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #274472;
`

const Input = styled.div`
    display:flex;
    justify-content: space-between;
`

const Titulo = styled.div`
    font-size: 52px;
    margin-top: 25px;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`
const Subtitulo= styled.div`
    font-size: 30px;
    margin-top: 25px;
    margin-bottom: 15px;
    font-weight: bold;
`

const ContainerTelefones = styled.div`
    width: 50vw;
    margin-top: 25px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    flex-direction: column;
    table{
        width: 75%;
        tr:nth-child(1){
            td{
                input{
                    margin-top: 5px;
                }
            }
        }
        tr{
            width: 100%;
            td{
                width: 50%;
                input{
                    margin-top: 5px;
                    width: 92%;
                    border-radius: 10px ;
                    border: 1px solid black;
                    
                    padding-left: 10px;
                    font-size: 22px;
                }
            }
            th{
                width: 50%;
                font-size: 26px;
                font-weight: bold;
                border-radius: 10px ;
                color: white;
                background-color: #5885AF ;
            }
        }
    }


`

const ContainerBotoesTelefones = styled.div`
    width: 75%;
    display:flex;
    justify-content: space-around;
    button{
        background-color: transparent;
        border: none;
        font-size: 50px;
        cursor: pointer; 
    }
`

const ContainerTop = styled.div`
    display: flex;
`

const ContainerBottom = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
    table{
        width: 90%;
        margin-bottom: 25px;
        tr{
            width: 100%;
            td{
                min-height: 100px;
                text-align: center;
                font-size: 22px;
                div{
                    height: 100%;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    
                }
                border: 1px solid black;
            }
            th{
                font-size: 26px;
                font-weight: bold;
                border: 1px solid black;
            }
        }
    }
`


const ContainerForm = styled.div`
    display: flex;
    width: 50vw;
    margin-top: 25px;
    justify-content: center;
    form{
        display: flex;
        flex-direction: column;
        width: 85%;
        input{
            font-size: 22px;
            border-radius: 10px;
            border: 1px solid black;
            margin-top: 10px;
            padding-left: 10px;
        }
        select{
            margin-top: 10px;
            font-size: 22px;
            width: 60%;
        }
        label{
            font-size: 22px;
            margin-top: 10px;
        }
    }
`

const ContainerBotoesForm = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-top: 35px;
    margin-bottom: 35px;  
    button{
        cursor: pointer; 
    }  
    
`

const ButtonCadastro = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #41729F;
    padding: 15px;
    text-align: center;
    color: white;
    cursor: pointer; 
`

const ButtonDeletar = styled.button`
    display: ${props => props.disabled ? "none" : "block"};
    margin-left: 20px;
    padding: 15px;
    border-radius: 10px;
    border: none;
    background-color: rgba(255,0,0,0.8);
    color:white;
    cursor: pointer; 

`

const ContainerBotaoEditar = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    button{
        font-size: 22px;
        cursor: pointer; 
        background-color: transparent;
        border: none; 
    }
`