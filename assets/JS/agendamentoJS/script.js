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
let Atends = 0; // número de atendimentos do cliente
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
    Atends += 1; // o número de atendimentos está sendo global e não de cada usuário
    formAgend.reset();
    horario = null;
    botoes.forEach(b => b.classList.remove("ativo"));
});

// formulário de login
let formLogin = document.getElementById("formLogin");
let arrLogin = [];
// pega os dados do envio do formulário e compara com o conteúdo do objeto que carrega os usuários que é criado após o envio do formulário de agendamento.

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    let dataFormLogin = new FormData(formLogin);

    let objLogin = {};

    dataFormLogin.forEach( ( value, prop ) => {
        objLogin[prop] = value;
    });
    console.log(objLogin);
    
    for (let i = 0; i < arrayUserData.length; i++) {
        if ( objLogin.nomeLogin == arrayUserData[i].nome &&
             objLogin.emailLogin == arrayUserData[i].email ) {

            let parteLogin = document.getElementById("parte2Log");
            let agendamentosDiv = document.getElementsByClassName("showP3")[0];
            let agendamentosBtt = document.getElementsByClassName("showP3")[1];
            let pAgend = document.getElementsByClassName("pAgend")[0];
    
            parteLogin.style.display = "none";
            agendamentosDiv.style.display = "grid";
            agendamentosBtt.style.display = "grid";

            let numberOfAgend = document.createElement("span");
            let dataOfAgend = document.createElement("span");
            let hourOfAgend = document.createElement("span");
            // let deleteBtt = document.createElement("button");

            numberOfAgend.setAttribute("id", "numberAgend");
            dataOfAgend.setAttribute("id", "dataAgend");
            hourOfAgend.setAttribute("id", "horaAgend");

            // deleteBtt.classList.add("deleteBtt", "showP3");
            numberOfAgend.classList.add("spanBorder", "borderRS");
            dataOfAgend.classList.add("spanBorder");
            hourOfAgend.classList.add("spanSemBorder", "borderRE");

            agendamentosDiv.appendChild(numberOfAgend);
            agendamentosDiv.appendChild(dataOfAgend);
            agendamentosDiv.appendChild(hourOfAgend);
            // agendamentosDiv.appendChild(deleteBtt);

            // <button class="deleteBtt showP3">Deletar Agendamento</button>
            // <span id="numberAgend" class="spanBorder borderRS"></span>
            //         <span id="dataAgend" class="spanBorder"></span>
            //         <span id="horaAgend" class="spanSemBorder borderRE"></span>

            numberOfAgend.innerHTML = `Agendamento N°: <strong>${Atends}</strong>`;
            dataOfAgend.innerHTML = `Data: <strong>${arrayUserData[i].data}</strong>`;
            hourOfAgend.innerHTML = `Horário: <strong>${arrayUserData[i].hora}</strong>`;

            if (Atends == 1) {
                pAgend.textContent = `Você possui ${Atends} atendimento.`;
            } else {
                pAgend.textContent = `Você possui ${Atends} atendimentos.`;
            }
        }
    }

    formLogin.reset();
    
});

// falta fazer a checagem pra validar o login do usuário e mostrar os agendamentos
// fazer funcionalidade do botão de agendamento

let buttonDelete = document.getElementsByClassName("deleteBtt");

// após o botão de login não está funcionando