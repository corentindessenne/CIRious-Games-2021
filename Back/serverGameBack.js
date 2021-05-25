/** card.js code **/

//Parent class
class card{
    constructor(id, type, membership){
        this.id = id;//Id of the card
        this.type = type; //Card Type
        this.membership = membership;//If a player has it or not
    }
}

/** chanceCard.js code **/

class chanceCard extends card{
    constructor(id, effectType, effect, byTo, string){
        super(id, "chance", 0);//Parent constructor
        this.effectType = effectType;//Whether a GoTo, a Get, a Give or a Bonus
        this.effect = effect;//Number, String, Tab
        this.byTo = byTo; //Who gives or receives the money : "bank", "others", "board", "none", ...
        this.string = string;//The String that will be used for the interface
    }
}

/** communityCard.js code **/

class communityCard extends card{
    constructor(id, effectType, effect, byTo, string){
        super(id, "community", 0);//Parent constructor
        this.effectType = effectType;//Whether a GoTo, a Get, a Give or a Bonus
        this.effect = effect;//Number, String, Tab
        this.byTo = byTo; //Who gives or receives the money : "bank", "others", "board", "none", ...
        this.string = string;//The String that will be used for the interface
    }
}

/** questionCard.js code **/

class questionCard extends card{
    constructor(id, question, answer, correctAnswerId){
        super(id, "question", 0);//Parent constructor
        this.question = question;//The question which will be asked
        this.answer = new Array(answer.length);//Answer possibilities Tab
        for(let i = 0; i < this.answer.length; i++){
            this.answer[i] = answer[i];//Implement it
        }
        this.correctAnswerId = new Array (correctAnswerId.length);//The correct answer ID tab
        for (let i = 0; i < this.correctAnswerId.length; i++){
            this.correctAnswerId[i] = correctAnswerId[i];//Implement it
        }
    }
}

/** action.js code **/

//Each case with an action will have a specified id, different coordinates and will save how many times there were used
class action{
    constructor(id, x, y, type, money){
        //Instance
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type; //Question, Community, Chance, A specified action
        this.money = money;//Money the player wins when he is on the case
        //Default
        this.nbrOfUse = 0;//Count the number of time a player went to an action case
    }
}

/** propriety.js code **/

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
            this.price[4] = value * 3;
        }
        else{
            this.income = [income];//Income never change
            this.price = [value];//There is no upgrade
        }

        //Default values
        this.belonging = "none";//it belongs to no one, else it belong to the players id
        this.nutriscore = 3;//Every Nutriscore is set as 3 by default
        this.upgradeRate = 0;//Every upgrade level is set as 0 by default
        this.image = undefined; //Will be implemented in the view.js file
    }
}

/** board.js code **/

