class monopalim{
    constructor (player1, player2, player3, player4, player5, player6){
        //Will also be used as a "preOrderTab" in a future part (bonus)
        this.playerTab = [];
        this.playerTab.push(player1);
        this.playerTab.push(player2);
        this.playerTab.push(player3);
        this.playerTab.push(player4);
        if (typeof player5 != 'undefined'){
            this.playerTab.push(player5);
        }
        if (typeof player6 != 'undefined'){
            this.playerTab.push(player6);
        }

        //Initiate players order
        this.initPlayerOrder(this.playerTab);

        //Player order Index
        this.orderIndex = 0;

        //initiate the double dice (Value between 1 & 6 each) & the value associated
        this.dice1 = 1;
        this.dice2 = 1;
        this.castValue = this.dice1 + this.dice2;
        this.isCast = false;

        //Initate board
        this.board = new board();
        this.upgradeRequest = undefined;//grocery / supermarket / market / organic shop
        this.selectedCase = undefined;
        this.hasMoved = false;

        this.taxesMoney = 0;

        //Initiate the cards index
        this.qIndex = 0;
        this.ccIndex = 0;
        this.chIndex = 0;
        this.currentAnswer = [];
    }
    
    //Initialisation Function
    //Tested and functionnal
    initPlayerOrder(objectTab){
        let randomIndex = 0;
        //Generate every Index possibility
        let possibleIndex = [0, 1, 2, 3];
        if (objectTab.length > 4){
            possibleIndex.push(4);
            if(objectTab.length > 5){
                possibleIndex.push(5);
            }
        }
        //Generate the order tab
        this.playerOrder = new Array (objectTab.length);
        for (let i = 0; i < objectTab.length; i++){
            randomIndex = Math.floor(Math.random() * (possibleIndex.length - 1));//Take a number between 0 & nbr of index available
            //The first player is the one that ha the same id as "random index"
            this.playerOrder[i] = objectTab[possibleIndex[randomIndex]];
            //Delete the used index
            possibleIndex.splice(randomIndex, 1);
        }
        return true;
    }

    //Check Function
    isUpgradeable(box){
        if(typeof box.color === 'undefined' || box.upgradeRate === 2 || box.upgradeRate === 4 || box.type === "season"){
            return false;
        }
        return true;
    }

    //Actions in the game
    castTheDice(){//Roll the dice !
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        this.castValue = this.dice1 + this.dice2;
        this.isCast = true;
    }

    selectCase(x, y){
        this.selectedCase = this.board.grid[x][y];
    }

    requestUpgrade(upgrade){
        this.upgradeRequest = upgrade;
    }    

    pay(payer, amount, paid){
        if (payer.money < amount){
            return false;
        }
        
        payer.money -= amount;
        
        switch (paid) {
            case "bank":
                break;
            case "taxes":
                this.taxesMoney += amount;
                break;
            default:
                paid.money += amount;
                break;
        }

        return true;
    }

    //Tested and functionnal
    buyAction(player, box){
        if (box.belonging !== "none"){
            return this.redeemAction(player, box);
        }
        
        if (player.money >= box.price[box.upgradeRate]){
            //Pays the propriety
            this.pay(player, box.price[box.upgradeRate], "bank");
            //Makes the board know
            box.belonging = player.id;
            //Gets the propriety
            player.myPropriety[box.id] = box;
            return true;//Bought
        }
        return false;//Not Bought
    }

    //Tested and functionnal
    redeemAction(player, box){
        if (box.belonging === "none"){
            return this.buyAction(player, box);
        }
        //Buying a propriety back is double the price of the actual upgrade
        if (player.money >= box.price[box.upgradeRate] * 2){
            //Pays the propriety
            this.pay(player, box.price[box.upgradeRate] * 2, this.playerTab[box.belonging]);
            //Removes the propriety of the ex owner
            this.playerTab[box.belonging].myPropriety[box.id] = undefined;
            //Makes the board know
            box.belonging = player.id;
            //Gets the propriety
            player.myPropriety[box.id] = box;
            return true;//Bought
        }
        return false;//Not bought
    }

