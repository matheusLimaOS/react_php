<?php
    require_once('cors.php');
    require_once('Pessoa.php');
    require_once('Telefones.php');
    require_once('ConnectBanco.php');

    $BD = new ConnectBanco();
    $conn = $BD->conectarBanco();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);
        $arrTelefones = array();
            
        foreach($data['telefones'] as $telefone => $value){
            $arrTelefones[] = new Telefones();
            $arrTelefones[count($arrTelefones)-1]->setTelefone($value['telefone']);
            $arrTelefones[count($arrTelefones)-1]->setDescricao($value['descricao']);    
        };

        $pessoa = new Pessoa();

        $pessoa->setNome($data['nome']);
        $pessoa->setCPF($data['cpf']);
        $pessoa->setRG($data['rg']);
        $pessoa->setCEP($data['cep']);
        $pessoa->setLogradouro($data['logradouro']);
        $pessoa->setComplemento($data['complemento']);
        $pessoa->setSetor($data['setor']);
        $pessoa->setCidade($data['cidade']);
        $pessoa->setUF($data['selectedUF']);
        $pessoa->setTelefones($arrTelefones);

        if($pessoa->getNome() === "" || $pessoa->getCPF() === "" ||  $pessoa->getRG() === ""){
            http_response_code(422);
            echo("Nome, CPF e RG são obrigatórios");
            return;
        };

        $insertPessoa = $pessoa->insertPessoa($conn);

        $pessoa->setId($insertPessoa);
        foreach($pessoa->telefones as $telefone => $value){
            if(!empty($value->telefone) && !empty($value->descricao)){      
                $value->insertTelefone($conn,$pessoa);
            }
        }

        http_response_code(200);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_SERVER['PATH_INFO']) && $_SERVER['PATH_INFO'] === "/listAllUsers") {
        $pessoa = new Pessoa();

        $getpessoas = $pessoa->getPessoas($conn);
        
        echo(json_encode($getpessoas));
        http_response_code(200);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'GET' && !isset($_SERVER['PATH_INFO'])) {
        $pessoa = new Pessoa();

        $getpessoa = $pessoa->getPessoa($conn,$_GET['userId']);

        echo(json_encode($getpessoa));
        http_response_code(200);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $pessoa = new Pessoa();
        $telefone = new Telefones();
        $filePath = $_SERVER['REQUEST_URI'];
        $filePath = explode("/", $filePath);

        $deletePessoa = $pessoa->deletePessoa($conn,$filePath[count($filePath)-1]);
        $deleteTelefones = $telefone->deleteTelefones($conn,$filePath[count($filePath)-1]);

        if(!$deletePessoa){
            http_response_code(401);
            echo("Não foi possivel excluir a pessoa cadastrada");
        }
        else{
            http_response_code(200);
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);
        $arrTelefones = array();
        
        foreach($data['telefones'] as $telefone => $value){
            $arrTelefones[] = new Telefones();
            $arrTelefones[count($arrTelefones)-1]->setTelefone($value['telefone']);
            $arrTelefones[count($arrTelefones)-1]->setDescricao($value['telefone']); 
            $arrTelefones[count($arrTelefones)-1]->setId($value['id']); 
        };

        $pessoa = new Pessoa();

        $pessoa->setId($data['id']);
        $pessoa->setNome($data['nome']);
        $pessoa->setCPF($data['cpf']);
        $pessoa->setRG($data['rg']);
        $pessoa->setCEP($data['cep']);
        $pessoa->setLogradouro($data['logradouro']);
        $pessoa->setComplemento($data['complemento']);
        $pessoa->setSetor($data['setor']);
        $pessoa->setCidade($data['cidade']);
        $pessoa->setUF($data['selectedUF']);
        $pessoa->setTelefones($arrTelefones);

        if($pessoa->getNome() === "" || $pessoa->getCPF() === "" ||  $pessoa->getRG() === ""){
            http_response_code(422);
            echo("Nome, CPF e RG são obrigatórios");
            return;
        };

        $updatePessoa = $pessoa->updatePessoa($conn);

        foreach($pessoa->telefones as $telefone => $value){
            if($value->id === 0){
                if(!empty($value->telefone) && !empty($value->descricao)){
                    $value->insertTelefone($conn,$pessoa);
                }
            }
            else{
                if(!empty($value->telefone) && !empty($value->descricao)){
                    $value->updateTelefone($conn);
                }
                else{
                    $value->deleteTelefone($conn);
                }
            }
        }

        http_response_code(200);
    }