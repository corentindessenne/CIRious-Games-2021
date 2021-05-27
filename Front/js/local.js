//Parent class
class card{
    constructor(id, type, membership){
        this.id = id;//Id of the card
        this.type = type; //Card Type
        this.membership = membership;//If a player has it or not
    }
}

class chanceCard extends card{
    constructor(id, effectType, effect, byTo, string){
        super(id, "chance", 0);//Parent constructor
        this.effectType = effectType;//Whether a GoTo, a Get, a Give or a Bonus
        this.effect = effect;//Number, String, Tab
        this.byTo = byTo; //Who gives or receives the money : "bank", "others", "board", "none", ...
        this.string = string;//The String that will be used for the interface
    }
}

class communityCard extends card{
    constructor(id, effectType, effect, byTo, string){
        super(id, "community", 0);//Parent constructor
        this.effectType = effectType;//Whether a GoTo, a Get, a Give or a Bonus
        this.effect = effect;//Number, String, Tab
        this.byTo = byTo; //Who gives or receives the money : "bank", "others", "board", "none", ...
        this.string = string;//The String that will be used for the interface
    }
}

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

//Each propriety will have an id, a name, a value (for buying purpose),
//a nutriscore, a color (team), coordinates, a belonging propriety,
//an img (view purpose) and an upgrade rank (0,1,2).
class propriety {
    constructor(id, name, value, color, x, y, type, income, fact) {
        //Will be changed on every instance
        this.id = id;//Number
        this.name = name; //String
        this.value = value;//What does it cost to be bought / rebought (can change during the game)
        this.color = color;//"Team" or "Season" the propriety belongs to
        this.x = x;//Coord x
        this.y = y;//Coord y
        this.type = type;//Either it's a season propriety or just a regular one : "season" || "classic"
        this.fact = fact;
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
        this.qTab[3] = new questionCard(3, "Lequel de ces aliments n’est pas un féculent en diététique ?", ["Choux-fleurs", "Maïs", "Lentilles", "Pommes de Terre"], [0]);
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
        this.grid[10][10] = new action (0, 10, 10, "start", 400);
        this.grid[10][9] = new propriety (0, "AVENUE DE LA BOUCHÉE DE PAIN", 15, "orange", 10, 9, "classic", 2, "Le chocolat blanc n’est pas du vrai chocolat ! En réalité, le chocolat blanc est fabriqué à partir de beurre de cacao (pour qu’il fonde dans la bouche), de sucre, de poudre de lait et de vanille. Mais il ne contient aucun cacao. Le chocolat blanc est donc uniquement une gourmandise sucrée.");
        this.grid[10][8] = new action (1, 10, 8, "community", 0);
        this.grid[10][7] = new propriety (1, "RUE DE LA POIRE EN DEUX", 15, "orange", 10, 7, "classic", 4, "Les petits beurres LU et le temps qui passe : En effet, un petit beurre c’est : 4 coins pour les saisons de l’année, 52 dents pour le nombre de semaines qu’il y a dans une année et 24 points pour les 24 heures d’une journée.");
        this.grid[10][6] = new action (2, 10, 6, "question", 0);
        this.grid[10][5] = new propriety (2, "AUTOMNE", 200, "orange", 200, 5, "season", 50);
        this.grid[10][4] = new propriety (3, "BOULEVARD DE LA TÊTE D'OEUF", 25, "orange", 10, 4, "classic", 6, "Le beurre salé en Bretagne : Au Moyen-Age, le sel avait une taxe sur tout le royaume de France hormis la Bretagne ne faisait pas parti du royaume donc elle n’avait pas besoin de payer cette taxe exorbitante et cela a permit à la Bretagne de produire ce beurre.");
        this.grid[10][3] = new action (3, 10, 3, "chance", 0);
        this.grid[10][2] = new propriety (4, "RUE SERRÉE COMME DES SARDINES", 25, "orange", 10, 2, "classic", 6, "Le miel peut se garder plus de 100 ans ! Côté alimentation, le miel est un peu le premier de la classe. En plus d’avoir de nombreuses propriétés bonnes pour l’organisme, il est impérissable. Il contient en effet des antibiotiques naturels qui empêchent la naissance de bactéries.");
        this.grid[10][1] = new propriety (5, "AVENUE DE L\'EAU À LA BOUCHE", 30, "orange", 10, 1, "classic", 8, "Les Chips ont été inventées en 1853 aux Etats-Unis suite à un client mécontent de sa commande car les frites étaient trop épaisses à son goût, il lui a donc été préparé des pommes de terre coupés en fines lamelles : les Chips !");
        this.grid[10][0] = new action (4, 10, 0, "visitPrison", 0);

        /* Second Parcel */
        this.grid[9][0] = new propriety (6, "BOULEVARD DE LA MAIN À LA PÂTE", 35, "blanc", 9, 0, "classic", 10, "Le Fanta : Ce soda a été inventé par les Allemands en 1941, comme une alternative au Coca-cola américain. Les usines ne recevant plus les ingrédients pour fabriquer le Coca à cause de la Seconde Guerre mondiale, une nouvelle boisson a vu le jour.");
        this.grid[8][0] = new action (5, 8, 0, "question", 0);
        this.grid[7][0] = new propriety (7, "AVENUE DANS LES POMMES", 35, "blanc", 7, 0, "classic", 10, "Le Champagne : En 1688, le moine Dom Pérignon a inventé par hasard la \"méthode champenoise\" qui fait mousser les vins de Champagne. Il a mis de la cire d'abeille dans le goulot des bouteilles pour les rendre hermétiques.");
        this.grid[6][0] = new propriety (8, "RUE DES CAROTTES CUITES", 40, "blanc", 6, 0, "classic", 12, "Les trous dans l’emmental furent un mystère jusqu’à très récemment, cela serait dû aux microparticules de foin qui tombent dans le lait pendant la traite des vaches. Elles dégagent des gaz pendant la fermentation, qui forment alors les trous.");
        this.grid[5][0] = new propriety (9, "HIVER", 200, "blanc", 5, 0, "season", 50);
        this.grid[4][0] = new propriety (10, "RUE DE L\'OEIL AU BEURRE NOIR", 40, "blanc", 4, 0, "classic", 14, "L’origine de l’expression compter pour des prunes vient des Croisades où une variété de prunes a été découverte par les Templiers alors que les Croisés faisaient le siège de Damas en 1148. Ils en rapportent en France. Ensuite, les Templiers vont être pourchassé…");
        this.grid[3][0] = new action (6, 3, 0, "community", 0);
        this.grid[2][0] = new propriety (11, "AVENUE DU COQ EN PÂTE", 45, "blanc", 2, 0, "classic", 14, "Le croissant ne serait pas si français que ça. La viennoiserie en forme de demi-lune semblerait être originaire de la ville de Vienne, en Autriche. C’est à la suite du passage des Ottomans en 1683 dans la ville, que le croissant aurait vu le jour. les boulangers inventent alors une viennoiserie en pâte feuilletée modelée en croissant de lune, astre visible sur le drapeau de l’empire vaincu, blanc sur fond rouge.");
        this.grid[1][0] = new propriety (12, "PLACE DE L\'EAU DANS LE VIN", 50, "blanc", 1, 0, "classic", 16, "Le Paris-Brest a été crée à l’occasion de la première course de vélo Paris-Brest-Paris pour promouvoir l’utilisation du vélo. Ce dessert est le fruit du travail de Pierre Giffard afin de rendre un clin d’œil à cet évènement sportif.");
        this.grid[0][0] = new action (7, 0, 0, "getStockedBasket", 0);

        /* Third Parcel */
        this.grid[0][1] = new propriety (13, "AVENUE DU COEUR D\'ARTICHAUT", 55, "vert", 0, 1, "classic", 18, "Le “café liégeois” remonterait à la guerre 1914-1918 avec la bataille des forts de Liège menée en Belgique. Cette résistance héroïque de la ville belge a dès lors suscité un vif intérêt auprès de la France qui la gratifia, le 7 août 1914 de la Légion d’honneur. Dans le même temps, Paris débaptise le café viennois, qui évoque l’ennemi, pour le renommer “café liégeois”.");
        this.grid[0][2] = new action (8, 0, 2, "chance", 0);
        this.grid[0][3] = new propriety (14, "RUE DE LA BOUFFÉE D\'AIL FRAIS", 55, "vert", 0, 3, "classic", 18, "Un poivron rouge contient plus de vitamine que dans une orange. Les gens pensent souvent et les oranges et les autres agrumes sont de super sources de vitamine C, mais un poivron rouge contient plus de vitamine C qu'une orange. Alors la prochaine fois que vous serez enrhumé, vous pourriez vous faire une soupe de poivron rouge au lieu d'un jus d'orange.");
        this.grid[0][4] = new propriety (15, "BOULEVARD MI-FIGUE MI-RAISIN", 60, "vert", 0, 4, "classic", 20, "McDonald’s a volontairement crée quatre formes de nuggets de poulet. Les quatre formes, qui sont pressées à l'emporte-pièce, sont appelées « Cloche », « Botte », « Os » et « Balle. » L'entreprise a déclaré que « trois formes aurait été trop peu », mais que « cinq, ça aurait été, genre, dingue. »");
        this.grid[0][5] = new propriety (16, "PRINTEMPS", 200, "vert", 0, 5, "season", 50);
        this.grid[0][6] = new propriety (17, "FAUBOURG DE LA BREBIS ÉGARÉE", 65, "vert", 0, 6, "classic", 22, "Les ailes de poulets ne sont mangés que depuis 1964 : Elles étaient considérées comme la pire part du poulet : presque rien à manger, les os à dépiauter, on laissait ça aux pauvres ou aux chiens. Une patronne eu l'idée de faire frire les restes d'un poulet et d'y ajouter une sauce pimentée pour offrir un casse-croute aux clients du bar.");
        this.grid[0][7] = new propriety (18, "PLACE DE L\'ARÊTE DANS LE BIFSTEAK", 65, "vert", 0, 7, "classic", 22), "La pomme de terre et la tomate ont eu beaucoup de difficultés à se faire apprécier en France. On leur accordait en effet très peu de confiance, car ces plantes d'origine américaines sont de la même famille que plusieurs poisons de l'époque comme la belladone ou la mandragore.";
        this.grid[0][8] = new action (9, 0, 8, "question", 0);
        this.grid[0][9] = new propriety (19, "RUE DE LA BOISSON D\'AVRIL", 70, "vert", 0, 9, "classic", 24, "Le mojito, ou plutôt son ancêtre \"El Draque\", fut inventé par le marin anglais Francis Drake lors d'une escale aux Caraïbes. Drake eu l'idée de mélanger de la menthe, du citron vert et une eau-de-vie ressemblant au rhum appelée tafia pour créer ce cocktail, considéré comme l'un des premiers de l'histoire. Le rhum vint remplacer le tafia au XXe siècle et le mojito devint le cocktail national de Cuba en 1920.");
        this.grid[0][10] = new action (10, 0, 10, "gotoPrison", 0);

        /* Fourth Parcel */
        this.grid[1][10] = new propriety (20, "AVENUE DU GRAIN A MOUDRE", 75, "jaune", 1, 10, "classic", 26, "Pourquoi ne pas couper la salade avec son couteau? Parce que ça ne fait pas distinguer? Encore une fois derrière le \"bon usage\" se cachent des raisons bassement matérielles, les couteaux étaient souvent en argent, or l'argent avec le vinaigre ce n'est pas terrible...");
        this.grid[2][10] = new propriety (21, "AVENUE DU MELON", 75, "jaune", 2, 10, "classic", 26, "Le sandwich a été inventé en 1672, par le cuisinier de John Montagu, comte de Sandwich (authentique) afin de lui permettre de de ne pas mourir de faim pendant qu'il perdait tout son argent au jeu.");
        this.grid[3][10] = new action (11, 3, 10, "community", 0)
        this.grid[4][10] = new propriety (22, "IMPASSE DU CHOU BLANC", 80, "jaune", 4, 10, "classic", 28, "La pêche est le premier fruit à avoir été consommé sur la lune. Pendant leur mission sur la lune, les astronautes envoyés à bord d’Apollo 11 ont pu déguster des pêches en conserve.");
        this.grid[5][10] = new propriety (23, "ETE", 200, "jaune", 5, 10, "season", 50);
        this.grid[6][10] = new action (12, 6, 10, "chance", 0);
        this.grid[7][10] = new propriety (24, "AVENUE DU DINDON DE LA FARCE", 90, "jaune", 7, 10, "classic", 35, "Il est possible de créer de la dynamite à partir de la cacahuète. En effet, l’huile de cacahuète permet de la fabrication de nitroglycérine.");
        this.grid[8][10] = new action (13, 8, 10, "question", 0);
        this.grid[9][10] = new propriety (25, "RUE DE LA PAIX-RO", 100, "jaune", 9, 10, "classic", 50, "Il y  a 50 ans une vache produisait 907 litres de lait par an. Aujourd'hui, les producteurs en produisent environ 22680 litres par an ! Grâce aux drogues diverses, antibiotiques, hormones de croissance, gavage de vaches et conditions d’élevage particulières...");
        //Then we return to the start
    }
}

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

