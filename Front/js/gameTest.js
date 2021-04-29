(function() {
    let player1 = new player(0, "Armand", 190, 20);
    let player2 = new player(1, "Marie", 181, 18); 
    let player3 = new player(2, "Corentin", 175, 19); 
    let player4 = new player(3, "Adel", 180, 20); 
    let player5 = new player(4, "Noé", 183, 19); 
    let player6 = new player(5, "Antoine", 175, 20); 
    let gameInstance = new monopalim(player1, player2, player3, player4, player5, player6);
    let gameView = new view(gameInstance); 
})();