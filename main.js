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