    //Tested and functionnal
    upgradeAction(player, box){
        //Check if the propriety belongs to the right user
        if (player.id !== box.belonging){
            return this.buyAction(player, box);
        }
        if (typeof this.upgradeRequest === 'undefined' || !this.isUpgradeable(box)){
            return false;
        }

        //Switch the string to a number
        let upgradeId = 0;
        switch (this.upgradeRequest) {
            case "grocery":
                upgradeId = 1;	
                break;
            case "supermarket":
                upgradeId = 2;	
                break;
            case "market":
                upgradeId = 3;	
                break;
            case "organic shop":
                upgradeId = 4;	
                break;
        }

        //Check if upgrade is valid
        if (box.upgradeRate !== 0 && (box.upgradeRate - upgradeId >= 2 || box.upgradeRate - upgradeId <= -2)){
            return false;
        }

        box.upgradeRate = upgradeId;
        this.pay(this.playerOrder[this.orderIndex], box.price[upgradeId], "bank");
        return true;
    }

    askQuestion(){
        return this.board.qTab[this.qIndex].question;
    }

    //Core functions

    //TESTED AND FUNCTIONNAL
    move(player, castValue){
        //If player is on the first parcel
        if (player.position[0] === 10){
            //If player is exceeding the parcel
            if(player.position[1] - castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = castValue - player.position[1];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    player.position = [0, restValue];
                }

                else {
                    player.position = [10 - restValue, 0];
                }
            }

            else {
                player.position = [10, player.position[1] - castValue];
            }
        }
        //Same but on the second parcel
        else if (player.position[1] === 0){
            //If player is exceeding the parcel
            if(player.position[0] - castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = castValue - player.position[0];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    player.position = [restValue, 10];
                }

                else {
                    player.position = [0, restValue];
                }
            }

