function ViewServer (player, game, showActions, showUpgrades, showQuestion) {
    this.player = player;
    this.game = game;
    this.actionsShow = showActions;
    this.upgradesShow = showUpgrades;
    this.questionShow = showQuestion;
    //Start
    this.displayView();
}

ViewServer.prototype.displayView = function(){
    //Top Left Box (Box Info)
    this.displayBoxInfo(this.player);

    //Bottom Left Box (Player's info)
    this.displayMoney(this.player);
    this.displayHb(this.player);
    this.displayFruitBucketPot(this.game.taxesMoney);

    //Centered Box
    this.updatePawns();

    //Top Right box (Game infos)
    this.displayTurnNb(this.game.turnNb);
    this.displayWhoseTurn(this.game.playerOrder[this.game.orderIndex].username);
    this.displayDice(this.game.dice1, this.game.dice2);
    this.displayActionButtons("actions", this.actionsShow);
    this.displayActionButtons("upgrades", this.upgradesShow);
    this.displayJailStatus(this.player);

    //Bottom Right Box (Propriety Tab)
    this.displayProprietyTab(this.player);
}

ViewServer.prototype.displayBoxInfo = function(player){
    //Before displaying, we clear every span & div
    let globalDiv = document.getElementById('topLeftBox');//Global div that contains all the stuff below
    let imgDiv = document.getElementById('boxInfo');//Img fo the box will be displayed in the background
    let boxType = document.getElementById('boxType');//Text describing the box player is on
    let cardInfos = document.getElementById('cardContent');//Specific for community & chance cards
    let answersDiv = document.getElementById('answerContent');//Every possible answers for question cards
    let validDiv = document.getElementById('validAnswer');//Will display a valid button
    let info = document.getElementById('proprietyContent');//Will display a tab with the propriety infos if it's a propriety

    //Variable for the box the player is
    let box = this.game.board.grid[player.position[0]][player.position[1]];
    let type = "";

    //We display for an Action box
    if (typeof box.money !== 'undefined') {
        let content = "";//Will be used in the cardContent span (cardInfos)
        //Find the right type
        switch (box.type) {
            case "community":
                content = this.game.board.ccTab[this.game.ccIndex].string;
                type = "Case Caisse de Communauté";
                imgDiv.style.backgroundImage = "url('../assets/img/cards/communaute.png')";
                break;
            case"question":
                type = "Case Question";
                if (this.questionShow){
                    //Question that we will ask
                    content = this.game.board.qTab[this.game.qIndex].question;

                    //Showing the right number of the button depending on possibilities
                    for (let i = 0; i < this.game.board.qTab[this.game.qIndex].answer.length; i++){
                        console.log(answersDiv.children[i]);
                        answersDiv.children[i].style.display = "block";
                        answersDiv.children[i].innerHTML = this.game.board.qTab[this.game.qIndex].answer[i];
                    }

                    //Showing the validation button
                    validDiv.style.display = "block";
                }
                //Set img
                imgDiv.style.backgroundImage = "url('../assets/img/cards/question.png')";
                break;
            case"chance":
                content = this.game.board.chTab[this.game.chIndex].string;
                type = "Case Chance";
                imgDiv.style.backgroundImage = "url('../assets/img/cards/chance.png')";
                break;
            case"start":
                type = "Case spéciale";
                content = "Passez par là pour obtenir 200 blés !";
                imgDiv.style.backgroundImage = "url('../assets/img/cards/start.png')";
                break;
            case"visitPrison":
                type = "Case spéciale";
                content = "Si vous n'êtes pas emprisonné, vous pouvez narguez ceux qui le sont !";
                imgDiv.style.backgroundImage = "url('../assets/img/cards/communaute.png')";
                break;
            case"getStockedBasket":
                type = "Case spéciale";
                content = "Vous gagnez le panier de fruit !";
                imgDiv.style.backgroundImage = "url('../assets/img/cards/fruitBucket.png')";
                break;
            default:
                type = "Case spéciale";
                content = "Allez en diète !"
                imgDiv.style.backgroundImage = "url('../assets/img/cards/jail.png')";
                break;
        }

        cardInfos.innerHTML = "La carte dit : " + content;
    }
    //We display for a Propriety box
    else {
        type = "Case Propriété";

        // creates a <table> element and a <tbody> element
        let tbl = document.createElement("table");
        let tblThead = document.createElement('thead');
        let tblBody = document.createElement("tbody");

        //Creating the thead
        let theadRow = document.createElement("tr");

        for (let i = 0; i < 4; i++){
            let cellText = document.createTextNode("Création en cours");
            let cell = document.createElement('th');
            cell.appendChild(cellText);
            theadRow.appendChild(cell);
        }
        //We plug it into the Thead
        tblThead.appendChild(theadRow);

        //Creating the Body
        // creates a table row
        let row = document.createElement("tr");

        for (let j = 0; j < 4; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            let cell = document.createElement("td");
            let cellText = document.createTextNode("Création en cours");
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);

        // put the <tbody> in the <table>
        tbl.appendChild(tblThead);
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        info.appendChild(tbl);


        //Displaying infos
        tbl.rows[0].cells[0].innerText = "Nom";
        tbl.rows[0].cells[1].innerText = "Prix";
        tbl.rows[0].cells[2].innerText = "Bien";
        tbl.rows[0].cells[3].innerText = "Loyer";
        tbl.rows[1].cells[0].innerText = box.name;
        tbl.rows[1].cells[1].innerText = box.price[box.upgradeRate];
        if (box.belonging !== "none"){
            tbl.rows[1].cells[2].innerText = this.game.playerTab[box.belonging].username;
        }
        else{
            tbl.rows[1].cells[2].innerText = "Non achetée"
        }
        tbl.rows[1].cells[3].innerText = box.income[box.upgradeRate];

        //Style
        tbl.setAttribute("border", "2");

        imgDiv.style.backgroundImage = "url('../assets/img/cards/property.png')";
    }

    boxType.innerHTML = "Vous êtes sur une " + type;
}
ViewServer.prototype.displayMoney = function(player){
    document.getElementById('playerMoney').innerText = player.money;
}
ViewServer.prototype.displayHb = function(player){
    document.getElementById('healthyBar').style.width = player.healthyBar + "%";
}
ViewServer.prototype.displayFruitBucketPot = function(value){
    document.getElementById('taxesMoney').innerText = value;
}

