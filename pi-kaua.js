const prompt = require("prompt-sync")()

let estoquemed = [
    { medicamentos: "Paracetamol", quantidade: "500 mg (20 comprimidos)", saldo: 68 },
    { medicamentos: "Ibuprofeno", quantidade: "400 mg (20 comprimidos)", saldo: 174 },
    { medicamentos: "Amoxicilina", quantidade: "500 mg (21 cápsulas)", saldo: 106 },
    { medicamentos: "Azitromicina", quantidade: "500 mg (6 comprimidos)", saldo: 201 },
    { medicamentos: "Losartana", quantidade: "50 mg (30 comprimidos)", saldo: 145 },
    { medicamentos: "Enalapril", quantidade: "10 mg (30 comprimidos)", saldo: 305 },
    { medicamentos: "Metformina", quantidade: "500 mg (30 comprimidos)", saldo: 134 },
    { medicamentos: "Glibenclamida", quantidade: "5 mg (30 comprimidos)", saldo: 161 },
    { medicamentos: "Salbutamol (aerossol)", quantidade: "100 mcg (200 doses)", saldo: 167 },
    { medicamentos: "Budesonida", quantidade: "200 mcg (60 doses)", saldo: 154 },
    { medicamentos: "Fluoxetina", quantidade: "20 mg (30 cápsulas)", saldo: 300 },
    { medicamentos: "Sertralina", quantidade: "50 mg (30 comprimidos)", saldo: 50 },
]
let newuser = [
    { usuario: "ADM", senha: "ADM" },
    { usuario: "Kaua", senha: "kvb" }
]

function mostrarMed() {
    console.log("Aqui está a lista de medicamentos")
    console.table(estoquemed)
}

function cadastrarMed(nomeMed, saldoMed, quantMed) {
    console.log("Aqui está a lista atual de medicamentos");
    console.table(estoquemed);

    // Verifica se o medicamento já está no array
    let medExistente = false;
    for (let i = 0; i < estoquemed.length; i++) {
        if (nomeMed === estoquemed[i].medicamentos) {
            medExistente = true;
            break; // Sai do loop se o medicamento já existir
        }
    }
    
    // Se o medicamento já existir, exibe uma mensagem
    if (medExistente) {
        console.log("Este medicamento já está no estoque!");
    } else {

        // Adiciona o novo medicamento ao array
        estoquemed.push({ medicamentos: nomeMed, quantidade: quantMed, saldo: parseInt(saldoMed) });
        console.log(nomeMed," foi adicionado com sucesso!");
        console.log("");
        console.log("Aqui está a lista atualizada:");
        console.log("");
        console.table(estoquemed);
    }
}


function deletarMed() {
    console.log("Lista de medicamentos atual");
    console.table(estoquemed);
    deletMed = prompt("Qual medicamento deseja deletar? ");

    let delet = -1; // Inicializa o índice como -1 (não encontrado)

    // Percorre o array procurando o medicamento
    for (let i = 0; i < estoquemed.length; i++) {
        if (estoquemed[i].medicamentos === deletMed) {
            delet = i; // Armazena o índice se o medicamento for encontrado
            break; // Sai do loop após encontrar
        }
    }

    if (delet !== -1) {
        estoquemed.splice(delet, 1); // Remove o medicamento
        console.log("Medicamento deletado com sucesso!")
        console.log("Aqui está o estoque atualizado:")
        console.table(estoquemed)
    } else {
        console.log("Medicamento não encontrado!")
    }
}



function atualizarMed() {
    let atualNome = prompt("Qual medicamento deseja atualizar as informações? ")
    let encontrado = false
    for (let i = 0; i < estoquemed.length; i++) {
        if (estoquemed[i].medicamentos == atualNome) {
            let atualQuant = prompt("Atualize as informações de quantidade deste medicamento: ")
            let atualSaldo = prompt("Atualize o saldo deste medicamento: ")

            estoquemed[i].quantidade = atualQuant
            estoquemed[i].saldo = parseInt(atualSaldo)
            console.log("")
            console.log("Aqui está a lista com o medicamento atualizado! ")--*-
            console.table(estoquemed)

            encontrado = true; // Marca que o medicamento foi encontrado
            break; // Sai do loop após encontrar e atualizar o medicamento
        }
    }

    if (!encontrado) {
        console.log("Medicamento não encontrado!")
    }
}

