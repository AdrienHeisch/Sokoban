define([

    'app/level/Cell',
    'data/assetsConfig'

], function(Cell, assetsConfig) {

    class Level {
    
        /**
         * Creates a logical grid of graphic cells.
         */
        constructor() {

            /**
             * Graphic container of the level's content.
             * @type {JQuery}
             */
            this.graphics = $("#levelContainer");

            /**
             * Logical grid of the level.
             * @type {Array.<Array.<Cell>>}
             */
            this.grid = [];

            /**
             * Current number of points.
             * @type {Number}
             */
            this.winProgression = 0;

            /**
             * Number of points nedded to win the level.
             * @type {Number}
             */
            this.winCondition = 0;
        }

        /**
         * This converts the map into an array of Cells.
         * @param {Array.<Array.<Number>>} levelMap A two-dimensional table of numbers, representing the ID of each cells.
         */
        build(levelMap) {
            var row, cell, id;
            for (let i = 0; i < levelMap.length; i++) {
                row = [];
                this.grid.push(row);
                for (let j = 0; j < levelMap[i].length; j++) {
                    if (typeof levelMap[i][j] === "number") {
                        id = assetsConfig[levelMap[i][j]];
                        cell = new Cell(id.name, new Point(j, i), id.hasDirection);
                    } else if (levelMap[i][j].constructor === Array) {
                        id = assetsConfig[levelMap[i][j][0]];
                        cell = new Cell(id.name, new Point(j, i), id.hasDirection, levelMap[i][j][1]);
                    } else throw new Error("Level " + Main.levelId + ": {\n\tx: " + i + ", \n\ty: " + j + "\n}\n\nInvalid character.")

                    row.push(cell);
                    cell.graphics.css({
                        left: CELL_WIDTH * j,
                        top: CELL_HEIGHT * i
                    }).appendTo(this.graphics);
                }
            }
        }
    
        /**
         * Used to get a cell from the grid.
         * @param {Point} coords Coordinates of the desired cell.
         * @returns {Cell} Returns the cell corresponding to the given coordinates.
         */
        getCell(coords) {
            return this.grid[coords.y][coords.x];
        }
    
        /**
         * Called when a box is moved on a storage location.
         * @param {Number} points Number of points to add (can be negative).
         * @return {Boolean} Returns true if the level is finished.
         */
        addPoints(points) {
            this.winProgression += points;
            this.winProgression = MathPlus.clamp(this.winProgression, 0, this.winCondition);
            
            if (this.winProgression === this.winCondition) {
                Main.changeLevel(1);
                return true;
            }
            return false;
        }
    
        /**
         * Destroys an instance.
         */
        destroy() {
            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[i].length; j++) {
                    this.grid[i][j].destroy();
                }
            }
            this.graphics.empty();
        }
    
    }

    return Level;
});