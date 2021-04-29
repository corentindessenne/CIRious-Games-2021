class communityCard extends card{
    constructor(id, effectType, effect, byTo, string){
        super(id, "community", 0);//Parent constructor
        this.effectType = effectType;//Whether a GoTo, a Get, a Give or a Bonus
        this.effect = effect;//Number, String, Tab
        this.byTo = byTo; //Who gives or receives the money : "bank", "others", "board", "none", ...
        this.string = string;//The String that will be used for the interface
    }
}