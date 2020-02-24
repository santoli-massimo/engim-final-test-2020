function nascondiPagine(list) {
    for (var K = 0; K < list.length; K++) {
        list[K].style.display = 'none';
    }
}


let santoli15 = { // tutto il codice che serve  per il giochino/dedica in home

    init: function () {
        for (let square of document.querySelectorAll("#santoli15 .square")) { // imposta l'evento al click sui riquadri non vuoti: invert e checkwin e avvia il gioco una prima volta

            if (!square.classList.contains("void")) {
                square.addEventListener("click", function () {
                    santoli15.invert(this);
                    santoli15.checkWin()
                });
            }
        }
        document.querySelector("#santoli15 .win").addEventListener("click", santoli15.start15); // imposta l'evento al click sull'immagine completa che fa ripartire il gioco
        santoli15.start15();
    },

    start15: function () { // avvio del gioco: sposta sotto la faccia completa ed esegue 10000 mosse casuali (la maggior parte saranno ignorate perché non lecite)
        document.querySelector("#santoli15 .win").style.zIndex = -5;
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

            document.querySelector("#santoli15 .win").style.zIndex = 5;

        }
    }
}



// INIZIO FUNZIONI FRANCESCO

function francescoInit() {


    document.getElementById("francescoContainer").addEventListener("mousemove", function (event) {  //monitora posizione del mouse rispetto al container

        francescoMousePosition.top = event.clientY - document.getElementById("francescoContainer").getBoundingClientRect().top
        francescoMousePosition.left = event.clientX - document.getElementById("francescoContainer").getBoundingClientRect().left

    })


    document.querySelector("#francescoContainer").addEventListener("mouseenter", function () { //avvia nuova partita all'ingresso
        francescoNewGame();
    })



}

function francescoNewGame() {

    let gamePace = 200; //tempo del gioco, in millisecondi per passo
    let stride = 20; //distanza percorsa per passo
    let francescoJustCaught = false;
    let tryLeft = 5;

    let tryLeftBox = document.createElement("p");
    document.getElementById("tryLeftBox").innerText = `Vite rimaste: ${tryLeft}`


    function mouseEvilDistance() {
        return Math.sqrt((francescoMousePosition.top - francescoEvilPosition.top) * (francescoMousePosition.top - francescoEvilPosition.top) + (francescoMousePosition.left - francescoEvilPosition.left) * (francescoMousePosition.left - francescoEvilPosition.left))
    }

    function francescoMuovi() { // intelligenza del movimento

        if (!francescoJustCaught) {

            if (mouseEvilDistance() < francescoEvilPosition.radius) {
                francescoCaugth();

            } else {
                francescoEvilPosition.top += Math.max(Math.min(francescoMousePosition.top - francescoEvilPosition.top, stride), -stride)
                francescoEvilPosition.left += Math.max(Math.min(francescoMousePosition.left - francescoEvilPosition.left, stride), -stride)
                francescoEvilPosition.update();
            }




        }



    }


    function francescoCentraEvil() { //reset al centro

        francescoEvilPosition.top = 250;
        francescoEvilPosition.left = 250;
        francescoEvilPosition.update();

    }



    let francescoInterval = setInterval(francescoMuovi, gamePace) // Avvio animazione

    function francescoQuit() {
        console.log("sei uscito!")

        clearInterval(francescoInterval); //stop animazione
        francescoCentraEvil();
        document.getElementById("francescoContainer").removeEventListener("mouseleave", francescoQuit);

        document.getElementById("tryLeftBox").innerText = "Entra nel quadrato per cominciare la sfida";
    }

    document.getElementById("francescoContainer").addEventListener("mouseleave", francescoQuit);

    function francescoCaugth() {
        francescoCentraEvil();
        francescoJustCaught = true;
        tryLeft--;
        document.getElementById("tryLeftBox").innerText = `Vite rimaste: ${tryLeft}`

        if (tryLeft > 0) {
            setTimeout(function () { francescoJustCaught = false; }, gamePace * 5);
        }
    }




}






