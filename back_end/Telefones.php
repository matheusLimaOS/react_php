<?php
    Class Telefones {

        public $id;
        public $telefone;
        public $descricao;

        public function __construct(){
        }

        public function insertTelefone($conn,$pessoa){  
            $query = "INSERT INTO telefones (telefone, descricao, pessoaid) VALUES($1, $2, $3)";
            $params = array($this->telefone,$this->descricao, $pessoa->getId());
            $result = pg_query_params($conn, $query, $params);
        }

        public function updateTelefone($conn){  
            $query = "UPDATE telefones 
                SET telefone = $1, descricao = $2
                WHERE id = $3
            ";
            $params = array($this->telefone,$this->descricao,$this->id);
            $result = pg_query_params($conn, $query, $params);
        }

        public function deleteTelefones($conn,$pessoaId){  
            $query = "DELETE FROM telefones 
                WHERE pessoaId = $1
            ";
            $params = array($pessoaId);
            $result = pg_query_params($conn, $query, $params);
            
            return pg_result_status($result);
        }

        public function getId(){
            return $this->id;
        }
        public function getTelefone(){
            return $this->telefone;
        }
        public function getDescricao(){
            return $this->descricao;
        }
        public function setId($id){
            $this->id = $id;
        }
        public function setTelefone($telefone){
            $this->telefone = $telefone;
        }
        public function setDescricao($descricao){
            $this->descricao = $descricao;
        }
    }
    