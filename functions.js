function nascondiPagine(list){
    for(var K=0; K<list.length; K++){
        list[K].style.display = 'none';
    }
}


let santoli15 = {

    start15:  function () {
        for (let i = 0; i < 10000; i++) {
            santoli15.invert(document.getElementsByClassName("square")[Math.floor(Math.random() * 15)])
        }
    },



    invert: function (toInvert) {
        let voidSquare = document.getElementsByClassName("void")[0];

        let distance = toInvert.style.order - voidSquare.style.order
        if ((distance == 1 && voidSquare.style.order % 4) || distance == -1 && toInvert.style.order % 4 || distance == 4 || distance == -4) {
            let a = toInvert.style.order;
            toInvert.style.order = voidSquare.style.order;
            voidSquare.style.order = a;
        }


    },


    checkWin: function () {
        let squares = document.getElementsByClassName("square")

        let win = true
        for (let place = 0; place < squares.length; place++) {
          //  console.log(squares[place].style.order, place + 1)
            if (place + 1 != squares[place].style.order) {
                win = false
            }
        }

        if (win) {
            alert("hai vinto!")
            santoli15.start15();
        }
    }
}


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

