class player {
    constructor(id, username, height, age){
        this.id = id;//Player id
        this.username = username;//Player username
        this.height = height;//Player's height in centimeters
        this.age = age;//Player's age in year
        
        //Calculations
        this.fca = (220 - this.age) * 0.75;//aerobic hearth rate
        this.pulsation = 60;//Pulsation / minute
        this.ratio = (this.fca / this.pulsation) * 10;//Ratio of the two variables above
        this.weight = (50 - this.ratio) * ((this.height / 100) * (this.height / 100));//Weight calculated if the basic healthy bar = 50
        this.imc = this.weight / ((this.height / 100) * (this.height / 100));//We calculate the imc because it'll be useful in the game
        this.healthyBar = this.imc + this.ratio;//Player HB (around 50 at the start)
        
        //Pre-defined
        this.position = [10, 10];//Player position
        this.money = 1500;//Player money
        this.myPropriety = new Array (25);//Player propriety
        this.state = true; //True = Alive, False = Dead
    }
}