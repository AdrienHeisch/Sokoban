define([

], function() {

    class Cell {

        /**
         * A cell of the level grid, contains one element or nothing.
         * 
         * @param {Function} elementType The constructor of the object type.
         * @param {Point} position
         * @param {Boolean} hasDirection
         */
        constructor(elementType, position, hasDirection) {
            /**
             * This is the DOM container for the graphic element that will be added later.
             * @type {JQuery}
             */
            this.graphics = $("<div></div>").addClass("cell");
            this.graphics.css({
                width: CELL_WIDTH,
                height: CELL_HEIGHT
            });
    
            /**
             * This is the logical container for the game object.
             * @type {GameObject}
             */
            this.content = null;
            
            if (elementType) {
                this.content = new elementType(position, hasDirection);
                this.refreshContent();
            }
    
            /**
             * This contains a game object that might be hidden by another (player on storage location).
             * @type {GameObject}
             */
            this.hiddenContent = null;
        }
    
        /**
         * Called when the content of the cell is changed.
         */
        refreshContent() {
            this.graphics.empty();
            if (this.content) this.content.graphics.appendTo(this.graphics);
        }
    
        /**
         * Destroys an instance.
         */
        destroy() {
            this.graphics.remove();
            if (this.content) this.content.destroy();
        }
    
    }

    return Cell;

});