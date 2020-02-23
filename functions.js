function nascondiPagine(list){
    for(var K=0; K<list.length; K++){
        list[K].style.display = 'none';
    }
}


let santoli15 = { // tutto il codice che serve  per il giochino/dedica in home

    init: function(){
        for (let square of document.querySelectorAll("#santoli15 .square")){ // imposta l'evento al click sui riquadri non vuoti: invert e checkwin e avvia il gioco una prima volta
          
            if (!square.classList.contains("void")){
                square.addEventListener("click", function(){
                    santoli15.invert(this);
                    santoli15.checkWin()
                });
            }
        }
        document.querySelector("#santoli15.win").addEventListener("click", santoli15.start15); // imposta l'evento al click sull'immagine completa che fa ripartire il gioco
        santoli15.start15();
    },

    start15:  function () { // avvio del gioco: sposta sotto la faccia completa ed esegue 10000 mosse casuali (la maggior parte saranno ignorate perché non lecite)
        document.querySelector("#santoli15.win").style.zIndex = -5;
        for (let i = 0; i < 10000; i++) {
            santoli15.invert(document.getElementsByClassName("square")[Math.floor(Math.random() * 15)])
        }
    },



    invert: function (toInvert) { //dato un riquadro lo scambia con il riquadro void se ha verificato che è una mossa lecita, altrimenti non fa nulla
        let voidSquare = document.getElementsByClassName("void")[0];

        let distance = toInvert.style.order - voidSquare.style.order
        if ((distance == 1 && voidSquare.style.order % 4) || distance == -1 && toInvert.style.order % 4 || distance == 4 || distance == -4) {
            let a = toInvert.style.order;
            toInvert.style.order = voidSquare.style.order;
            voidSquare.style.order = a;
        }


    },


    checkWin: function () { //verifica la vittoria: se l'ordine dei riquadri corrisponde all'ordine delle foto sposta in alto l'immagine completa
        let squares = document.getElementsByClassName("square")

        let win = true
        for (let place = 0; place < squares.length; place++) {
            if (place + 1 != squares[place].style.order) {
                win = false
            }
        }

        if (win) {

            document.querySelector("#santoli15.win").style.zIndex = 5;

        }
    }
}



// INIZIO FUNZIONI FRANCESCO


let francescoLeaving = document.getElementById("francescoContainer").addEventListener("mouseleave", function () {
    console.log("sei uscito!")

})

let francescoMousePos = document.getElementById("francescoContainer").addEventListener("mousemove", function (event) {

    francescoMousePosition.top = event.clientY - document.getElementById("francescoContainer").offsetTop
    francescoMousePosition.left = event.clientX - document.getElementById("francescoContainer").offsetLeft

})


let francescoCaught = document.getElementById("francescoEvil").addEventListener("mouseover", function () {
    console.log("Preso!")

})

let francescoEvilPosition = { 
    top: 10,
    left: 10
}

let francescoMousePosition = {
    top: 250,
    left: 250
}



function francescoMuovi(top = francescoMousePosition.top, left = francescoMousePosition.left) {



    top = Math.max(Math.min(top - francescoEvilPosition.top - 20, 20), -20)


    left = Math.max(Math.min(left - francescoEvilPosition.left - 20, 20), -20)

    francescoEvilPosition.top += top + 460;
    francescoEvilPosition.top %= 460;
    document.getElementById("francescoEvil").style.top = francescoEvilPosition.top + "px";
    francescoEvilPosition.left += left + 460;
    francescoEvilPosition.left %= 460;
    document.getElementById("francescoEvil").style.left = francescoEvilPosition.left + "px";
}


// FINE FUNZIONI FRANCESCO


//funzioni Luca Moro
lucalista = [
    { nome: 'Tizio', cognome: 'Caio', eta: 20 },
    { nome: 'Antonio', cognome: 'Cavallo', eta: 10 },
    { nome: 'Cristiano', cognome: 'Ronaldo', eta: 35 },
    { nome: 'Luca', cognome: 'Moro', eta: 25 }
]

//assegno alla variabile lucarecord il pulsante prensente in index
var lucarecord = document.getElementById('lucaaggiungi');

//assegno alla variabile lucailmioinput l'elemento input presente nel index
var lucailmioinput = document.getElementById('lucailmioinput')

//richiamo la funzione per creare la lista
lucacreateTableFromList('lucacontenitore1', lucalista)

//funzione per creare la tabella
function lucacreateTableFromList(contenitoreid, lista) {

    var contenitore = document.getElementById(contenitoreid)

    var nuovatabella = document.createElement('table')
    nuovatabella.setAttribute('id','lucatabella')
    contenitore.append(nuovatabella)


    var thead = document.createElement('thead')
    thead.setAttribute('id','lucathead')
    nuovatabella.append(thead)



    for (var key in lista[0]) {
        var th = document.createElement('th')
        th.setAttribute('id','lucath')
        th.innerHTML = key
        thead.append(th)
    }


    var tbody = document.createElement('tbody')
    tbody.setAttribute('id','lucatbody')
    nuovatabella.append(tbody)

    for (var key of lista) {
        var tr = document.createElement('tr')
        tr.setAttribute('id','lucatr')
        tbody.append(tr)


        for (var persone in key) {
            var td = document.createElement('td')
            td.setAttribute('id','lucatd')
            td.innerHTML = key[persone]
            tr.append(td)
        }
    }
}

//creo l'evento click
lucarecord.addEventListener('click', function lucaaggiungi() {
    //creo un oggetto con i valori inseriti nel form
    var oggetto = {
        'nome': document.getElementById('lucanome').value,
        'cognome': document.getElementById('lucacognome').value,
        'age': document.getElementById('lucaetà').value,
    }
    //aggiungo gli elementi inseriti nel form, nella lista iniziale
    lucalista.push(oggetto);
    document.getElementById('lucacontenitore1').innerHTML = ""
    lucacreateTableFromList('lucacontenitore1', lucalista)

})

//funzione per filtrare la lista
function lucafiltra_lista(lista, filtro) {
    var risultato = []
    for (var i = 0; i < lista.length; i++) {
        var oggetto = lista[i]

        for (var key in oggetto) {
            if (oggetto[key].toString().indexOf(filtro) !== -1) {
                risultato[risultato.length] = oggetto
                break
            }
        }
    }
    return risultato
}

//creo l'evento input per il filtro lista
lucailmioinput.addEventListener('input', function () {

    document.getElementById('lucacontenitore2').innerHTML = ""

    var lista_filtrata = lucafiltra_lista(lucalista, lucailmioinput.value)
    if (lucailmioinput.value == "") {
        document.getElementById('lucacontenitore2').innerHTML = ""
    } else {
        lucacreateTableFromList('lucacontenitore2', lista_filtrata)
    }
})
//fine funzioni Luca Moro