class monopalim{
    constructor (player1, player2, player3, player4, player5, player6){
        //Will also be used as a "preOrderTab" in a future part (bonus)
        this.playerTab = [];
        this.playerTab.push(player1);
        this.playerTab.push(player2);
        this.playerTab.push(player3);
        if (typeof player4 != 'undefined'){
            this.playerTab.push(player4);
        }
        if (typeof player5 != 'undefined'){
            this.playerTab.push(player5);
        }
        if (typeof player6 != 'undefined'){
            this.playerTab.push(player6);
        }

        this.winner = undefined;//No winner

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

    //Initialisation Function
    //Tested and functional
    initPlayerOrder(objectTab){
        let randomIndex = 0;
        //Generate every Index possibility
        let possibleIndex = [0, 1, 2, 3];
        if (objectTab.length > 3){
            if (objectTab.length > 4){
                possibleIndex.push(4);
                if(objectTab.length > 5){
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

            //Deleting player from old tab
            let idToDelete = 0;
            this.playerTab.forEach(element => {
                if (element.id === player.id){
                    this.playerTab.splice(idToDelete, 1);//Delete him from the player tab
                }
                else{
                    idToDelete++;
                }
            });

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
        this.updatePlayersHb();
        let tempTab = [];
        for (let i = 0; i < this.playerTab.length; i++){
            this.playerTab[i].rankPoints = this.playerTab[i].healthyBar * 20 + this.playerTab[i].money
            tempTab.push(this.playerTab[i]);
        }
        //Sort elements
        tempTab.sort((a, b) => a.rankPoints - b.rankPoints);
        this.winner = tempTab[tempTab.length - 1];
        return true;
    }

    checkWinByPropriety(player){
        //We stock the variable for a lighter if
        let grid = this.board.grid;

        //If player has 4 seasons
        if (grid[5][10].belonging === player.id && grid[0][5].belonging === player.id && grid[5][0].belonging === player.id && grid[10][5].belonging === player.id){
            this.winner = player;
            this.isFinished = true;
            return true;
        }

        //If player has a completed line
        //Initialiation
        let wonByLine = true;
        let start = 0;
        let end = 6;
        //Browse the game board
        for (let parcel = 0; parcel < 4; parcel++){
            //Changing start & end value depending on the parcel we are searching in
            if (parcel === 1){
                start = 6;
                end = 13;
            }
            else if (parcel === 2){
                start = end;
                end = 20;
            }
            else if (parcel === 3){
                start = end;
                end = 25;
            }

            //Searching if the player doesn't have a propriety
            for (let i = start; i < end; i++){
                if (typeof player.myPropriety[i] === 'undefined'){
                    wonByLine = false;//It's not won by line
                }
            }

            //Player wins
            if (wonByLine){
                this.winner = player;
                this.isFinished = true;
                return true;
            }
            //We go for the next parcel
            else{
                wonByLine = true;
            }
        }
        return false;
    }

    checkWinByHb(player){
        if (player.healthyBar >= 100){
            this.isFinished;
            this.winner = player;
            return true;
        }
        return false;
    }

    //Actions in the game
    castTheDice(){
        //Roll the dice !
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        /* Test Purpose*/
        //this.dice1 = 2;
        //this.dice2 = 3;
        this.castValue = this.dice1 + this.dice2;

        //Jail speciality
        if (this.dice2 === this.dice1){
            this.playerOrder[this.orderIndex].doubleNb++;
            //Going to jail
            if (this.playerOrder[this.orderIndex].doubleNb === 3){
                this.playerOrder[this.orderIndex].position = [10, 0];
                this.playerOrder[this.orderIndex].isJailed = true;
                this.isCast = false;
                this.orderIndex = (this.orderIndex + 1) % this.playerOrder.length;
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
            if (paid !== "bank"){
                paid.money += payer.money;
            }
            payer.money = 0;
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
            //Check Win
            this.checkWinByPropriety(player);
            this.checkWinByHb(player);
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
            //Check win
            this.checkWinByPropriety(player);
            this.checkWinByHb(player);
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
        this.checkWinByHb(player);
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
        this.playerTab.forEach(element => this.checkWinByHb(element));
        return true;
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
        if (player.isJailed || !player.state || this.isFinished){
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
        if (!this.isCast || this.isFinished){
            return false;
        }
        //We make the Movement
        this.move(player, castValue);

        //We Make the interaction
        this.hasMoved = true;

        return true;//Did play
    }

    executeInteraction(player){
        if (this.isFinished) return false;
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
        if (this.isFinished) return false;
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
        this.updatePlayersHb();

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

class view {
    constructor(monopalimInstance) {
        this.game = monopalimInstance;
        this.initView();
    }
    //Old VIEW
    initView() {
        this.initListener();
        this.displayPawns();
        this.displayCurrentPlayer();
        //this.initBoardVisual();
        this.displayGameInfos();
        //this.displayMap();
        this.displayDice();
        this.displayMoney();
        this.displayHealthyBar();
        this.displayProprietyTab();
        this.displayActionButtons("actions", "disable");
        this.displayActionButtons("upgrades", "disable");

        this.viewIsFinished = false; //View just started and still works
    }

    //Listeners we use for the game
    initListener() {
        //Dice
        let rollButton = document.getElementById('rollDice');
        rollButton.addEventListener('click', () => {
            this.rollEvent(this.game.playerOrder[this.game.orderIndex]);
        });

        //Div that contains buttons
        let actionDiv = document.getElementById('actionButtons');
        //Access to the buttons & add an event Listener for each
        for (let i = 0; i < actionDiv.children.length; i++) {
            actionDiv.children[i].addEventListener('click', () => {
                this.actionEvent(actionDiv.children[i].textContent);//.textContent let us access to the "value" of the button
            });
        }

        //Upgrade Buttons, SAME
        let upgradeDiv = document.getElementById('upgradeButtons');
        for (let i = 0; i < upgradeDiv.children.length; i++) {
            upgradeDiv.children[i].addEventListener('click', () => {
                this.upgradeEvent(upgradeDiv.children[i].textContent);//.textContent let us access to the "value" of the button
            });
        }

        //Question Buttons
        let answerDiv = document.getElementById('answerContent');
        for (let i = 0; i < answerDiv.children.length; i++) {
            answerDiv.children[i].addEventListener('click', () => {
                if (answerDiv.children[i].style.backgroundColor === "green") {
                    answerDiv.children[i].style.backgroundColor = "";
                }
                else {
                    answerDiv.children[i].style.backgroundColor = "green";
                }
            });
        }
        //Validate your questions button
        document.getElementById('validAnswer').children[0].addEventListener('click', () => {
            this.questionEvent(answerDiv.children);
        });

    }

    //Typical View Function we will use for the game
    updateMap() {//Displaying the map and the stuff on it
        let gameBoard = document.getElementById('monopalimBoard');
        //We clear the board
        for (let a = 0; a < 11; a++) {
            for (let b = 0; b < 11; b++) {
                if (typeof gameBoard.rows[a].cells[b] !== 'undefined') {
                    gameBoard.rows[a].cells[b].innerText = '';
                    gameBoard.rows[a].cells[b].style.backgroundColor = '';
                }
                //We change the background color if we have this propriety
                if (typeof this.game.board.grid[a][b] !== 'undefined' && this.game.board.grid[a][b].belonging === this.game.playerOrder[this.game.orderIndex].id) {
                    gameBoard.rows[a].cells[b].style.backgroundColor = 'red';
                }
            }
        }
        //Do it with every player
        for (let i = 0; i < this.game.playerTab.length; i++) {
            for (let pNbr = 0; pNbr < this.game.playerTab[i].myPropriety.length; pNbr++) {
            }
            gameBoard.rows[this.game.playerOrder[i].position[0]].cells[this.game.playerOrder[i].position[1]].innerText = this.game.playerOrder[i].username;
            //Will be changed to image after
        }
    }
    displayDice() {
        //Displaying the dice
        //HTML Elements we will change
        let diceDiv = document.getElementById('diceDiv');

        //Create new images
        let img = document.createElement('img');
        let img2 = document.createElement('img');
        img.src = "../assets/img/dice/dice-six-faces-" + (this.game.dice1) + ".png";
        img2.src = "../assets/img/dice/dice-six-faces-" + (this.game.dice2) + ".png";

        //Replace it
        diceDiv.replaceChild(img, diceDiv.children[0]);
        diceDiv.replaceChild(img2, diceDiv.children[1]);

        return true;
    }
    displayMoney() {
        let money = document.getElementById('playerMoney');
        let taxesMoney = document.getElementById('taxesMoney');
        money.innerText = this.game.playerOrder[this.game.orderIndex].money;
        taxesMoney.innerText = this.game.taxesMoney;
        return true;
    }
    displayHealthyBar() {
        document.getElementById('healthyBar').style.width = this.game.playerOrder[this.game.orderIndex].healthyBar + "%";
    }
    displayCurrentPlayer() {//Used to set up the turn
        let currentPlayer = document.getElementById('playerName');
        currentPlayer.innerText = this.game.playerOrder[this.game.orderIndex].username;

        //Displaying player's GIF
        let gifDiv = document.getElementById('gifTurn');
        //Removing olg child
        if (typeof gifDiv.children[0] !== 'undefined') {
            gifDiv.removeChild(gifDiv.children[0]);
        }
        //Creating New
        let newGif = document.createElement("img");
        newGif.src = this.game.playerOrder[this.game.orderIndex].character.src;
        //Diplaying it
        gifDiv.appendChild(newGif);
    }
    displayProprietyTab() {
        let proprietyTab = document.getElementById('propriety');
        //Delete old infos
        let line = 1;

        //Add new infos
        for (let i = 0; i < this.game.playerOrder[this.game.orderIndex].myPropriety.length; i++) {
            if (typeof this.game.playerOrder[this.game.orderIndex].myPropriety[i] !== 'undefined') {
                if (line > 10) {
                    proprietyTab.insertRow(line);
                    for (let cpt = 0; cpt < 3; cpt++) {
                        proprietyTab.rows[line].insertCell(cpt);
                    }
                }
                //"Propriété" cell
                proprietyTab.rows[line].cells[0].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].name;
                proprietyTab.rows[line].cells[0].style.fontSize = '12px';
                //"Stade" cell
                let upgradeWord = "";
                switch (this.game.playerOrder[this.game.orderIndex].myPropriety[i].upgradeRate) {
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
                proprietyTab.rows[line].cells[1].innerText = upgradeWord;
                //"Apports" cell
                proprietyTab.rows[line].cells[2].innerText = this.game.playerOrder[this.game.orderIndex].myPropriety[i].income[this.game.playerOrder[this.game.orderIndex].myPropriety[i].upgradeRate];
                //Incrementing Line
                line++;
            }
        }

        //Clear other infos
        for (let i = line; i <= 10; i++) {
            proprietyTab.rows[i].cells[0].innerText = "X";
            proprietyTab.rows[i].cells[1].innerText = "X";
            proprietyTab.rows[i].cells[2].innerText = "X";
        }
    }
    displayJailStatus() {
        let jailText = document.getElementById('jailStatus');
        if (this.game.playerOrder[this.game.orderIndex].isJailed) {
            jailText.innerText = "Vous êtes en prison ! Essayez de faire un double pour vous libérer";
            return true;
        }
        jailText.innerText = "";
        return true;
    }
    displayBoxInfos(box, order) {
        let imgDiv = document.getElementById('boxInfo');//Img fo the box will be displayed in the background
        let boxType = document.getElementById('boxType');//Text describing the box player is on
        let cardInfos = document.getElementById('cardContent');//Specific for community & chance cards
        let answersDiv = document.getElementById('answerContent');//Every possible answers for question cards
        let info = document.getElementById('proprietyContent');//Will display a tab with the propriety infos if it's a propriety
        let factDiv = document.getElementById('proprietyFact');//Used to display the fact about a propriety

        //Removing old text
        boxType.innerText = "";
        cardInfos.innerText = "";
        factDiv.innerText = "";
        imgDiv.style.backgroundImage = "none";

        //Removing table
        if (typeof info.children[0] !== 'undefined') {
            info.removeChild(info.children[0]);
        }

        let type = "null";

        //We display for an Action box
        if (typeof box.money !== 'undefined') {
            let content = "null";
            switch (box.type) {
                case "community":
                    content = this.game.board.ccTab[this.game.ccIndex].string;
                    type = "Case Caisse de Communauté";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/communaute.png')";
                    break;
                case "question":
                    type = "Case Question";
                    if (order === "yes") {
                        //Question that we will ask
                        content = this.game.board.qTab[this.game.qIndex].question;

                        //Implementing answers into the buttons
                        for (let i = 0; i < this.game.board.qTab[this.game.qIndex].answer.length; i++) {
                            answersDiv.children[i].innerHTML = this.game.board.qTab[this.game.qIndex].answer[i];
                        }

                        //Show buttons
                        this.displayQuestionButtons("block", this.game.board.qTab[this.game.qIndex].answer.length);
                    }
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/question.png')";
                    break;
                case "chance":
                    content = this.game.board.chTab[this.game.chIndex].string;
                    type = "Case Chance";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/chance.png')";
                    break;
                case "start":
                    type = "Case spéciale";
                    content = "Passez par là pour obtenir 200 blés !";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/start.png')";
                    break;
                case "visitPrison":
                    type = "Case spéciale";
                    content = "Si vous n'êtes pas emprisonné, vous pouvez narguez ceux qui le sont !";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/diet.png')";
                    break;
                case "getStockedBasket":
                    type = "Case spéciale";
                    content = "Vous gagnez le panier de fruit !";
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/fruitBucket.png')";
                    break;
                default:
                    type = "Case spéciale";
                    content = "Allez en diète !"
                    imgDiv.style.backgroundImage = "url('../assets/img/cards/goToDier.png')";
                    break;
            }
            if (order === "yes") {
                cardInfos.innerHTML = "La carte dit : " + content;
            }
        }
        //We display for a Propriety box
        else {
            type = "Case Propriété";

            if (order === "yes") {
                // creates a <table> element and a <tbody> element
                let tbl = document.createElement("table");
                let tblThead = document.createElement('thead');
                let tblBody = document.createElement("tbody");

                //Creating the thead
                let theadRow = document.createElement("tr");

                for (let i = 0; i < 4; i++) {
                    let cellText = document.createTextNode("Création en cours");
                    let cell = document.createElement('th');
                    cell.appendChild(cellText);
                    theadRow.appendChild(cell);
                }
                //We plug it into the Thead
                tblThead.appendChild(theadRow);

                //Creating the Body
                // creates a table row
                let row = document.createElement("tr");

                for (let j = 0; j < 4; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode("Création en cours");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                // add the row to the end of the table body
                tblBody.appendChild(row);

                // put the <tbody> in the <table>
                tbl.appendChild(tblThead);
                tbl.appendChild(tblBody);
                // appends <table> into <body>
                info.appendChild(tbl);


                //Displaying infos
                tbl.rows[0].cells[0].innerText = "Nom";
                tbl.rows[0].cells[1].innerText = "Prix";
                tbl.rows[0].cells[2].innerText = "Bien";
                tbl.rows[0].cells[3].innerText = "Loyer";
                tbl.rows[1].cells[0].innerText = box.name;
                tbl.rows[1].cells[1].innerText = box.price[box.upgradeRate];
                if (box.belonging !== "none") {
                    tbl.rows[1].cells[2].innerText = this.game.playerTab[box.belonging].username;
                }
                else {
                    tbl.rows[1].cells[2].innerText = "Non achetée"
                }
                tbl.rows[1].cells[3].innerText = box.income[box.upgradeRate];

                //Style
                tbl.setAttribute("border", "2");
            }
            else {
                //Fact
                factDiv.innerText = "Fun Fact: " + box.fact;
            }

            imgDiv.style.backgroundImage = "url('../assets/img/cards/property.png')";
        }

        boxType.innerHTML = "Vous êtes sur une " + type;
    }
    //Used to display every pawn & animations when they move
    displayMovement(position, player) {
        let gameTab = document.getElementById('monopalimBoard');

        //We create the animated GIF
        let element = player.character;
        if (position[0] === 1 && position[1] === 10) {
            gameTab.rows[position[0]].cells[2].appendChild(element);
        }
        else if (position[1] === 10 && position[0] < 10) {
            gameTab.rows[position[0]].cells[1].appendChild(element);
        }
        else {
            gameTab.rows[position[0]].cells[position[1]].appendChild(element);
        }
    }
    //Used update most of the information a player needs like his money, his HB, etc...
    displayGameInfos() {
        let turn = document.getElementById('gameTurn');

        //Grammar Stuff lul
        if (this.game.turnNb < 19) {
            turn.innerText = 20 - this.game.turnNb + " tours !";
        }
        else {
            turn.innerText = 20 - this.game.turnNb + " tour !";
        }
    }
    updateInfos() {
        this.displayMap();
        this.displayCurrentPlayer();
        this.displayProprietyTab();
        this.displayHealthyBar();
        this.displayMoney();
        this.displayJailStatus();
    }
    //Used for showing buttons
    displayActionButtons(which, request) {
        let buttonDiv = ""

        if (which === "actions") {
            buttonDiv = document.getElementById('actionButtons');
        }
        else if (which === "upgrades") {
            buttonDiv = document.getElementById('upgradeButtons')
        }
        else {
            console.log("Invalid buttons");
            return false;
        }

        switch (request) {
            case "disable":
                buttonDiv.style.display = "none";
                break;
            case "enable":
                buttonDiv.style.display = "block";
                break;
            default:
                console.log("Invalid Request");
                return false;
        }
        return true;
    }
    //Special display for Questions
    displayQuestionButtons(request, howMany) {
        let answerDiv = document.getElementById('answerContent');
        let validDiv = document.getElementById('validAnswer');

        if ((request !== "block" && request !== "none") || howMany > answerDiv.length) console.log("Error Requet");

        for (let i = 0; i < howMany; i++) {
            answerDiv.children[i].style.display = request;
        }

        validDiv.style.display = request;
    }
    //Used to display pawns
    displayPawns() {
        let board = document.getElementById('monopalimBoard');

        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (typeof board.rows[i].cells[j] !== 'undefined' && typeof board.rows[i].cells[j].children[0] !== 'undefined') {
                    let childNbr = board.rows[i].cells[j].children.length;
                    for (let removeNbr = 0; removeNbr < childNbr; removeNbr++) {
                        board.rows[i].cells[j].removeChild(board.rows[i].cells[j].children[0]);
                    }
                }
            }
        }

        //Display pawns
        for (let i = 0; i < this.game.playerOrder.length; i++) {
            //Special bug with colspan
            if (this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] === 1) {
                board.rows[this.game.playerTab[i].position[0]].cells[2].appendChild(this.game.playerTab[i].character);
            }
            else if (this.game.playerTab[i].position[1] === 10 && this.game.playerTab[i].position[0] < 10) {
                board.rows[this.game.playerTab[i].position[0]].cells[1].appendChild(this.game.playerTab[i].character);
            }
            else {
                board.rows[this.game.playerTab[i].position[0]].cells[this.game.playerTab[i].position[1]].appendChild(this.game.playerTab[i].character);
            }
        }
    }
    //Used at the end of the game
    displayRankingTab() {
        document.getElementById('rankingTab').style.display = "block";
        document.getElementById('dice').style.display = "none"
        console.log(this.game.winner);
    }

    //Event Functions

    rollEvent(player) {//Used for the dice
        if (this.game.isCast) {
            return false;//Only 1 roll is available per turn unless counter indication
        }
        //Roll
        this.game.castTheDice();
        this.displayDice();

        //Check Jail Status
        if (this.game.jailInteraction(player) === true) {
            //Play
            //We make the move 1 by 1
            for (let i = 1; i <= this.game.castValue; i++) {
                this.game.executeMove(player, 1);
                this.displayMovement(player.position, this.game.playerOrder[this.game.orderIndex]);
            }

            //View
            this.displayBoxInfos(this.game.board.grid[player.position[0]][player.position[1]], "yes");

            alert("Déplacement Terminé - Interaction en cours");

            //Game
            this.game.executeInteraction(this.game.playerOrder[this.game.orderIndex]);

            //View
            this.displayPawns();
            this.displayBoxInfos(this.game.board.grid[player.position[0]][player.position[1]], "yes");
            this.displayMoney();//Need to be wrapped
            this.displayHealthyBar();//Same

            //Check if it's over
            if (this.game.checkState(this.game.playerOrder[this.game.orderIndex])) {
                this.updatePawns();
                this.playerLostEvent();
                if (this.game.checkEnd()) {
                    this.endOfTheGameEvent();
                }
                return this.endTurnEvent();
            }

            //If we have to do something
            if (typeof this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]].type !== "question") {
                this.displayActionButtons("actions", "enable");
            }
        }

        else {
            alert("Vous êtes envoyé en diet");
            this.displayPawns();
            this.displayActionButtons("actions", "disable");
            //If the player is still in Jail it's the end of it's turn
            return this.endTurnEvent();
        }

        return true;//Worked well
    }

    questionEvent(everyPossibleAnswer) {
        //Security
        if (everyPossibleAnswer.length < 1) return false;

        //Sorting answers and the others
        for (let i = 0; i < everyPossibleAnswer.length; i++) {
            if (everyPossibleAnswer[i].style.backgroundColor === "green") {
                this.game.currentAnswer.push(everyPossibleAnswer[i].textContent);
            }
        }

        //We make the interaction with the game with his answers & Telling the player if he succeeded
        if (this.game.answerInteraction(this.game.playerOrder[this.game.orderIndex], this.game.board.qTab[this.game.qIndex])) {//Correct answer
            alert("Bonne réponse !!");
        }
        else {
            alert("Aïe, mauvaise réponse :(");
        }

        return this.displayQuestionButtons("none", 4);
    }

    actionEvent(action) {//Used for the action in game
        if (!this.game.hasMoved) return false;

        //Initialisation
        let doWhat = ""

        //Translating in Enligsh
        switch (action) {
            case "Acheter":
                doWhat = "buy";
                break;
            case "Racheter":
                doWhat = "redeem";
                break;
            case "Améliorer":
                doWhat = "upgrade";
                //We show the buttons for upgrade choice
                if (typeof this.game.upgradeRequest === 'undefined' && this.game.isUpgradeable(this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]])) {
                    this.displayActionButtons("actions", "disable");
                    return this.displayActionButtons("upgrades", "enable");
                }
                return;
            case "Rien":
                doWhat = "nothing";
                break;
            default:
                console.log("Action undefined");
                return false;
        }

        //Play in console
        this.game.executeAction(doWhat);

        //End turn
        return this.endTurnEvent();
    }

    upgradeEvent(upgrade) {
        //Initialisation
        let upgradeRequest = ""

        //Translating in Enligsh
        switch (upgrade) {
            case "Epicerie":
                upgradeRequest = "grocery";
                break;
            case "Marché":
                upgradeRequest = "market";
                break;
            case "Supermarché":
                upgradeRequest = "supermarket";
                break;
            case "Magasin Bio":
                upgradeRequest = "organic shop";
                break;
            default:
                console.log("Action undefined");
                return false;
        }

        //Play in console
        this.game.upgradeRequest = upgradeRequest;
        this.game.executeAction("upgrade");

        //View
        alert("Upgrade in " + upgrade + " completed");

        return this.endTurnEvent();
    }

    endGameEvent() {
        if (this.game.isFinished) {
            alert("Partie TERMINE !");
            this.viewIsFinished = true;
            this.displayRankingTab();
        }
    }

    playerLostEvent() {

    }

    endTurnEvent() {
        this.endGameEvent();
        //Interface
        this.displayCurrentPlayer();
        this.displayMoney();
        this.displayHealthyBar();
        this.displayProprietyTab();
        this.displayJailStatus();
        this.displayBoxInfos(this.game.board.grid[this.game.playerOrder[this.game.orderIndex].position[0]][this.game.playerOrder[this.game.orderIndex].position[1]], "no");
        this.displayGameInfos();
        //Buttons
        this.displayActionButtons("actions", "disable");
        this.displayActionButtons("upgrades", "disable");

        return true;
    }
}

(function() {
    //Players GIFs
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');
    let img3 = document.createElement('img');
    let img4 = document.createElement('img');
    img1.src = "../assets/img/pawn/amongUsRun40x40.gif";
    img2.src = "../assets/img/pawn/spaceshipOpen40x40.gif";
    img3.src = "../assets/img/pawn/boomanAppear40x40.gif";
    img4.src = "../assets/img/pawn/dogRun40x40.gif";
    img1.style.position = "absolute";
    img2.style.position = "absolute";
    img3.style.position = "absolute";
    img4.style.position = "absolute";

    //Player Instance
    let player1 = new player(0, "Joueur 1", 190, 20, img1, "red");
    let player2 = new player(1, "Joueur 2", 181, 18, img2, "blue");
    let player3 = new player(2, "Joueur 3", 176, 19, img3, "green");
    let player4 = new player(3, "Joueur 4", 175, 20, img4, "orange");

    //Game Instance
    let gameInstance = new monopalim(player1, player2, player3, player4);

    //View Instance
    let gameView = new view(gameInstance);
})();