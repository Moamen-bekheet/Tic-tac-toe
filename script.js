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
    function getPlaces(){
        return places;
    }
    function resetPlaces(){
        places = ['','',''
        ,'','',''
        ,'','',''];
    }
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
function isHorizontalWinner(play, placeID){
    let horizontalCheck = 0;
    while(true){
        placeID = placeID + 3;
        if(placeID > 8){
            placeID = placeID%3;
        }
        if(GameBoard.places[placeID]===play){
            horizontalCheck++
            if(horizontalCheck==2){
                return true;
            }
        }
        else{
            return false
        }
    }
}
function isVerticalWinner(play, placeID){
    if(placeID%3 === 0){
        return ((GameBoard.places[placeID+1]===play)&&(GameBoard.places[placeID+2]===play))
    }
    else if(placeID%3 === 1){
        return ((GameBoard.places[placeID+1]===play)&&(GameBoard.places[placeID-1]===play))
    }
    else{
        return ((GameBoard.places[placeID-1]===play)&&(GameBoard.places[placeID-2]===play))
    }
}
function isDiagonalWinner(play, placeID){
    if(placeID===4){
        return (((GameBoard.places[placeID+2]===play )&&(GameBoard.places[placeID-2]===play)) || ((GameBoard.places[placeID-4]===play)&&(GameBoard.places[placeID+4]===play)));
    }
    else if(placeID===0){
        return ((GameBoard.places[placeID+4]===play)&&(GameBoard.places[placeID+8]===play));
    }
    else if(placeID===8){
        return ((GameBoard.places[placeID-4]===play)&&(GameBoard.places[placeID-8]===play));
    }
    else if(placeID===2){
        return ((GameBoard.places[placeID+2]===play)&&(GameBoard.places[placeID+4]===play));
    }
    else if(placeID===6){
        return ((GameBoard.places[placeID-2]===play)&&(GameBoard.places[placeID-4]===play));
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
    function checkWinnerMove(play, placeID){
        if(isHorizontalWinner(play,placeID)||isVerticalWinner(play,placeID)||isDiagonalWinner(play,placeID)){
            return `${play} wins`
        }
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
            play = GameReferee.chooseNextPlayer().getPlayerMark();
            GameBoard.places.splice(GameBoard[prop]().id, 1,play)
            GameBoard[prop]().textContent = play;
            console.log(GameReferee.checkWinnerMove(play, parseInt(GameBoard[prop]().id)));
        }
        else{
            return;
        }
    })
}