/* This class will set up propriety class & action class for a future use in the board class */
/* x = line, y = column */
class board{ 
    constructor() {
        //Init the 11x11 grid
        this.grid = new Array(11);
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i] = new Array (11);
        }
        //Init every case of the grid that we will use
        /* First Parcel */
        this.grid[10][9] = new propriety (0, "AVENUE DE LA BOUCHEE DE PAIN", 60, "orange", 10, 9, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[10][7] = new propriety (1, "RUE DE LA POIRE EN DEUX", 60, "orange", 10, 7, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[10][5] = new propriety (2, "AUTOMNE", 200, "orange", 10, 5, "season", 50, undefined);
        this.grid[10][4] = new propriety (3, "BOULEVARD DE LA TETE D'OEUF", 100, "orange", 10, 4, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[10][2] = new propriety (4, "RUE SERREE COMME DES SARDINES", 100, "orange", 10, 2, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[10][1] = new propriety (5, "AVENUE DE L\'EAU A LA BOUCHE", 120, "orange", 10, 1, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        /* Second Parcel */
        this.grid[9][0] = new propriety (6, "", 60, "blanc", 9, 0, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[7][0] = new propriety (7, "", 60, "blanc", 7, 0, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[6][0] = new propriety (8, "", 60, "blanc", 6, 0, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);        
        this.grid[5][0] = new propriety (9, "HIVER", 200, "blanc", 5, 0, "season", 50, undefined);
        this.grid[4][0] = new propriety (10, "", 100, "blanc", 4, 0, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[2][0] = new propriety (11, "", 100, "blanc", 2, 0, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[1][0] = new propriety (12, "", 120, "blanc", 1, 0, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        /* Third Parcel */
        this.grid[0][1] = new propriety (13, "", 60, "vert", 9, 0, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[0][3] = new propriety (14, "", 60, "vert", 7, 0, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[0][4] = new propriety (15, "", 60, "vert", 6, 0, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);        
        this.grid[0][5] = new propriety (16, "PRINTEMPS", 200, "vert", 5, 0, "season", 50, undefined);
        this.grid[0][6] = new propriety (17, "", 100, "vert", 4, 0, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[0][7] = new propriety (18, "", 100, "vert", 2, 0, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[0][9] = new propriety (19, "", 120, "vert", 1, 0, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        /* Fourth Parcel */
        this.grid[1][10] = new propriety (20, "", 60, "jaune", 10, 9, "classic", [10, 90, 250, 30, 160], [50, 100, 25, 50]);
        this.grid[2][10] = new propriety (21, "", 60, "jaune", 10, 7, "classic", [20, 180, 450, 60, 320], [50, 100, 25, 50]);
        this.grid[4][10] = new propriety (22, "ETE", 200, "jaune", 10, 5, "season", 50, undefined);
        this.grid[5][10] = new propriety (23, "", 100, "jaune", 10, 4, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[7][10] = new propriety (24, "", 100, "jaune", 10, 9, "classic", [30, 270, 550, 90, 400], [100, 300, 50, 250]);
        this.grid[9][10] = new propriety (25, "", 120, "jaune", 10, 9, "classic", [40, 300, 600, 100, 450], [100, 300, 50, 250]);

        //Then we return to the start
    }
}