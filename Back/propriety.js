//Each propriety will have an id, a name, a value (for buying purpose), 
//a nutriscore, a color (team), coordinates, a belonging propriety, 
//an img (view purpose) and an upgrade rank (0,1,2).
class propriety {
    constructor(id, name, value, color, x, y, type, income, upgradePrice) {
        //Will be changed in every instance
        this.id = id;
        this.name = name;
        this.value = value;//What does it cost to be bought / rebought.

        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;//Either it's a season propriety or just a regular one : "season" || "classic"
        //Depends the propriety type
        if (this.type === "classic") {
            this.income = new Array(5);//A table of all income possibilities
            for (let i = 0; i < income.length; i++) {
                this.income[i] = income[i];//Index : 0 = plantation, 1 = grocery, 2 = supermarket, 3 = market, 4 = organic shop.
            }
            this.upgradePrice = new Array(4);//A Table of cost for every upgrade
            for (let i = 0; i < upgradePrice.length; i++) {
                this.upgradePrice[i] = upgradePrice[i];//Index : 0 = Upgrade cost for plantation to grocery, 1 = grocery to supermarket, etc...
            }
        }
        else{
            this.income = income;//Income never change
            this.upgradePrice = undefined;//There is no upgrade
        }

        //Default values
        this.belonging = 0;//0 = it belongs to no one, else it belong to the playerd id
        this.nutriscore = 3;//Every Nutriscore is set as 3 by default
        this.upgradeRate = 0;//Every upgrade level is set as 0 by default
        this.image = undefined; //Will be implemented in the view.js file
    }
} 