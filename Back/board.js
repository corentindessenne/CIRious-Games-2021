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
        this.ccTab[10] = new communityCard (10, "give", "50 Or", "bank", "Payez une amende de 50 blés ou tirez une carte chance.");//Exception à gérer
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
        this.chTab[4] = new chanceCard (4, "give", 50, "bank", "Payez pour frais de fast-food, 50 blés.");
        this.chTab[5] = new chanceCard (5, "give", 50, "bank", "Amende pour excès de calories, vous devez 50 blés.");
        this.chTab[6] = new chanceCard (6, "give", 100, "bank", "Amende pour ivresse sur la voie publique, vous devez 100 blés.");
        this.chTab[7] = new chanceCard (7, "give", 135, "bank", "Amende pour non-respect du couvre-feu, vous devez 135 blés.");
        this.chTab[8] = new chanceCard (8, "give", 50, "bank", "Vous vous êtes fait rouler dans la farine. Versez 50 blés à chaque joueur.");
        this.chTab[9] = new chanceCard (9, "give", "60*", "bank", "Rénovez vos marchés, magasin bio, grande surface et épiceries. Payez 60 blés pour chaque.");//Exception à gérer
        /* GO TO CARDS */
        this.chTab[10] = new chanceCard(10, "goto", [10, 10], "none", "Parce qu’un petit footing ne fait jamais de mal, retournez à la case départ et touchez 400 blés.");
        this.chTab[11] = new chanceCard(11, "goto", [9, 10], "none", "Des amis vous appellent et vous donnent un rendez-vous, avenue de la paix-ro.");
        this.chTab[12] = new chanceCard(12, "goto", [7, 0], "none", "Rendez-vous à l’AVENUE DANS LES POMMES, si vous passez par la case départ touchez 200 blés.");
        this.chTab[13] = new chanceCard(13, "goto", [0, 1], "none", "Rendez-vous à l’AVENUE DU PAIN SUR LA PLANCHE, si vous passez par la case départ touchez 200 blés.");
        this.chTab[14] = new chanceCard(14, "goto", "-3", "none", "Reculez de trois cases.");//Excpetion à gérer
        this.chTab[15] = new chanceCard(15, "goto", [10, 0], "none", "Votre médecin vous envoie en diète sans passer par la case départ.");
        this.chTab[16] = new chanceCard(16, "goto", "+?", "none", "Avancez jusqu’à la saison la plus proche. Si elle n’appartient à personne, vous pouvez l’acheter. Si elle appartient à un joueur vous devez lui payer deux fois le loyer demandé.");//Exception à gérer
        this.chTab[17] = new chanceCard(17, "goto", "+??", "none", "Avancez jusqu’à la saison la plus proche. Si elle n’appartient à personne, vous pouvez l’acheter. Si elle appartient à un joueur vous devez lui payer deux fois le loyer demandé.");//Exception à gérer
        this.chTab[18] = new chanceCard(18, "goto", "+x", "none", "Etant un grand sportif, on décide de vous interviewer pour le journal de 20h. Avancez jusqu’à la prochaine case Question.");//Exception à gérer
        /* SPECIAL CARD */
        this.chTab[19] = new chanceCard(19, "special", "freedom", "none", "Cheatmeal autorisé ! Cette carte peut être conservée pour une future utilisation ou être revendue.");//Exception à gérer

        //questionCard tab
        this.qTab[0] = new questionCard(0, "Comment inciter les enfants à manger des légumes ?", ["Les enfants peuvent se passer des légumes.", "Il faut les forcer et les disputer s’ils ne finissent pas leur assiette.", "Il faut mélanger les légumes avec quelque chose qu’ils mangent avec plaisir."], [2]);

        //Init the 11x11 grid
        this.grid = new Array(11);
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i] = new Array (11);
        }
        //Init every case of the grid that we will use
        /* First Parcel */
        this.grid[10][10] = new action(0, 10, 10, "get", 400);
        this.grid[10][9] = new propriety (0, "AVENUE DE LA BOUCHÉE DE PAIN", 60, "orange", 10, 9, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        //this.grid[10][8] = new action (1, 10, 8, )
        this.grid[10][7] = new propriety (1, "RUE DE LA POIRE EN DEUX", 60, "orange", 10, 7, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[10][5] = new propriety (2, "AUTOMNE", 200, "orange", 10, 5, "season", 50, undefined);
        this.grid[10][4] = new propriety (3, "BOULEVARD DE LA TÊTE D'OEUF", 100, "orange", 10, 4, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[10][2] = new propriety (4, "RUE SERRÉE COMME DES SARDINES", 100, "orange", 10, 2, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[10][1] = new propriety (5, "AVENUE DE L\'EAU À LA BOUCHE", 120, "orange", 10, 1, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        /* Second Parcel */
        this.grid[9][0] = new propriety (6, "BOULEVARD DE LA MAIN À LA PÂTE", 60, "blanc", 9, 0, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[7][0] = new propriety (7, "AVENUE DANS LES POMMES", 60, "blanc", 7, 0, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[6][0] = new propriety (8, "RUE DES CAROTTES CUITES", 60, "blanc", 6, 0, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);        
        this.grid[5][0] = new propriety (9, "HIVER", 200, "blanc", 5, 0, "season", 50, undefined);
        this.grid[4][0] = new propriety (10, "RUE DE L\'OEIL AU BEURRE NOIR", 100, "blanc", 4, 0, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[2][0] = new propriety (11, "AVENUE DU COQ EN PÂTE", 100, "blanc", 2, 0, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[1][0] = new propriety (12, "PLACE DE L\'EAU DANS LE VIN", 120, "blanc", 1, 0, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        /* Third Parcel */
        this.grid[0][1] = new propriety (13, "AVENUE DU PAIN SUR LA PLANCHE", 60, "vert", 0, 1, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[0][3] = new propriety (14, "RUE DE LA BOUFFÉE D\'AIL FRAIS", 60, "vert", 0, 3, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[0][4] = new propriety (15, "BOULEVARD MI-FIGUE MI-RAISIN", 60, "vert", 0, 4, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);        
        this.grid[0][5] = new propriety (16, "PRINTEMPS", 200, "vert", 0, 5, "season", 50, undefined);
        this.grid[0][6] = new propriety (17, "FAUBOURG DE LA BREBIS ÉGARÉE", 100, "vert", 0, 6, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[0][7] = new propriety (18, "PLACE DE L\'ARÊTE DANS LE BIFSTEAK", 100, "vert", 0, 7, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[0][9] = new propriety (19, "RUE DE LA BOISSON D\'AVRIL", 120, "vert", 0, 9, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        /* Fourth Parcel */
        this.grid[1][10] = new propriety (20, "AVENUE DU GRAIN A MOUDRE", 60, "jaune", 1, 10, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[2][10] = new propriety (21, "AVENUE DU MELON", 60, "jaune", 2, 10, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[4][10] = new propriety (22, "BOULEVARD DE L\'ARGENT DU BEURRE", 100, "jaune", 4, 10, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[5][10] = new propriety (23, "ETE", 200, "jaune", 5, 10, "season", 50, undefined);
        this.grid[7][10] = new propriety (24, "AVENUE DU DINDON DE LA FARCE", 100, "jaune", 7, 10, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[9][10] = new propriety (25, "RUE DE LA PAIX-RO", 120, "jaune", 9, 10, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        //Then we return to the start
    }
}