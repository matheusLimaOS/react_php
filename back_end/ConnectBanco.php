<?php
    class ConnectBanco{
        function __construct(){ 

        }

        function conectarBanco(){
            $host = 'localhost';
            $user = 'postgres';
            $password ='159375';
            $connection_string = "host=$host port=5432 dbname=php user=$user password=$password";
            $conexao = pg_connect($connection_string);
            return $conexao;
        }
    }
?>