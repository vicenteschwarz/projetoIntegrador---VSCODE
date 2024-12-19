const prompt = require('prompt-sync')()
const { Pool } = require('pg')
//========================================================================================================
// Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',       // Substitua pelo seu usuário
    host: 'localhost',         // Host do PostgreSQL
    database: 'Projeto Integrador',   // Nome do banco de dados
    password: '1234',     // Substitua pela sua senha
    port: 5432                 // Porta do PostgreSQL
})

//========================================================================================================
//Espaço destinado as funções:

async function testeConexao() {
    try {
        const client = await pool.connect();
        console.log('')
        console.log('Conexão bem-sucedida com o banco de users!');
        client.release(); // Libera o cliente para reutilização
    } catch (error) {console.error('Erro ao conectar ao banco!');}
}
//testeConexao()

async function inserirUser() {
    try {
        const name = prompt('Qual o primeiro nome do usuário que desejas incluir? ')
        const full_name = prompt('Qual o nome completo de usuário? ')
        const log = prompt('Qual o login desse usuário? ')
        const password = prompt('Digite uma senha de 4 dígitos para esse novo user: ')
        console.log(' ')
        const query = 'INSERT INTO "PI"."Users" (users, name_users, login_users, password_users) VALUES ($1, $2, $3, $4)'
        await pool.query(query, [name, full_name, log, password]);
        console.log("Novo User incluído com sucesso!");
    }
    catch (error) {console.error('Erro!',error)}
}
//inserirTime()

async function exibirUser() {
    try {
        const query = 'SELECT id_users, users, name_users, login_users, password_users FROM "PI"."Users" order by id_users'
        const resultado = await pool.query(query)
        console.table(resultado.rows)
    }
    catch(error) { console.error("Erro!",error)}
}
//exibirTimes()

async function exibirID(){
    try{
        let ask = prompt('Informe o nome do user por favor: ')
        const query = 'select name_users as nome, id_users as id_do_usuário from "PI"."Users" where users ilike $1 order by id_users'
        const id = await pool.query(query, [ask])
        console.table(id.rows)  
        return id.rows[0].id_users
    }
    catch(error) {console.error('Erro!', error)}
}
//exibirID()

async function deletarUser(){
    try{
        let deleteCidade = await exibirID()
        const query = 'delete from "PI"."Users" where id_users = $1'
        const deletada = await pool.query(query, [deleteCidade])
        console.table(deletada.rows)
        console.log('User deletado com sucesso!')
    }
    catch(error) {console.error('Erro!',error)}
}


async function alterarSenha() {
    try {
        let pesquisa = await exibirID();
        const nomeEstadio = prompt('Qual seria a nova senha? ');
        const query = 'update "PI"."Users" set password_users = $1 where id_users = $2';
        await pool.query(query, [nomeEstadio, pesquisa]);
        console.log('Senha do usuário alterada com sucesso!');
    } catch (error) {
        console.error('Erro!', error);
    }
}

async function exibirUserLogin() {
    try {
        let ask = prompt('Informe o nome do user por favor: ');
        const query = 'SELECT users, login_users as login FROM "PI"."Users" WHERE users ILIKE $1';
        const userLogin = await pool.query(query, [ask]);
        console.table(userLogin.rows);
    } catch (error) {
        console.error('Erro!', error);
    }
}

//=========================================================================================================
//Espaço destinado ao menu:

let ask1 = 0
console.log(' ')
console.log('Seja bem vindo ao nosso banco de users!')
console.log("Faça seu cadastro a seguir:")
let name = prompt("Digite seu primeiro nome: ")
console.log(prompt("Digite Email: "))
console.log(prompt("Digite sua Senha: : "))
console.log("")
console.log("Sucesso! Aproveite nossas funcionalidades", name.charAt(0).toUpperCase() + name.slice(1) + "!")
console.log(' ')
async function menu() {
    console.log(' ')
    console.log('aqui estão as nossas opções:')
    console.log('1- testar a conexão com o banco de dados')
    console.log('2- inserir um user')
    console.log('3- exibir tabela de users')
    console.log('4- pesquisar id do user')
    console.log('5- excluir user')
    console.log('6- alterar senha do user')
    console.log('7- mostrar o login do user')
    console.log('8- sair do sistema')
    console.log(' ')
    ask1 = parseInt(prompt('qual opção desejas? '))
    switch (ask1) {
        case 1:
            await testeConexao()
            return menu()
        case 2:
            await inserirUser()
            return menu()
        case 3:
            await exibirUser()
            return menu()
        case 4:
            await exibirID()
            return menu()
        case 5:
            await deletarUser()
            return menu()
        case 6:
            await alterarSenha()
            return menu()
        case 7:
            await exibirUserLogin()
            return menu()
        case 8:
            await console.log('desconectando...')
            break;
        default:
            await console.log("Voce nao selecionou nenhum item...")
            return menu()
    }
}
menu()