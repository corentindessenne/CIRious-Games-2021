//Each propriety will have an id, a name, a value (for buying purpose), 
//a nutriscore, a color (team), coordinates, a belonging propriety, 
//an img (view purpose) and an upgrade rank (0,1,2).
class propriety {
    constructor(id, name, value, color, x, y, type, income) {
        //Will be changed on every instance
        this.id = id;//Number
        this.name = name; //String
        this.value = value;//What does it cost to be bought / rebought (can change during the game)
        this.color = color;//"Team" or "Season" the propriety belongs to
        this.x = x;//Coord x
        this.y = y;//Coord y
        this.type = type;//Either it's a season propriety or just a regular one : "season" || "classic"

        //Calculations
        //Depends the propriety type
        if (this.type === "classic") {

            this.income = new Array(5);//A table of all income possibilities, will never change during the game
            //Index : 0 = plantation, 1 = grocery, 2 = supermarket, 3 = market, 4 = organic shop.
            this.income[0] = income; 
            this.income[1] = income * 2;
            this.income[2] = income * 4;
            this.income[3] = income * 1.5;
            this.income[4] = income * 3

            this.price = new Array(5);//A Table of cost for every upgrade, it will never change during the game
            //Index : 0 = buy the plantation, 1 = plantation to Grocery, 2 = Grocery to Supermarket, 3 = plantation to Market, 4 = market to Organic Shop
            this.price[0] = value;
            this.price[1] = value * 2;
            this.price[2] = value * 4;
            this.price[3] = value * 1.5;
            this.price[4] = value * 3.5;
        }
        else{
            this.income = income;//Income never change
            this.price = undefined;//There is no upgrade
        }

        //Default values
        this.belonging = 0;//0 = it belongs to no one, else it belong to the playerd id
        this.nutriscore = 3;//Every Nutriscore is set as 3 by default
        this.upgradeRate = 0;//Every upgrade level is set as 0 by default
        this.image = undefined; //Will be implemented in the view.js file
    }
} 