//Each case with an action will have a specified id, different coordinates and will save how many times there were used
class action{
    constructor(id, x, y, type){
        //Instance
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type; //Card or Special Effect
        //Default
        this.nbrOfUse = 0;//Count the number of time a player went to an action case
    }
}