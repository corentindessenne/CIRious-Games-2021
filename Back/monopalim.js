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
    }

    selectCase(x, y){
        this.selectedCase = this.board.grid[x][y];
    }

    //Before casting the dice
    beforeCast(){
        //If we have selected a propriety
        if (typeof this.selectedCase != 'undefined'){

        }
        else{

        }
    }

    //After Casting the dice
    afterCast(){

    }
}