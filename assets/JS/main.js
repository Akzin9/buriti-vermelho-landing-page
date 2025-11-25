// document.addEventListener('DOMContentLoaded', () => {
//     const scrollToSection = (id) => {
//         const section = document.getElementById(id);
//         if (section) {
//             section.scrollIntoView({ behavior: 'smooth' });
//         }
//     };


//     const btnAgendarVisitaHero = document.querySelector('.hero-buttons button:first-child');
//     const btnConhecaMaisHero = document.querySelector('.hero-buttons button:last-child');

//     if (btnAgendarVisitaHero) {
//         btnAgendarVisitaHero.addEventListener('click', () => {
//             scrollToSection('contato-final'); 
//         });
//     }

//     if (btnConhecaMaisHero) {
//         btnConhecaMaisHero.addEventListener('click', () => {
//             scrollToSection('motivos');
//         });
//     }


//     const btnAgendarVisitaCta = document.querySelector('.cta-buttons button:first-of-type');
//     const btnEntreEmContatoCta = document.querySelector('.cta-buttons button:last-of-type');

//     if (btnAgendarVisitaCta) {
//         btnAgendarVisitaCta.addEventListener('click', () => {
//             alert('Ação: Abrir modal de agendamento de visita!');
//         });
//     }

//     if (btnEntreEmContatoCta) {
//         btnEntreEmContatoCta.addEventListener('click', () => {
//             scrollToSection('contato'); 
//         });
//     }
    
//     const footerLinks = document.querySelectorAll('.footer-links a');

//     footerLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault(); 
            
//             const targetId = link.getAttribute('href').substring(1); 
            
//             if (targetId) {
//                  scrollToSection(targetId);
//             }
//         });
//     });
// });


let buttonAgend = document.querySelectorAll(".agendVisit");

buttonAgend.forEach((elem) => {
    elem.addEventListener("click", () => {
        window.open("../../pages/agendamento.html", "href");
    });
});

let contactButton = document.getElementById("contactBtt");

contactButton.addEventListener("click", () => {
    window.location.href = "https://akzin9.github.io/buriti-vermelho-landing-page/#contato";
});

let knowMore = document.getElementById("knowMore");

knowMore.addEventListener("click", () => {
    window.location.href = "https://akzin9.github.io/buriti-vermelho-landing-page/#historia";
});