function distribuirMed() {
    let distribuiNome = prompt("Qual remédio deseja distribuir? ");
    let encontrado = false;

    for (let i = 0; i < estoquemed.length; i++) {
        if (estoquemed[i].medicamentos === distribuiNome) {
            encontrado = true; // Marca que o medicamento foi encontrado
            
            let nomeCliente = prompt("Qual o nome completo do cliente? ");
            let distribuiQuant = parseInt(prompt("Qual a quantidade que deseja distribuir? "));

            // Verifica se a quantidade a ser distribuída é válida
            if (distribuiQuant > estoquemed[i].saldo) {
                console.log("Quantidade excede o saldo disponível!");
            } else {
                estoquemed[i].saldo -= distribuiQuant; // Atualiza o saldo
                console.log('Distribuição de',distribuiQuant,  'unidades de', distribuiNome, 'para',nomeCliente, 'realizada com sucesso!');
                console.log("Saldo restante de", distribuiNome, ":", estoquemed[i].saldo,);
            }
            break; // Sai do loop após encontrar e distribuir
        }
    }

    if (!encontrado) {
        console.log("Medicamento não encontrado!");
    }
}

function cadastrarUsuario() {
    console.log("Aqui está a lista atual de usuários")
    console.table(newuser)

    // Solicita o nome do usuário primeiro
    let nomeUser = prompt("Nome do usuário que deseja cadastrar: ")

    // Verifica se o usuário já está no array
    let userExistente = false
    for (let i = 0; i < newuser.length; i++) {
        if (nomeUser === newuser[i].usuario) {
            userExistente = true;
            break; // Sai do loop se o usuário já existir
        }
    }

    // Se o usuário ja estiver cadastrado, exibe uma mensagem
    if (userExistente) {
        console.log("Este usuário ja está cadastrado! ")
    } else {
        // Só solicita a quantidade e saldo se o medicamento não existir
        let userPassword = prompt("Qual será a senha do usuário? ")

        // Adiciona o novo usuario ao array
        newuser.push({ usuario: nomeUser, senha: userPassword })
        console.log(`${nomeUser} foi adicionado com sucesso!`)
        console.log("");
        console.log("Aqui está a lista de usuários atualizada:")
        console.log("")
        console.table(newuser)
    }
}

{
    let nomeMed = ''
    let quantMed = ''
    let deletMed = ''
    let saldoMed = ''
    let distribuiNome = ''
    let distribuiQuant = ''
    let nomeCliente = ''
    let saldoFinal = ''
}

function validarUsuario() {
    let user = prompt("Digite o usuário: ");
    let password = prompt("Digite a senha: ");
    for (let i = 0; i < newuser.length; i++) {
        if (user == newuser[i].usuario && password == newuser[i].senha) {
            console.log("Login bem-sucedido!");
            return true; // Login bem-sucedido
        }
    }
    console.log("Usuário ou senha incorretos!"); // Login falhou
    return false;

}

function menu() {
    // Verifica se o login foi bem-sucedido
    if (backend.validarUsuario()) {
        let optionMenu = "";
        while (optionMenu !== "7") {
            console.log("");
            console.log("Estoque de medicamentos ");
            console.log("");
            console.log("Selecione a opção desejada ");
            console.log("");
            console.log("1 - Mostrar estoque de medicamentos ");
            console.log("2 - Cadastrar medicamento ");
            console.log("3 - Deletar medicamento ");
            console.log("4 - Atualizar medicamento ");
            console.log("5 - Distribuir medicamento ");
            console.log("6 - Cadastrar usuário ");
            console.log("7 - Sair");
            console.log("");
            optionMenu = prompt("Selecione uma opção: ");
            console.log("");

            switch (optionMenu) {
                case "1":
                    backend.mostrarMed();
                    break;
                case "2":
                    let nomeMed = prompt("Nome do medicamento que deseja cadastrar: ");
                    let quantMed = prompt("Quais as informações de quantidade? ");
                    let saldoMed = prompt("Saldo do medicamento: ");
                    backend.cadastrarMed(nomeMed, quantMed, saldoMed);
                    break;
                case "3":
                    backend.deletarMed();
                    break;
                case "4":
                    backend.atualizarMed();
                    break;
                case "5":
                    backend.distribuirMed()
                    break;
                case "6":
                    backend.cadastrarUsuario()
                    break;
                case "7":
                    console.log("Saiu!");
                    break;
                default:
                    console.log("Você não escolheu uma opção válida");
                    break;
            }
        }
    } else {
        console.log("Login falhou. Tente novamente.");
    }
}

//login é checado antes do menu ser mostrado
menu();