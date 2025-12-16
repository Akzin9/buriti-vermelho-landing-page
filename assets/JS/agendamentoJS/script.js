window.onload = () => localStorage.clear();

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
let currentUser = {
        nome: "",
        email: "",
        };

let formAgend = document.getElementById("agendarForm");

// sistema de bloqueio de horário já ocupado

let inputDate = document.getElementById("data");

inputDate.addEventListener("change", (event) => {

    let buttonsHour = document.getElementsByClassName("hourBtt");
    // habilita todos os botões
    for (let i = 0; i < buttonsHour.length; i++) {
        buttonsHour[i].disabled = false;
    };
    // looping por todos os usuários
    for (let i = 0; i < arrayUserData.length; i++) {
        
        let users = JSON.parse(localStorage.getItem(arrayUserData[i].email));

        if (!users || !users.agendamentos) continue;
        // looping por todos os agendamentos do usuário
        for (let j = 0; j < users.agendamentos.length; j++) {

            let agendamentosUser = users.agendamentos[j];
            // verifica se a data está sendo usada no agendamento de algum usuário
            if (inputDate.value == agendamentosUser.data) {

                // pecorre todos os botões e desativa os que a hora estiverem dentro do agendamento do usuário
                for (let l = 0; l < buttonsHour.length; l++) { 

                    if (buttonsHour[l].textContent === agendamentosUser.hora) {
                        buttonsHour[l].disabled = true;
                    };
                };
            }
        };
    };
});

// function de crição dos agendamentos na lista de agendamentos
function createScheduling( quantitySchedulings, dateScheduling, userEmail, userHora) {

    let agendamentosDiv = document.getElementsByClassName("showP3")[0];
    let pAgend = document.getElementsByClassName("pAgend")[0];

    let numberOfAgend = document.createElement("span");
    let dataOfAgend = document.createElement("span");
    let hourOfAgend = document.createElement("span");
    let deleteBtt = document.createElement("button");

    numberOfAgend.setAttribute("id", "numberAgend");
    dataOfAgend.setAttribute("id", "dataAgend");
    hourOfAgend.setAttribute("id", "horaAgend");
    deleteBtt.setAttribute("data-id", quantitySchedulings);
    deleteBtt.setAttribute("data-email", userEmail);

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
  
    pAgend.innerHTML = `Você possui <strong>${ quantitySchedulings }</strong> atendimento${ quantitySchedulings == 1 ? "" : "s" }.`;
    numberOfAgend.innerHTML = `Agendamento N°: <strong>${ quantitySchedulings }</strong>`;
    dataOfAgend.innerHTML = `Data: <strong>${ dateScheduling }</strong>`;
    hourOfAgend.innerHTML = `Horário: <strong>${ userHora }</strong>`;    

    deleteBtt.addEventListener("click", (event) => {

        if (window.confirm("Tem certeza que deseja deletar?")) {

                numberOfAgend.remove();
                dataOfAgend.remove();
                hourOfAgend.remove();
                deleteBtt.remove();
        
                let idSchedule = Number(event.target.dataset.id);
                let emailBtt = event.target.dataset.email;
        
                let userDataRemove = JSON.parse(localStorage.getItem( emailBtt ));
        
                let index = userDataRemove.agendamentos.findIndex(
                    value => Number(value.numeroAtendimento) == idSchedule);
        
                if (index !== -1) {
                    userDataRemove.agendamentos.splice(index, 1);
                } else if (index == 0) {
                    userDataRemove.agendamentos.shift();
                };
        
                localStorage.setItem(emailBtt, JSON.stringify( userDataRemove ));
        
                pAgend.innerHTML = `Você possui <strong>${ userDataRemove.agendamentos.length }</strong> atendimento${ userDataRemove.agendamentos.length == 1 ? "" : "s" }.`;
               
            } else {
                return;
            };
        });
};

