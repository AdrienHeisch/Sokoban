require.config({
    baseUrl: 'scripts',
})

require([

    'data/levels',
    'app/level/Level'

], function(levels, Level) {

    /**
     * The Main object manages the loading of levels.
     * @type {Objects}
     */
    Main = {
        /**
         * Reference to the current level.
         * @type {Level}
         */
        level: {},
    
        /**
         * ID of the current level.
         * @type {Number}
         */
        levelId: 1,
        
        /**
         * Removes the current level and creates the next one.
         * @param {Number} change
         */
        changeLevel: function(change) {
            if (this.level.destroy) this.level.destroy();
            
            this.levelId += change;
            
            if (levels[this.levelId]) {
                this.level = new Level();
                this.level.build(levels[this.levelId]);
            }
            else $("<div></div>").text("You win !").css("font-size", "50px").appendTo($("body"));
        },

        /**
         * Reloads the current level.
         */
        retry: function() {
            Main.changeLevel(0);
        }
        
    }

    // The assets must have the same width and height as the cells (or everything will look bad).
    
    /**
     * Width of a game cell.
     * @type {Number}
     */
    CELL_WIDTH = 50;

    /**
     * Height of a game cell.
     * @type {Number}
     */
    CELL_HEIGHT = 50;
    
    /**
     * Directions the game objects can move to.
     * @type {Object}
     */
    DIRECTIONS = {
        RIGHT: new Point(1, 0),
        LEFT: new Point(-1, 0),
        UP: new Point(0, -1),
        DOWN: new Point(0, 1)
    }
    
    Main.changeLevel(0);

});