/* This class will set up propriety class & action class for a future use in the board class */
/* x = line, y = column */
//Special caractere : À
class board{
    constructor() {
        //Init the tab for every cards
        this.ccTab = new Array (19);
        this.chTab = new Array (20);
        this.qTab = new Array (30);

        //communityCard tab
        /* GET CARDS */
        this.ccTab[0] = new communityCard(0, "get", 100, "bank", "Vous héritez de 100 blés.");//Player gets 100b
        this.ccTab[1] = new communityCard(1, "get", 40, "others", "C’est votre anniversaire, chaque joueur vous offre 40 blés.");//Player gets 40b by the others
        this.ccTab[2] = new communityCard(2, "get", 25, "bank", "Commission d’agriculteur, recevez 25 blés.");
        this.ccTab[3] = new communityCard(3, "get", 20, "bank", "Ticket de réduction à votre magasin bio favoris ! On vous rembourse 20 blés.");
        this.ccTab[4] = new communityCard(4, "get", 100, "bank", "Le court du salsifis a augmenté. Recevez 100 blés.");
        this.ccTab[5] = new communityCard(5, "get", 100, "bank", "Votre assurance vie vous rembourse 100 Blés.");
        this.ccTab[6] = new communityCard(6, "get", 10, "bank", "Vous avez fini deuxième au marathon de Lille. Recevez 10 blés.");
        this.ccTab[7] = new communityCard(7, "get", 50, "bank", "La vente de votre petit potager vous rapporte 50 blés.");
        this.ccTab[8] = new communityCard(8, "get", 200, "bank", "Le personnel du magasin bio n’a pas bien calculé le montant de vos courses. Recevez 200 blés.");
        /* GIVE CARDS */
        this.ccTab[9] = new communityCard (9, "give", 50, "bank", "Payez la note du médecin de 50 blés.");
        this.ccTab[10] = new communityCard (10, "give", 50, "bank", "Payez une amende de 50 blés.");
        this.ccTab[11] = new communityCard (11, "give", 100, "bank", "Vous faites les courses du mois de votre famille. Payez 100 blés.");
        this.ccTab[12] = new communityCard (12, "give", 50, "bank", "Frais de scolarité. Payez 50 Blés.");
        this.ccTab[13] = new communityCard (13, "give", "75*", "bank", "Rénovez vos marchés, magasin bio, grande surface et épiceries. Payez 75 blés pour chaque.");//Exception à gérer
        /* GO TO CARDS */
        this.ccTab[14] = new communityCard (14, "goto", [10, 0], "none", "Allez à la diète, sans passer par la case départ.");
        this.ccTab[15] = new communityCard (15, "goto", [4, 0], "none", "Avancez jusqu’à la rue de l’œil au beurre noir.");
        this.ccTab[16] = new communityCard (16, "goto", [10, 0], "none", "Votre nutritionniste vous a surpris dans un tacos à volonté, avancez tout droit en diète, ne passez pas par la case départ, ne recevez pas 200 blés.");
        this.ccTab[17] = new communityCard (17, "goto", [10, 10], "none", "Avancez jusqu’à la case départ. Recevez 400 blés. ");
        /* SPECIAL CARD */
        this.ccTab[18] = new communityCard (18, "special", "freedom", "none", "Cheatmeal autorisé ! Cette carte peut être conservée pour une future utilisation ou être revendue 50 blés.");

        //chanceCard tab
        /* GET CARDS */
        this.chTab[0] = new chanceCard(0, "get", 50, "bank", "C’est le jour des patates ! Touchez 50 blés.");
        this.chTab[1] = new chanceCard(1, "get", 200, "bank", "Vous avez gagné le prix du repas le plus équilibré, recevez 200 blés.");
        this.chTab[2] = new chanceCard(2, "get", 50, "bank", "Déstockage de carotte. Recevez 50 blés.");
        this.chTab[3] = new chanceCard(3, "get", 100, "bank", "N’ayant pas fait d’écart nutritionnel depuis un certain temps, la nutritionniste officielle de MONOPALIM décide de vous récompenser. Toucher 100 blés.");
        /* GIVE CARDS */
        this.chTab[4] = new chanceCard (4, "give", 50, "taxes", "Payez pour frais de fast-food, 50 blés.");
        this.chTab[5] = new chanceCard (5, "give", 50, "taxes", "Amende pour excès de calories, vous devez 50 blés.");
        this.chTab[6] = new chanceCard (6, "give", 100, "taxes", "Amende pour ivresse sur la voie publique, vous devez 100 blés.");
        this.chTab[7] = new chanceCard (7, "give", 135, "taxes", "Amende pour non-respect du couvre-feu, vous devez 135 blés.");
        this.chTab[8] = new chanceCard (8, "give", 50, "taxes", "Vous vous êtes fait rouler dans la farine. Versez 50 blés à chaque joueur.");
        this.chTab[9] = new chanceCard (9, "give", "60*", "bank", "Rénovez vos marchés, magasin bio, grande surface et épiceries. Payez 60 blés pour chaque.");
        /* GO TO CARDS */
        this.chTab[10] = new chanceCard(10, "goto", [10, 10], "none", "Parce qu’un petit footing ne fait jamais de mal, retournez à la case départ et touchez 400 blés.");
        this.chTab[11] = new chanceCard(11, "goto", [9, 10], "none", "Des amis vous appellent et vous donnent un rendez-vous, avenue de la paix-ro.");
        this.chTab[12] = new chanceCard(12, "goto", [7, 0], "none", "Rendez-vous à l’AVENUE DANS LES POMMES, si vous passez par la case départ touchez 200 blés.");
        this.chTab[13] = new chanceCard(13, "goto", [0, 1], "none", "Rendez-vous à l’AVENUE DU COEUR D\'ARTICHAUT, si vous passez par la case départ touchez 200 blés.");
        this.chTab[14] = new chanceCard(14, "goto", "-3", "none", "Reculez de trois cases.");
        this.chTab[15] = new chanceCard(15, "goto", [10, 0], "none", "Votre médecin vous envoie en diète sans passer par la case départ.");
        this.chTab[16] = new chanceCard(16, "goto", "+S", "none", "Avancez jusqu’à la saison la plus proche. Si elle n’appartient à personne, vous pouvez l’acheter. Si elle appartient à un joueur vous devez lui payer deux fois le loyer demandé.");
        this.chTab[17] = new chanceCard(17, "goto", "+S", "none", "Avancez jusqu’à la saison la plus proche. Si elle n’appartient à personne, vous pouvez l’acheter. Si elle appartient à un joueur vous devez lui payer deux fois le loyer demandé.");
        this.chTab[18] = new chanceCard(18, "goto", "+Q", "none", "Etant un grand sportif, on décide de vous interviewer pour le journal de 20h. Avancez jusqu’à la prochaine case Question.");
        /* SPECIAL CARD */
        this.chTab[19] = new chanceCard(19, "special", "freedom", "none", "Cheatmeal autorisé ! Cette carte peut être conservée pour une future utilisation ou être revendue.");

        //questionCard tab
        this.qTab[0] = new questionCard(0, "Comment inciter les enfants à manger des légumes ?", ["Les enfants peuvent se passer des légumes", "Il faut les forcer et les disputer s’ils ne finissent pas leur assiette", "Il faut mélanger les légumes avec quelque chose qu’ils mangent avec plaisir"], [2]);
        this.qTab[1] = new questionCard(1, "Quel repas est le plus important de la journée ?", ["Le petit-déjeuner", "Déjeuner", "Goûter", "Dîner"], [0]);
        this.qTab[2] = new questionCard(2, "Combien de repas doit-on prendre par jour ? ", ["1", "2", "3", "4"], [2]);
        this.qTab[3] = new questionCard(3, "Lequel de ces aliments n’est pas un féculent en diététique ?", ["Choux-fleurs", "Maïs", "Lentilles", "Pdt"], [0]);
        this.qTab[4] = new questionCard(4, "Quelle est la consommation idéale de poisson ?", ["1 fois par semaine", "2 fois par semaine", "3 fois par semaine"], [1]);
        this.qTab[5] = new questionCard(5, "Est-ce que sauter le petit déjeuner fait maigrir ?", ["Oui, manger moins a pour conséquence de prendre moins de poids", "Non, car il rompt le jeun de la nuit et permet de donner à l’organisme l’énergie nécessaire pour la matinée"], [1]);
        this.qTab[6] = new questionCard(6, "Quelle est la cause de la prise de poids chez les Français lors du premier confinement ?", ["Manque considérable d’activité physique", "Top Chef"], [0]);
        this.qTab[7] = new questionCard(7, "Combien de litres d’eau est-il conseillé de boire par jour ?", ["3", "1.5", "4", "0.5"], [1]);
        this.qTab[8] = new questionCard(8, "D’après vous, combien de fois peut-on manger fast-food ?", ["2 fois par mois", "4 fois par mois", "1 fois par jour", "365 à 366 fois par an"], [0]);
        this.qTab[9] = new questionCard(9, "L’IMC doit normalement être compris entre :", ["15-20", "20-25", "25-30", "30-35"], [1]);
        this.qTab[10] = new questionCard(10, "Quelle est la proportion d’eau dans ton corps ?", ["45%", "65%", "85%", "30%"], [1]);
        this.qTab[11] = new questionCard(11, "Dois-je manger deux fois le soir lorsque je n’ai pas mangé le midi ?", ["Oui, il faut compenser l’absence du midi", "Non, la digestion sera beaucoup plus compliquée si l’on mange deux fois."], [1]);
        this.qTab[12] = new questionCard(12, "Quelle est la consommation idéale de viande ?", ["Moins de 4 fois par semaine", "4 à 7 fois par semaine", "Plus de 7 fois par semaine"], [1]);
        this.qTab[13] = new questionCard(13, "Est-ce que l’huile d’olive est bonne pour la santé ?", ["Oui, elle permet de prévenir les maladies cardiovasculaires", "Non, c’est un aliment qui fait prendre du poids"], [0]);
        this.qTab[14] = new questionCard(14, "Les produits laitiers sont les aliments les plus riches en calcium.", ["Vrai", "Faux"], [0]);
        this.qTab[15] = new questionCard(15, "Quel est le pourcentage d’enfants en surpoids ?", ["5%", "10%", "20%", "30%"], [0]);
        this.qTab[16] = new questionCard(16, "Le sel est-il dangereux pour la santé ?", ["Oui, lorsque on en met dans tous ses plats", "Non, il est même vital pour notre organisme"], [1]);
        this.qTab[17] = new questionCard(17, "Est-ce vrai qu’un étudiant sur 5 ne mange que 2 repas par jour ?", ["Oui", "Non"], [0]);
        this.qTab[18] = new questionCard(18, "Quelle est la première cause de l’obésité ?", ["Facteurs génétiques", "Facteurs psychologiques", "Insuffisance des dépenses énergétiques quotidiennes"], [0]);
        this.qTab[19] = new questionCard(19, "Quelle conséquence a l’alcool sur votre santé ?", ["Allongement de la vie", "Risque de cancers"], [1]);
        this.qTab[20] = new questionCard(20, "Est-ce que le gras est essentiel à une bonne alimentation ?", ["Oui, il faut manger contenant des bonnes graisses : les oméga 3", "Non, il ne favorise uniquement notre prise de graisse corporelle"], [0]);
        this.qTab[21] = new questionCard(21, "Qu’est ce que favorise l’apport de céréales complètes dans notre organisme ?", ["Elles permettent d’éviter le grignotage et sont beaucoup plus rassasiantes", "Les céréales complètes ne sont utiles en rien à notre organisme"], [0]);
        this.qTab[22] = new questionCard(22, "Quel est l’effet d’une plus grande exposition au soleil ?", ["C’est nécessaire afin de favoriser un apport plus important en vitamine D", "Le soleil n’a pas de rapport avec notre équilibre alimentaire"], [0]);
        this.qTab[23] = new questionCard(23, "Quel type de cuisson faut-il favoriser et pourquoi ?", ["La cuisson forte car elle permet de gagner du temps et donc de manger plus vite", "La cuisson à vapeur et à basse température dégrade moins les vitamines et les oligoéléments"], [1]);
        this.qTab[24] = new questionCard(24, "Qu’est ce que l’effet dit « yo-yo » lors d’un régime amincissant ?", ["Le risque élevé de reprendre du poids à la suite d’un régime", "Le risque de ne pas réussir à finir son régime"], [0]);
        this.qTab[25] = new questionCard(25, "Quelles sont les conséquences psychologiques d’un régime amincissant ?", ["Stress", "Distraction", "Aucun", "Alcool"], [0, 1, 3]);
        this.qTab[26] = new questionCard(26, "Quel est la durée idéale d’un repas et dans quelles conditions ?", ["Assis, pendant au moins 20 minutes", "Dans n’importe quelle position pendant au moins 10 minutes"], [0]);
        this.qTab[27] = new questionCard(27, "Quel est l’intérêt de la cuisine dîtes « maison » pour avoir un équilibre alimentaire ?", ["Elle permet d’apprendre de nouvelles recettes et d’améliorer ses compétences de cuisinier", "C’est une très bonne façon de garder le contrôle sur le contenu de son assiette"], [1]);
        this.qTab[28] = new questionCard(28, "Quel est le plus grand prédateur de l’équilibre alimentaire ?", ["Le grignotage entre les repas", "Philippe Etchebest"], [0]);
        this.qTab[29] = new questionCard(29, "Quel est le fruit qui apporte le plus de vitamine C ?", ["Le kiwi", "L’orange", "La banane"], [0]);

        //Init the 11x11 grid
        this.grid = new Array(11);
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i] = new Array (11);
        }
        //Init every case of the grid that we will use
        /* First Parcel */
        //Done
        this.grid[10][10] = new action (0, 10, 10, "start", 400);//Exception à gérer
        this.grid[10][9] = new propriety (0, "AVENUE DE LA BOUCHÉE DE PAIN", 15, "orange", 10, 9, "classic", 2);
        this.grid[10][8] = new action (1, 10, 8, "community", 0);
        this.grid[10][7] = new propriety (1, "RUE DE LA POIRE EN DEUX", 15, "orange", 10, 7, "classic", 4);
        this.grid[10][6] = new action (2, 10, 6, "question", 0);
        this.grid[10][5] = new propriety (2, "AUTOMNE", 200, "orange", 200, 5, "season", 50);
        this.grid[10][4] = new propriety (3, "BOULEVARD DE LA TÊTE D'OEUF", 25, "orange", 10, 4, "classic", 6);
        this.grid[10][3] = new action (3, 10, 3, "chance", 0);
        this.grid[10][2] = new propriety (4, "RUE SERRÉE COMME DES SARDINES", 25, "orange", 10, 2, "classic", 6);
        this.grid[10][1] = new propriety (5, "AVENUE DE L\'EAU À LA BOUCHE", 30, "orange", 10, 1, "classic", 8);
        this.grid[10][0] = new action (4, 10, 0, "visitPrison", 0);//Exception à gérer

        /* Second Parcel */
        this.grid[9][0] = new propriety (6, "BOULEVARD DE LA MAIN À LA PÂTE", 35, "blanc", 9, 0, "classic", 10);
        this.grid[8][0] = new action (5, 8, 0, "question", 0);
        this.grid[7][0] = new propriety (7, "AVENUE DANS LES POMMES", 35, "blanc", 7, 0, "classic", 10);
        this.grid[6][0] = new propriety (8, "RUE DES CAROTTES CUITES", 40, "blanc", 6, 0, "classic", 12);
        this.grid[5][0] = new propriety (9, "HIVER", 200, "blanc", 5, 0, "season", 50);
        this.grid[4][0] = new propriety (10, "RUE DE L\'OEIL AU BEURRE NOIR", 40, "blanc", 4, 0, "classic", 14);
        this.grid[3][0] = new action (6, 3, 0, "community", 0);
        this.grid[2][0] = new propriety (11, "AVENUE DU COQ EN PÂTE", 45, "blanc", 2, 0, "classic", 14);
        this.grid[1][0] = new propriety (12, "PLACE DE L\'EAU DANS LE VIN", 50, "blanc", 1, 0, "classic", 16);
        this.grid[0][0] = new action (7, 0, 0, "getStockedBasket", 0);//Exception à gérer

        /* Third Parcel */
        this.grid[0][1] = new propriety (13, "AVENUE DU COEUR D\'ARTICHAUT", 55, "vert", 0, 1, "classic", 18);
        this.grid[0][2] = new action (8, 0, 2, "chance", 0);
        this.grid[0][3] = new propriety (14, "RUE DE LA BOUFFÉE D\'AIL FRAIS", 55, "vert", 0, 3, "classic", 18);
        this.grid[0][4] = new propriety (15, "BOULEVARD MI-FIGUE MI-RAISIN", 60, "vert", 0, 4, "classic", 20);
        this.grid[0][5] = new propriety (16, "PRINTEMPS", 200, "vert", 0, 5, "season", 50);
        this.grid[0][6] = new propriety (17, "FAUBOURG DE LA BREBIS ÉGARÉE", 65, "vert", 0, 6, "classic", 22);
        this.grid[0][7] = new propriety (18, "PLACE DE L\'ARÊTE DANS LE BIFSTEAK", 65, "vert", 0, 7, "classic", 22);
        this.grid[0][8] = new action (9, 0, 8, "question", 0);
        this.grid[0][9] = new propriety (19, "RUE DE LA BOISSON D\'AVRIL", 70, "vert", 0, 9, "classic", 24);
        this.grid[0][10] = new action (10, 0, 10, "gotoPrison", 0);//Exception à gérer

        /* Fourth Parcel */
        this.grid[1][10] = new propriety (20, "AVENUE DU GRAIN A MOUDRE", 75, "jaune", 1, 10, "classic", 26);
        this.grid[2][10] = new propriety (21, "AVENUE DU MELON", 75, "jaune", 2, 10, "classic", 26);
        this.grid[3][10] = new action (11, 3, 10, "community", 0)
        this.grid[4][10] = new propriety (22, "IMPASSE DU CHOU BLANC", 80, "jaune", 4, 10, "classic", 28);
        this.grid[5][10] = new propriety (23, "ETE", 200, "jaune", 5, 10, "season", 50);
        this.grid[6][10] = new action (12, 6, 10, "chance", 0);
        this.grid[7][10] = new propriety (24, "AVENUE DU DINDON DE LA FARCE", 90, "jaune", 7, 10, "classic", 35);
        this.grid[8][10] = new action (13, 8, 10, "question", 0);
        this.grid[9][10] = new propriety (25, "RUE DE LA PAIX-RO", 100, "jaune", 9, 10, "classic", 50);
        //Then we return to the start
    }
}