formAgend.addEventListener("submit", function(event) {
    event.preventDefault();

    // coleta os dados e cria um objeto com esses dados
    let dataInput = document.getElementById("data");

    let formData = new FormData(formAgend);

    let newUserData = {};

    let dataForm = formData.get("data");
    let dataName = formData.get("nome");
    let dataEmail = formData.get("email");

    let userFound = false;

    // sistema para bloquear dias e horários já ocupados
    for ( let i = 0; i < arrayUserData.length; i++ ) {

        let emailForm = arrayUserData[i].email; 
        let userData = JSON.parse( localStorage.getItem( emailForm) );

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
    
    // atualiza lista de agendamentos do usuário logado no momento
    if ( currentUser.email == dataEmail ) {

        // dados do local storage do respectivo usuário
        let currentUserData = JSON.parse(localStorage.getItem(currentUser.email));
        let lastArrInd = currentUserData.agendamentos.at(-1); 
        let quantityAgendsUser = currentUserData.agendamentos.length == 0 ? 1 : lastArrInd.numeroAtendimento + 1 ;
        let email = currentUserData.email; 

        createScheduling( quantityAgendsUser, dataForm, email, horario);
    };

    // adiciona novo agendamento à usuário já existente
    for (let i = 0; i < arrayUserData.length; i++) {
        
        if ( dataEmail.toLowerCase() == arrayUserData[i].email ) {

            userFound = true;
            let agend = {};
            let userAgendData = JSON.parse( localStorage.getItem( arrayUserData[i].email ) );

            formData.forEach( ( value, prop ) => {
                agend[prop] = value;
            });

            delete agend.nome;
            delete agend.email;

            agend.hora = horario;
            let lastIndice = userAgendData.agendamentos.at(-1);
            agend.numeroAtendimento = userAgendData.agendamentos.length == 0 ? 1 : lastIndice.numeroAtendimento + 1;

            userAgendData.agendamentos.push( agend );

            localStorage.setItem( arrayUserData[i].email, JSON.stringify( userAgendData ) );            

        };
    };

    // coloca userFound como false para que seja possível criar um novo usuário
    for (let p = 0; p < arrayUserData.length; p++) {
        if ( !dataEmail.toLowerCase() == arrayUserData[p].email ) {
            userFound = false;
        };
    };

    // cria novo agendamento de usuário
    if ( userFound == false ) {
        newUserData.id = arrayUserData.length + 1;
        newUserData.nome = dataName;
        newUserData.email = dataEmail.toLowerCase();
        
        newUserData.agendamentos = [];
        let agendsObj = {};

        formData.forEach( ( value, prop ) => {
            agendsObj[prop] = value;
        });

        delete agendsObj.nome;
        delete agendsObj.email;

        agendsObj.hora = horario;
        agendsObj.numeroAtendimento = 1;

        newUserData.agendamentos.push( agendsObj );
        arrayUserData.push( newUserData );

        localStorage.setItem( dataEmail, JSON.stringify( newUserData ) );
    };

    // cancela o envio do formulário caso não possua data ou horário
    if (horario == null) {
        alert("Por favor, selecione um horário!");
        return;
    };

    if ( dataForm == '' ) {
        alert("Por favor, selecione uma data para o atendimento.");
        return;
    };

    // reseta botões ao padrão
    let buttonsHour = document.getElementsByClassName("hourBtt");

    for (let i = 0; i< buttonsHour.length; i++) {
        buttonsHour[i].disabled = false;
    };
    
    // reseta os dados do formulário
    formAgend.reset();
    dataInput.value = '';
    horario = null;
    botoes.forEach(b => b.classList.remove("ativo"));    
});

// formulário do botão de logar
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
        if ( objLogin.emailLogin.toLowerCase() == arrayUserData[i].email ) {

            userFound = true;

            currentUser.nome = objLogin.nomeLogin;
            currentUser.email = objLogin.emailLogin.toLowerCase();

            let parteLogin = document.getElementById("parte2Log");
            let agendamentosDiv = document.getElementsByClassName("showP3")[0];
            let logOutBtt = document.getElementById("logOutBtt");
    
            logOutBtt.style.display = "initial";
            parteLogin.style.display = "none";
            agendamentosDiv.style.display = "grid";

            let currentUserData = JSON.parse( localStorage.getItem( currentUser.email ));
            
            for ( let i = 0; i < currentUserData.agendamentos.length; i++ ) {

                let quantityAgendsUser = i + 1;
                let email = currentUserData.email; 
                let datesUser = currentUserData.agendamentos[i].data;
                let horas = currentUserData.agendamentos[i].hora;

                createScheduling( quantityAgendsUser, datesUser, email, horas);              
            };
            return;
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

logOutBtt.addEventListener( "click", (event) => {

    let parteLogin = document.getElementById("parte2Log");
    let agendamentosDiv = document.getElementsByClassName("showP3")[0];
    let pAgend = document.getElementsByClassName("pAgend")[0];
    let divAgend = document.getElementsByClassName("agends")[0];

    let currentUserLogOut = JSON.parse(localStorage.getItem(currentUser.email));

    if (currentUserLogOut.agendamentos.length == 0) {
        localStorage.removeItem(currentUser.email);
        let index = arrayUserData.findIndex( value => value.email == currentUser.email );
        arrayUserData.splice(index, 1);
    };

    currentUser.nome = "";
    currentUser.email = "";

    pAgend.textContent = "Você precisa estar logado para ver seus agendamentos";
    parteLogin.style.display = "flex";
    agendamentosDiv.style.display = "none";
    logOutBtt.style.display = "none";
    divAgend.textContent = "";
});

// refatorar (último)
// talvez transformar eventListener da linha 79 em function para ser implementada na linha 211 (parte de bloqueio de data e horário)
/* functions para refatorar(linhas):
112
185

formAgend eventListener
function createScheduling
inputDate eventListener (talvez transformar em function)

Também refazer os nomes das variáveis e mudar no projeto todo
ler todo o projeto e comentar
*/