let francescoMousePosition = {
    top: 250,
    left: 250
}



let francescoEvilPosition = {
    top: 250,
    left: 250,
    radius: 20,
    update: function () {

        francescoEvilPosition.top = Math.max(this.radius, Math.min(500 - this.radius, francescoEvilPosition.top))
        francescoEvilPosition.left = Math.max(this.radius, Math.min(500 - this.radius, francescoEvilPosition.left))

        document.getElementById("francescoEvil").style.top = (francescoEvilPosition.top - this.radius) + "px";
        document.getElementById("francescoEvil").style.left = (francescoEvilPosition.left - this.radius) + "px";

    }
}







// FINE FUNZIONI FRANCESCO





//INIZIO FUNZIONI LUCA MORO
lucalista = [
    {
        Nome: 'Tizio',
        Cognome: 'Caio',
        Eta: 20
    },
    {
        Nome: 'Antonio',
        Cognome: 'Cavallo',
        Eta: 10
    },
    {
        Nome: 'Cristiano',
        Cognome: 'Ronaldo',
        Eta: 35
    },
    {
        Nome: 'Luca',
        Cognome: 'Moro',
        Eta: 25
    }
]

//funzione crea lista
function lucacreateTableFromList(contenitoreid, lista) {

    var contenitore = document.getElementById(contenitoreid)

    var nuovatabella = document.createElement('table')
    nuovatabella.setAttribute('id', 'lucatabella')
    contenitore.append(nuovatabella)

    var thead = document.createElement('thead')
    thead.setAttribute('id', 'lucathead')
    nuovatabella.append(thead)

    for (var key in lista[0]) {
        var th = document.createElement('th')
        th.setAttribute('id', 'lucath')
        th.innerHTML = key
        thead.append(th)
    }

    var tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'lucatbody')
    nuovatabella.append(tbody)

    for (var key of lista) {
        var tr = document.createElement('tr')
        tr.setAttribute('id', 'lucatr')
        tbody.append(tr)

        for (var persone in key) {
            var td = document.createElement('td')
            td.setAttribute('id', 'lucatd')
            td.innerHTML = key[persone]
            tr.append(td)
        }
    }
}

//richiamo la funzione per creare la lista
lucacreateTableFromList('lucacontenitore1', lucalista)

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

//funzione caratteri minuscoli (risolve il case sensitive)
function lucaToLowerCase(item) {
    var Nome = item.Nome.toLowerCase();
    var Cognome = item.Cognome.toLowerCase()
    var Eta = item.Eta
    var oggetto = { Nome, Cognome, Eta };
    return oggetto;
}

lucalista2 = lucalista.map(lucaToLowerCase)

//assegno alla variabile lucailmioinput l'elemento input presente nel file index
var lucailmioinput = document.getElementById('lucailmioinput')

//creo l'evento input per il filtro lista
lucailmioinput.addEventListener('input', function () {

    document.getElementById('lucacontenitore2').innerHTML = ""

    //assegno ad 'x' il mio input trasformandolo in caratteri minuscoli
    var x = lucailmioinput.value.toLowerCase()

    var lista_filtrata = lucafiltra_lista(lucalista2, x)

    if (lucailmioinput.value == "") {
        document.getElementById('lucacontenitore2').innerHTML = ""
    } else {
        lucacreateTableFromList('lucacontenitore2', lista_filtrata)

    }
})

//assegno alla variabile lucarecord il pulsante prensente nel file index
var lucarecord = document.getElementById('lucaaggiungi');

//creo l'evento click
lucarecord.addEventListener('click', function lucaaggiungi() {

    //creo un oggetto con i valori inseriti nel form
    var oggetto = {
        'Nome': document.getElementById('lucanome').value,
        'Cognome': document.getElementById('lucacognome').value,
        'Eta': document.getElementById('lucaetà').value,
    }

    //aggiungo gli elementi inseriti nel form, nella lista iniziale
    lucalista.push(oggetto);
    lucalista2.push(oggetto)
    lucalista2 = lucalista.map(lucaToLowerCase)

    document.getElementById('lucacontenitore1').innerHTML = ""
    lucacreateTableFromList('lucacontenitore1', lucalista)
})