ViewServer.prototype.updatePawns = function(){
    //My centered board
    let board = document.getElementById('monopalimBoard');

    //Display pawns
    for (let i = 0; i < this.game.playerOrder.length; i++){
        //Create an img element for every player
        let img = document.createElement('img');
        img.src = this.game.playerOrder[i].character;

        //Special bug with colspan
        if(this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] === 1){
            board.rows[this.game.playerTab[i].position[0]].cells[2].appendChild(img);
        }
        else if(this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] < 10){
            board.rows[this.game.playerTab[i].position[0]].cells[1].appendChild(img);
        }
        else {
            board.rows[this.game.playerTab[i].position[0]].cells[this.game.playerTab[i].position[1]].appendChild(img);
        }
    }
}

ViewServer.prototype.displayTurnNb = function(turnNb){
    let gameTurnSpan = document.getElementById('gameTurn');

    //Grammar Stuff lul
    if(turnNb < 19){
        gameTurnSpan.innerText = 20 - turnNb + " tours !";
    }
    else{
        gameTurnSpan.innerText = 20 - turnNb + " tour !";
    }
}
ViewServer.prototype.displayWhoseTurn = function(username){
    document.getElementById('playerName').innerText = username;
}
ViewServer.prototype.displayDice = function(value1, value2){
    //Get them into variables
    let diceDiv = document.getElementById('diceDiv');

    //Create new ones
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');

    //Source
    img1.src = "../assets/img/dice/dice-six-faces-" + (value1) + ".png";
    img2.src = "../assets/img/dice/dice-six-faces-" + (value2) + ".png";

    //Insert it
    diceDiv.replaceChild(img1, diceDiv.children[0]);
    diceDiv.replaceChild(img2, diceDiv.children[1]);

    return true;
}
ViewServer.prototype.displayActionButtons = function(which, request){
    let buttonDiv = ""

    if (which === "actions"){
        buttonDiv = document.getElementById('actionButtons');
    }
    else if (which === "upgrades"){
        buttonDiv = document.getElementById('upgradeButtons')
    }
    else{
        console.log("Invalid buttons");
        return false;
    }

    if (request){
        buttonDiv.style.display = "block";
    }
    else{
        buttonDiv.style.display = "none";
    }

    return true;
}
ViewServer.prototype.displayJailStatus = function(player){
    if (!player.isJailed) return;
    document.getElementById('jailStatus').innerText = "Vous êtes en prison ! Essayez de faire un double pour vous libérer";
    return true;
}

ViewServer.prototype.displayProprietyTab = function(player){
    //Get the tab
    let tab = document.getElementById('propriety');
    let line = 1;
    for (let i = 0; i < player.myPropriety.length; i++){
        if (player.myPropriety[i] !== undefined || typeof player.myPropriety[i] !== "undefined" || player.myPropriety[i] !== null || typeof player.myPropriety[i] !== 'null' ){
            //"Propriété" cell
            tab.rows[line].cells[0].innerText = player.myPropriety[i].name;
            //"Stade" cell
            let upgradeWord = "";
            switch (player.myPropriety[i].upgradeRate) {
                case 0:
                    upgradeWord = "Plantation";
                    break;
                case 1:
                    upgradeWord = "Epicerie";
                    break;
                case 2:
                    upgradeWord = "Supermarché";
                    break;
                case 3:
                    upgradeWord = "Marché";
                    break;
                case 4:
                    upgradeWord = "Magasin Bio";
                    break;
                default:
                    console.log("Unavailable Upgrade Rate");
                    return false;
            }
            tab.rows[line].cells[1].innerText = upgradeWord;
            //"Apports" cell
            tab.rows[line].cells[2].innerText = player.myPropriety[i].income[player.myPropriety[i].upgradeRate];
            //Incrementing Line
            line++;
        }
    }
}
