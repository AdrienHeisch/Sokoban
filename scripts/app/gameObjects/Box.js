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
         * @see GameObject
         * @param {Point} direction 
         */
        askMove(direction, hasDirection) {
            this.callbackDirection = direction;
            
            var cells = super.askMove(direction);
    
            var fromCell = cells.fromCell;
            var toCell = cells.toCell;
            
            switch (toCell.content.constructor.name) {
                case "BoxStorage":
                    this.doMove(fromCell, toCell);
                    break;
            }
        }
    
        /**
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