let buttonLog1 = document.getElementById("loginBtt");

buttonLog1.addEventListener( "click", (event) => {  

    let show = document.getElementsByClassName("showBtt1")[0];

    show.style.display = "none";

    let divParte2 = document.getElementById("parte2Log");

    divParte2.style.display = "initial";
    
});

// terminar de deixar o botões minimamente úteis