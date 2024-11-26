let prompt = require("prompt-sync")();
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
let ask = ""
console.log("Seja bem vindo ao nosso sistema!")
console.log("Faça seu cadastro a seguir:")
let name = prompt("Digite seu primeiro nome: ")
console.log(prompt("Digite Email: "))
console.log(prompt("Digite sua Senha: : "))
console.log("")
console.log("Sucesso! Aproveite nossas funcionalidades", name.charAt(0).toUpperCase() + name.slice(1) + "!")
function menu() {
    console.log("RECEBA as opções!:")
    console.log("")
    console.log("1 - Mostrar lista de cidades")
    console.log("2 - Inserir cidade")
    console.log("3 - Deletar cidade")
    console.log("4- Encontrar cidade")
    console.log("5- Sair")
    console.log("")
    ask = (prompt("Oque desejas? "))
    switch (ask) {
        case "1":
            mostrarDados()
            break;
        case "2":
            inserirCidade()
            break;
        case "3":
            deletarCidade()
            break;
        case "4":
            encontrarCidade()
            break;
        case "5":
            console.log("Saiu!")
            break;
        default:
            console.log("Voce não escolheu uma opção disponível")
            break;
    }
}
while (ask !== "5") {
    menu()
}



//============================================================
function mostrarDados() {
    console.table(cidades)
}

function inserirCidade() {
    let ask2 = prompt("Qual cidade deseja inserir? ")
    let ask3 = prompt("Qual o clima que majoritáriamente ocorre essa cidade? ") //adicionar mais prompts depois juntamente com o aumento da matriz(banco de dados)
    for (let i = 0; i < cidades.length; i++) {
        if (ask2 === cidades[i].nomecidade) {
            console.log("Esse país já existe na tabela, tente novamente.");
            return inserirCidade()
        }
    }
    cidades.push({ nomecidade: ask2, clima: ask3 });
    console.log("Cidade ${ask2} adicionado com sucesso!");
}


function deletarCidade() {
    console.table(cidades)
    let ask5 = prompt("Qual cidade deseja excluir pelo índice? ") //excluir pelo nome depois
    cidades.splice(ask5, 1)
    console.log("Cidade excluída com sucesso!")
}

function encontrarCidade(nomeCidade) {
    let indice = -1;
    console.table(cidades);
    if (!nomeCidade) {
        nomeCidade = prompt("Qual cidade desejas encontrar na tabela? ");
    }
    for (let i = 0; i < cidades.length; i++) {
        if (cidades[i].nomecidade.toLowerCase().includes(nomeCidade.toLowerCase())) {
            indice = i;
            break; 
        }
    }
console.log("O indice de", nomecidade, "é", indice)
}


