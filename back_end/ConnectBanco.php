<?php
    class ConnectBanco{
        function __construct(){ 

        }

        function conectarBanco(){
            $host = 'dpg-cggh3164daddcg3vpk7g-a.oregon-postgres.render.com';
            $user = 'php_zyy0_user';
            $password ='h4mLshNiSzIIEwONHyj6AmoxZDbYZeej';
            $connection_string = "host=$host port=5432 dbname=php_zyy0 user=$user password=$password";
            $conexao = pg_connect($connection_string);
            return $conexao;
        }
    }
?>