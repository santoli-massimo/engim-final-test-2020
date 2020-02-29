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


    document.getElementById("francescoContainer").addEventListener("mousemove", function (event) { //monitora posizione del mouse rispetto al container

        francescoMousePosition.top = event.clientY - document.getElementById("francescoContainer").getBoundingClientRect().top
        francescoMousePosition.left = event.clientX - document.getElementById("francescoContainer").getBoundingClientRect().left

    })


    document.querySelector("#francescoContainer").addEventListener("mouseenter", function () { //avvia nuova partita all'ingresso
        francescoNewGame();
    })



}

function francescoNewGame() {

    let gameLevelsPaces = [30, 50, 70, 110, 150, 200] //tempo del gioco, in millisecondi per passo
    let level = gameLevelsPaces.length;
    let levelTime = 3000; //durata di un livello, in millisecondi
    let levelTimeLeft = levelTime;
    let stride = 20; //distanza percorsa per passo
    let francescoJustCaught = false;
    let tryLeft = 5; // numero di "vite" a inizio sfida
    let francescoInterval; // referenza all'animazione

    document.getElementById("francescoTryLeftBox").innerText = `Vite rimaste: ${tryLeft}`


    function mouseEvilDistance() {
        return Math.sqrt((francescoMousePosition.top - francescoEvilPosition.top) * (francescoMousePosition.top - francescoEvilPosition.top) + (francescoMousePosition.left - francescoEvilPosition.left) * (francescoMousePosition.left - francescoEvilPosition.left))
    }


    function francescoNextLevel() {
        level--;
        clearInterval(francescoInterval)

        if (level < 0) {
            document.getElementById("francescoTryLeftBox").innerText = `ok, hai spaccato, lo ammetto`;
            francescoCentraEvil();
        } else {
            levelTimeLeft = levelTime;
            francescoInterval = setInterval(francescoMuovi, gameLevelsPaces[level]) // Avvio animazione
            document.getElementById("francescoEvil").style.transition = gameLevelsPaces[level] + "ms linear";
            document.getElementById("francescoLevelUp").style.transition = gameLevelsPaces[level] + "ms linear";


        }

    }


    function francescoMuovi() { // intelligenza del movimento

        if (!francescoJustCaught) {
            if (mouseEvilDistance() < francescoEvilPosition.radius) {
                francescoCaugth();
            } else {
                let angle = Math.atan((francescoMousePosition.top - francescoEvilPosition.top) / (francescoMousePosition.left - francescoEvilPosition.left));
                if (francescoMousePosition.left < francescoEvilPosition.left) {
                    angle += Math.PI;
                }
                francescoEvilPosition.top += Math.sin(angle) * stride;
                francescoEvilPosition.left += Math.cos(angle) * stride;
                // francescoEvilPosition.top += Math.max(Math.min(francescoMousePosition.top - francescoEvilPosition.top, stride), -stride)
                // francescoEvilPosition.left += Math.max(Math.min(francescoMousePosition.left - francescoEvilPosition.left, stride), -stride)
                francescoEvilPosition.update();
                levelTimeLeft -= gameLevelsPaces[level];
                document.getElementById("francescoLevelUp").style.width = (levelTimeLeft * 100 / levelTime) + "%";
                if (levelTimeLeft <= 0) {
                    francescoNextLevel()

                }
            }
        }
    }


    function francescoCentraEvil() { //reset al centro

        francescoEvilPosition.top = 250;
        francescoEvilPosition.left = 250;
        francescoEvilPosition.update();

    }




    function francescoQuit() {
        clearInterval(francescoInterval); //stop animazione
        francescoCentraEvil();
        document.getElementById("francescoContainer").removeEventListener("mouseleave", francescoQuit);
        document.getElementById("francescoLevelUp").style.width = "100%";

        document.getElementById("francescoTryLeftBox").innerText = "Entra nel quadrato per cominciare la sfida";
    }

    document.getElementById("francescoContainer").addEventListener("mouseleave", francescoQuit);

    function francescoCaugth() {
        francescoCentraEvil();
        francescoJustCaught = true;
        tryLeft--;
        document.getElementById("francescoTryLeftBox").innerText = `Vite rimaste: ${tryLeft}`

        if (tryLeft > 0) {
            setTimeout(function () { francescoJustCaught = false; }, gameLevelsPaces[gameLevelsPaces.length - 1] * 4);
        }
    }



    document.getElementById("francescoContainer").addEventListener("mouseleave", francescoQuit); //controlla la fuga
    francescoNextLevel(); //fa partire il primo livello
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

//funziona crea lista
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

//funzione caratteri minuscoli (risolse il case sensitive)
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

//inio esercizio request API pubblica
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
    document.getElementById('emailAlert').setAttribute("hidden", true);
    document.getElementById('alertPass').setAttribute("hidden", true);

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
    var mail_sef = document.getElementById('email_Sef').value;
    var sef_password = document.getElementById('pass_sef').value;
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
    }
    if (qta >= 2) {
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
    if (mail_sef == "") {
        succesSef = false;
        document.getElementById('emailAlert').removeAttribute("hidden");
    } else {
        document.getElementById('emailAlert').setAttribute("hidden", true);
    }
    if (sef_password == "") {
        succesSef = false;
        document.getElementById('alertPass').removeAttribute("hidden");
    } else {
        document.getElementById('alertPass').setAttribute("hidden", true);
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


    //Variabili select
    var selezione = document.getElementById("select")




    //Evento per mostrare e nascondere password tramikte un checkbox
    showHidePass.addEventListener('click', function (event) {

        if (showHidePass.checked) {
            pass.type = 'text'
            confPass.type = 'text'
            console.log(pass.type, confPass.type)
        } else {
            pass.type = 'password'
            confPass.type = 'password'
            console.log(pass.type, confPass.type)
        }
    })






    //Evento per controllo form e validazione
    bott.addEventListener('click', function (event) {



        //Controllo username        
        if (user.value == "mondo") {
            console.log("Controllo username eseguito")
        } else {
            console.log("Controllo non riuscito")
        }
        //Fine controllo username


        //Controllo email
        if (email.value == "momo@momo.it") {

            console.log("Controllo email completato")
        } else {
            console.log("Controllo email fallito")
        }
        //Fine controllo email


        //Controllo password
        if (pass.value.length >= 8 && pass.value == confPass.value) {
            console.log("password uguali")
        } else {
            console.log("Passwword diversi, riprovare")
        }
        //Fine controllo password



        //Controllo radio
        if (radio.checked || radio2.checked) {
            console.log("il radio funziona")
        } else {
            console.log("Non selezionato")
        }
        //Fine controllo radio



        //Controllo checkbox
        if (casella.checked || casella2.checked || casella3.checked) {
            console.log("checkbox funziona kinda")
        } else {
            console.log("Selezionare almeno un elemento")
        }
        //Fine controllo checkox



        //Controllo select 
        if (selezione.value) {
            console.log("Selezione completata")
        } else {
            console.log("Selezione non fatta")
        }




        //Controllo generale forse finale
        if (pass.value.length >= 8 && pass.value == confPass.value && selezione.value &&
            (radio.checked || radio2.checked) && (casella.checked || casella2.checked || casella3.checked) &&
            user.value == "mondo" && email.value == "momo@momo.it") {
            alert("Form completato con successo")
        } else {

            alert("Errore nel form, riprovare")
        }
        //Fine di esso



    })

} // Fine function
document.getElementById("showHidePass").addEventListener('click', ValidazioneMailMoo)
document.getElementById("bottone").addEventListener('click', ValidazioneMailMoo)
//Fine funzioni momo

//funzione di ale the best
//array img
var alessandro_imgs = ["immagini/img_ale/alessandro_1.jpg", "immagini/img_ale/alessandro_2.jpg", "immagini/img_ale/alessandro_4.jpg",
    "immagini/img_ale/alessandro_5.jpg", "immagini/img_ale/alessandro_6.jpg",
    "immagini/img_ale/alessandro_7.jpg", "immagini/img_ale/alessandro_8.jpg", "immagini/img_ale/alessandro_9.jpg",
    "immagini/img_ale/alessandro_10.png", "immagini/img_ale/alessandro_11.jpg", "immagini/img_ale/alessandro_13.jpg"
]
//function principale
function alessandro_games() {
    // creo tutti gli elementi
    var root = document.getElementById("alessandro_root")
    var h1 = document.createElement("h1")
    var h2diff = document.createElement("h2")
    var h2 = document.createElement("h2")
    var img = document.createElement("img")
    var start = document.createElement("div")
    var facile = document.createElement("div")
    var media = document.createElement("div")
    var difficile = document.createElement("div")
    var tdpos = document.createElement("div")
    var tdneg = document.createElement("div")
    var restart = document.createElement("div")
    //imposto tutti gli elementi
    h1.id = "alessandro_h1"
    h1.innerHTML = "ATTACCO EPILETTICO"
    h2diff.id = "alessandro_h2diff"
    h2diff.innerHTML = "SCEGLI LA DIFFICOLTA' 👇🏻"
    h2.id = "alessandro_h2"
    h2.innerHTML = "PROVA A PRENDERE QUESTO PERSONAGGIO 👇🏻 5 VOLTE, MAX 15 ERRORI"
    img.id = "alessandro_img"
    start.id = "alessandro_start"
    start.innerHTML = "START"
    facile.id = "alessandro_facile"
    facile.innerHTML = "FACILE"
    media.id = "alessandro_media"
    media.innerHTML = "MEDIA"
    difficile.id = "alessandro_difficile"
    difficile.innerHTML = "DIFFICILE"
    tdpos.id = "alessandro_positivo"
    tdneg.id = "alessandro_negativo"
    restart.id = "alessandro_restart"
    restart.innerHTML = "RESTART"
    //appendo tutti gli elementi nel div
    root.prepend(h1)
    root.append(h2diff)
    root.append(h2)
    root.append(img)
    root.append(start)
    root.append(facile)
    root.append(media)
    root.append(difficile)
    root.append(tdpos)
    root.append(tdneg)
    root.append(restart)
    //livello facile
    facile.addEventListener("click", function () {
        facile.style.display = "none"
        media.style.display = "none"
        difficile.style.display = "none"
        h2diff.style.display = "none"
        diff = 500
        start.style.display = "flex"
    })
    //livello medio
    media.addEventListener("click", function () {
        facile.style.display = "none"
        media.style.display = "none"
        difficile.style.display = "none"
        h2diff.style.display = "none"
        diff = 350
        start.style.display = "flex"
    })
    //livello difficile
    difficile.addEventListener("click", function () {
        facile.style.display = "none"
        media.style.display = "none"
        difficile.style.display = "none"
        h2diff.style.display = "none"
        diff = 200
        start.style.display = "flex"
    })
    // evento dal click del bottone
    start.addEventListener("click", function () {
        start.style.display = "none"
        // preso img da id
        var img = document.getElementById('alessandro_img')
        // presa immagine random da array
        var imgrandom = alessandro_imgs[Math.floor(alessandro_imgs.length * Math.random())]
        // preso h2 con display none per poterlo far vedere una volte che si è premuto il pulsante
        var h2 = document.getElementById("alessandro_h2")
        // indicazioni su quale img bisogna targettare
        h2.style.display = "block"
        // nuovo tag img per far capire all' utente cosa deve cercare
        var imgofsearch = document.createElement("img")
        //l'appendo all' h2
        h2.append(imgofsearch)
        // setto tutti i parametri dell' img
        imgofsearch.id = "alessandro_img2"
        imgofsearch.style.position = "relative"
        imgofsearch.style.left = "505px"
        imgofsearch.style.bottom = "-140px"
        imgofsearch.style.border = "solid 2px white"
        imgofsearch.style.display = "block"
        imgofsearch.src = imgrandom
        //tempo necessario per vedere l 'img da trovare
        var timeout = setTimeout(function () {
            var img2 = document.getElementById("alessandro_img2")
            img2.style.display = "none"
            img.style.position = "relative"
            img.style.left = "505px"
            img.style.bottom = "-172px"
            img.style.border = "solid 2px white"
            h2.style.display = "none"
            img.style.display = "block"
            clearTimeout(timeout)
        }, 3000)
        //variabili settate a 0 per div giusto e sbagliato
        I = 0
        J = 0
        //click sull ' img
        img.addEventListener("click", function () {
            //se è uguale a quello random
            if (this.src == imgofsearch.src) {
                tdpos.style.display = "flex"
                I++
                tdpos.innerHTML = "GIUSTE: " + I
                //come da traccia si potrebbe inserire questo per riportare al click dell' img corretta all' inizio, ma se l' img fosse la
                //prima sarebbe troppo facile quindi ho preferito non metterlo
                //n=0
                //5 click sull' img giusta per vincere
                if (I == 5) {
                    var win = document.createElement("h1")
                    img.style.display = "none"
                    win.style.color = "WHITE"
                    win.innerHTML = "HAI VINTO CAMPIONE"
                    h1.append(win)
                    //ho inserito una canzone per rendere più eroica la vittoria
                    songwin = document.getElementById("alessandro_songwin")
                    // start della canzone
                    songwin.play()
                    restart.style.display = "flex"
                    tdpos.style.display = "none"
                    tdneg.style.display = "none"
                    //al click del restart si avvia un interval lungo il necessario per il video
                    clearInterval(interval)
                    restart.addEventListener("click", function () {
                        restartvid = document.getElementById("alessandro_restartvid")
                        restart.style.display = "none"
                        songwin.pause()
                        restartvid.style.display = "block"
                        win.style.display = "none"
                        restartvid.play()
                        //funzione che rimuevo tutto
                        setTimeout(function () {
                            restartvid.style.display = "none"
                            h1.remove()
                            h2diff.remove()
                            h2.remove()
                            img.remove()
                            start.remove()
                            facile.remove()
                            media.remove()
                            difficile.remove()
                            tdpos.remove()
                            tdneg.remove()
                            restart.remove()
                            alessandro_games()
                        }, 6800)
                    })
                }
            } else {
                //div sbagliate
                tdneg.style.display = "flex"
                J++
                tdneg.innerHTML = "SBAGLIATE: " + J
                if (J == 15) {
                    //stessa cosa di prima con click dell' img sbagliata
                    var lose = document.createElement("h1")
                    img.style.display = "none"
                    lose.style.color = "WHITE"
                    lose.innerHTML = "HAI PERSO"
                    h1.append(lose)
                    songlose = document.getElementById("alessandro_songlose")
                    songlose.play()
                    restart.style.display = "flex"
                    tdpos.style.display = "none"
                    tdneg.style.display = "none"
                    clearInterval(interval)
                    restart.addEventListener("click", function () {
                        //click fa apparire video e mette in pausa lò song
                        restartvid = document.getElementById("alessandro_restartvid")
                        restart.style.display = "none"
                        songlose.pause()
                        restartvid.style.display = "block"
                        lose.style.display = "none"
                        restartvid.play()
                        //stessa funzione di sopra
                        setTimeout(function () {
                            restartvid.style.display = "none"
                            h1.remove()
                            h2diff.remove()
                            h2.remove()
                            img.remove()
                            start.remove()
                            facile.remove()
                            media.remove()
                            difficile.remove()
                            tdpos.remove()
                            tdneg.remove()
                            restart.remove()
                            alessandro_games()
                        }, 6800)
                    })

                }
            }
        })
        //intervallo per far cambiare le img
        var n = 0
        var interval = setInterval(function () {
            img.src = alessandro_imgs[n++]
            if (n == alessandro_imgs.length) {
                n = 0
            }
        }, diff);
    })
}
//richiamo della funzione
alessandro_games()


//funzione per inserire i numeri nella calcolatrice
function inserisci_ste(numero_ste){
    var operazione_ste = document.getElementById('operazioni_ste');
    operazione_ste.value += numero_ste;
   
    
    
}
//funzione per il calcolo delle operazioni
function calcola_ste(){
    var operazione_ste = document.getElementById('operazioni_ste');
    operazione_ste.value=eval(operazione_ste.value);
    
   
}
//funzione per cancellare
function cancella_ste(){
    var operazione_ste = document.getElementById('operazioni_ste');
    operazione_ste.value = "";
}
//funzione per cambiare il colore al testo
function selezionecolore_ste(){
    colore_ste = document.getElementById('colore_ste');
    colore_label_ste=document.getElementById('colore_label_ste');
    colore_ste.value=colorebase_ste;
    colore_label_ste.value=colorebase_ste;
    colore_ste.addEventListener('input', testo_ste, false);
    colore_label_ste.addEventListener('input', testo_ste, false);
    colore_ste.addEventListener('change', cambia_ste, false);
    colore_label_ste.addEventListener('change', cambia_ste, false);
    colore_ste.select();
    colore_label_ste.select();

}
function testo_ste(event){
    var h1_ste = document.getElementById('cambio_ste');
    var label_ste=document.getElementById('label_ste');
    
    if(h1_ste ){
        h1_ste.style.color=event.target.value;
        
        
    }
    if(label_ste){
        label_ste.style.color=event.target.value;
    }
    
    
    
}
function cambia_ste(event){
    document.getElementById('cambio_ste').foreach(function(cambio_ste){
        h1_ste.style.color=event.target.value;
        
    });
    document.getElementById('label_ste').foreach(function(label_ste){
        label_ste.style.color=event.target.value;
    })
    
}
//fine funzioni ste


//funzioni di Christian

        //richiamo funzione per la creazione della tabella
        chris_create_table(8)

            
        //creo tabella con input di tipo numero
        var chris_filtro = document.getElementById('c_input')
        chris_filtro.addEventListener('click',function(){
            chris_contenitore.innerHTML = ""
            var chris_int_testo = chris_filtro.value
            if(chris_int_testo <0){
                alert("Come faccio a creare la tabella con numeri minori di zero? ;)")
            }else{
                chris_create_table(chris_int_testo)
            }
        })

        //funzione per la creazione di una tabella nxn
        function chris_create_table(chris_int_testo){

            var chris_contenitore = document.getElementById('chris_contenitore')
            var chris_table = document.createElement('table')
            chris_table.id = 'chris_table_id'
            chris_contenitore.append(chris_table)
            
            for(var i = 0; i<chris_int_testo; i++){
                var chris_tr = document.createElement('tr')
                chris_table.append(chris_tr)
                for(var k = 0;k<chris_int_testo; k++){
                    var chris_td = document.createElement('td')
        
                    chris_tr.append(chris_td)
        
                    chris_td.style.border = '1px solid black'
                }
                chris_table.style.border = 'collapse'    
                chris_table.style.marginLeft = '30%'
                chris_table.style.marginTop = '2%'
                chris_table.style.marginBottom = '2%'
                chris_table.style.width = '30%'
                chris_table.style.height = '400px'
                c_click_td()
            }
            

        }

        //funzione per cliccare ogni singola cella della tabella e poterne modificare lo stile 
        function c_click_td() {
            var chris_contenitore = document.getElementById('chris_contenitore')
            var chris_table = chris_contenitore.getElementsByTagName('table')
            for(var p = 0; p <chris_table.length; p++){
                var chris_tds = chris_table[p].getElementsByTagName("td")
            }       
            for(var j = 0; j< chris_tds.length;j++){
                var chris_curr_td = chris_tds[j]
                var c_click = function(chris_curr_td){
                    return function(){
                        var chris_cell = chris_curr_td
                        var chris_color = document.getElementById('c_selected-color').value;
                        chris_cell.style.background = chris_color
                    }
                }
                chris_curr_td.onclick = c_click(chris_curr_td)

            }    
        }       

        //funzione che permette di resettare il colore delle celle a bianco
        function c_reset(){
            var chris_contenitore = document.getElementById('chris_contenitore')
            var chris_table = chris_contenitore.getElementsByTagName('table')
            var_button = document.getElementById('c_button_reset')
            for(var p = 0; p <chris_table.length; p++){
                var chris_tds = chris_table[p].getElementsByTagName("td")
            }  
            for(var r = 0; r< chris_tds.length;r++){
                chris_tds[r].style.background = 'white'
            }
        }

        //aggiungo evento c_reset al bottone reset
        c_button = document.getElementById('c_button_reset')
        c_button.addEventListener('click', c_reset)


//fine funzioni Christian