const GameBoard = (function(doc){
    let places = ['','',''
    ,'','',''
    ,'','',''];
    placeZero = doc.getElementById('0')
    placeOne = doc.getElementById('1')
    placeTwo = doc.getElementById('2')
    placeThree = doc.getElementById('3')
    placeFour = doc.getElementById('4')
    placeFive = doc.getElementById('5')
    placeSix = doc.getElementById('6')
    placeSeven = doc.getElementById('7')
    placeEight= doc.getElementById('8')
    function getPlaceZero(){
        return placeZero;
    }
    function getPlaceOne(){
        return placeOne;
    }
    function getPlaceTwo(){
        return placeTwo;
    }
    function getPlaceThree(){
        return placeThree;
    }
    function getPlaceFour(){
        return placeFour;
    }
    function getPlaceFive(){
        return placeFive;
    }
    function getPlaceSix(){
        return placeSix;
    }
    function getPlaceSeven(){
        return placeSeven;
    }
    function getPlaceEight(){
        return placeEight;
    }
    return {places, getPlaceZero, getPlaceTwo, getPlaceOne, getPlaceThree, getPlaceFour, getPlaceFive, getPlaceSix, getPlaceSeven, getPlaceEight}
})(document)

function Player(mark){
    function getPlayerMark(){
        return mark;
    }
    return {getPlayerMark};
}

let playerX = Player('X');
let playerO = Player('O')
function horizontalCheck(board, play, placeID){
    let horizontalCounter = 0;
    while(horizontalCounter < 3){
        placeID = placeID + 3;
        if(placeID > 8){
            placeID = placeID % 3;
        }
        if(board.places[placeID]===play){
            horizontalCounter++
            if()
        }
    }
}
const GameReferee = (function(board, player1, player2){
    let plays = [];
    function chooseNextPlayer(){
        if((plays.length === 0)||(plays[plays.length-1]==='O')){
            plays.push('X')
            return player1;
        }
        else{
            plays.push('O')
            return player2;
        }
    }
    function checkWinnerMove(board, play, placeID){
        
    }
    return {chooseNextPlayer, checkWinnerMove}
})(GameBoard,playerX,playerO);

for(let prop in GameBoard){
    if (!(GameBoard[prop] instanceof Function)){
        continue;
    }
    GameBoard[prop]().addEventListener('click', ()=>{
        // return //This event listener needs modification, after making players and referee objects
        if (!(GameBoard[prop]().textContent)){
            GameBoard.places.splice(GameBoard[prop]().id, 1,'X')
            play = GameReferee.chooseNextPlayer().getPlayerMark();
            GameBoard[prop]().textContent = play;
            console.log(GameBoard.places)
        }
        else{
            return;
        }
    })
}