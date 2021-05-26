class view {
    constructor(monopalimInstance) {
        this.game = monopalimInstance;
        this.initView();
        /*this.initPawns();
        this.displayPlayerTurn();
        this.initListener();
        this.displayActionButtons("actions", "disable");
        this.displayActionButtons("upgrades", "disable");*/
    }
    /*//New View
    //First view function we call to set the pawns on board
    initPawns(){
        //My centered board
        let board = document.getElementById('monopalimBoard');

        //For every player
        for (let i = 0; i < this.game.playerOrder.length; i++){
            this.game.playerOrder[i].character.style.position ="absolute";
            board.rows[10].cells[10].appendChild(this.game.playerOrder[i].character);//Put it on the start
        }
        return true;
    }

    displayPlayerTurn(){
        //My span
        let playerTurnSpan = document.getElementById('playerName');
        //Set Turn Player
        playerTurnSpan.innerText = this.game.playerOrder[this.game.orderIndex].username;
    }

    //Create every listener for playing
    initListener(){
        //Roll the dice Button
        let rollButton = document.getElementById('rollDice');
        rollButton.addEventListener('click', () => {
            this.rollEvent();
        });

        //Div that contains buttons
        let actionDiv = document.getElementById('actionButtons');
        //Access to the buttons & add an event Listener for each
        for (let i = 0; i < actionDiv.children.length; i++){
            actionDiv.children[i].addEventListener('click', () => {
                this.actionEvent(actionDiv.children[i].textContent);//.textContent let us access to the "value" of the button
            });
        }

        //Upgrade Buttons, SAME
        let upgradeDiv = document.getElementById('upgradeButtons');
        for (let i = 0; i < upgradeDiv.children.length; i++){
            upgradeDiv.children[i].addEventListener('click', () => {
                this.upgradeEvent(upgradeDiv.children[i].textContent);//.textContent let us access to the "value" of the button
            });
        }
    }

    //Events
    rollEvent(){
        //Cast in Console
        this.game.castTheDice();
        //Display it
        this.updateDice(this.game.dice1, this.game.dice2);

        alert("Vous avez fait " + (this.game.dice1 + this.game.dice2));

        this.moveEvent(this.game.dice1 + this.game.dice2);

        return true;
    }
    moveEvent(moveValue){
        //Move
        for (let i = 0; i < moveValue; i++){
            this.game.executeMove(this.game.playerOrder[this.game.orderIndex], 1);
            this.updatePawns();
        }

        //Interaction
        this.interactionEvent();
    }
    interactionEvent(){
        //Make interaction in console
        this.game.executeInteraction(this.game.playerOrder[this.game.orderIndex]);

        //Update View
        this.updateTopLeftBox(this.game.playerOrder[this.game.orderIndex], true);
        this.updateStats(this.game.playerOrder[this.game.orderIndex]);

        //Make Actions possible
        this.displayActionButtons("actions", "enable");
    }
    actionEvent(action){
        //Initialisation
        let doWhat = ""

        //Translating in Enligsh
        switch (action){
            case "Acheter":
                doWhat = "buy";
                break;
            case "Racheter":
                doWhat = "redeem";
                break;
            case"Améliorer":
                doWhat = "upgrade";
                //We show the buttons for upgrade choice
                this.displayActionButtons("upgrades", "enable");
                this.displayActionButtons("actions", "disable");
                return;
            case"Rien":
                doWhat = "nothing";
                break;
            default:
                console.log("Action undefined");
                return false;
        }

        //Play in console
        this.game.executeAction(doWhat);
        return true;
    }
    upgradeEvent(upgrade){
        //Initialisation
        let upgradeRequest = ""

        //Translating in Enligsh
        switch (upgrade){
            case "Epicerie":
                upgradeRequest = "grocery";
                break;
            case "Marché":
                upgradeRequest = "market";
                break;
            case"Supermarché":
                upgradeRequest = "supermarket";
                break;
            case"Magasin Bio":
                upgradeRequest = "organic shop";
                break;
            default:
                console.log("Action undefined");
                return false;
        }

        //Play in console
        this.game.upgradeRequest = upgradeRequest;
        this.game.executeAction("upgrade");

        return true;
    }

    //Update Functions
    updateDice(value1, value2){
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
    displayActionButtons(which, request){
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

        switch (request){
            case "disable":
                buttonDiv.style.display = "none";
                break;
            case"enable":
                buttonDiv.style.display = "block";
                break;
            default:
                console.log("Invalid Request");
                return false;
        }
        return true;
    }
    updatePawns(){
        //My centered board
        let gameTab = document.getElementById('monopalimBoard');
        for (let i = 0; i < this.game.playerOrder.length; i++){
            //Special bug with colspan
            if(this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] === 1){
                gameTab.rows[this.game.playerTab[i].position[0]].cells[2].appendChild(this.game.playerTab[i].character);
            }
            else if(this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] < 10){
                gameTab.rows[this.game.playerTab[i].position[0]].cells[1].appendChild(this.game.playerTab[i].character);
            }
            else {
                gameTab.rows[this.game.playerTab[i].position[0]].cells[this.game.playerTab[i].position[1]].appendChild(this.game.playerTab[i].character);
            }
        }
    }
    updateTopLeftBox(player, showQuestion){
        //Before displaying, we clear every span & div
        let imgDiv = document.getElementById('boxInfo');//Img fo the box will be displayed in the background
        let boxType = document.getElementById('boxType');//Text describing the box player is on
        let cardInfos = document.getElementById('cardContent');//Specific for community & chance cards
        let answersDiv = document.getElementById('answerContent');//Every possible answers for question cards
        let validDiv = document.getElementById('validAnswer');//Will display a valid button
        let info = document.getElementById('proprietyContent');//Will display a tab with the propriety infos if it's a propriety

        //Variable for the box the player is
        let box = this.game.board.grid[player.position[0]][player.position[1]];
        console.log(box);
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
                    if (showQuestion){
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
    updateStats(player){
        //Money
        document.getElementById('playerMoney').innerText = player.money;
        //Healthy bar
        document.getElementById('healthyBar').style.width = player.healthyBar + "%";
        //Pot
        document.getElementById('taxesMoney').innerText = this.game.taxesMoney;
    }*/















    //Old VIEW
    initView() {
        this.initListener();
        this.displayPawns();
        this.displayCurrentPlayer();
        //this.initBoardVisual();
        this.displayGameInfos();
        //this.displayMap();
        this.displayDice();
        this.displayMoney();
        this.displayHealthyBar();
        this.displayProprietyTab();
        this.displayActionButtons("actions", "disable");
        this.displayActionButtons("upgrades", "disable");

        this.viewIsFinished = false; //View just started and still works
    }

    //Listeners we use for the game
    initListener() {
        //Dice
        let rollButton = document.getElementById('rollDice');
        rollButton.addEventListener('click', () => {
            this.rollEvent(this.game.playerOrder[this.game.orderIndex]);
        });

        //Div that contains buttons
        let actionDiv = document.getElementById('actionButtons');
        //Access to the buttons & add an event Listener for each
        for (let i = 0; i < actionDiv.children.length; i++) {
            actionDiv.children[i].addEventListener('click', () => {
                this.actionEvent(actionDiv.children[i].textContent);//.textContent let us access to the "value" of the button
            });
        }

        //Upgrade Buttons, SAME
        let upgradeDiv = document.getElementById('upgradeButtons');
        for (let i = 0; i < upgradeDiv.children.length; i++) {
            upgradeDiv.children[i].addEventListener('click', () => {
                this.upgradeEvent(upgradeDiv.children[i].textContent);//.textContent let us access to the "value" of the button
            });
        }

        //Question Buttons
        let answerDiv = document.getElementById('answerContent');
        for (let i = 0; i < answerDiv.children.length; i++) {
            answerDiv.children[i].addEventListener('click', () => {
                if (answerDiv.children[i].style.backgroundColor === "green") {
                    answerDiv.children[i].style.backgroundColor = "";
                }
                else {
                    answerDiv.children[i].style.backgroundColor = "green";
                }
            });
        }
        //Validate your questions button
        document.getElementById('validAnswer').children[0].addEventListener('click', () => {
            this.questionEvent(answerDiv.children);
        });

    }

    //Typical View Function we will use for the game
    updateMap() {//Displaying the map and the stuff on it
        let gameBoard = document.getElementById('monopalimBoard');
        //We clear the board
        for (let a = 0; a < 11; a++) {
            for (let b = 0; b < 11; b++) {
                if (typeof gameBoard.rows[a].cells[b] !== 'undefined') {
                    gameBoard.rows[a].cells[b].innerText = '';
                    gameBoard.rows[a].cells[b].style.backgroundColor = '';
                }
                //We change the background color if we have this propriety
                if (typeof this.game.board.grid[a][b] !== 'undefined' && this.game.board.grid[a][b].belonging === this.game.playerOrder[this.game.orderIndex].id) {
                    gameBoard.rows[a].cells[b].style.backgroundColor = 'red';
                }
            }
        }
        //Do it with every player
        for (let i = 0; i < this.game.playerTab.length; i++) {
            for (let pNbr = 0; pNbr < this.game.playerTab[i].myPropriety.length; pNbr++) {
            }
            gameBoard.rows[this.game.playerOrder[i].position[0]].cells[this.game.playerOrder[i].position[1]].innerText = this.game.playerOrder[i].username;
            //Will be changed to image after
        }
    }
    displayDice() {
        //Displaying the dice
        //HTML Elements we will change
        let diceDiv = document.getElementById('diceDiv');

        //Create new images
        let img = document.createElement('img');
        let img2 = document.createElement('img');
        img.src = "../assets/img/dice/dice-six-faces-" + (this.game.dice1) + ".png";
        img2.src = "../assets/img/dice/dice-six-faces-" + (this.game.dice2) + ".png";

        //Replace it
        diceDiv.replaceChild(img, diceDiv.children[0]);
        diceDiv.replaceChild(img2, diceDiv.children[1]);

        return true;
    }
    displayMoney() {
        let money = document.getElementById('playerMoney');
        let taxesMoney = document.getElementById('taxesMoney');
        money.innerText = this.game.playerOrder[this.game.orderIndex].money;
        taxesMoney.innerText = this.game.taxesMoney;
        return true;
    }
    displayHealthyBar() {
        document.getElementById('healthyBar').style.width = this.game.playerOrder[this.game.orderIndex].healthyBar + "%";
    }
    displayCurrentPlayer() {//Used to set up the turn
        let currentPlayer = document.getElementById('playerName');
        currentPlayer.innerText = this.game.playerOrder[this.game.orderIndex].username;

        //Displaying player's GIF
        let gifDiv = document.getElementById('gifTurn');
        //Removing olg child
        if (typeof gifDiv.children[0] !== 'undefined') {
            gifDiv.removeChild(gifDiv.children[0]);
        }
        //Creating New
        let newGif = document.createElement("img");
        newGif.src = this.game.playerOrder[this.game.orderIndex].character.src;
        //Diplaying it
        gifDiv.appendChild(newGif);
    }
    displayProprietyTab() {
        let proprietyTab = document.getElementById('propriety');
        //Delete old infos
        let line = 1;

        //Add new infos
        for (let i = 0; i < this.game.playerOrder[this.game.orderIndex].myPropriety.length; i++) {
            if (typeof this.game.playerOrder[this.game.orderIndex].myPropriety[i] !== 'undefined') {
                if (line > 10) {
                    proprietyTab.insertRow(line);
                    for (let cpt = 0; cpt < 3; cpt++) {
                        proprietyTab.rows[line].insertCell(cpt);
                    }
                }
                //"Propriété" cell
                proprietyTab.rows[line].cells[0].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].name;
                proprietyTab.rows[line].cells[0].style.fontSize = '12px';
                //"Stade" cell
                let upgradeWord = "";
                switch (this.game.playerOrder[this.game.orderIndex].myPropriety[i].upgradeRate) {
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
                proprietyTab.rows[line].cells[1].innerText = upgradeWord;
                //"Apports" cell
                proprietyTab.rows[line].cells[2].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].income[this.game.playerOrder[this.game.orderIndex].myPropriety[i].upgradeRate];
                //Incrementing Line
                line++;
            }
        }

        //Clear other infos
        for (let i = line; i <= 10; i++) {
            proprietyTab.rows[i].cells[0].innerText = "X";
            proprietyTab.rows[i].cells[1].innerText = "X";
            proprietyTab.rows[i].cells[2].innerText = "X";
        }
    }
    displayJailStatus() {
        let jailText = document.getElementById('jailStatus');
        if (this.game.playerOrder[this.game.orderIndex].isJailed) {
            jailText.innerText = "Vous êtes en prison ! Essayez de faire un double pour vous libérer";
            return true;
        }
        jailText.innerText = "";
        return true;
    }
    displayBoxInfos(box, order) {
        let imgDiv = document.getElementById('boxInfo');//Img fo the box will be displayed in the background
        let boxType = document.getElementById('boxType');//Text describing the box player is on
        let cardInfos = document.getElementById('cardContent');//Specific for community & chance cards
        let answersDiv = document.getElementById('answerContent');//Every possible answers for question cards
        let info = document.getElementById('proprietyContent');//Will display a tab with the propriety infos if it's a propriety
        let factDiv = document.getElementById('proprietyFact');//Used to display the fact about a propriety

        //Removing old text
        boxType.innerText = "";
        cardInfos.innerText = "";
        factDiv.innerText = "";
        imgDiv.style.backgroundImage = "none";

        //Removing table
        if (typeof info.children[0] !== 'undefined') {
            info.removeChild(info.children[0]);
        }

        let type = "null";

        //We display for an Action box
        if (typeof box.money !== 'undefined') {
            let content = "null";
            switch (box.type) {
                case "community":
                    content = this.game.board.ccTab[this.game.ccIndex].string;
                    type = "Case Caisse de Communauté";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/communaute.png')";
                    break;
                case "question":
                    type = "Case Question";
                    if (order === "yes") {
                        //Question that we will ask
                        content = this.game.board.qTab[this.game.qIndex].question;

                        //Implementing answers into the buttons
                        for (let i = 0; i < this.game.board.qTab[this.game.qIndex].answer.length; i++) {
                            answersDiv.children[i].innerHTML = this.game.board.qTab[this.game.qIndex].answer[i];
                        }

                        //Show buttons
                        this.displayQuestionButtons("block", this.game.board.qTab[this.game.qIndex].answer.length);
                    }
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/question.png')";
                    break;
                case "chance":
                    content = this.game.board.chTab[this.game.chIndex].string;
                    type = "Case Chance";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/chance.png')";
                    break;
                case "start":
                    type = "Case spéciale";
                    content = "Passez par là pour obtenir 200 blés !";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/start.png')";
                    break;
                case "visitPrison":
                    type = "Case spéciale";
                    content = "Si vous n'êtes pas emprisonné, vous pouvez narguez ceux qui le sont !";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/diet.png')";
                    break;
                case "getStockedBasket":
                    type = "Case spéciale";
                    content = "Vous gagnez le panier de fruit !";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/fruitBucket.png')";
                    break;
                default:
                    type = "Case spéciale";
                    content = "Allez en diète !"
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/goToDier.png')";
                    break;
            }
            if (order === "yes") {
                cardInfos.innerHTML = "La carte dit : " + content;
            }
        }
        //We display for a Propriety box
        else {
            type = "Case Propriété";

            if (order === "yes") {
                // creates a <table> element and a <tbody> element
                let tbl = document.createElement("table");
                let tblThead = document.createElement('thead');
                let tblBody = document.createElement("tbody");

                //Creating the thead
                let theadRow = document.createElement("tr");

                for (let i = 0; i < 4; i++) {
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
                if (box.belonging !== "none") {
                    tbl.rows[1].cells[2].innerText = this.game.playerTab[box.belonging].username;
                }
                else {
                    tbl.rows[1].cells[2].innerText = "Non achetée"
                }
                tbl.rows[1].cells[3].innerText = box.income[box.upgradeRate];

                //Style
                tbl.setAttribute("border", "2");
            }
            else {
                //Fact
                factDiv.innerText = "Fun Fact: " + box.fact;
            }

            imgDiv.style.backgroundImage = "url('../assets/img/cards/property.png')";
        }

        boxType.innerHTML = "Vous êtes sur une " + type;
    }
    //Used to display every pawn & animations when they move
    displayMovement(position, player) {
        let gameTab = document.getElementById('monopalimBoard');

        //We create the animated GIF
        let element = player.character;
        if (position[0] === 1 && position[1] === 10) {
            gameTab.rows[position[0]].cells[2].appendChild(element);
        }
        else if (position[1] === 10 && position[0] < 10) {
            gameTab.rows[position[0]].cells[1].appendChild(element);
        }
        else {
            gameTab.rows[position[0]].cells[position[1]].appendChild(element);
        }
    }
    //Used update most of the information a player needs like his money, his HB, etc...
    displayGameInfos() {
        let turn = document.getElementById('gameTurn');

        //Grammar Stuff lul
        if (this.game.turnNb < 19) {
            turn.innerText = 20 - this.game.turnNb + " tours !";
        }
        else {
            turn.innerText = 20 - this.game.turnNb + " tour !";
        }
    }
    updateInfos() {
        this.displayMap();
        this.displayCurrentPlayer();
        this.displayProprietyTab();
        this.displayHealthyBar();
        this.displayMoney();
        this.displayJailStatus();
    }
    //Used for showing buttons
    displayActionButtons(which, request) {
        let buttonDiv = ""

        if (which === "actions") {
            buttonDiv = document.getElementById('actionButtons');
        }
        else if (which === "upgrades") {
            buttonDiv = document.getElementById('upgradeButtons')
        }
        else {
            console.log("Invalid buttons");
            return false;
        }

        switch (request) {
            case "disable":
                buttonDiv.style.display = "none";
                break;
            case "enable":
                buttonDiv.style.display = "block";
                break;
            default:
                console.log("Invalid Request");
                return false;
        }
        return true;
    }
    //Special display for Questions
    displayQuestionButtons(request, howMany) {
        let answerDiv = document.getElementById('answerContent');
        let validDiv = document.getElementById('validAnswer');

        if ((request !== "block" && request !== "none") || howMany > answerDiv.length) console.log("Error Requet");

        for (let i = 0; i < howMany; i++) {
            answerDiv.children[i].style.display = request;
        }

        validDiv.style.display = request;
    }
    //Used to display pawns
    displayPawns() {
        let board = document.getElementById('monopalimBoard');

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (typeof board.rows[i].cells[j] !== 'undefined' && typeof board.rows[i].cells[j].children[0] !== 'undefined') {
                    let childNbr = board.rows[i].cells[j].children.length;
                    for (let removeNbr = 0; removeNbr < childNbr; removeNbr++) {
                        board.rows[i].cells[j].removeChild(board.rows[i].cells[j].children[0]);
                    }
                }
            }
        }

        //Display pawns
        for (let i = 0; i < this.game.playerOrder.length; i++) {
            //Special bug with colspan
            if (this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] === 1) {
                board.rows[this.game.playerTab[i].position[0]].cells[2].appendChild(this.game.playerTab[i].character);
            }
            else if (this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] < 10) {
                board.rows[this.game.playerTab[i].position[0]].cells[1].appendChild(this.game.playerTab[i].character);
            }
            else {
                board.rows[this.game.playerTab[i].position[0]].cells[this.game.playerTab[i].position[1]].appendChild(this.game.playerTab[i].character);
            }
        }
    }
    //Used at the end of the game
    displayRankingTab() {
        document.getElementById('rankingTab').style.display = "block";
        document.getElementById('dice').style.display = "none"
        console.log(this.game.winner);
    }

    //Event Functions

    rollEvent(player) {//Used for the dice
        if (this.game.isCast) {
            return false;//Only 1 roll is available per turn unless counter indication
        }
        //Roll
        this.game.castTheDice();
        this.displayDice();

        //Check Jail Status
        if (this.game.jailInteraction(player) === true) {
            //Play
            //We make the move 1 by 1
            for (let i = 1; i <= this.game.castValue; i++) {
                this.game.executeMove(player, 1);
                this.displayMovement(player.position, this.game.playerOrder[this.game.orderIndex]);
            }

            //View
            this.displayBoxInfos(this.game.board.grid[player.position[0]][player.position[1]], "yes");

            alert("Déplacement Terminé - Interaction en cours");

            //Game
            this.game.executeInteraction(this.game.playerOrder[this.game.orderIndex]);

            //View
            this.displayPawns();
            this.displayBoxInfos(this.game.board.grid[player.position[0]][player.position[1]], "yes");
            this.displayMoney();//Need to be wrapped
            this.displayHealthyBar();//Same

            //Check if it's over
            if (this.game.checkState(this.game.playerOrder[this.game.orderIndex])) {
                this.updatePawns();
                this.playerLostEvent();
                if (this.game.checkEnd()) {
                    this.endOfTheGameEvent();
                }
                return this.endTurnEvent();
            }

            //If we have to do something
            if (typeof this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]].type !== "question") {
                this.displayActionButtons("actions", "enable");
            }
        }

        else {
            alert("Vous êtes envoyé en diet");
            this.displayPawns();
            this.displayActionButtons("actions", "disable");
            //If the player is still in Jail it's the end of it's turn
            return this.endTurnEvent();
        }

        return true;//Worked well
    }

    questionEvent(everyPossibleAnswer) {
        //Security
        if (everyPossibleAnswer.length < 1) return false;

        //Sorting answers and the others
        for (let i = 0; i < everyPossibleAnswer.length; i++) {
            if (everyPossibleAnswer[i].style.backgroundColor === "green") {
                this.game.currentAnswer.push(everyPossibleAnswer[i].textContent);
            }
        }

        //We make the interaction with the game with his answers & Telling the player if he succeeded
        if (this.game.answerInteraction(this.game.playerOrder[this.game.orderIndex], this.game.board.qTab[this.game.qIndex])) {//Correct answer
            alert("Bonne réponse !!");
        }
        else {
            alert("Aïe, mauvaise réponse :(");
        }

        return this.displayQuestionButtons("none", 4);
    }

    actionEvent(action) {//Used for the action in game
        if (!this.game.hasMoved) return false;

        //Initialisation
        let doWhat = ""

        //Translating in Enligsh
        switch (action) {
            case "Acheter":
                doWhat = "buy";
                break;
            case "Racheter":
                doWhat = "redeem";
                break;
            case "Améliorer":
                doWhat = "upgrade";
                //We show the buttons for upgrade choice
                if (typeof this.game.upgradeRequest === 'undefined' && this.game.isUpgradeable(this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]])) {
                    this.displayActionButtons("actions", "disable");
                    return this.displayActionButtons("upgrades", "enable");
                }
                return;
            case "Rien":
                doWhat = "nothing";
                break;
            default:
                console.log("Action undefined");
                return false;
        }

        //Play in console
        this.game.executeAction(doWhat);

        //End turn
        return this.endTurnEvent();
    }

    upgradeEvent(upgrade) {
        //Initialisation
        let upgradeRequest = ""

        //Translating in Enligsh
        switch (upgrade) {
            case "Epicerie":
                upgradeRequest = "grocery";
                break;
            case "Marché":
                upgradeRequest = "market";
                break;
            case "Supermarché":
                upgradeRequest = "supermarket";
                break;
            case "Magasin Bio":
                upgradeRequest = "organic shop";
                break;
            default:
                console.log("Action undefined");
                return false;
        }

        //Play in console
        this.game.upgradeRequest = upgradeRequest;
        this.game.executeAction("upgrade");

        //View
        alert("Upgrade in " + upgrade + " completed");

        return this.endTurnEvent();
    }

    endGameEvent() {
        if (this.game.isFinished) {
            alert("Partie TERMINE !");
            this.viewIsFinished = true;
            this.displayRankingTab();
        }
    }

    playerLostEvent() {

    }

    endTurnEvent() {
        this.endGameEvent();
        //Interface
        this.displayCurrentPlayer();
        this.displayMoney();
        this.displayHealthyBar();
        this.displayProprietyTab();
        this.displayJailStatus();
        this.displayBoxInfos(this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]], "no");
        this.displayGameInfos();
        //Buttons
        this.displayActionButtons("actions", "disable");
        this.displayActionButtons("upgrades", "disable");

        return true;
    }
}