/** player.js code **/

class player {
    constructor(id, username, height, age, character, color){
        this.id = id;//Player id
        this.username = username;//Player username
        this.height = height;//Player's height in centimeters
        this.age = age;//Player's age in year
        this.character = character;//Design purpose
        this.color = color;//Design Purpose

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
        this.myPropriety = new Array (26);//Player propriety
        this.myCards = [];//Player's card like a freedom of diet
        this.state = true; //True = Alive, False = Dead
        this.isJailed = false; //Is the player in jail or not
        this.timeJailed = 0;//Nb of turn a player has been jailed
        this.turnNb = 0;//Nb of turn a player made
        this.proprietyHb = 0;//Initiated at 0 because we start without any propriety
        this.doubleNb = 0;

        //Used for end Game
        this.rankPoints = 0;
    }
}

/** monopalim.js code **/

class monopalim{
    constructor (player1, player2, player3, player4, player5, player6){
        //Will also be used as a "preOrderTab" in a future part (bonus)
        this.playerTab = [];
        this.playerTab.push(new player(player1[0], player1[1], player1[2], player1[3], player1[4], player1[5]));
        this.playerTab.push(new player(player2[0], player2[1], player2[2], player2[3], player2[4], player2[5]));
        this.playerTab.push(new player(player3[0], player3[1], player3[2], player3[3], player3[4], player3[5]));
        if (typeof player4 != 'undefined'){
            this.playerTab.push(new player(player4[0], player4[1], player4[2], player4[3], player4[4], player4[5]));
        }
        if (typeof player5 != 'undefined'){
            this.playerTab.push(new player(player5[0], player5[1], player5[2], player5[3], player5[4], player5[5]));
        }
        if (typeof player6 != 'undefined'){
            this.playerTab.push(new player(player6[0], player6[1], player6[2], player6[3], player6[4], player6[5]));
        }

        this.playerRanking = [];

        //Initiate players order
        this.initPlayerOrder(this.playerTab);

        //Player order Index
        this.orderIndex = 0;

        //initiate the double dice (Value between 1 & 6 each) & the value associated
        this.dice1 = 1;
        this.dice2 = 1;
        this.castValue = this.dice1 + this.dice2;
        this.isCast = false;

        //Initate board
        this.board = new board();
        this.upgradeRequest = undefined;//grocery / supermarket / market / organic shop
        this.selectedCase = undefined;
        this.hasMoved = false;
        this.taxesMoney = 0;
        this.turnNb = 0;//We start at turn 0

        //Initiate the cards index
        this.qIndex = Math.floor(Math.random() * 29);
        this.ccIndex = Math.floor(Math.random() * 18);
        this.chIndex = Math.floor(Math.random() * 19);
        this.currentAnswer = [];
        this.isFinished = false; //Game just started
    }

