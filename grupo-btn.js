(function(){

/* CRIAR ESTILO */

const style = document.createElement('style');

style.innerHTML = `

#grupoBtn{

position:fixed;

bottom:90px;

right:25px;

width:65px;

height:65px;

border:none;

border-radius:50%;

background:linear-gradient(
45deg,
#28a745,
#00d26a
);

color:white;

font-size:28px;

cursor:pointer;

z-index:999999;

box-shadow:
0 0 20px rgba(40,167,69,0.5);

transition:0.3s;

display:flex;

align-items:center;

justify-content:center;

}

#grupoBtn:hover{

transform:scale(1.1);

box-shadow:
0 0 30px rgba(40,167,69,0.8);

}

#grupoBtn:active{

transform:scale(0.95);

}

`;

document.head.appendChild(style);


/* CRIAR BOTÃO */

const btn = document.createElement('button');

btn.id = 'grupoBtn';

btn.innerHTML = '💬';


/* ABRIR PÁGINA */

btn.onclick = function(){

window.location.href =
'https://voluble-sfogliatella-296993.netlify.app/grupos.html';

};


/* ADICIONAR */

document.body.appendChild(btn);

})();




