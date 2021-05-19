class view {
    constructor(monopalimInstance) {
        this.game = monopalimInstance;
        this.initView();
    }

    initView() {
        this.initListener();
        this.displayCurrentPlayer();
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

    //Typical View Function we will use for the game
    displayMap() {//Displaying the map and the stuff on it
        let gameBoard = document.getElementById('monopalimBoard');
        //We clear the board
        for (let a = 0; a < 11; a++) {
            for (let b = 0; b < 11; b++) {
                gameBoard.rows[a].cells[b].innerText = '';
                gameBoard.rows[a].cells[b].style.backgroundColor = '';
                //We change the background color if we have this propriety
                if (typeof this.game.board.grid[a][b] !== 'undefined' && this.game.board.grid[a][b].belonging === this.game.playerOrder[this.game.orderIndex].id) {
                    gameBoard.rows[a].cells[b].style.backgroundColor = 'red';
                }
            }
        }
        //We show the new position
        for (let i = 0; i < this.game.playerOrder.length; i++) {
            gameBoard.rows[this.game.playerOrder[i].position[0]].cells[this.game.playerOrder[i].position[1]].innerText = this.game.playerOrder[i].username;
            //Will be changed to image after
        }
    }
    displayDice() {//Displaying the dice
        //HTML Elements we will change
        let dice1Value = document.getElementById('dice1');
        let dice2Value = document.getElementById('dice2');
        let diceSum = document.getElementById('diceSum');

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
        img.src = "../assets/img/e" + (this.game.dice1) + ".png";
        img2.src = "../assets/img/e" + (this.game.dice2) + ".png";
        //Insert it
        dice1Value.appendChild(img);
        dice2Value.appendChild(img2);
        diceSum.innerText = this.game.dice1 + this.game.dice2;
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
        let hb = document.getElementById('playerHB');
        hb.innerText = this.game.playerOrder[this.game.orderIndex].healthyBar;
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
        for (let i = 1; i < 10; i++) {
            proprietyTab.rows[i].cells[0].innerText = "";
            proprietyTab.rows[i].cells[1].innerText = "";
            proprietyTab.rows[i].cells[2].innerText = "";
        }

        //Add new infos
        for (let i = 0; i < this.game.playerOrder[this.game.orderIndex].myPropriety.length; i++) {
            if (typeof this.game.playerOrder[this.game.orderIndex].myPropriety[i] !== 'undefined') {
                if (line > 10) {
                    proprietyTab.insertRow(line);
                    for (let cpt = 0; cpt < 3; cpt++) {
                        proprietyTab.rows[ligne].insertCell(cpt);
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
        let button1 = document.getElementById('buy');
        let button2 = document.getElementById('redeem');
        let button3 = document.getElementById('upgrade');
        let button4 = document.getElementById('nothing');

        //Enable buttons
        if (request === "enable") {
            button1.disabled = false;
            button2.disabled = false;
            button3.disabled = false;
            button4.disabled = false;
            return true;
        }

        //Disable buttons
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
        button4.disabled = true;
        return true;
    }
    upgradeButtons(request) {
        this.actionButtons("disable");
        let button1 = document.getElementById('upgradeChoice1');
        let button2 = document.getElementById('upgradeChoice2');
        let button3 = document.getElementById('upgradeChoice3');
        let button4 = document.getElementById('upgradeChoice4');

        //Enable buttons
        if (request === "enable") {
            button1.disabled = false;
            button2.disabled = false;
            button3.disabled = false;
            button4.disabled = false;
            return true;
        }

        //Disable buttons
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
        button4.disabled = true;
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
        let answerSpan = document.getElementById('isAnswerCorrect');

        //Removing old text
        boxType.innerText = "";
        boxInfo.innerText = "";
        answerSpan.innerText ="";
        //Removing table
        if (typeof info.children[0] !== 'undefined'){
            info.removeChild(info.children[0]);
        }
        //Using an iteration loop to remove every button
        if (typeof answersDiv.children[0] !== 'undefined'){
            for (let i = 0; i < answersDiv.children.length; i++){
                answersDiv.removeChild(answersDiv.children[i]);
            }

        }
        //Same goes for the valid button
        if (typeof validDiv.children[0] !== 'undefined'){
            validDiv.removeChild(validDiv.children[0]);
        }

        //We display for an Action box
        if (typeof box.money !== 'undefined') {
            let content = "null";
            let type = "null";
            switch (box.type) {
                case "community":
                    content = this.game.board.ccTab[this.game.ccIndex].string;
                    type = "Case Caisse de Communauté";
                    break;
                case"question":
                    type = "Case Question";
                    if (order === "yes"){
                        content = this.game.board.qTab[this.game.qIndex].question;
                        //Creating a group of buttons for player's answers
                        console.log(this.game.board.qTab[this.game.qIndex]);

                        let answerTab = [];
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
                            //We stock the button into a tab
                            answerTab.push(button);
                        }
                        let validBtn = document.createElement("button");
                        validBtn.innerHTML = "Valider";
                        validBtn.addEventListener("click", () => {
                            this.questionEvent(answerTab);
                        });
                        validDiv.appendChild(validBtn);
                    }
                    break;
                case"chance":
                    content = this.game.board.chTab[this.game.chIndex].string;
                    type = "Case Chance";
                    break;
            
                default:
                    content = box.type;
                    type = "Case Spéciale";
                    break;
            }
            boxType.innerHTML = "Vous êtes sur une " + type + " !";
            if (order === "yes"){
                boxInfo.innerHTML = "La carte dit : " + content;
            }
        }
        //We display for a Propriety box
        else {
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
            tbl.rows[0].cells[1].innerText = "Rachat";
            tbl.rows[0].cells[2].innerText = "Propriétaire";
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
            tbl.style.width ="100%";
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
            this.game.executeMove();
            this.displayBoxInfos(this.game.board.grid [this.game.playerOrder[this.game.orderIndex].position[0]] [this.game.playerOrder[this.game.orderIndex].position[1]], "yes");
            this.game.executeInteraction(this.game.playerOrder[this.game.orderIndex]);
            //Update
            this.displayMap();
            this.displayMoney();
            this.displayHealthyBar();
            if (this.game.board.grid [this.game.playerOrder[this.game.orderIndex].position[0]] [this.game.playerOrder[this.game.orderIndex].position[1]].type !== "question"){
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
        for (let i = 0; i < everyPossibleAnswer.length; i++){
            if (everyPossibleAnswer[i].style.backgroundColor === "green"){
                this.game.currentAnswer.push(everyPossibleAnswer[i].textContent);
                console.log(this.game.currentAnswer);
            }
        }
        let answerSpan = document.getElementById('isAnswerCorrect');
        //We make the interaction with the game with his answers
        if (this.game.answerInteraction(this.game.playerOrder[this.game.orderIndex], this.game.board.qTab[this.game.qIndex])){
            answerSpan.innerText = "Bonne réponse !!";
            this.actionButtons("enable");
            return true;
        }
        answerSpan.innerText = "Aïe, mauvaise réponse :(";
        this.actionButtons("enable");
        return true;
    }

    actionEvent(action) {//Used for the action in game
        if (this.game.hasMoved === false) {
            return false;
        }
        this.displayBoxInfos(this.game.board.grid [this.game.playerOrder[this.game.orderIndex].position[0]] [this.game.playerOrder[this.game.orderIndex].position[1]], "no");
        //If we don't know what do we upgrade
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