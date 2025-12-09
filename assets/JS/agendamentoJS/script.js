let buttonLog1 = document.getElementById("loginBtt");
let areaAgendamentos = document.getElementById("agendamentos-area");
let agendContainer = document.getElementById("agendamentos-container");

agendContainer.addEventListener("click", (event) => {
    // adicionar pequena animação ao clicar no botão
    let displayArea = window.getComputedStyle(areaAgendamentos).display;

    if (displayArea == "none") {

        areaAgendamentos.style.display = "flex";
        agendContainer.style.marginLeft = "38%";

    } else if (displayArea == "flex") {

        areaAgendamentos.style.display = "none";
        agendContainer.style.marginLeft = "45%";

    };
});

// botão de agendamento e parte para mostrar área de login
const agendamento = document.getElementById("agendamentos-container");

agendamento.addEventListener("click", () => {
    agendamento.classList.toggle("ativo");
});

buttonLog1.addEventListener( "click", (event) => {  

    let show = document.getElementsByClassName("showBtt1")[0];

    show.style.display = "none";

    let divParte2 = document.getElementById("parte2Log");

    divParte2.style.display = "flex";
    
});

// mudança na cor do botão de acordo com a condição "ativo"
const botoes = document.querySelectorAll("#horarios button");

botoes.forEach(btn => {
    btn.addEventListener("click", () => {
        // remove ativo dos outros botões
        botoes.forEach(b => b.classList.remove("ativo"));

        // adiciona ativo no clicado
        btn.classList.add("ativo");
    });
});

// sistema para enviar horário à uma variável
let buttons = document.querySelectorAll("#horarios button");
let horario = null;

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        horario = button.textContent;
    });
});

// formulário de agendamento
let arrayUserData = [];
let formAgend = document.getElementById("agendarForm");

formAgend.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // coleta os dados e cria um objeto com esses dados
    let dataInput = document.getElementById("data");

    let formData = new FormData(formAgend);

    let newUserData = {};

    formData.forEach( ( value, prop ) => {
        newUserData[prop] = value;
    });

    newUserData.numeroAtendimentos = arrayUserData.length + 1;
    newUserData.hora = horario;
    newUserData.email = newUserData.email.toLowerCase();

    // cancela o envio do formulário caso não possua data ou horário
    if (horario == null) {
        alert("Por favor, selecione um horário!");
        return;
    };

    if ( newUserData.data == '' ) {
        alert("Por favor, selecione uma data para o atendimento.");
        return;
    };

    // manda os dados do formulário para a array com os dados dos usuários
    arrayUserData.push(newUserData);
    
    // reseta os dados do formulário
    formAgend.reset();
    dataInput.value = '';
    horario = null;
    botoes.forEach(b => b.classList.remove("ativo"));    
});

