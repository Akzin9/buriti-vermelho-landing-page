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

    let dataForm = formData.get("data");

    let userFound = false;

        for ( let i = 0; i < arrayUserData.length; i++ ) {

            let nomeForm = arrayUserData[i].nome; 
            let userData = JSON.parse(localStorage.getItem(nomeForm));

            let numeroAgendamentos = userData.agendamentos.length;

            for (let j = 0; j < numeroAgendamentos; j++) {
                let check = [
                    {
                        horarioObjUser: "",
                        dataObjUser: "",
                    },
                ];

                check.horarioObjUser = userData.agendamentos[j].hora;
                check.dataObjUser = userData.agendamentos[j].data;

                if ( horario == check.horarioObjUser && dataForm == check.dataObjUser )  {
                    alert("Já existe um agendamento marcado para esse dia e hora! Por favor, remarque.");
                    // criar sistema pra deixar botão de horário escuro caso exista horário marcado no respectivo dia
                    return;
                };
            };
        };
    

    // adiciona novo agendamento à usuário já existente
    for (let i = 0; i < arrayUserData.length; i++) {
        if ( formData.get("nome") == arrayUserData[i].nome && formData.get("email").toLowerCase() == arrayUserData[i].email ) {

            userFound = true;
            let agend = {};
            let userAgendData = JSON.parse( localStorage.getItem( arrayUserData[i].nome ) );

            formData.forEach( ( value, prop ) => {
                agend[prop] = value;
            });

            delete agend.nome;
            delete agend.email;

            agend.hora = horario;
            agend.numeroAtendimento = userAgendData.agendamentos.length + 1;

            userAgendData.agendamentos.push( agend );

            localStorage.setItem( arrayUserData[i].nome, JSON.stringify( userAgendData ) );

        };
    };

    // coloca userFound como false para que seja possível criar um novo usuário
    for (let p = 0; p < arrayUserData.length; p++) {
        if (!formData.get("nome") == arrayUserData[p].nome && formData.get("email").toLowerCase() == arrayUserData[p].email ) {
            userFound = false;
        };
    };

    // cria novo agendamento de usuário
    if ( userFound == false ) {
        newUserData.id = arrayUserData.length + 1;
        let nomeForm = formData.get("nome");
        newUserData.nome = nomeForm;
        newUserData.email = formData.get("email").toLowerCase();
        
        newUserData.agendamentos = [];
        let agendsObj = {};

        formData.forEach( ( value, prop ) => {
            agendsObj[prop] = value;
        });

        delete agendsObj.nome;
        delete agendsObj.email;

        agendsObj.hora = horario;
        agendsObj.numeroAtendimento = 1;

        newUserData.agendamentos.push(agendsObj);
        arrayUserData.push(newUserData);

        localStorage.setItem(nomeForm, JSON.stringify(newUserData));

    };

    // cancela o envio do formulário caso não possua data ou horário
    if (horario == null) {
        alert("Por favor, selecione um horário!");
        return;
    };

    if ( formData.get("data") == '' ) {
        alert("Por favor, selecione uma data para o atendimento.");
        return;
    };
    
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

// falta fazer sistema para atualizar a lista de agendamentos vísivel sempre que houver um novo agendamento, refatorar, sistema de remoção de agendamentos, sistema de logout, sistema de admin com algum nível de segurança (opcional), sistema para bloqueio de horário e data já preenchido 