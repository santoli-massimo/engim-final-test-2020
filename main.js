console.log('ok')

// GESTISCO LE COORDINATE DI ORDINATE E ASCISSE
var max_x = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
var max_y = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;

max_x -= document.images[0].width;
max_y -= document.images[0].height;

var dx = new Array(4);
dx[0] = -75;

var dy = new Array(4);
dy[0] = 15;

oggetti = document.getElementsByTagName('div');

// MOVIMENTO(ATTRAVERSO UNA FUNZIONE)DIV ALL'INTERNO DELLA PAGINA PRINCIPALE
function sposta() {
    var x, y;
    for (var i = 0; i < oggetti.length; i++) {
        x = parseInt(oggetti[i].style.left) + dx[i];
        y = parseInt(oggetti[i].style.top) + dy[i];

        if ((x <= 0) || (x >= max_x)) {
            dx[i] = -dx[i];
        }
        if ((y <= 0) || (y >= max_y)) {
            dy[i] = -dy[i];
        }
        oggetti[i].style.left = x + "px";
        oggetti[i].style.top = y + "px";

    }

}




// GENERO LA FUNZIONE DI RILEVAMENTO POSITIVO AL CLICK
var clicca = document.getElementById('img');

// INIZIALIZZO I A 0 FUORI DALLA FUNZIONE ALTRIMENTI OGNI VOLTA CHE
// "CLICCO" INIZIALIZZEREBBE A 0 IL MIO CONTEGGIO(CAZZO)
var i = 0;
clicca.addEventListener('click', function () {


    if (clicca) {
        i += 1;
        var p = document.getElementById('p');
        p.style.width = '350px';
        p.style.height = '30px';
        p.style.margin = '3px';
        p.style.border = '2px solid black';
        p.style.borderRadius = "10px";
        p.style.backgroundColor = 'green';
        p.style.color = 'yellow';
        p.style.fontWeight = 'bold';
        // p.style.backgroundImage = 'legno.jpg';

    }

    p.innerText = "Hai cliccato correttamente: " + i;

    if (i == 5) {
        alert('LIVELLO SUCCESSIVO');
        setInterval('sposta()', 175);
    }
    if (i == 10) {
        //alert('ALLORA SEI IL MIGLIORE!!!' + 'IL RAPPORTO SUCCESSO/INSUCCESSO È: ' + (i-j));
        if ((i - j) >= 6 && (i - j) < 9) {
            alert('SPACCHI!!! ' + 'IL RAPPORTO SUCCESSO/INSUCCESSO È: ' + (i - j));
            body.style.display = 'none';
        }
        else if ((i - j) == 10) {
            alert('AVRAI VINTO MA TI VERRANO GLI ATTACCHI EPILETTICI!!! ' + 'COMUNQUE IL RAPPORTO SUCCESSO/INSUCCESSO È: ' + (i - j));
            body.style.display = 'none';
        }
        else {
            alert('FAI CAGARE!!! ' + 'IL RAPPORTO SUCCESSO/INSUCCESSO È: ' + (i - j))
            body.style.display = 'none';
        }
    }
})

var clicca2 = document.getElementById('container');

// INIZIALIZZO I A 0 FUORI DALLA FUNZIONE ALTRIMENTI OGNI VOLTA CHE
// "CLICCO" INIZIALIZZEREBBE A 0 IL MIO CONTEGGIO(CAZZO)
var j = 0;
clicca2.addEventListener('click', function () {


    if (clicca2) {
        j += 1;
        var p2 = document.getElementById('p2');
        p2.style.width = '350px';
        p2.style.height = '30px';
        p2.style.margin = '3px';
        p2.style.border = '2px solid black';
        p2.style.borderRadius = "10px";
        p2.style.backgroundColor = 'red';
        p2.style.color = 'yellow';
        p2.style.fontWeight = 'bold';
        // p.style.backgroundImage = 'legno.jpg';
    }

    p2.innerText = "Non hai cliccato correttamente: " + j;

    var body = document.getElementById('body');


    if (j == 10) {
        alert('ALLORA SEI IL UN FALLITO!!!MUORI MALE');
        body.style.display = 'none';


    }

})

