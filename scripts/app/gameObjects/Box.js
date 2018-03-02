define([

    'app/gameObjects/GameObject'

], function(GameObject) {

    class Box extends GameObject {
    
        /**
         * @see GameObject
         * @param {Point} position 
         * @param {Boolean} hasDirection 
         */
        constructor(position, hasDirection) {
            super(position, hasDirection);
    
            Main.level.winCondition++;

            /**
             * Is set to true when the box is on a storage location.
             * @type {Boolean}
             */
            this.isOnStorage = false;

            /**
             * Reference to the last player that pushed the box.
             * @type {Player}
             */
            this.callbackPlayer = null;
    
            /**
             * Reference to the direction the box was pushed (for the callback on the player).
             * @type {Point}
             */
            this.callbackDirection = null;
        }
    
        /**
         * Checks if the box is on a storage location and adds a point if it is.
         * @see GameObject
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        doMove(fromCell, toCell) {
            var endLevel = false;

            if (toCell.content && toCell.content.constructor.name === "BoxStorage" && !this.isOnStorage) {
                this.isOnStorage = true;
                this.setImage("BoxWin");
                endLevel = Main.level.addPoints(1); 
            }
            if ((!toCell.content || (toCell.content && toCell.content.constructor.name !== "BoxStorage")) && this.isOnStorage) {
                this.isOnStorage = false;
                this.setImage(this.constructor.name);
                endLevel = Main.level.addPoints(-1);
            }
            
            super.doMove(fromCell, toCell);
            if (!endLevel) this.callbackPlayer.askMove(this.callbackDirection);
        }
    
    }

    return Box;

});