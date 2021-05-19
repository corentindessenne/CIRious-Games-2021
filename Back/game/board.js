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