//inizio esercizio request API pubblica
function luca2createTableFromList(lista) {

    var contenitore = document.getElementById("lucacontenitore3")

    var nuovatabella = document.createElement('table')
    nuovatabella.setAttribute('id', 'lucatabella')
    contenitore.append(nuovatabella)

    var thead = document.createElement('thead')
    thead.setAttribute('id', 'lucathead')
    nuovatabella.append(thead)

    for (var key in lista[0]) {
        var th = document.createElement('th')
        th.setAttribute('id', 'lucath')
        th.innerHTML = key
        thead.append(th)
    }

    var tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'lucatbody')
    nuovatabella.append(tbody)

    for (var key of lista) {
        var tr = document.createElement('tr')
        tr.setAttribute('id', 'lucatr')
        tbody.append(tr)

        for (var persone in key) {
            var td = document.createElement('td')
            td.setAttribute('id', 'lucatd')
            td.innerHTML = key[persone]
            tr.append(td)
        }
    }
}

// Creo l'oggetto richiesta
var lucarequest = new XMLHttpRequest()

var lucaonresponse = function () {
    var response = lucarequest.response

    // Converto i dati da JSON a js
    var dati = JSON.parse(response)

    //controllo se la richiesta va a buon fine
    if (lucarequest.status === 200) {
        luca2createTableFromList(dati)
    }
    else {
        var contenitore = document.getElementById('lucacontenitore3')
        contenitore.innerText = 'Errore: ' + lucarequest.status
    }

    //assegno alla variabile lucarecord2 il pulsante prensente nel file index
    var lucarecord2 = document.getElementById('lucaaggiungi2');

    //creo l'evento click
    lucarecord2.addEventListener('click', function lucaaggiungi2() {

        //creo un oggetto con i valori inseriti nel form
        var oggetto = {
            'userID': document.getElementById('lucauser').value,
            'id': document.getElementById('lucaid').value,
            'title': document.getElementById('lucatitle').value,
            'body': document.getElementById('lucabody').value
        }

        //aggiungo gli elementi inseriti nel form
        dati.push(oggetto);

        document.getElementById('lucacontenitore3').innerHTML = ""
        luca2createTableFromList(dati)
    })
}

lucarequest.addEventListener('loadend', lucaonresponse)

lucarequest.open('GET', 'https://jsonplaceholder.typicode.com/posts')
// Eseguo la richiesta
lucarequest.send()

//fine funzioni Luca Moro











