define([

], function() {

    class GameObject {
    
        /**
         * 
         * @param {Point} position The position of this object in the level grid.
         * @param {Boolean} hasDirection Determines if the object must use a different sprite for each direction.
         */
        constructor(position, hasDirection) {
            /**
             * Position in the level grid.
             * @type {Point}
             */
            this.position = position;
    
            /**
             * Indicates if the object has oriented assets.
             * @type {Boolean}
             */
            this.hasDirection = hasDirection;
    
            if (this.hasDirection) {
    
                /**
                 * @type {Point}
                 */
                this.direction = DIRECTIONS.DOWN;
                
            }
    
            /**
             * Position to be taken by the object if its movement is allowed.
             * @type {Point}
             */
            this.potentialPosition = null;
    
            /**
             * Graphic representation in the DOM.
             * @type {JQuery}
             */
            this.graphics = $("<div></div>");
    
            this.setImage(this.constructor.name);
    
            this.graphics.css({
                width: CELL_WIDTH,
                height: CELL_HEIGHT
            });
        }
    
        /**
         * Changes the asset of the object.
         * 
         * @param {String} assetName 
         */
        setImage(assetName) {
            var path = "assets/" + assetName;

            if (this.hasDirection) {
                path += "/" + assetName;
                if (this.direction === DIRECTIONS.DOWN) path += "_down";
                else if (this.direction === DIRECTIONS.LEFT) path += "_left";
                else if (this.direction === DIRECTIONS.RIGHT) path += "_right";
                else if (this.direction === DIRECTIONS.UP) path += "_up";
            }

            path += ".png";
    
            this.graphics.css({
                backgroundImage: 'url(' + path + ')'
            });
        }
    
        /**
         * Find the target Cell depending on the movement direction and chooses an action to execute depending on its content.
         * @param {Point} direction 
         * @returns {Object} Returns the cells concerned by the movement so they can be used in the overrides in subclasses.
         */
        askMove(direction) {
            var toCoords = Point.sum(this.position, direction);
            var fromCell = Main.level.getCell(this.position);
            var toCell = Main.level.getCell(toCoords);
    
            this.potentialPosition = toCoords;
            if (this.hasDirection) {
                this.direction = direction;
                this.setImage(this.constructor.name);
            }
            
            if (!toCell.content) {
                this.actionNull(fromCell, toCell);
                return;
            }

            // /!\ The action is chosen by looking for a method named "action" + the name of the constructor of the targeted object. Please name your methods carefully.
            var functionToCall = this["action" + toCell.content.constructor.name];
            if (typeof functionToCall === "function") functionToCall.call(this, fromCell, toCell);
        }

        /**
         * Called if the objects asks to move on an empty cell.
         * 
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionNull(fromCell, toCell) {
            this.doMove(fromCell, toCell);
        }

        /**
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionWall(fromCell, toCell) {}

        /**
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionPlayer(fromCell, toCell) {}

        /**
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionBox(fromCell, toCell) {}

        /**
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionBoxStorage(fromCell, toCell) {
            this.doMove(fromCell, toCell);
        }
    
        /**
         * Move the object from one cell to another.
         * 
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        doMove(fromCell, toCell, newCoords) {
            // Stocks the current content of the target cell if it exists.
            if (toCell.content) {
                toCell.hiddenContent = toCell.content;
            }
    
            toCell.content = fromCell.content;
    
            // Shows the stocked content of the 'old' cell if it exists.
            if (fromCell.hiddenContent) {
                fromCell.content = fromCell.hiddenContent;
                fromCell.hiddenContent = null;
            }
            else fromCell.content = null;
    
            toCell.refreshContent();
            fromCell.refreshContent();
            
            this.position = this.potentialPosition;
        }
        
        /**
         * Destroys an instance.
         */
        destroy() {
            this.graphics.remove();
        }
    
    }

    return GameObject;

});