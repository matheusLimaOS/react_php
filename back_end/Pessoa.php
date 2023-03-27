<?php
    require_once ('Telefones.php');
    Class Pessoa {

        public $id;
        public $nome;
        public $CPF;
        public $RG;
        public $CEP;
        public $logradouro;
        public $complemento;
        public $setor;
        public $cidade;
        public $uf;
        public $telefones=array();

        public function __construct(){
        }

        public function insertPessoa($conn){
            $query = "INSERT INTO pessoa (cpf, rg, cep, logradouro, complemento, setor, cidade, uf, nome) VALUES ($2, $3,$4, $5,$6, $7,$8,$9 ,$1) RETURNING id";
            $params = array($this->nome,$this->CPF,$this->RG,$this->CEP,$this->logradouro,$this->complemento,$this->setor,$this->cidade,$this->uf);

            $result = pg_query_params($conn, $query, $params);
            $id = pg_fetch_assoc($result);

            return $id['id'];
        }

        public function updatePessoa($conn){
            $query = "UPDATE pessoa
                SET cpf = $2, rg = $3, cep = $4, logradouro = $5, complemento = $6, setor = $7, cidade = $8, uf = $9, nome = $1
                WHERE id = $10    
            ";
            $params = array($this->nome,$this->CPF,$this->RG,$this->CEP,$this->logradouro,$this->complemento,$this->setor,$this->cidade,$this->uf,$this->id);

            $result = pg_query_params($conn, $query, $params);

            return pg_result_status($result);
        }

        public function getPessoas($conn){
            $query = "SELECT p.*, array_to_json(array_agg(t)) as telefones FROM pessoa p
                LEFT JOIN telefones t ON t.pessoaid = p.id
                GROUP BY 1,2,3,4,5,6,7,8,9,10";

            $params = array();
            $result = pg_query_params($conn, $query, $params);

            return pg_fetch_all($result);
        }

        public function getPessoa($conn,$userId){
            $query = "SELECT p.*, array_to_json(array_agg(t)) as telefones, jsonb_agg(t.descricao) as descricoes  FROM pessoa p
                LEFT JOIN telefones t on t.pessoaid = p.id
                WHERE p.id = $1
                GROUP BY 1,2,3,4,5,6,7,8,9,10";

            $params = array($userId);
            $result = pg_query_params($conn, $query, $params);

            return pg_fetch_all($result);
        }

        public function deletePessoa($conn,$userId){
            $query = "DELETE FROM pessoa p
                WHERE p.id = $1
            ";

            $params = array($userId);
            $result = pg_query_params($conn, $query, $params);
            
            return pg_result_status($result);
        }

        public function getId(){
            return $this->id;
        }
        public function getNome(){
            return $this->nome;
        }
        public function getCPF(){
            return $this->CPF;
        }
        public function getRG(){
            return $this->RG;
        }
        public function getCEP(){
            return $this->CEP;
        }
        public function getLogradouro(){
            return $this->logradouro;
        }
        public function getComplemento(){
            return $this->complemento;
        }
        public function getSetor(){
            return $this->setor;
        }
        public function getCidade(){
            return $this->cidade;
        }
        public function getUf(){
            return $this->uf;
        }
        public function getTelefones(){
            return $this->telefones;
        }
        public function setId($id){
            $this->id = $id;
        }
        public function setNome($nome){
            $this->nome = $nome;
        }
        public function setCPF($CPF){
            $this->CPF = $CPF;
        }
        public function setRG($RG){
            $this->RG = $RG;
        }
        public function setCEP($CEP){
            $this->CEP = $CEP;
        }
        public function setLogradouro($logradouro){
            $this->logradouro = $logradouro;
        }
        public function setComplemento($complemento){
            $this->complemento = $complemento;
        }
        public function setSetor($setor){
            $this->setor = $setor;
        }
        public function setCidade($cidade){
            $this->cidade = $cidade;
        }
        public function setUf($uf){
            $this->uf = $uf;
        }
        public function setTelefones($telefones){
            $this->telefones = $telefones;
        }

    }