// formulário de login
let formLogin = document.getElementById("formLogin");
let arrLogin = [];

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    // pega os dados do formulário de login
    let dataFormLogin = new FormData(formLogin);

    let objLogin = {};

    dataFormLogin.forEach( ( value, prop ) => {
        objLogin[prop] = value;
    });

    let userFound;
    
    // checa se os dados no formulário de login batem com os dados obtidos no formulário de agendamento
    for (let i = 0; i < arrayUserData.length; i++) {
        if ( objLogin.nomeLogin == arrayUserData[i].nome &&
             objLogin.emailLogin == arrayUserData[i].email ) {
                
                // refatorar esse código e mudar lógica

            userFound = true;

            let parteLogin = document.getElementById("parte2Log");
            let agendamentosDiv = document.getElementsByClassName("showP3")[0];
            let logOutBtt = document.getElementById("logOutBtt");
            let pAgend = document.getElementsByClassName("pAgend")[0];
    
            logOutBtt.style.display = "initial";
            parteLogin.style.display = "none";
            agendamentosDiv.style.display = "grid";
            
            let numberOfAgend = document.createElement("span");
            let dataOfAgend = document.createElement("span");
            let hourOfAgend = document.createElement("span");
            let deleteBtt = document.createElement("button");

            numberOfAgend.setAttribute("id", "numberAgend");
            dataOfAgend.setAttribute("id", "dataAgend");
            hourOfAgend.setAttribute("id", "horaAgend");

            deleteBtt.classList.add("deleteBtt", "showP3");
            numberOfAgend.classList.add("spanBorder", "borderRS");
            dataOfAgend.classList.add("spanBorder");
            hourOfAgend.classList.add("spanSemBorder", "borderRE");

            agendamentosDiv.appendChild(numberOfAgend);
            agendamentosDiv.appendChild(dataOfAgend);
            agendamentosDiv.appendChild(hourOfAgend);
            agendamentosDiv.appendChild(deleteBtt);

            let agendamentosBtt = document.getElementsByClassName("showP3");

            for (let i = 1; i < agendamentosBtt.length; i++) {

                agendamentosBtt[i].style.display = "grid";
                agendamentosBtt[i].textContent = "Deletar Agendamento";    
            };

            numberOfAgend.innerHTML = `Agendamento N°: <strong>${arrayUserData[i].numeroAtendimentos}</strong>`;
            pAgend.innerHTML = `Você possui <strong>${arrayUserData.length}</strong> atendimento${arrayUserData[i].numeroAtendimentos == 1 ? "" : "s"}.`;
            dataOfAgend.innerHTML = `Data: <strong>${arrayUserData[i].data}</strong>`;
            hourOfAgend.innerHTML = `Horário: <strong>${arrayUserData[i].hora}</strong>`;

            deleteBtt.addEventListener("click", () => {
                numberOfAgend.remove();
                dataOfAgend.remove();
                hourOfAgend.remove();
                
                deleteBtt.remove();

                arrayUserData.length--;
                pAgend.innerHTML = `Você possui <strong>${arrayUserData.length}</strong> atendimento${arrayUserData.length == 1 ? "" : "s"}.`;
            });
            
        } else {
            userFound = false;
        };
    }

    if ( userFound == false ) {
        alert("Usuário não encontrado.");
    };

    formLogin.reset();

});

// Botão de deslogar
let logOutBtt = document.getElementById("logOutBtt");
        // ainda em construção
logOutBtt.addEventListener( "click", (event) => {
    let parteLogin = document.getElementById("parte2Log");
    let agendamentosDiv = document.getElementsByClassName("showP3")[0];
    let pAgend = document.getElementsByClassName("pAgend")[0];
    let divAgend = document.getElementsByClassName("agends")[0];

    pAgend.textContent = "Você precisa estar logado para ver seus agendamentos";
    parteLogin.style.display = "flex";
    agendamentosDiv.style.display = "none";
    logOutBtt.style.display = "none";
    divAgend.textContent = "";
    
});

// testes para a execução do sistema de agendamento funcional
let user1 = {
    nome: "Davi",
    email: "email@gmail.com",
    tel: "(61) 9 9194-8320",
    horario: "10:00",
    data: "10/12/2025",
    numeroAtendimento: 1,
};

let davi = [{
    email: "email@gmail.com",
    tel: "(61) 9 9194-8320",
    horario: "10:00",
    data: "10/12/2025",
    numeroAtendimento: 1,
}, {
    email: "email@gmail.com",
    tel: "(61) 9 9194-8320",
    horario: "15:00",
    data: "16/12/2025",
    numeroAtendimento: 2,
}, {
    email: "email@gmail.com",
    tel: "(61) 9 9194-8320",
    horario: "15:00",
    data: "20/12/2025",
    numeroAtendimento: 3,
}];

localStorage.setItem("davi", JSON.stringify(davi));
console.log(davi.filter((value) => value.horario == "15:00"));

// lógica para sistema de agendamento: criar uma variável para cada usuário, nessa variável conterá os dados de cada agendamento, sendo cada agendamento um objeto diferente, para passar esses dados para a parte de agendamentos será feito um filter com base no nome ou email do usuário. (requisitos: JSON.stringify, JSON.parse, remoção de objeto dentro da array, adição de objeto dentro da array e filter)