    getCast(){ return this.isCast; }
    getCastValue(){ return this.castValue; }
    getIsFinished(){ return this.isFinished; }
    getPlayer(index){ return this.playerTab[index]; }
    getPlayerUsername(index){ return this.playerTab[index].username; }
    getOrderIndex() { return this.playerOrder[this.orderIndex]; }
    getOrderIndexUsername() { return this.playerOrder[this.orderIndex].username; }
    getBoard(){ return this.board; }

    setUpgrade(upgradeChoice){ this.upgradeRequest = upgradeChoice; }

    //Initialisation Function
    //Tested and functional
    initPlayerOrder(objectTab){
        let randomIndex = 0;
        //Generate every Index possibility
        let possibleIndex = [0, 1, 2];
        if(objectTab.length > 3) {
            possibleIndex.push(3);
            if (objectTab.length > 4) {
                possibleIndex.push(4);
                if (objectTab.length > 5) {
                    possibleIndex.push(5);
                }
            }
        }
        //Generate the order tab
        this.playerOrder = new Array (objectTab.length);
        for (let i = 0; i < objectTab.length; i++){
            randomIndex = Math.floor(Math.random() * (possibleIndex.length - 1));//Take a number between 0 & nbr of index available
            //The first player is the one that ha the same id as "random index"
            this.playerOrder[i] = objectTab[possibleIndex[randomIndex]];
            //Delete the used index
            possibleIndex.splice(randomIndex, 1);
        }
        return true;
    }

