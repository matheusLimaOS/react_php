<h2>Back-End</h2>
  <p> Para a conexão com o banco insira as informações de <b>host</b>, <b>user</b> e <b>password</b>, no arquivo <b>"ConnectBanco.php"</b>
<h3>Windows</h3>

<p>
  Para a execução do back-end, é necessário que tenha o xampp instalado.
  E a alteração do caminho do apache para a pasta back-end do projeto.<br/>
  Para fazer isso é apenas encontrar o arquivo <b> httpd.conf </b> que se encontra dentro da pasta de instalação do  <b> xampp/apache/conf </b>.<br/>
  Dentro deste arquivo localize as linhas:<br/>
  <b> DocumentRoot "..." </b><br/>
  <b> Directory "..." </b><br/>
  
  E altere o caminho("...") pelo caminho da pasta back-end do projeto.
  
  <h3>
    OBS: Os scripts de criação das tabelas do banco de dados estão no arquivo <b> createDatabase.sql </b>
    <p>
      <br/>
      Pode ser necessário entrar no arquivo <b> php.ini </b> no caminho <b>.../xampp/php</b><br/>
      E "descomentar" as linhas <b>;extension=pgsql</b></br>
      Para "descomentar" apague o ";".
    </p>
  </h3>
<p>

<h3>Linux</h3>

<p>
  No linux para a execução do php é necesário entrar na pasta "back_end" dentro do projeto e rodar o seguinte script : 'php -S localhost:80'
</p>

<h2>Front-End</h2>

<p>
  Para a execuçao do front-end é necessário dentro da pasta react-php e executar o script: <b>'npm install'</b><br/>
  Após a instalação dos componentes, executar o comando <b>"npm start"</b>
</p>
