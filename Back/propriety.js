//Each propriety will have an id, a name, a value (for buying purpose), 
//a nutriscore, a color (team), coordinates, a belonging propriety, 
//an img (view purpose) and an upgrade rank(0,1,2).
class propriety{
    constructor(id, name, value, color, x, y, image, type){
        //Will be changed in every instance
        this.id = id;
        this.name = name;
        this.value = value;
        this.image = image;
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;//Either it's a season propriety or just a regular one
        //Default values
        this.belonging = 0;//0 = it belongs to no one, else it belong to the playerd id
        this.nutriscore = 3;//Every Nutriscore is set as 3 by default
        this.upgradeRate = 0;//Every upgrade level is set as 0 by default
    }
} 