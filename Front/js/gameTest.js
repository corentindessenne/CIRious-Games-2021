(function() {
    let player1 = new player();
    let player2 = new player(); 
    let player3 = new player(); 
    let player4 = new player(); 
    let player5 = new player(); 
    let player6 = new player(); 
    let gameInstance = new monopalim(player1, player2, player3, player4, player5, player6);
    let gameView = new view(gameInstance); 
})();