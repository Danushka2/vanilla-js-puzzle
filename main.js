
var getFrom;
var inputValue;
var count;
var imageHolders = [];
var images = [];
var imagesOrder = [];

function Create(){

    count = 0;
    inputValue = document.getElementById("rows").value;

    if(inputValue == ""){
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

            var SQUARE = document.createElement("DIV");
            SQUARE.id = "square"+(count);
            SQUARE.setAttribute("ondrop", "drop(event)");
            SQUARE.setAttribute("ondragover", "allowDrop(event)");
            imageHolders.push(SQUARE.id);

            if(count != inputValue * inputValue){
            
                var testingImg = document.createElement("IMG"); 
                testingImg.id = "img"+(count);
                images.push(testingImg.id);
                imagesOrder.push(testingImg.id);
                testingImg.setAttribute("src", "puzzleImages/puzzle1.jpg");
                testingImg.setAttribute("width", 90 * inputValue + "px");
                testingImg.setAttribute("height", 90 * inputValue + "px");
                testingImg.setAttribute("draggable", "true");
                testingImg.setAttribute("ondragstart", "drag(event)");
                SQUARE.appendChild(testingImg);
            }
            parent = document.getElementById("container");
            parent.appendChild(SQUARE);

            if(count != inputValue * inputValue){
                var idOfImg = "img"+ (count) ;
                document.getElementById("img"+ (count)).style.top =  -100 * (i-1) + "%";
                document.getElementById("img"+ (count)).style.left = -100 * (j-1) + "%";
            }
        }
            var stop = document.createElement("BR");
            parent = document.getElementById("container");
            parent.appendChild(stop);
    }



    countHidden = 1000;

    for(let i = 1 ; i <= inputValue ; i++){

        for(let j = 1 ; j <= inputValue ; j++){

            countHidden++;

            var squareHidden = document.createElement("DIV");
            squareHidden.id = "square"+(countHidden);

            var createdImg = document.createElement("IMG"); 
            createdImg.id = "img"+(countHidden);
            createdImg.setAttribute("src", "puzzleImages/puzzle1.jpg");
            createdImg.setAttribute("width", 90 * inputValue + "px");
            createdImg.setAttribute("height", 90 * inputValue + "px");
            squareHidden.appendChild(createdImg);
            
            parentHidden = document.getElementById("container-hide");
            parentHidden.appendChild(squareHidden);

            document.getElementById("img"+ (countHidden)).style.top =  -100 * (i-1) + "%";
            document.getElementById("img"+ (countHidden)).style.left = -100 * (j-1) + "%";
    
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



function shuffle( ){
    let parent;
    let imagesCopy;

    imagesCopy = images;

    for (let i = imagesCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesCopy[i], imagesCopy[j]] = [imagesCopy[j], imagesCopy[i]];
    }

    for(let j = 0 ; j < inputValue * inputValue -1 ; j++){
        parent = document.getElementById(imageHolders[j]);
        parent.appendChild(document.getElementById(imagesCopy[j]));
    }

}


function allowDrop(ev) {
    var flag = false;
    var myNode = document.getElementById( ev.target.id ).parentNode.id;
    var noOfNodes = document.getElementById( myNode ).childNodes.length;

    let allowedSquares = [];    

    let number = getFrom.match(/\d+/);
    console.log(number[0]);
    console.log(inputValue);

    number = Number(number[0]);
    inputValue = Number(inputValue);

    let sqr1 = "square" + ( number + 1 );
    let sqr2 = "square" + ( number - 1 );
    let sqr3 = "square" + ( number + inputValue );
    let sqr4 = "square" + ( number - inputValue );

    allowedSquares.push(sqr1);
    allowedSquares.push(sqr2);
    allowedSquares.push(sqr3);
    allowedSquares.push(sqr4);

    console.log(allowedSquares);
    if( allowedSquares.includes(ev.target.id)){
        flag = true;
    }

    if(noOfNodes > 3 && flag){
        ev.preventDefault();
        flag = false;
    }
}

function drag(ev) {
    getFrom = document.getElementById( ev.target.id ).parentNode.id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    var list;
    var data;

    list = document.getElementById( ev.target.id );
    moveTo = list.id;
    ev.preventDefault();

    data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    isSolved();
}

function isSolved(){
    let sq;
    let im;
    let count = 0;

    for(let x = 0 ; x < inputValue * inputValue -1 ; x++){
        
        sq = document.getElementById( imageHolders[x] );
        im = sq.getElementsByTagName("IMG");
        
        if( im[0].id == imagesOrder[x] ){
            count++;
        }else{
            break;
        }
    }

    if(count == (inputValue * inputValue) - 1 ){
        document.getElementById("win").innerHTML = "You Win!!";
        document.getElementById("btn-shuffle").style.display = "none";
        document.getElementById("btn-hide").style.display = "none";
    }

}

function correct(){
    document.getElementById("container-hide").style.display = "inline-block";
}

function hide(){
    document.getElementById("container-hide").style.display = "none";
}