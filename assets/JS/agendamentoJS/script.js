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

buttonLog1.addEventListener( "click", (event) => {  

    let show = document.getElementsByClassName("showBtt1")[0];

    show.style.display = "none";

    let divParte2 = document.getElementById("parte2Log");

    divParte2.style.display = "flex";
    
});

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
let buttons = document.querySelectorAll(".buttonHour");
let horario = null;

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        horario = button.textContent;
    });
});

// formulário de agendamento
// formulário pega os dados, manda pra um objeto, mandando junto também a variável de horário, mas antes verificando se ela é null e cancelando o envio caso seja null
let arrayUserData = [];
let formAgend = document.getElementById("agendarForm");

formAgend.addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(formAgend);

    let newUserData = {};

    formData.forEach( ( value, prop ) => {
        newUserData[prop] = value;
    });

    if (horario == null) {
        alert("Por favor, selecione um horário!");
        return;
    };

    newUserData.hora = horario;
    newUserData.email = newUserData.email.toLowerCase();

    arrayUserData.push(newUserData);

    formAgend.reset();
    horario = null;

    // arrayUserData.forEach((value) => {
    //     console.log(value)
    // })
});




// formulário de login
let formLogin = document.getElementById("formLogin");
// pega os dados do envio do formulário e compara com o conteúdo do objeto que carrega os usuários que é criado após o envio do formulário de agendamento.

formLogin.addEventListener("submit", (event) => {

});

// falta fazer a checagem pra validar o login do usuário e mostrar os agendamentos
// seleção de horários
// coletar dados do formulário de agendamento