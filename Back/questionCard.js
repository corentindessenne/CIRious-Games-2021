class questionCard extends card{
    constructor(id, question, answer, correctAnswer){
        super(id, "question", 0);//Parent constructor
        this.question = question;//The question which will be asked
        this.answer = new Array(4);//Answer Tab, only 1 is correct out of 4
        for(let i = 0; i < this.answer.length; i++){
            this.answer[i] = answer[i];//Implement it
        }
        this.correctAnswer = correctAnswer;//The correct answer
    }
}