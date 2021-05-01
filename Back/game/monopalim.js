class monopalim{
    constructor (player1, player2, player3, player4, player5, player6){
        //Will also be used as a "preOrderTab" in a future part (bonus)
        let playerTab = [];
        playerTab.push(player1);
        playerTab.push(player2);
        playerTab.push(player3);
        playerTab.push(player4);
        if (typeof player5 != 'undefined'){
            playerTab.push(player5);
        }
        if (typeof player6 != 'undefined'){
            playerTab.push(player6);
        }

        //Initiate players order
        this.playerOrder = [];
        this.playerOrder.push(player1);//Index 0
        this.playerOrder.push(player2);// 1
        this.playerOrder.push(player3);// 2
        this.playerOrder.push(player4);// ....
        if (typeof player5 != 'undefined'){
            this.playerOrder.push(player5);
            if (typeof player6 != 'undefined'){
                this.playerOrder.push(player6);
            }
        }
        //Player order Index
        this.orderIndex = 0;

        //initiate the double dice (Value between 1 & 6 each) & the value associated
        this.dice1 = 1;
        this.dice2 = 1;
        this.castValue = this.dice1 + this.dice2;
        this.isCast = false;

        //Initate board
        this.board = new board();
        this.wannaDoSomething = undefined;//Wanna: Buy / Rebuy / Upgrade / Nothing
        this.selectedCase = undefined;

        this.taxesMoney = 0;

        //Initiate the question index
        this.qIndex = 0;
        this.ccIndex = 0;
        this.chIndex = 0;
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

    doSomething(doWhat){
        this.wannaDoSomething = doWhat;
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

    //Not completed, need to verify each upgrade
    upgradeSomething(box, upgrade, player){
        //Check if the propriety belongs to the right user
        if (player.id !== box.belonging){
            console.log("Can't Upgrade this");
            return false;
        }

        //Switch the string to a number
        let upgradeId = 0;
        switch (upgrade) {
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
        // WILL COME SOON

        //If is valid
        this.pay(this.playerOrder[this.orderIndex], box.price[upgradeId], "bank");
        return true;
    }

    //Core functions

    //TESTED AND FUNCTIONNAL
    move(){
        //If player is on the first parcel
        if (this.playerOrder[this.orderIndex].position[0] === 10){
            //If player is exceeding the parcel
            if(this.playerOrder[this.orderIndex].position[1] - this.castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = this.castValue - this.playerOrder[this.orderIndex].position[1];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    this.playerOrder[this.orderIndex].position = [0, restValue];
                }

                else {
                    this.playerOrder[this.orderIndex].position = [10 - restValue, 0];
                }
            }

            else {
                this.playerOrder[this.orderIndex].position = [10, this.playerOrder[this.orderIndex].position[1] - this.castValue];
            }
        }
        //Same but on the second parcel
        else if (this.playerOrder[this.orderIndex].position[1] === 0){
            //If player is exceeding the parcel
            if(this.playerOrder[this.orderIndex].position[0] - this.castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = this.castValue - this.playerOrder[this.orderIndex].position[0];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    this.playerOrder[this.orderIndex].position = [restValue, 10];
                }

                else {
                    this.playerOrder[this.orderIndex].position = [0, restValue];
                }
            }

            else {
                this.playerOrder[this.orderIndex].position = [this.playerOrder[this.orderIndex].position[0] - this.castValue, 0];
            }
        }
        //Same but on the third parcel
        else if (this.playerOrder[this.orderIndex].position[0] === 0) {
            //If player is exceeding the parcel
            if(this.playerOrder[this.orderIndex].position[1] + this.castValue > 10){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (this.castValue + this.playerOrder[this.orderIndex].position[1]);//Negative number

                //If still exceeding the actual parcel
                if (restValue < -10){
                    restValue += 10;
                    this.playerOrder[this.orderIndex].position = [10, 10 + restValue];
                }

                else {
                    this.playerOrder[this.orderIndex].position = [-restValue, 10];
                }
            }

            else {
                this.playerOrder[this.orderIndex].position = [0, this.playerOrder[this.orderIndex].position[1] + this.castValue];
            }
        }
        //Same but on the fourth parcel
        else if (this.playerOrder[this.orderIndex].position[1] === 10){
            //If player is exceeding the parcel
            if(this.playerOrder[this.orderIndex].position[0] + this.castValue > 10){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (this.castValue + this.playerOrder[this.orderIndex].position[0]);//Negative Number

                //If still exceeding the actual parcel
                if (restValue < -10){
                    restValue += 10;
                    this.playerOrder[this.orderIndex].position = [10 + restValue, 0];
                }

                else {
                    this.playerOrder[this.orderIndex].position = [10, 10 + restValue];
                }
            }

            else {
                this.playerOrder[this.orderIndex].position = [this.playerOrder[this.orderIndex].position[0] + this.castValue, 10];
            }
        }
        //Bug
        else{
            console.log("Player not on the board");
            return false; //Didn't move
        }
        return true;
    }

    //Need Test
    actionInteraction(box){

    }

    //Need Test but completed
    proprietyInteraction(box){
        //If it belongs to no one, nothing happens
        if (box.belonging === "none"){
            return true;
        }

        //Exchanging the money for both players
        this.pay(this.playerOrder[this.orderIndex], box.income[box.upgradeRate], this.playerTab[box.belonging]);
        return true;
    }

    //Need Test, ALMOST DONE
    proprietyAction(box, player){
        //Security
        if (this.wannaDoSomething === undefined){
            console.log("We don't know what the player wants to do");
            return false;
        }

        //We skip this part if he doesn't want to do anything
        switch (this.wannaDoSomething) {
            case "buy":
                this.pay(this.playerOrder[this.orderIndex], box.price[box.upgradeRate], "bank");
                break;
            case "rebuy":
                this.pay(this.playerOrder[this.orderIndex], box.price[box.upgradeRate] * 2, this.playerTab[box.belonging]);
                break;
            case "upgrade":
                
                break;
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
        this.move();
        
        //We Make the interaction

        //Action box
        if (this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]].money !== undefined) {
            this.actionInteraction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]]);
        }
        //Propriety box
        else{
            this.proprietyInteraction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]]);
        }

        return true;//Did play
    }

    executeAction(upgrade){
        //Check if it's a propriety
        if (this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]].color !== undefined){
            //We make the action (Build, rebought, upgrade, etc...)
            this.proprietyAction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]], this.playerOrder[this.orderIndex], upgrade);
        }
        

        //Check if player finished his turn
        if (this.dice1 !== this.dice2){
            this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;
        }

        this.isCast = false;
    }
}