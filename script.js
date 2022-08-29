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
    return {getPlaces,resetPlaces, getPlaceZero, getPlaceTwo, getPlaceOne, getPlaceThree, getPlaceFour, getPlaceFive, getPlaceSix, getPlaceSeven, getPlaceEight}
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
        if(GameBoard.getPlaces()[placeID]===play){
            horizontalCheck++
            if(horizontalCheck==2){
                return true;
            }
        }
        else{
            return false;
        }
    }
}
function isVerticalWinner(play, placeID){
    if(placeID%3 === 0){
        return ((GameBoard.getPlaces()[placeID+1]===play)&&(GameBoard.getPlaces()[placeID+2]===play))
    }
    else if(placeID%3 === 1){
        return ((GameBoard.getPlaces()[placeID+1]===play)&&(GameBoard.getPlaces()[placeID-1]===play))
    }
    else{
        return ((GameBoard.getPlaces()[placeID-1]===play)&&(GameBoard.getPlaces()[placeID-2]===play))
    }
}
function isDiagonalWinner(play, placeID){
    if(placeID===4){
        return (((GameBoard.getPlaces()[placeID+2]===play )&&(GameBoard.getPlaces()[placeID-2]===play)) || ((GameBoard.getPlaces()[placeID-4]===play)&&(GameBoard.getPlaces()[placeID+4]===play)));
    }
    else if(placeID===0){
        return ((GameBoard.getPlaces()[placeID+4]===play)&&(GameBoard.getPlaces()[placeID+8]===play));
    }
    else if(placeID===8){
        return ((GameBoard.getPlaces()[placeID-4]===play)&&(GameBoard.getPlaces()[placeID-8]===play));
    }
    else if(placeID===2){
        return ((GameBoard.getPlaces()[placeID+2]===play)&&(GameBoard.getPlaces()[placeID+4]===play));
    }
    else if(placeID===6){
        return ((GameBoard.getPlaces()[placeID-2]===play)&&(GameBoard.getPlaces()[placeID-4]===play));
    }
    else{
        return false;
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
            GameBoard.resetPlaces();
            for(let prop in GameBoard){
                if(prop==='getPlaces' || prop==='resetPlaces'){
                    continue;
                }
                GameBoard[prop]().textContent = '';
            }
            const overlay = document.querySelector('.overlay');
            overlay.textContent = `${play} wins`;
            overlay.style.display = 'flex';
            if(play==='X'){
                const playerOne = document.querySelector('#player1 span');
                playerOne.textContent = parseInt(playerOne.textContent) + 1;
            }
            else{
                const playerTwo = document.querySelector('#player2 span');
                playerTwo.textContent = parseInt(playerTwo.textContent) + 1;
            }
            setTimeout(()=>{
                overlay.style.display = 'none';
            },1000);
            plays = []

            return true;
        }
        else if ((!(isHorizontalWinner(play,placeID)||isVerticalWinner(play,placeID)||isDiagonalWinner(play,placeID))) && plays.length === 9 ){
            GameBoard.resetPlaces();
            console.log(isDiagonalWinner(play,placeID), isVerticalWinner(play,placeID), isHorizontalWinner(play,placeID));
            for(let prop in GameBoard){
                if(prop==='getPlaces' || prop==='resetPlaces'){
                    continue;
                }
                GameBoard[prop]().textContent = '';
            }
            const overlay = document.querySelector('.overlay');
            overlay.textContent = `Draw`;
            overlay.style.display = 'flex';
            setTimeout(()=>{
                overlay.style.display = 'none';
            },1000);
            plays = []
            return false;
        }
    }
    return {chooseNextPlayer, checkWinnerMove}
})(GameBoard,playerX,playerO);

for(let prop in GameBoard){
    if ((prop==='getPlaces' || prop==='resetPlaces')){
        continue;
    }
    GameBoard[prop]().addEventListener('click', ()=>{
        // return //This event listener needs modification, after making players and referee objects
        if (!(GameBoard[prop]().textContent)){
            play = GameReferee.chooseNextPlayer().getPlayerMark();
            GameBoard.getPlaces().splice(GameBoard[prop]().id, 1,play)
            GameBoard[prop]().textContent = play;
            GameReferee.checkWinnerMove(play, parseInt(GameBoard[prop]().id));
        }
        else{
            return;
        }
    })
}