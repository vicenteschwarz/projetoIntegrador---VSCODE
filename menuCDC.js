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
        console.log('Conexão bem-sucedida com o banco de cidades!');
        client.release(); // Libera o cliente para reutilização
    } catch (error) {console.error('Erro ao conectar ao banco!');}
}
//testeConexao()

async function inserirCidade() {
    try {
        const city = prompt('Qual cidade desejas incluir? ')
        const state = prompt('Qual o estado dessa cidade? ')
        const country = prompt('Qual o país dessa cidade? ')
        const climate = prompt('Qual o clima dessa cidade? ')
        const culture = prompt('Qual a cultura dessa cidade? ')
        const tourist = prompt('Insira um ponto turístico: ')
        console.log(' ')
        const query = 'INSERT INTO "PI"."CDC" (city, state, country, climate, culture, tourist_att) VALUES ($1, $2, $3, $4, $5, $6)'
        await pool.query(query, [city, state, country, climate, culture, tourist]);
        console.log("Cidade incluída com sucesso!");
    }
    catch (error) {console.error('Erro!',error)}
}
//inserirTime()

async function exibirCidades() {
    try {
        const query = 'SELECT cod_cdc, city, state, country, climate, culture, tourist_att FROM "PI"."CDC" order by cod_cdc'
        const resultado = await pool.query(query)
        console.table(resultado.rows)
    }
    catch(error) { console.error("Erro!",error)}
}
//exibirTimes()

async function exibirID(){
    try{
        ask1 = prompt('Informe a cidade por favor: ')
        const query = 'select cod_cdc from "PI"."CDC" where city ilike $1'
        const id = await pool.query(query, [ask1])
        console.log('cod=',id.rows[0].cod_cdc)  
        return id.rows[0].cod_cdc
    }
    catch(error) {console.error('Erro!', error)}
}
//exibirID()

async function deletarCidade(){
    try{
        let deleteCidade = await exibirID()
        const query = 'delete from "PI"."CDC" where cod_cdc = $1'
        const deletada = await pool.query(query, [deleteCidade])
        console.table(deletada.rows)
        console.log('Cidade deletada com sucesso!')
    }
    catch(error) {console.error('Erro!',error)}
}


async function alterarClima() {
    try {
        let pesquisa = await exibirID();
        const clima = prompt('qual o clima que gostarias de inserir? ');
        const query = 'update "PI"."CDC" set climate = $1 where cod_cdc = $2';
        await pool.query(query, [clima, pesquisa]);
        console.log('Clima da cidade de', ask1.charAt(0).toUpperCase() + ask1.slice(1),'alterado com sucesso!');
    } catch (error) {
        console.error('Erro!', error);
    }
}


//=========================================================================================================
//Espaço destinado ao menu:

let ask1 = 0
console.log(' ')
console.log('Seja bem vindo ao nosso banco de cadastro de cidades!')
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
    console.log('2- inserir uma cidade no banco de dados')
    console.log('3- exibir tabela de cidades')
    console.log('4- pesquisar codigo da cidade da cidade no banco')
    console.log('5- excluir cidade')
    console.log('6- alterar informações do clima de uma cidade')
    console.log('7- sair do sistema')
    console.log(' ')
    ask1 = parseInt(prompt('qual opção desejas? '))
    switch (ask1) {
        case 1:
            await testeConexao()
            return menu()
        case 2:
            await inserirCidade()
            return menu()
        case 3:
            await exibirCidades()
            return menu()
        case 4:
            await exibirID()
            return menu()
        case 5:
            await deletarCidade()
            return menu()
        case 6:
            await alterarClima()
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