    //Check Function
    isUpgradeable(box){
        return !(typeof box.color === 'undefined' || box.upgradeRate === 2 || box.upgradeRate === 4 || box.type === "season");
    }

    checkState(player){
        //Full check
        if ((player.healthyBar <= 0 || player.money <= 0) && player.state){
            player.state = false;//Update player state
            this.playerRanking[i].push(player);//Push him into the ranking tab
            this.playerTab.splice(player.id, 1);//Delete him from the player tab
            //Checking in the order tab
            for (let j = 0; j < this.playerOrder.length; j++){
                //If we find the right player
                if (this.playerOrder[j].id === player.id){
                    this.playerOrder.splice(j, 1);//Deleting him
                }
            }

            //Changing turn
            this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;

            return true;//Something changed
        }
        return false;//nothing changed
    }

    checkEnd(){
        this.playerTab.forEach(element => this.checkState(element));

        if (this.playerTab.length <= 1 || this.turnNb >= 20){
            this.isFinished = true;
            this.makeRanking();
            return true;
        }
        return false;
    }

    makeRanking(){
        let tempTab = [];
        for (let i = 0; i < this.playerTab.length; i++){
            this.playerTab[i].rankPoints = this.playerTab[i].healthyBar * 20 + this.playerTab[i].money
            tempTab.push(this.playerTab[i]);
        }
        //Sort elements
        tempTab.sort((a, b) => a.rankPoints - b.rankPoints);
        //Elements implemented
        tempTab.forEach(element => this.playerRanking.push(element));
        return true;
    }

