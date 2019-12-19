
var getFrom;
var inputValue;
var imageHolders = [];


//to create the puzzle
function Create(){
    var square;
    var count;
    var countHidden;
    var stop;
    
    count = 0;
    inputValue = document.getElementById("rows").value;

    if( inputValue == "" ){
        alert("Cannot input empty values");
        return false;
    }else if ( isNaN(inputValue) ){
        alert("Input must be a number");
        return false;
    }else if(inputValue < 3){
        alert("Number should be greater than two");
        return false;
    }


    for(let i = 1 ; i <= inputValue ; i++){
        for(let j = 1 ; j <= inputValue ; j++){
            count++;

            square = document.createElement("DIV");
            square.id = "square" + count;
            square.setAttribute("ondrop", "drop(event)");
            square.setAttribute("ondragover", "allowDrop(event)");
            square.setAttribute("draggable", "true");
            square.setAttribute("ondragstart", "drag(event)");
            imageHolders.push( square.id );

            parent = document.getElementById("container");
            parent.appendChild( square );

            if(count != inputValue * inputValue){
                document.getElementById("square" + count).style.backgroundImage = "url(img/puzzle1.jpg)";
                document.getElementById("square" + count).style.backgroundSize =  (100 * (inputValue)) + "px " + (100 * (inputValue)) + "px" ;
                document.getElementById("square" + count).style.backgroundPosition =  (-100 * (j - 1)) + "px " + (-100 * (i - 1)) + "px" ;
            }
        }
            stop = document.createElement("BR");
            parent = document.getElementById("container");
            parent.appendChild( stop );
    }


    countHidden = 0;

    for(let i = 1 ; i <= inputValue ; i++){
        for(let j = 1 ; j <= inputValue ; j++){

            countHidden++;

            square = document.createElement("DIV");
            square.id = "sq" + countHidden;

            parentHidden = document.getElementById("container-hide");
            parentHidden.appendChild( square );

            if(countHidden != inputValue * inputValue){
                document.getElementById("sq" + countHidden).style.backgroundImage = "url(img/puzzle1.jpg)";
                document.getElementById("sq" + countHidden).style.backgroundSize =  (100 * (inputValue)) + "px " + (100 * (inputValue)) + "px" ;
                document.getElementById("sq" + countHidden).style.backgroundPosition =  (-100 * (j - 1)) + "px " + (-100 * (i - 1)) + "px" ;
            }
    
        }
            var stop = document.createElement("BR");
            parentHidden = document.getElementById("container-hide");
            parentHidden.appendChild(stop);
    }


    document.getElementById("btn-create").style.display = "none";
    document.getElementById("rows").style.display = "none";

    document.getElementById("btn-shuffle").style.display = "inline-block";
    document.getElementById("btn-hide").style.display = "inline-block";

    shuffle();
}


//shuffling the puzzle squares
function shuffle( ){
    let obj1;
    let obj2;
    let shuffledArray = [];

    shuffledArray = imageHolders.slice(0);

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ shuffledArray[i], shuffledArray[j] ] = [ shuffledArray[j], shuffledArray[i] ];
    }

    for(let j = 0 ; j < inputValue * inputValue ; j++){
        obj1 = document.getElementById( shuffledArray[j] );
        obj2 = document.getElementById( imageHolders[j] );
        swapElements(obj1, obj2);
    }

}


function allowDrop(ev) {
    let list;
    let a;
    let flag = false;
    let currentPos = [];
    let allowedSquares = [];    
    
    list = document.getElementsByTagName("DIV");
    
    for(let n = 1 ; n <= inputValue * inputValue ; n++){
        currentPos.push( list[n].id );
    }

    a = currentPos.indexOf( getFrom.id );
    inputValue = Number( inputValue );

    let sqr1 = currentPos[ a + 1 ];
    let sqr2 = currentPos[ a - 1 ];
    let sqr3 = currentPos[ a + inputValue ];
    let sqr4 = currentPos[ a - inputValue ];

    allowedSquares.push( sqr1 );
    allowedSquares.push( sqr2 );
    allowedSquares.push( sqr3 );
    allowedSquares.push( sqr4 );

    if( allowedSquares.includes(ev.target.id)){
        flag = true;
    }

    if( document.getElementById( ev.target.id ).style.backgroundImage == "" && flag){
        ev.preventDefault();
    }

}


function drag(ev) {
    getFrom = document.getElementById( ev.target.id );
    ev.dataTransfer.setData("text", ev.target.id);
}


function drop(ev) {
    var list;
    var data;
    var fromEl;
    var toEl;

    list = document.getElementById( ev.target.id );
    toEl = list;
    moveTo = list.id;
    ev.preventDefault();

    data = ev.dataTransfer.getData("text");
    fromEl = document.getElementById(data);

    swapElements(fromEl, toEl);
    isSolved();
}


//swaping the given two elements
function swapElements(obj1, obj2) {
    var temp;

    temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    obj2.parentNode.insertBefore(obj1, obj2);
    temp.parentNode.insertBefore(obj2, temp);
    temp.parentNode.removeChild(temp);
}


//checking whether puzzle is solved or not
function isSolved(){
    let count = 0;
    let list;

    list = document.getElementsByTagName("DIV");

    for( let m = 1 ; m <= inputValue * inputValue ; m++ ){    
        if( list[m].id == imageHolders[m-1] ){
            count++;
        }
    }

    if( count == inputValue * inputValue ){
        document.getElementById("win").innerHTML = "You Win!!";
        document.getElementById("btn-shuffle").style.display = "none";
        document.getElementById("btn-hide").style.display = "none";
    }

}


//display the correct puzzle
function correct(){
    document.getElementById("container-hide").style.display = "inline-block";
}


//hide the correct puzzle
function hide(){
    document.getElementById("container-hide").style.display = "none";
}