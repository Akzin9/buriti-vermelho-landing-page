Regra Suprema: COMENTE TUDO QUE POSSÍVEL, PELO AMOR DE DEUS.

1. Adicionar ";" ao final de tudo onde for possível em js (menos nos espaços em branco).

Exemplo: 
function tratarDados(dado1, dado2) {

    let algumaCoisa = document.querySelector("div#algumaCoisa");

    return resultadoDosComandosSinistros;
};

2. Deixar blocos fragmentados de acordo com suas funções e comentar a função de cada bloquinho.

Exemplo: 

function criarNewNews(id, title, content, imgPath) {
    
    // cria uma nova area para a notícia e adiciona um id para redirecionamento

    let newArt = document.createElement("article");
    newArt.classList.add("news");
    newArt.setAttribute("id", id);
    main.appendChild(newArt);

    // cria as tags para os conteúdos da matéria

    let newH2 = document.createElement("h2");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    
    // coloca as tags na notícia

    newArt.appendChild(newH2);
    newArt.appendChild(newP);
    newArt.appendChild(newImg);

    // adiciona os parâmetros nas tags de conteúdo

    newImg.setAttribute("src", imgPath);
    newP.innerHTML = content;
    newH2.innerHTML = title;

    // cria a referência à lista e cria as tags para armazenar os dados

    let ulNew = document.querySelector("ul#newNews");
    let newLi = document.createElement("li");
    let newA2 = document.createElement("a");

    // adiciona atributos e conteúdo as tags

    newA2.innerHTML = title;
    newLi.setAttribute("id", "newNL");
    newA2.setAttribute("href", "#" + id)

    // coloca as tags na lista

    ulNew.appendChild(newLi);
    newLi.appendChild(newA2);
};

3. Adicionar espaços após os parâmetros

    let ulNew = document.querySelector( "ul#newNews" );
    let newLi = document.createElement( "li" );
    let newA2 = document.createElement( "a" );