//funzioni Sefora
document.getElementById('submit_sef').addEventListener('click', validazioneSef);
//funzione reset Form
document.getElementById('reset_sef').addEventListener('click', function () {
    var form_sef = document.getElementById("form_sef");
    form_sef.reset();
    success_msg.setAttribute("hidden", true);
    document.getElementById('alertName').setAttribute("hidden", true);
    document.getElementById('alertLastName').setAttribute("hidden", true);
    document.getElementById('alertGender').setAttribute("hidden", true);
    document.getElementById('alertGender2').setAttribute("hidden", true);
    document.getElementById('alertSelect1').setAttribute("hidden", true);
    document.getElementById('alertRadio').setAttribute("hidden", true);
    document.getElementById('alertSelect2').setAttribute("hidden", true);

});
//funzione validazione Form
function validazioneSef() {
    var succesSef = true; // variabile booleana settata per il button di submit
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var female = document.getElementById('female').checked;
    var male = document.getElementById('male').checked;
    var freetobe = document.getElementById('freetobe').checked;
    var select = document.getElementById('select_sef').value;
    var parterre = document.getElementById('parterre').value;
    var tribuna = document.getElementById('tribuna').value;
    var vip = document.getElementById('vip').value;
    var select_pagamento = document.getElementById('select_pagamento').value;
    var send = document.getElementById('submit_sef').value;
    var success_msg = document.getElementById('success_msg');
    if (name == "") { //controllo su ogni campo del form
        succesSef = false;
        document.getElementById('alertName').removeAttribute("hidden");
    } else {
        document.getElementById('alertName').setAttribute("hidden", true);
    }
    if (lastName == "") {
        succesSef = false;
        document.getElementById('alertLastName').removeAttribute("hidden");
    } else {
        document.getElementById('alertLastName').setAttribute("hidden", true);
    }
    if (female == false && male == false && freetobe == false) {
        succesSef = false;
        document.getElementById('alertGender').removeAttribute("hidden");
    } else {
        document.getElementById('alertGender').setAttribute("hidden", true);
    }
    var qta = 0;
    var gender = [female, male, freetobe]
    for (i = 0; i < gender.length; i++) {
        if (gender[i] == true) {
            qta += 1;
        }
    } if (qta >= 2) {
        succesSef = false;
        document.getElementById('alertGender2').removeAttribute("hidden");
    } else {
        document.getElementById('alertGender2').setAttribute("hidden", true);
    }
    if (select == "Open this selection menu") {
        succesSef = false;
        document.getElementById('alertSelect1').removeAttribute("hidden");
    } else {
        document.getElementById('alertSelect1').setAttribute("hidden", true);
    }
    if (parterre == false && tribuna == false && vip == false) {
        succesSef = false;
        document.getElementById('alertRadio').removeAttribute("hidden");
    } else {
        document.getElementById('alertRadio').setAttribute("hidden", true);
    }
    if (select_pagamento == "") {
        succesSef = false;
        document.getElementById('alertSelect2').removeAttribute("hidden");
    } else {
        document.getElementById('alertSelect2').setAttribute("hidden", true);
    }
    if (succesSef == true) {
        success_msg.removeAttribute("hidden");
    } else {
        success_msg.setAttribute("hidden", true);
    }
    event.preventDefault();
}








//Funzioni momo 
function ValidazioneMailMoo() {

    var bott = document.getElementById("bottone")

    var user = document.getElementById("username")
    var pass = document.getElementById("pass")
    var confPass = document.getElementById("confPass")
    var showHidePass = document.getElementById("showHidePass") // variabile per mostra e nascondi password
    var email = document.getElementById("email")

    // var dataNascita = document.getElementById("data")
    //variabili per i Radio buttons
    var radio = document.getElementById("radio1")
    var radio2 = document.getElementById("radio2")

    //Variabili per il checkbox buttons
    var casella = document.getElementById("box1")
    var casella2 = document.getElementById("box2")
    var casella3 = document.getElementById("box3")

    //Evento per mostrare e nascondere password tramikte un checkbox
    showHidePass.addEventListener('click', function (event) {

        if (showHidePass.checked) {
            pass.type = 'text'
            confPass.type = 'text'

            console.log(pass.type)
        } else {
            pass.type = 'password'
            confPass.type = 'password'

            console.log(pass.type, confPass.type)
        }

    })




    //Evento per controllo form e validazione


    bott.addEventListener('click', function (event) {



        if (pass.value.length >= 8 && pass.value == confPass.value) {
            console.log("password uguali")
        } else {
            console.log("Passwword diversi, riprovare")
        }



        if (radio.checked || radio2.checked) {
            console.log("il radio funziona")
        } else {
            console.log("Non selezionato")
        }



        if (casella.checked || casella2.checked || casella3.checked) {
            console.log("checkbox funziona kinda")
        } else {
            console.log("Selezionare almeno un elemento")
        }


        if (user.value == "mondo" && email.value == "momo@momo.it") {

            console.log("lo script funziona")
        } else {
            console.log("script funzionaaa")
        }
    })


}// Fine function



document.getElementById("showHidePass").addEventListener('click', ValidazioneMailMoo)
document.getElementById("bottone").addEventListener('click', ValidazioneMailMoo)
   //Fine funzioni momo