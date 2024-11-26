let prompt = require("prompt-sync")()
const backend = require("./backend.js")
let ask = ""
console.log("Seja bem vindo ao nosso sistema!")
console.log("Faça seu cadastro a seguir:")
let name = prompt("Digite seu primeiro nome: ")
console.log(prompt("Digite Email: "))
console.log(prompt("Digite sua Senha: : "))
console.log("")
console.log("Sucesso! Aproveite nossas funcionalidades", name.charAt(0).toUpperCase() + name.slice(1) + "!")

//=================
//PROMPTS:











function menu() {
    console.log("")
    console.log("RECEBA as opções!:")
    console.log("")
    console.log("1 - Mostrar lista de cidades")
    console.log("2 - Inserir cidade")
    console.log("3 - Deletar cidade")
    console.log("4- Encontrar cidade")
    console.log("5 - Mostrar clima característico de determinado local")
    console.log("6- Sair")
    console.log("")
    ask = (prompt("Oque desejas? "))
    switch (ask) {
        case "1":
            backend.mostrarDados()
            break;
        case "2":
            let pNomeCidade = prompt("Qual cidade deseja inserir? ")
            let ask3 = prompt("Qual o clima que majoritáriamente ocorre essa cidade? ")
            backend.inserirCidade(pNomeCidade,ask3)
            break;
        case "3":
            let ask5 = prompt("Qual cidade deseja excluir pelo índice? ")
            console.log("Cidade excluída com sucesso!")
            backend.deletarCidade(ask5)
            break;
        case "4":
            backend.encontrarCidade()
            break;
        case "5":
                backend.mostraCidades()
                let askClimate = prompt("Qual cidade desejas saber o clima?(digite apenas a cidade) ");
                let resultado = backend.mostrarClima2(askClimate); 
                console.log(resultado); 
                break;
        case "6":
            console.log("Saiu!")
            break;
        default:
            console.log("Voce não escolheu uma opção disponível")
            break;
    }
}
while (ask !== "6") {
    menu()
}


