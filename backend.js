let prompt = require("prompt-sync")()

//====================================================================================
//TABELA:

const cidades = [
    { nomecidade: "Toquio, Japao", clima: "Temperado" },
    { nomecidade: "Cidade do Cabo, Africa do Sul", clima: "Mediterraneo" },
    { nomecidade: "Nova York, EUA", clima: "Continental" },
    { nomecidade: "Sao Paulo, Brasil", clima: "Tropical" },
    { nomecidade: "Sydney, Australia", clima: "Oceanico" },
    { nomecidade: "Moscou, Russia", clima: "Frio" },
    { nomecidade: "Bangkok, Tailandia", clima: "Tropical" },
    { nomecidade: "Londres, Reino Unido", clima: "Oceanico" },
    { nomecidade: "Cairo, Egito", clima: "Desertico" },
    { nomecidade: "Buenos Aires, Argentina", clima: "Temperado" }
];

//====================================================================================
//ESPAÇO PARA CRIAÇÃO DE FUNÇÕES:

function mostrarDados() { //correto
    console.table(cidades)
}

function mostraCidades(){
    const listaCidades = cidades.map(cidade => cidade.nomecidade);
    console.table(listaCidades)
}

function inserirCidade(pNomeCidade,ask3) {
    let mensagem = ""
    for (let i = 0; i < cidades.length; i++) {
        if (pNomeCidade === cidades[i].nomecidade) {
            mensagem = "Essa cidade já existe na tabela, tente novamente."
        }
    }
    if(mensagem.length>0){
        return mensagem;
    }
    else{
        cidades.push({ nomecidade: pNomeCidade, clima: ask3 });
        return ("Cidade", pNomeCidade, "adicionado com sucesso!");
    }
}

function deletarCidade(ask5) { //correto
     //excluir pelo nome depois
    cidades.splice(ask5, 1)
}

function encontrarCidade(nomeCidade) { //correto
    let indice = -1;
    if (!nomeCidade) {
        nomeCidade = prompt("Qual cidade desejas encontrar na tabela? ");
    }
    for (let i = 0; i < cidades.length; i++) {
        if (cidades[i].nomecidade.toLowerCase().includes(nomeCidade.toLowerCase())) {
            indice = i;
            break;
        }
    }
    return "O indice de", nomeCidade, "é", indice
}

function mostrarClima2(askClimate) { //correto
    let mensagem = "";
    let cidadeEncontrada = false;

    for (let i = 0; i < cidades.length; i++) {
        if (cidades[i].nomecidade.toLowerCase() === askClimate.toLowerCase()) {
            cidadeEncontrada = true;
            mensagem = "O clima de " + cidades[i].nomecidade + " é geralmente " + cidades[i].clima;
            break; 
        }
    }
    if (cidadeEncontrada) {
        return mensagem; 
    } else {
        return "Essa cidade não existe na tabela, ou foi digitada incorretamente."
    }
}

module.exports = { mostrarDados, inserirCidade, deletarCidade, encontrarCidade, mostrarClima2, mostraCidades }

