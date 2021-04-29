//Each case with an action will have a specified id, different coordinates and will save how many times there were used
class action{
    constructor(id, x, y, type, money){
        //Instance
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type; //Question, Community, Chance, A specified action
        this.money = money;//Money the player wins when he is on the case
        //Default
        this.nbrOfUse = 0;//Count the number of time a player went to an action case
    }
}