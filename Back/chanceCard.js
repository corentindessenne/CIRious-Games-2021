class chanceCard extends card{
    constructor(id, effectType, effect){
        super(id, "chance", 0);//Parent constructor
        this.effectType = effectType;//Whether a GoTo, a Get, a Give or a Bonus
        this.effect = effect;//Object, Number, String
    }
}