(function() {
    //Players GIFs
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');
    let img3 = document.createElement('img');
    let img4 = document.createElement('img');
    img1.src = "../assets/img/pawn/amongUsRun40x40.gif";
    img2.src = "../assets/img/pawn/spaceshipOpen40x40.gif";
    img3.src = "../assets/img/pawn/boomanAppear40x40.gif";
    img4.src = "../assets/img/pawn/dogRun40x40.gif";
    img1.style.position = "absolute";
    img2.style.position = "absolute";
    img3.style.position = "absolute";
    img4.style.position = "absolute";

    //Player Instance
    let player1 = new player(0, "Joueur 1", 190, 20, img1, "red");
    let player2 = new player(1, "Joueur 2", 181, 18, img2, "blue");
    let player3 = new player(2, "Joueur 3", 176, 19, img3, "green");
    let player4 = new player(3, "Joueur 4", 175, 20, img4, "orange");
    
    //Game Instance
    let gameInstance = new monopalim(player1, player2, player3, player4);

    //View Instance
    let gameView = new view(gameInstance);
})();