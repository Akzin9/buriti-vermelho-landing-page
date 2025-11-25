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

// falta fazer a checagem pra validar o login do usuário e mostrar os agendamentos
// seleção de horários
// coletar dados do formulário de agendamento