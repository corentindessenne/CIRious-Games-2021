(function() {
    img1 = "../assets/img/pawn/amongUs40x40.gif";
    img2 = "../assets/img/pawn/spaceshipOpen40x40.gif";
    img3 = "../assets/img/pawn/booman40x40.gif";
    img4 = "../assets/img/pawn/dog40x40.gif";
    img5 = "../assets/img/pawn/popoRun40x40.gif";
    img6 = "../assets/img/pawn/slime40x40.gif";
    let player1 = new player(0, "Armand", 190, 20, img1, "red");
    let player2 = new player(1, "Marie", 181, 18, img2, "blue");
    let player3 = new player(2, "Corentin", 176, 19, img3, "green");
    let player4 = new player(3, "Adel", 175, 20, img4, "orange");
    let player5 = new player(4, "Noé", 186, 19, img5, "violet");
    let player6 = new player(5, "Antoine", 177, 20, img6, "black");
    let gameInstance = new monopalim(player1, player2, player3, player4, player5, player6);
    gameInstance.board.grid[10][9].belonging = 0;
    gameInstance.board.grid[10][7].belonging = 0;
    gameInstance.board.grid[10][5].belonging = 0;
    gameInstance.board.grid[10][4].belonging = 0;
    gameInstance.board.grid[10][2].belonging = 0;
    gameInstance.board.grid[10][1].belonging = 0;
    player1.myPropriety[gameInstance.board.grid[10][9].id] = gameInstance.board.grid[10][9];
    player1.myPropriety[gameInstance.board.grid[10][7].id] = gameInstance.board.grid[10][7];
    player1.myPropriety[gameInstance.board.grid[10][5].id] = gameInstance.board.grid[10][5];
    player1.myPropriety[gameInstance.board.grid[10][4].id] = gameInstance.board.grid[10][4];
    player1.myPropriety[gameInstance.board.grid[10][2].id] = gameInstance.board.grid[10][2];
    player1.myPropriety[gameInstance.board.grid[10][1].id] = gameInstance.board.grid[10][1];
    player1.position = [10, 6];
    //let gameView = new view(gameInstance);
    gameInstance.castTheDice();
    player1.healthyBar = 79;
    gameInstance.taxesMoney = 100;
    let view = new viewServer(player1, gameInstance, false, false, true);
})();