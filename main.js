var menuLinks = document.getElementsByClassName('nav-item')
var pages = document.getElementsByClassName('page')

for(var I =0; I<menuLinks.length; I++){
    var link = menuLinks[I]
    link.addEventListener('click', function(event){
        var id = this.dataset.page
        nascondiPagine(pages)
        var toShow = document.getElementById(id)
        console.log(toShow)
        toShow.style.display = 'block'
    })
}

santoli15.init(); // inizializza il giochino/dedica in home

francescoInit();

var tasti_ste = document.getElementsByClassName('numeri_ste');
var uguale_ste = document.getElementById('uguale_ste');
var c_ste = document.getElementById('c_ste');
var i_ste = tasti_ste.length;

while(i_ste--){
    tasto_ste = tasti_ste[i_ste];
    tasto_ste.onclick=function(){
    inserisci_ste(this.value);
  
}

  
}
uguale_ste.onclick=calcola_ste;
c_ste.onclick=cancella_ste;

var colore_ste;
var colore_label_ste;
var colorebase_ste='#ff3399';
window.addEventListener('load', selezionecolore_ste, false);