    //Actions in the game
    castTheDice(){
        //Roll the dice !
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        /* Test Purpose*/
        //this.dice1 = 2;
        //this.dice2 = 2;
        this.castValue = this.dice1 + this.dice2;

        //Jail speciality
        if (this.dice2 === this.dice1){
            this.playerOrder[this.orderIndex].doubleNb++;
            //Going to jail
            if (this.playerOrder[this.orderIndex].doubleNb === 3){
                this.playerOrder[this.orderIndex].position = [10, 0];
                this.playerOrder[this.orderIndex].isJailed = true;
                this.isCast = false;
                this.orderIndex = (this.orderIndex + 1) %5;
                return true;
            }
        }
        this.isCast = true;
        return true;
    }

    selectCase(x, y){
        this.selectedCase = this.board.grid[x][y];
    }

    requestUpgrade(upgrade){
        this.upgradeRequest = upgrade;
    }

    pay(payer, amount, paid){
        if (payer.money < amount){
            return false;
        }

        payer.money -= amount;

        switch (paid) {
            case "bank":
                break;
            case "taxes":
                this.taxesMoney += amount;
                break;
            default:
                paid.money += amount;
                break;
        }

        return true;
    }

    //Tested and functional
    buyAction(player, box){
        if (box.belonging !== "none"){
            return this.redeemAction(player, box);
        }

        if (player.money >= box.price[box.upgradeRate]){
            //Pays the propriety
            this.pay(player, box.price[box.upgradeRate], "bank");
            //Makes the board know
            box.belonging = player.id;
            //Gets the propriety
            player.myPropriety[box.id] = box;
            return true;//Bought
        }
        return false;//Not Bought
    }

    //Tested and functional
    redeemAction(player, box){
        if (box.belonging === "none"){
            return this.buyAction(player, box);
        }
        //Buying a propriety back is double the price of the actual upgrade
        if (player.money >= box.price[box.upgradeRate] * 2){
            //Pays the propriety
            this.pay(player, box.price[box.upgradeRate] * 2, this.playerTab[box.belonging]);
            //Removes the propriety of the ex owner
            this.playerTab[box.belonging].myPropriety[box.id] = undefined;
            //Makes the board know
            box.belonging = player.id;
            //Gets the propriety
            player.myPropriety[box.id] = box;
            return true;//Bought
        }
        return false;//Not bought
    }

    //Tested and functional
    upgradeAction(player, box){
        //Check if the propriety belongs to the right user
        if (player.id !== box.belonging){
            return this.buyAction(player, box);
        }
        if (typeof this.upgradeRequest === 'undefined' || !this.isUpgradeable(box)){
            return false;
        }

        //Switch the string to a number
        let upgradeId = 0;
        switch (this.upgradeRequest) {
            case "grocery":
                upgradeId = 1;
                break;
            case "supermarket":
                upgradeId = 2;
                break;
            case "market":
                upgradeId = 3;
                break;
            case "organic shop":
                upgradeId = 4;
                break;
        }

        //Check if upgrade is valid
        if (box.upgradeRate !== 0 && (box.upgradeRate - upgradeId >= 2 || box.upgradeRate - upgradeId <= -2)){
            return false;
        }

        box.upgradeRate = upgradeId;
        this.pay(this.playerOrder[this.orderIndex], box.price[upgradeId], "bank");
        return true;
    }

    askQuestion(){
        return this.board.qTab[this.qIndex].question;
    }

    //Tested and functional
    playerRelease(player){
        if (this.dice1 !== this.dice2){
            this.pay(player, 50, "taxes");
        }
        player.isJailed = false;
        player.timeJailed = 0;
        player.doubleNb = 0;
        return true;//Player can play
    }

    //Functional
    findNearest(player, locationType){
        while (this.board.grid[player.position[0]][player.position[1]].type !== locationType){
            this.move(player, 1);
        }
        return true;
    }

    //Functional
    updateTurnNb(){
        let maxTurn = 21;
        //Checking with every player
        for (let i = 0; i < this.playerTab.length; i++){
            //If we find a lower nb of turn
            if (this.playerTab[i].turnNb < maxTurn){
                maxTurn = this.playerTab[i].turnNb;
            }
        }
        //After the loop we implement the "turn"
        this.turnNb = maxTurn;
    }

    //Major function that deals with the HB, functional
    updatePlayersHb(){
        //update on proprietyStats for every player
        this.updateProprietyHb();

        //Update on each player
        for (let i = 0; i < this.playerTab.length; i++){
            //Update on life stats
            this.playerTab[i].ratio = (this.playerTab[i].fca / this.playerTab[i].pulsation) * 10;
            this.playerTab[i].imc = this.playerTab[i].weight / ((this.playerTab[i].height / 100) * (this.playerTab[i].height / 100));
            //Final addition
            this.playerTab[i].healthyBar = this.playerTab[i].imc + this.playerTab[i].ratio + this.playerTab[i].proprietyHb;
        }
    }

