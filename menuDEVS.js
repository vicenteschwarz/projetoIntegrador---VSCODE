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
        console.log('Conexão bem-sucedida com o banco de devs!');
        client.release(); // Libera o cliente para reutilização
    } catch (error) {console.error('Erro ao conectar ao banco!');}
}
//testeConexao()

async function inserirDev() {
    try {
        const name = prompt('Qual o primeiro nome do desenvolvedor que desejas incluir? ')
        const full_name = prompt('Qual o nome completo de desenvolvedor? ')
        const log = prompt('Qual o login desse desenvolvdor? ')
        const password = prompt('Digite uma senha de 4 dígitos para esse novo dev: ')
        console.log(' ')
        const query = 'INSERT INTO "PI"."Devs" (devs, name_devs, login_devs, password_devs) VALUES ($1, $2, $3, $4)'
        await pool.query(query, [name, full_name, log, password]);
        console.log("Novo Dev incluído com sucesso!");
    }
    catch (error) {console.error('Erro!',error)}
}
//inserirTime()

async function exibirDevs() {
    try {
        const query = 'SELECT id_devs, devs, name_devs, login_devs, password_devs FROM "PI"."Devs" order by id_devs'
        const resultado = await pool.query(query)
        console.table(resultado.rows)
    }
    catch(error) { console.error("Erro!",error)}
}
//exibirTimes()

async function exibirID(){
    try{
        ask2 = prompt('Informe o nome do dev por favor: ')
        const query = 'select name_devs, id_devs from "PI"."Devs" where devs ilike $1 order by id_devs'
        const id = await pool.query(query, [ask2])
        console.table(id.rows[0].id_devs)  
        return id.rows[0].id_devs
    }
    catch(error) {console.error('Erro!', error)}
}
//exibirID()

async function deletarDev(){
    try{
        let deleteCidade = await exibirID()
        const query = 'delete from "PI"."Devs" where id_devs = $1'
        const deletada = await pool.query(query, [deleteCidade])
        console.table(deletada.rows)
        console.log('Dev deletado com sucesso!')
    }
    catch(error) {console.error('Erro!',error)}
}


async function alterarSenha() {
    try {
        let pesquisa = await exibirID();
        const nomeEstadio = prompt('Qual seria a nova senha? ');
        const query = 'update "PI"."Devs" set password_devs = $1 where id_devs = $2';
        await pool.query(query, [nomeEstadio, pesquisa]);
        console.log('Senha do dev alterada com sucesso!');
    } catch (error) {
        console.error('Erro!', error);
    }
}

async function exibirUserLogin() {
    try {
        let ask = prompt('Informe o nome do dev por favor: ');
        const query = 'SELECT users, login_users FROM "PI"."Users" WHERE users ILIKE $1';
        const userLogin = await pool.query(query, [ask]);
        console.table(userLogin.rows);
    } catch (error) {
        console.error('Erro!', error);
    }
}



//=========================================================================================================
//Espaço destinado ao menu:

let ask2 = 0
console.log(' ')
console.log('Seja bem vindo ao nosso banco de devs!')
console.log("Faça seu cadastro a seguir:")
let name = prompt("Digite seu primeiro nome: ")
console.log(prompt("Digite Email: "))
console.log(prompt("Digite sua Senha: : "))
console.log("")
console.log("Sucesso! Aproveite nossas funcionalidades", name.charAt(0).toUpperCase() + name.slice(1) + "!")
console.log(' ')
console.log(' ')
async function menu() {
    console.log(' ')
    console.log('aqui estão as nossas opções:')
    console.log('1- testar a conexão com o banco de dados')
    console.log('2- inserir um dev')
    console.log('3- exibir tabela de devs')
    console.log('4- pesquisar id do dev')
    console.log('5- excluir dev')
    console.log('6- alterar senha do dev')
    console.log('7- sair do sistema')
    console.log(' ')
    ask1 = parseInt(prompt('qual opção desejas? '))
    switch (ask1) {
        case 1:
            await testeConexao()
            return menu()
        case 2:
            await inserirDev()
            return menu()
        case 3:
            await exibirDevs()
            return menu()
        case 4:
            await exibirID()
            return menu()
        case 5:
            await deletarDev()
            return menu()
        case 6:
            await alterarSenha()
            return menu()
        case 7:
            await console.log('desconectando...')
            break;
        default:
            await console.log("Voce nao selecionou nenhum item...")
            return menu()
    }
}
menu()