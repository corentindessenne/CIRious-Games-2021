class questionCard extends card{
    constructor(id, question, answer, correctAnswerId){
        super(id, "question", 0);//Parent constructor
        this.question = question;//The question which will be asked
        this.answer = new Array(4);//Answer possibilities Tab
        for(let i = 0; i < this.answer.length; i++){
            this.answer[i] = answer[i];//Implement it
        }
        this.correctAnswerId = new Array (correctAnswerId.length);//The correct answer ID tab
        for (let i = 0; i < this.correctAnswerId.length; i++){
            this.correctAnswerId[i] = correctAnswerId[i];//Implement it
        }
    }
}