    //Functional
    updateProprietyHb(){
        let totalPropHb = 0;
        //For every player
        for (let i = 0; i < this.playerTab.length; i++){
            totalPropHb = 0;
            //For every propriety a player has
            for (let j = 0; j < this.playerTab[i].myPropriety.length; j++){
                if (typeof this.playerTab[i].myPropriety[j] !== 'undefined'){
                    totalPropHb += 2 + 2 * this.playerTab[i].myPropriety[j].upgradeRate;
                }
            }
            this.playerTab[i].proprietyHb = totalPropHb;
        }
    }

    //Core functions

    //TESTED AND FUNCTIONAL
    move(player, castValue){
        if (player.isJailed || !player.state){
            return true;
        }

        //If player is on the first parcel
        if (player.position[0] === 10){
            //If player is exceeding the parcel
            if(player.position[1] - castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = castValue - player.position[1];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    player.position = [0, restValue];
                }

                else {
                    player.position = [10 - restValue, 0];
                }
            }

            else {
                player.position = [10, player.position[1] - castValue];
            }
        }
        //Same but on the second parcel
        else if (player.position[1] === 0){
            //If player is exceeding the parcel
            if(player.position[0] - castValue < 0){
                //New Cast value after crossing the last parcel
                let restValue = castValue - player.position[0];

                //If still exceeding the actual parcel
                if (restValue > 10){
                    restValue -= 10;
                    player.position = [restValue, 10];
                }

                else {
                    player.position = [0, restValue];
                }
            }

            else {
                player.position = [player.position[0] - castValue, 0];
            }
        }
        //Same but on the third parcel
        else if (player.position[0] === 0) {
            //If player is exceeding the parcel
            if(player.position[1] + castValue > 10){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (castValue + player.position[1]);//Negative number

                //If still exceeding the actual parcel
                if (restValue < -10){
                    restValue += 10;
                    player.position = [10, 10 + restValue];
                }

                else {
                    player.position = [-restValue, 10];
                }
            }

            else {
                player.position = [0, player.position[1] + castValue];
            }
        }
        //Same but on the fourth parcel
        else if (player.position[1] === 10){
            //If player is exceeding the parcel
            if(player.position[0] + castValue > 10){
                //New Cast value after crossing the last parcel
                let restValue = 10 - (castValue + player.position[0]);//Negative Number

                //If still exceeding the actual parcel
                if (restValue < -10){
                    restValue += 10;
                    player.position = [10 + restValue, 0];
                }

                else {
                    player.position = [10, 10 + restValue];
                }
            }

            else {
                player.position = [player.position[0] + castValue, 10];
            }
        }
        //Bug
        else{
            console.log("Player not on the board");
            return false; //Didn't move
        }

        //Special Start interaction
        if(player.position[0] === 10 && player.position[1] === 10){
            //Money
            player.money += 200;
            //Turn stuff
            player.turnNb++;
            this.updateTurnNb();
            //Hb stuff
            player.weight -= 0.5;
            player.pulsation += 2;
        }

