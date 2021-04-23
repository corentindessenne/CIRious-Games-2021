class monopalim{
    constructor (player1, player2, player3, player4, player5, player6){
        //Initiate players
        this.prePlayerOrder = [];
        this.prePlayerOrder.push(player1);
        this.prePlayerOrder.push(player2);
        this.prePlayerOrder.push(player3);
        this.prePlayerOrder.push(player4);
        if (typeof player5 != 'undefined'){
            this.prePlayerOrder.push(player5);
        }
        if (typeof player6 != 'undefined'){
            this.prePlayerOrder.push(player6);
        }

        //Initate board
        this.board = new board();
    }
}