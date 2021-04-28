class monopalim{
    constructor (player1, player2, player3, player4, player5, player6){
        //Initiate players
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

        //Bonus part for random order
        /*let prePlayerOrder = [];
        prePlayerOrder.push(player1);
        prePlayerOrder.push(player2);
        prePlayerOrder.push(player3);
        prePlayerOrder.push(player4);
        if (typeof player5 != 'undefined'){
            prePlayerOrder.push(player5);
        }
        if (typeof player6 != 'undefined'){
            prePlayerOrder.push(player6);
        }*/

        //initiate the double dice (Value between 1 & 6 each) & the value associated
        this.dice1 = 1;
        this.dice2 = 1;
        this.castValue = this.dice1 + this.dice2;
        this.isCast = false;

        //Initate board
        this.board = new board();

        this.selectedCase = undefined;

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


    //Core functions

    //Need Test
    move(){
        //If player is on the first parcel
        if (this.playerOrder[this.orderIndex].position[0] === 10){
            //If player is exceeding the parcel
            if(this.playerOrder[this.orderIndex].position[1] - this.castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (this.playerOrder[this.orderIndex].position[1] + this.castValue);

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
                let restValue = this.castValue - this.playerOrder[this.orderIndex].position[1];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    this.playerOrder[this.orderIndex].position = [10, 10 - restValue];
                }

                else {
                    this.playerOrder[this.orderIndex].position = [restValue, 10];
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
                let restValue = this.castValue - this.playerOrder[this.orderIndex].position[0];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    this.playerOrder[this.orderIndex].position = [10 - restValue, 0];
                }

                else {
                    this.playerOrder[this.orderIndex].position = [10, 10 - restValue];
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

    play(){
        //We cast the dice first
        this.castTheDice();

        //We make the Movement
        this.move();
        
        //We Make the interaction


        //We make the action
        

        //Player finished his turn
        this.orderIndex++;
        this.isCast = false;

        return true;//Did play
    }
}