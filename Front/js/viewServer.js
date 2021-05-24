class viewServer{
    constructor(player, game, showActions, showUpgrades){
        this.player = player;
        this.game = game;
        this.actionsShow = showActions;
        this.upgradesShow = showUpgrades;
        //Start
        this.displayView();
    }

    displayView(){
        //Top Right box (Game infos)
        this.displayTurnNb(this.game.turnNb);
        this.displayWhoseTurn(this.game.playerOrder[this.game.orderIndex].username);
        this.displayDice(this.game.dice1, this.game.dice2);
        this.displayActionButtons("actions", this.actionsShow);
        this.displayActionButtons("upgrades", this.upgradesShow);
        this.displayJailStatus(this.player);

        //Bottom Right Box (Propriety Tab)
        this.displayProprietyTab(this.player);

        //Top Left Box (Box Info)
        this.displayBoxInfo(this.player);

        //Bottom Left Box (Player's info)
        this.displayMoney(this.player);
        this.displayHb(this.player);
        this.displayFruitBucketPot(this.game.taxesMoney);
    }

    displayTurnNb(turnNb){
        let gameTurnSpan = document.getElementById('gameTurn');

        //Grammar Stuff lul
        if(turnNb < 19){
            gameTurnSpan.innerText = 20 - turnNb + " tours !";
        }
        else{
            gameTurnSpan.innerText = 20 - turnNb + " tour !";
        }
    }
    displayWhoseTurn(username){
        document.getElementById('playerName').innerText = username;
    }
    displayDice(value1, value2){
        //Get them into variables
        let diceDiv = document.getElementById('diceDiv');

        //Create new ones
        let img1 = document.createElement('img');
        let img2 = document.createElement('img');

        //Source
        img1.src = "../assets/img/dice/dice-six-faces-" + (value1) + ".png";
        img2.src = "../assets/img/dice/dice-six-faces-" + (value2) + ".png";

        //Insert it
        diceDiv.replaceChild(img1, diceDiv.children[0]);
        diceDiv.replaceChild(img2, diceDiv.children[1]);

        return true;
    }
    displayActionButtons(which, request){
        let buttonDiv = ""

        if (which === "actions"){
            buttonDiv = document.getElementById('actionButtons');
        }
        else if (which === "upgrades"){
            buttonDiv = document.getElementById('upgradeButtons')
        }
        else{
            console.log("Invalid buttons");
            return false;
        }

        if (request){
            buttonDiv.style.display = "block";
        }
        else{
            buttonDiv.style.display = "none";
        }

        return true;
    }
    displayJailStatus(player){
        if (!player.isJailed) return;
        document.getElementById('jailStatus').innerText = "Vous êtes en prison ! Essayez de faire un double pour vous libérer";
        return true;
    }

    displayProprietyTab(player){
        //Get the tab
        let tab = document.getElementById('propriety');
        let line = 1;
        for (let i = 0; i < player.myPropriety.length; i++){
            if (typeof player.myPropriety[i] !== 'undefined'){
                //"Propriété" cell
                tab.rows[line].cells[0].innerText = player.myPropriety[i].name;
                //"Stade" cell
                let upgradeWord = "";
                switch (player.myPropriety[i].upgradeRate) {
                    case 0:
                        upgradeWord = "Plantation";
                        break;
                    case 1:
                        upgradeWord = "Epicerie";
                        break;
                    case 2:
                        upgradeWord = "Supermarché";
                        break;
                    case 3:
                        upgradeWord = "Marché";
                        break;
                    case 4:
                        upgradeWord = "Magasin Bio";
                        break;
                    default:
                        console.log("Unavailable Upgrade Rate");
                        return false;
                }
                tab.rows[line].cells[1].innerText = upgradeWord;
                //"Apports" cell
                tab.rows[line].cells[2].innerText = player.myPropriety[i].income[player.myPropriety[i].upgradeRate];
                //Incrementing Line
                line++;
            }
        }
    }

    displayBoxInfo(player){
        
    }

    displayMoney(player){
        document.getElementById('playerMoney').innerText = player.money;
    }
    displayHb(player){
        document.getElementById('healthyBar').style.width = player.healthyBar + "%";
    }
    displayFruitBucketPot(value){
        document.getElementById('taxesMoney').innerText = value;
    }
}