        return true;
    }

    endTurn(){
        this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;
        this.isCast = false;
        this.upgradeRequest = undefined;
        this.hasMoved = false;
        return true;
    }

    //Tested and functional
    jailInteraction(player){
        //Player can play
        if (!player.isJailed){
            return true;
        }
        if (!this.isCast){
            return false;
        }

        if (this.dice1 !== this.dice2){
            if (player.timeJailed < 3){
                player.timeJailed++;
                this.endTurn();
                return false;//Player can't play
            }
        }
        return this.playerRelease(player);
    }

    //Need Test and almost completed
    actionInteraction(box){
        //There are many different type of action box
        switch (box.type) {
            //First of all the player is getting asked for the question, then he answers, then the interaction is made depending on the answer
            case "question":
                return this.askQuestion();
            //Just making an interaction function with those two
            case "chance":
                return this.chanceInteraction(this.playerOrder[this.orderIndex]);
            case "community":
                return this.communityInteraction(this.playerOrder[this.orderIndex]);
            //Special interaction
            default:
                return this.specialInteraction(this.playerOrder[this.orderIndex], box);
        }
    }

    //Finished and need tests
    answerInteraction(player, question){
        if (typeof this.currentAnswer[0] === 'undefined'){
            console.log("No Answer");
            return false;
        }

        //Money the player wins
        let pot = 0;
        //Answers check
        for(let i = 0; i < question.correctAnswerId.length; i++){
            //If he doesn't find the right answer
            if (typeof this.currentAnswer[i] === 'undefined' || question.answer[question.correctAnswerId[i]] !== this.currentAnswer[i]){
                this.qIndex = (this.qIndex + 1) % 30;
                //Erasing current Answer Array
                let jLength = this.currentAnswer.length;
                for (let j = 0; j < jLength; j++){
                    this.currentAnswer.pop();
                }
                return false;
            }
            //Every good answer make the pot grow
            else{
                pot+=50;
            }
        }

        //Passing the check means he gets paid
        player.money += pot;
        //Changing question
        this.qIndex = (this.qIndex + 1) % 30;
        return true;
    }

    //Functional / Finished
    chanceInteraction(player){
        //There are different type of chance card
        switch (this.board.chTab[this.chIndex].effectType) {
            //Player wins money
            case "get":
                player.money += this.board.chTab[this.chIndex].effect;
                break;
            //Player gives money
            case "give":
                //Special interaction depending on player's propriety
                if (this.board.chTab[this.chIndex].effect === "60*"){
                    let pot = 0;
                    for (let i = 0; i < player.myPropriety.length; i++){
                        //Player pays 60b for each propriety that has an upgrade
                        if (typeof player.myPropriety[i] !== 'undefined' && player.myPropriety[i].upgradeRate > 0){
                            pot += 60;
                        }
                    }
                    this.pay(player, pot, this.board.chTab[this.chIndex].byTo);
                }
                //Regular interaction
                else{
                    this.pay(player, this.board.chTab[this.chIndex].effect, this.board.chTab[this.chIndex].byTo);
                }
                break;
            //Player is moving
            case "goto":
                //Regular interaction
                if (typeof this.board.chTab[this.chIndex].effect[0] !== 'string'){
                    player.position = this.board.chTab[this.chIndex].effect;
                }
                //Special interaction
                else{
                    //Player steps back
                    if (this.board.chTab[this.chIndex].effect === "-3"){
                        if (player.position === [0, 2]){
                            player.position = [1, 0];
                        }
                        else{
                            this.move(player, -3);
                        }
                    }
                    //Player goes to the nearest point
                    else if (this.board.chTab[this.chIndex].effect === "+S"){
                        this.findNearest(player, "season");
                    }
                    else{
                        this.findNearest(player, "question");
                    }
                }
                //If the player has been move to this location
                if (player.position === [10, 0]){
                    player.isJailed = true;
                }
                this.executeInteraction(player);
                break;
            //Player gets a free diet card
            case "special":
                player.myCards.push(this.board.chTab[this.chIndex].effect);
                break;
        }

        //Random index between 0 & 19
        this.chIndex = Math.floor(Math.random() * 19);

        return true;
    }

    //Need Tests / Finished
    communityInteraction(player){
        //There are different type of community card
        switch (this.board.ccTab[this.ccIndex].effectType) {
            //Player wins money
            case "get":
                player.money += this.board.ccTab[this.ccIndex].effect;
                break;
            //Player gives money
            case "give":
                //Special interaction depending on player's propriety
                if (this.board.ccTab[this.ccIndex].effect === "75*"){
                    let pot = 0;
                    for (let i = 0; i < player.myPropriety.length; i++){
                        //Player pays 60b for each propriety that has an upgrade
                        if (typeof player.myPropriety[i] !== 'undefined' && player.myPropriety[i].upgradeRate > 0){
                            pot += 75;
                        }
                    }
                    this.pay(player, pot, this.board.ccTab[this.chIndex].byTo);
                }
                //Regular interaction
                else{
                    this.pay(player, this.board.ccTab[this.ccIndex].effect, this.board.ccTab[this.ccIndex].byTo);
                }
                break;
            //Player is moving, no special interaction here
            case "goto":
                player.position = this.board.ccTab[this.ccIndex].effect;
                if (player.position === [10, 0]){
                    player.isJailed = true;
                }
                break;
            //Player gets a free diet card
            case "special":
                player.myCards.push(this.board.ccTab[this.ccIndex].effect);
                break;
        }

        //Random index between 0 & 18
        this.ccIndex = Math.floor(Math.random() * 18);

        return true;
    }

    //Functional / Finished
    specialInteraction(player, box){
        switch (box.type) {
            case "start":
                player.money += 200;
                break;
            case "visitPrison":
                break;
            case "getStockedBasket":
                player.money += this.taxesMoney;
                this.taxesMoney = 0;
                break;
            case "gotoPrison":
                player.position = [10, 0];
                player.isJailed = true;
                break;
        }
        return true;
    }

    //TESTED AND FUNCTIONAL
    proprietyInteraction(box){
        //If it belongs to no one, nothing happens
        if (box.belonging === "none"){
            return true;
        }

        //Exchanging the money for both players
        this.pay(this.playerOrder[this.orderIndex], box.income[box.upgradeRate], this.playerTab[box.belonging]);
        return true;
    }

    //TESTED AND FUNCTIONAL
    proprietyAction(box, player, action){
        //Security
        if (action === undefined){
            console.log("We don't know what the player wants to do");
            return false;
        }

        //We skip this part if he doesn't want to do anything
        switch (action) {
            case "buy":
                return this.buyAction(player, box);
            case "redeem":
                return this.redeemAction(player, box);
            case "upgrade":
                return this.upgradeAction(player, box);
            case "nothing":
                break;
        }
        return true;
    }

    //Main function
    executeMove(player, castValue){
        if (!this.isCast){
            return false;
        }

        //We make the Movement
        this.move(player, castValue);

        //We Make the interaction
        this.hasMoved = true;

        return true;//Did play
    }

    executeInteraction(player){
        //Action box
        if (typeof this.board.grid[player.position[0]][player.position[1]].money !== 'undefined') {
            this.actionInteraction(this.board.grid[player.position[0]][player.position[1]]);
        }
        //Propriety box
        else{
            this.proprietyInteraction(this.board.grid[player.position[0]][player.position[1]]);
        }
        this.checkEnd();
        return true;
    }

    executeAction(whatToDo){
        //Security
        if (this.hasMoved === false){
            return this.executeMove();
        }

        //Check if it's a propriety
        if (this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]].color !== undefined){
            //We make the action (buy, redeem, upgrade, etc...)
            this.proprietyAction(this.board.grid[this.playerOrder[this.orderIndex].position[0]][this.playerOrder[this.orderIndex].position[1]], this.playerOrder[this.orderIndex], whatToDo);
        }

        this.checkEnd();

        //Check if player finished his turn
        if (this.dice1 !== this.dice2){
            this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;
        }

        this.isCast = false;
        this.upgradeRequest = undefined;
        this.hasMoved = false;

        return true;
    }
}

module.exports = monopalim;