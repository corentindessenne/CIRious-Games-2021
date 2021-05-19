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
        this.qIndex = Math.floor(Math.random() * 29);
        this.ccIndex = Math.floor(Math.random() * 18);
        this.chIndex = Math.floor(Math.random() * 19);
        this.currentAnswer = [];
    }
    
    //Initialisation Function
    //Tested and functional
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
        return !(typeof box.color === 'undefined' || box.upgradeRate === 2 || box.upgradeRate === 4 || box.type === "season");
    }

    //Actions in the game
    castTheDice(){//Roll the dice !
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        /* Test Purpose*/
        /*this.dice1 = 2;
        this.dice2 = 2;*/
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

    //Tested and functional
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

    //Tested and functional
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

    //Tested and functional
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

    //Tested and functional
    playerRelease(player){
        if (this.dice1 !== this.dice2){
            this.pay(player, 50, "taxes");
        }
        player.isJailed = false;
        player.timeJailed = 0;
        return true;//Player can play
    }

    //Functional
    findNearest(player, locationType){
        while (this.board.grid[player.position[0]][player.position[1]].type !== locationType){
            this.move(player, 1);
        }
        return true;
    }

    //Core functions

    //TESTED AND FUNCTIONAL
    move(player, castValue){
        if (player.isJailed){
            return true;
        }

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
        
        //Special interaction for the start
        //Player finds the start on his way

        console.log(this.board.grid[player.position[0]][player.position[1]]);
        return true;
    }

    endTurn(){
        this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;
        this.isCast = false;
        this.upgradeRequest = undefined;
        this.hasMoved = false;
        return true;
    }

    //Tested and functional
    jailInteraction(player){
        //Player can play
        if (!player.isJailed){
            return true;
        }
        if (!this.isCast){
            this.castTheDice();
        }

        if (this.dice1 !== this.dice2){
            if (player.timeJailed < 3){
                player.timeJailed++;
                this.endTurn();
                return false;//Player can't play  
            }
        }
        return this.playerRelease(player);
    }

    //Need Test and almost completed
    actionInteraction(box){
        //There are many different type of action box
        switch (box.type) {
        //First of all the player is getting asked for the question, then he answers, then the interaction is made depending on the answer
            case "question":
                return this.askQuestion();
            //Just making an interaction function with those two
            case "chance":
                return this.chanceInteraction(this.playerOrder[this.orderIndex]);
            case "community":
                return this.communityInteraction(this.playerOrder[this.orderIndex]);
            //Special interaction
            default:
                return this.specialInteraction(this.playerOrder[this.orderIndex], box);
        }
    }

    //Finished and need tests
    answerInteraction(player, question){
        if (typeof this.currentAnswer[0] === 'undefined'){
            console.log("No Answer");
            return false;
        }

        //Money the player wins
        let pot = 0;
        //Answers check
        for(let i = 0; i < question.correctAnswerId.length; i++){
            //If he doesn't find the right answer
            if (typeof this.currentAnswer[i] === 'undefined' || question.answer[question.correctAnswerId[i]] !== this.currentAnswer[i]){
                this.qIndex = (this.qIndex + 1) % 30;
                //Erasing current Answer Array
                let jLength = this.currentAnswer.length;
                for (let j = 0; j < jLength; j++){
                    this.currentAnswer.pop();
                }
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

    //Functional / Finished
    chanceInteraction(player){
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
                if (typeof this.board.chTab[this.chIndex].effect[0] !== 'string'){
                    player.position = this.board.chTab[this.chIndex].effect;
                }
                //Special interaction
                else{
                    //Player steps back
                    if (this.board.chTab[this.chIndex].effect === "-3"){
                        if (player.position === [0, 2]){
                            player.position = [1, 0];
                        }
                        else{
                            this.move(player, -3);
                        }
                    }
                    //Player goes to the nearest point
                    else if (this.board.chTab[this.chIndex].effect === "+S"){
                       this.findNearest(player, "season");
                    }
                    else{
                        this.findNearest(player, "question");
                    }
                }
                //If the player has been move to this location
                if (player.position === [10, 0]){
                    player.isJailed = true;
                }
                this.executeInteraction(player);
                break;
            //Player gets a free diet card
            case "special":
                player.myCards.push(this.board.chTab[this.chIndex].effect);
                break;
        }
        
        //Random index between 0 & 19
        this.chIndex = Math.floor(Math.random() * 19);

        return true;
    }

    //Need Tests / Finished
    communityInteraction(player){
        //There are different type of community card
        switch (this.board.ccTab[this.ccIndex].effectType) {
            //Player wins money
            case "get":
                player.money += this.board.ccTab[this.ccIndex].effect;
                break;
            //Player gives money
            case "give":
                //Special interaction depending on player's propriety
                if (this.board.ccTab[this.ccIndex].effect === "75*"){
                    let pot = 0;
                    for (let i = 0; i < player.myPropriety.length; i++){
                        //Player pays 60b for each propriety that has an upgrade
                        if (typeof player.myPropriety[i] !== 'undefined' && player.myPropriety[i].upgradeRate > 0){
                            pot += 75;
                        }
                    }
                    this.pay(player, pot, this.board.ccTab[this.chIndex].byTo);
                }
                //Regular interaction
                else{
                    this.pay(player, this.board.ccTab[this.ccIndex].effect, this.board.ccTab[this.ccIndex].byTo);
                }
                break;
            //Player is moving, no special interaction here
            case "goto":
                player.position = this.board.ccTab[this.ccIndex].effect;
                if (player.position === [10, 0]){
                    player.isJailed = true;
                }
                break;
            //Player gets a free diet card
            case "special":
                player.myCards.push(this.board.ccTab[this.ccIndex].effect);
                break;
        }
        
        //Random index between 0 & 18
        this.ccIndex = Math.floor(Math.random() * 18);

        return true;
    }

    //Functional / Finished
    specialInteraction(player, box){
        switch (box.type) {
            case "start":
                player.money += 200;
                break;
            case "visitPrison":
                break;
            case "getStockedBasket":
                player.money += this.taxesMoney;
                this.taxesMoney = 0;
                break;
            case "gotoPrison":
                player.position = [10, 0];
                player.isJailed = true;
                break;
        }
        return true;
    }

    //TESTED AND FUNCTIONAL
    proprietyInteraction(box){
        //If it belongs to no one, nothing happens
        if (box.belonging === "none"){
            return true;
        }

        //Exchanging the money for both players
        this.pay(this.playerOrder[this.orderIndex], box.income[box.upgradeRate], this.playerTab[box.belonging]);
        return true;
    }

    //TESTED AND FUNCTIONAL
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
        this.hasMoved = true;

        return true;//Did play
    }

    executeInteraction(player){
        //Action box
        if (typeof this.board.grid[player.position[0]][player.position[1]].money !== 'undefined') {
            this.actionInteraction(this.board.grid[player.position[0]][player.position[1]]);
        }
        //Propriety box
        else{
            this.proprietyInteraction(this.board.grid[player.position[0]][player.position[1]]);
        }
        return true;
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