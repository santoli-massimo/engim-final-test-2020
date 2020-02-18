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
        }
    }
}