            else {
                player.position = [player.position[0] - castValue, 0];
            }
        }
        //Same but on the third parcel
        else if (player.position[0] === 0) {
            //If player is exceeding the parcel
            if(player.position[1] + castValue > 10){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (castValue + player.position[1]);//Negative number

                //If still exceeding the actual parcel
                if (restValue < -10){
                    restValue += 10;
                    player.position = [10, 10 + restValue];
                }

                else {
                    player.position = [-restValue, 10];
                }
            }

            else {
                player.position = [0, player.position[1] + castValue];
            }
        }
        //Same but on the fourth parcel
        else if (player.position[1] === 10){
            //If player is exceeding the parcel
            if(player.position[0] + castValue > 10){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (castValue + player.position[0]);//Negative Number

                //If still exceeding the actual parcel
                if (restValue < -10){
                    restValue += 10;
                    player.position = [10 + restValue, 0];
                }

                else {
                    player.position = [10, 10 + restValue];
                }
            }

            else {
                player.position = [player.position[0] + castValue, 10];
            }
        }
        //Bug
        else{
            console.log("Player not on the board");
            return false; //Didn't move
        }
        console.log(this.board.grid[player.position[0]][player.position[1]]);
        return true;
    }

    //Need Test and not completed at all
    actionInteraction(box){
        //There are many different type of action box
        switch (box.type) {
        //First of all the player is getting asked for the question, then he answers, then the interaction is made depending on the answer
            case "question":
                return this.askQuestion();
            case "chance":
                return this.chanceInteraction(this.playerOrder[this.orderIndex], box);
            case "community":
                return this.communityInteraction(this.playerOrder[this.orderIndex], box);
            //Special interaction
            default:
                return this.specialInteraction(this.playerOrder[this.orderIndex], box);
        }
    }

    //Finished and need tests
    AnswerInteraction(player, question){
        if (typeof this.currentAnswer[0] === 'undefined'){
            console.log("No Answer");
            return false;
        }

        //Money the player wins
        let pot = 0;
        //Answers check
        for(let i = 0; i < question.correctAnswerId.length; i++){
            //If he doesn't find the right answer
            if (typeof this.currentAnswer[i] === 'undefined' || question.correctAnswerId[i] !== this.currentAnswer[i]){
                return false;
            }
            //Every good answer make the pot grow
            else{
                pot+=50;
            }
        }

        //Passing the check means he gets paid
        player.money += pot;
        //Changing question
        this.qIndex = (this.qIndex + 1) % 30;
        return true;
    }

    chanceInteraction(player, box){
        //There are different type of chance card
        switch (this.board.chTab[this.chIndex].effectType) {
            //Player wins money
            case "get":
                player.money += this.board.chTab[this.chIndex].effect;
                break;
            //Player gives money
            case "give":
                //Special interaction depending on player's propriety
                if (this.board.chTab[this.chIndex].effect === "60*"){
                    let pot = 0;
                    for (let i = 0; i < player.myPropriety.length; i++){
                        //Player pays 60b for each propriety that has an upgrade 
                        if (typeof player.myPropriety[i] !== 'undefined' && player.myPropriety[i].upgradeRate > 0){
                            pot += 60;
                        }
                    }
                    this.pay(player, pot, this.board.chTab[this.chIndex].byTo);
                }
                //Regular interaction
                else{
                    this.pay(player, this.board.chTab[this.chIndex].effect, this.board.chTab[this.chIndex].byTo);
                }
                break;
            //Player is moving
            case "goto":
                //Regular interaction
                if (typeof this.board.chTab[this.chIndex].effect[0] !== 'undefined'){
                    player.position = this.board.chTab[this.chIndex].effect;
                }
                //Special interaction
                else{

                }
                break;
            //Player gets a free diet card
            case "special":
                player.myCards.push(this.board.chTab[this.chIndex].effect);
                break;
        }
    }

    communityInteraction(player, box){

    }

    specialInteraction(player, box){

    }

    //TESTED AND FUNCTIONNAL
    proprietyInteraction(box){
        //If it belongs to no one, nothing happens
        if (box.belonging === "none"){
            return true;
        }

        //Exchanging the money for both players
        this.pay(this.playerOrder[this.orderIndex], box.income[box.upgradeRate], this.playerTab[box.belonging]);
        return true;
    }

    //TESTED AND FUNCTIONNAL
    proprietyAction(box, player, action){
        //Security
        if (action === undefined){
            console.log("We don't know what the player wants to do");
            return false;
        }

        //We skip this part if he doesn't want to do anything
        switch (action) {
            case "buy":
                return this.buyAction(player, box);
            case "redeem":
                return this.redeemAction(player, box);
            case "upgrade":
                return this.upgradeAction(player, box);
            case "nothing": 
                break;
        }
        return true;
    }

    //Main function
    executeMove(){
        if (!this.isCast){
            return false;
        }

        //We make the Movement
        this.move(this.playerOrder[this.orderIndex], this.castValue);
        
        //We Make the interaction

        //Action box
        if (this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]].money !== undefined) {
            this.actionInteraction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]]);
        }
        //Propriety box
        else{
            this.proprietyInteraction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]]);
        }

        this.hasMoved = true;

        return true;//Did play
    }

    executeAction(whatToDo){
        //Security
        if (this.hasMoved === false){
            return this.executeMove();
        }

        //Check if it's a propriety
        if (this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]].color !== undefined){
            //We make the action (buy, redeem, upgrade, etc...)
            this.proprietyAction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]], this.playerOrder[this.orderIndex], whatToDo);
        }
        
        //Check if player finished his turn
        if (this.dice1 !== this.dice2){
            this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;
        }

        this.isCast = false;
        this.upgradeRequest = undefined;
        this.hasMoved = false;

        return true;
    }
}