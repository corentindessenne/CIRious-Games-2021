class view {
    constructor(monopalimInstance) {
        this.game = monopalimInstance;
        this.initView();
    }

    initView() {
        this.initListener();
        this.displayCurrentPlayer();
        this.initBoardVisual();
        this.displayMap();
        this.displayDice();
        this.displayMoney();
        this.displayHealthyBar();
        this.displayProprietyTab();
        this.actionButtons("disable");
        this.upgradeButtons("disable");
    }

    //Listeners we use for the game
    initListener() {
        //Dice
        let rollButton = document.getElementById('rollDice');
        rollButton.addEventListener('click', () => {
            this.rollEvent();
        });

        //Actions on boxes
        let buyButton = document.getElementById('buy');
        let redeemButton = document.getElementById('redeem');
        let upgradeButton = document.getElementById('upgrade');
        let nothingButton = document.getElementById('nothing');
        buyButton.addEventListener('click', () => {
            this.actionEvent("buy");
        });
        redeemButton.addEventListener('click', () => {
            this.actionEvent("redeem");
        });
        upgradeButton.addEventListener('click', () => {
            this.actionEvent("upgrade");
        });
        nothingButton.addEventListener('click', () => {
            this.actionEvent("nothing");
        });

        //Upgrade Buttons
        let button1 = document.getElementById('upgradeChoice1');
        let button2 = document.getElementById('upgradeChoice2');
        let button3 = document.getElementById('upgradeChoice3');
        let button4 = document.getElementById('upgradeChoice4');
        button1.addEventListener('click', () => {
            this.game.upgradeRequest = button1.textContent;
            return this.actionEvent("upgrade")
        });
        button2.addEventListener('click', () => {
            this.game.upgradeRequest = button2.textContent;
            return this.actionEvent("upgrade")
        });
        button3.addEventListener('click', () => {
            this.game.upgradeRequest = button3.textContent;
            return this.actionEvent("upgrade")
        });
        button4.addEventListener('click', () => {
            this.game.upgradeRequest = button4.textContent;
            return this.actionEvent("upgrade")
        });
    }

    initBoardVisual(){
        let gameBoard = document.getElementById('monopalimBoard');
        //gameBoard.rows[10].cells[10].style.backgroundImage = "url('../assets/img/board/start.png')";
        //gameBoard.rows[10].cells[10].style.backgroundImage.width = "20%";
    }

    //Typical View Function we will use for the game
    displayMap() {//Displaying the map and the stuff on it
        let gameBoard = document.getElementById('monopalimBoard');
        //We clear the board
        /*for (let a = 0; a < 11; a++) {
            for (let b = 0; b < 11; b++) {
                if (typeof gameBoard.rows[a].cells[b] !== 'undefined'){
                    gameBoard.rows[a].cells[b].innerText = '';
                    gameBoard.rows[a].cells[b].style.backgroundColor = '';
                }
                //We change the background color if we have this propriety
                if (typeof this.game.board.grid[a][b] !== 'undefined' && this.game.board.grid[a][b].belonging === this.game.playerOrder[this.game.orderIndex].id) {
                    gameBoard.rows[a].cells[b].style.backgroundColor = 'red';
                }
            }
        }*/
        /*//We show the new position
        for (let i = 0; i < this.game.playerOrder.length; i++) {
            gameBoard.rows[this.game.playerOrder[i].position[0]].cells[this.game.playerOrder[i].position[1]].innerText = this.game.playerOrder[i].username;
            //Will be changed to image after
        }*/
    }
    displayDice() {
        //Displaying the dice
        //HTML Elements we will change
        let dice1Value = document.getElementById('dice1');
        let dice2Value = document.getElementById('dice2');

        //Remove old Img
        if (dice1Value.children[0] !== undefined) {
            dice1Value.removeChild(dice1Value.children[0]);
        }
        if (dice2Value.children[0] !== undefined) {
            dice2Value.removeChild(dice2Value.children[0]);
        }
        //Create new ones
        //Img
        let img = document.createElement('img');
        let img2 = document.createElement('img');
        img.src = "../assets/img/dice/dice-six-faces-" + (this.game.dice1) + ".png";
        img2.src = "../assets/img/dice/dice-six-faces-" + (this.game.dice2) + ".png";
        //Insert it
        dice1Value.appendChild(img);
        dice2Value.appendChild(img2);
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
        let hb = document.getElementById('hb');
        hb.value = this.game.playerOrder[this.game.orderIndex].healthyBar;
        return true;
    }
    displayCurrentPlayer() {//Used to set up the turn
        let currentPlayer = document.getElementById('playerName');
        currentPlayer.innerText = this.game.playerOrder[this.game.orderIndex].username;
        return true;
    }
    displayProprietyTab() {
        let proprietyTab = document.getElementById('propriety');
        //Delete old infos
        let line = 1;
        for (let i = 1; i <= 10; i++) {
            proprietyTab.rows[i].cells[0].innerText = "Rien :(";
            proprietyTab.rows[i].cells[1].innerText = "Rien :(";
            proprietyTab.rows[i].cells[2].innerText = "Rien :(";
        }

        //Add new infos
        for (let i = 0; i < this.game.playerOrder[this.game.orderIndex].myPropriety.length; i++) {
            if (typeof this.game.playerOrder[this.game.orderIndex].myPropriety[i] !== 'undefined') {
                if (line > 10) {
                    proprietyTab.insertRow(line);
                    for (let cpt = 0; cpt < 3; cpt++) {
                        proprietyTab.rows[line].insertCell(cpt);
                    }
                }
                proprietyTab.rows[line].cells[0].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].name;
                proprietyTab.rows[line].cells[1].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].upgradeRate;
                proprietyTab.rows[line].cells[2].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].income[this.game.playerOrder[this.game.orderIndex].myPropriety[i].upgradeRate];
                line++;
            }
        }
    }
    actionButtons(request) {//Used to enable or disable buttons
        let buttonGroup = document.getElementById('actionButtons');

        if (request === "enable"){
            buttonGroup.style.display = "block";
        }
        else{
            buttonGroup.style.display = "none";
        }

        return true;
    }
    upgradeButtons(request) {
        this.actionButtons("disable");

        let buttonGroup = document.getElementById('upgradeButtons');

        if (request === "enable"){
            buttonGroup.style.display = "block";
        }
        else{
            buttonGroup.style.display = "none";
        }

        return true;
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
        //Before displaying, we clear every span & div
        let boxType = document.getElementById('boxType');
        let boxInfo = document.getElementById('cardContent');
        let info = document.getElementById('proprietyContent');
        let answersDiv = document.getElementById('answerContent');
        let validDiv = document.getElementById('validAnswer');
        let globalDiv = document.getElementById('topLeftBox');
        //Removing old text
        boxType.innerText = "";
        boxInfo.innerText = "";
        globalDiv.style.backgroundImage = "none";

        //Removing table
        if (typeof info.children[0] !== 'undefined'){
            info.removeChild(info.children[0]);
        }

        //Using an iteration loop to remove every button
        if (typeof answersDiv.children[0] !== 'undefined'){
            let iLength = answersDiv.children.length;
            for (let i = 0; i < iLength; i++){
                answersDiv.removeChild(answersDiv.children[0]);
            }
        }

        //Same goes for the valid button
        if (typeof validDiv.children[0] !== 'undefined'){
            validDiv.removeChild(validDiv.children[0]);
        }

        let type = "null";

        //We display for an Action box
        if (typeof box.money !== 'undefined') {
            let content = "null";
            switch (box.type) {
                case "community":
                    content = this.game.board.ccTab[this.game.ccIndex].string;
                    type = "Case Caisse de Communauté";
                    globalDiv.style.backgroundImage = "url('../assets/img/cards/communaute.png')";
                    break;
                case"question":
                    type = "Case Question";
                    if (order === "yes"){
                        content = this.game.board.qTab[this.game.qIndex].question;
                        //Creating a group of buttons for player's answers;
                        let answerTab = [];//Tab that will help to gather every answer
                        for (let i = 0; i < this.game.board.qTab[this.game.qIndex].answer.length; i++){
                            let button = document.createElement("button");
                            button.innerHTML = this.game.board.qTab[this.game.qIndex].answer[i];
                            button.addEventListener("click", () => {
                                if (button.style.backgroundColor !== "green"){
                                    button.style.backgroundColor = "green";
                                }
                                else {
                                    button.style.backgroundColor = "";
                                }
                            });
                            answersDiv.appendChild(button);
                            //We store the button into a tab
                            answerTab.push(button);
                        }

                        //Creating the "validation" button
                        let validBtn = document.createElement("button");
                        validBtn.innerHTML = "Valider";//Value
                        validBtn.addEventListener("click", () => {
                            this.questionEvent(answerTab);//Will transfer the tab of buttons above
                        });
                        validDiv.appendChild(validBtn);
                    }
                    globalDiv.style.backgroundImage = "url('../assets/img/cards/question.png')";
                    break;
                case"chance":
                    content = this.game.board.chTab[this.game.chIndex].string;
                    type = "Case Chance";
                    globalDiv.style.backgroundImage = "url('../assets/img/cards/chance.png')";
                    break;
                case"start":
                    type = "Case spéciale";
                    content = "Passez par là pour obtenir 200 blés !";
                    globalDiv.style.backgroundImage = "url('../assets/img/game/start.png')";
                    break;
                case"visitPrison":
                    type = "Case spéciale";
                    content = "Si vous n'êtes pas emprisonné, vous pouvez narguez ceux qui le sont !";
                    globalDiv.style.backgroundImage = "url('../assets/img/cards/communaute.png')";
                    break;
                case"getStockedBasket":
                    type = "Case spéciale"; 
                    content = "Vous gagnez le panier de fruit !";
                    globalDiv.style.backgroundImage = "url('../assets/img/cards/fruitBucket.png')";
                    break;
                default:
                    type = "Case spéciale";
                    content = "Allez en diète !"
                    globalDiv.style.backgroundImage = "url('../assets/img/cards/jail.png')";
                    break;
            }
            if (order === "yes"){
                boxInfo.innerHTML = "La carte dit : " + content;
            }
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

            globalDiv.style.backgroundImage = "url('../assets/img/cards/property.png')";
        }

        boxType.innerHTML = "Vous êtes sur une " + type;
        
    }
    //Used to display every pawn & animations
    displayMovement(position, player){
        let gameTab = document.getElementById('monopalimBoard');

        //We create the animated GIF
        let element = player.character;
        if (position[0] === 1 && position[1] === 10){
            gameTab.rows[position[0]].cells[2].appendChild(element);
        }
        else if(position[1] === 10 && position[0] < 10){
            gameTab.rows[position[0]].cells[1].appendChild(element);
        }
        else {
            gameTab.rows[position[0]].cells[position[1]].appendChild(element);
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

    //Listener functions

    rollEvent() {//Used for the dice
        if (this.game.isCast) {
            return false;//Only 1 roll is available per turn unless counter indication
        }

        //Roll
        this.game.castTheDice();
        this.displayDice();

        //Check Jail Status
        if (this.game.jailInteraction(this.game.playerOrder[this.game.orderIndex])) {
            //Play
            //We make the move 1 by 1
            for (let i = 1; i <= this.game.castValue; i++){
                this.game.executeMove(this.game.playerOrder[this.game.orderIndex],  1);
                this.displayMovement(this.game.playerOrder[this.game.orderIndex].position, this.game.playerOrder[this.game.orderIndex]);
            }

            this.displayBoxInfos(this.game.board.grid [this.game.playerOrder[this.game.orderIndex].position[0]] [this.game.playerOrder[this.game.orderIndex].position[1]], "yes");
            this.game.executeInteraction(this.game.playerOrder[this.game.orderIndex]);
            
            //Update
            this.displayMap();
            this.displayMoney();
            this.displayHealthyBar();

            //If it's not an action
            if (typeof this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]].type !== 'question'){
                this.actionButtons("enable");
            }
        }

        else {
            //If the player is still in Jail it's the end of it's turn
            return this.endTurnEvent();
        }

        return true;//Worked well
    }

    questionEvent(everyPossibleAnswer){
        //Security
        if (everyPossibleAnswer.length < 1) return false;

        //Sorting answers and the others
        for (let i = 0; i < everyPossibleAnswer.length; i++){
            if (everyPossibleAnswer[i].style.backgroundColor === "green"){
                this.game.currentAnswer.push(everyPossibleAnswer[i].textContent);
            }
        }

        //We make the interaction with the game with his answers & Telling the player if he succeeded
        if (this.game.answerInteraction(this.game.playerOrder[this.game.orderIndex], this.game.board.qTab[this.game.qIndex])){//Correct answer
            alert("Bonne réponse !!");
        }
        else{
            alert("Aïe, mauvaise réponse :(");
        }
        
        return this.actionEvent("nothing");
    }

    commAndChanEvent(){

    }

    actionEvent(action) {//Used for the action in game
        if (!this.game.hasMoved) return false;        
        
        //Asking player for the upgrade
        if (action === "upgrade" && typeof this.game.upgradeRequest === 'undefined' && this.game.isUpgradeable(this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]])) {
            this.actionButtons("disable");
            return this.upgradeButtons("enable");
        }

        this.game.executeAction(action);

        //End turn
        return this.endTurnEvent();
    }

    endTurnEvent() {
        //Interface
        this.displayCurrentPlayer();
        this.displayMoney();
        this.displayHealthyBar();
        this.displayProprietyTab();
        this.displayMap();
        this.displayJailStatus();
        this.displayBoxInfos(this.game.board.grid [this.game.playerOrder[this.game.orderIndex].position[0]] [this.game.playerOrder[this.game.orderIndex].position[1]], "no");

        //Buttons
        this.actionButtons("disable");
        this.upgradeButtons("disable");

        return true;
    }
}