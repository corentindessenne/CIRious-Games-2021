class view{
    constructor(monopalimInstance){
        this.game = monopalimInstance;
        this.initView();
    }

    initView(){
        this.initListener();
        this.displayCurrentPlayer();
        this.displayMap();
    }

    //Listeners we use for the game
    initListener(){
        //Dice
        let rollButton = document.getElementById('rollDice');
        rollButton.addEventListener('click', () => {
            this.rollEvent();
        });
    }

    //Typical View Function we will use for the game
    displayMap(){//Displaying the map and the stuff on it
        let gameBoard = document.getElementById('monopalimBoard');
        //We clear the board
        for(let a = 0; a < 11; a++){
            for (let b = 0; b < 11; b++){
                gameBoard.rows[a].cells[b].innerText = '';
            }
        }
        //We show the new position
        for (let i = 0; i < this.game.playerOrder.length; i++){
            gameBoard.rows[this.game.playerOrder[i].position[0]].cells[this.game.playerOrder[i].position[1]].innerText = i;//Worked first try :D 
            //Will be changed to image after
        }
    }
    displayDice(){//Displaying the dice
        let dice1Value = document.getElementById('dice1');
        let dice2Value = document.getElementById('dice2');
        let diceSum = document.getElementById('diceSum')
        dice1Value.innerText = this.game.dice1;
        dice2Value.innerText = this.game.dice2;
        diceSum.innerText = this.game.dice1 + this.game.dice2;
        return true;
    }

    //wrapped functions
    displayCurrentPlayer(){//Used to set up the turn
        let currentPlayer = document.getElementById('playerName');
        currentPlayer.innerText = this.game.playerOrder[this.game.orderIndex].username;
        return true;
    }

    rollEvent(){//Used for the dice
        if (this.game.isCast){
            return false;//Only 1 roll is available per turn unless counter indication
        }
        //Roll
        this.game.castTheDice();
        this.displayDice();
        //Play
        this.game.play();
        //Update
        this.displayMap();
        this.displayCurrentPlayer();

        return true;//Worked well
    }
}