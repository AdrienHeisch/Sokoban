define([

    'app/gameObjects/GameObject'

], function(GameObject) {

    class Box extends GameObject {
    
        /**
         * @see GameObject
         * @param {Point} position 
         * @param {Boolean} hasDirection 
         */
        constructor(position, hasDirection, params) {
            super(position, hasDirection, params);

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
         * Removes a point if the box is pushed from a storage location.
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionNull(fromCell, toCell) {
            if (this.isOnStorage) {
                this.isOnStorage = false;
                this.setImage();
                Main.level.addPoints(-1);
            }
            super.actionNull(fromCell, toCell);
        }

        /**
         * Adds a point if the box is pushed on a storage location.
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        actionBoxStorage(fromCell, toCell) {
            var endLevel;
            if (!this.isOnStorage) {
                this.isOnStorage = true;
                this.setImage("boxWin");
                endLevel = Main.level.addPoints(1);
            }
            if (!endLevel) super.actionBoxStorage(fromCell, toCell);
        }
    
        /**
         * Checks if the box is on a storage location and adds a point if it is.
         * @see GameObject
         * @param {Cell} fromCell 
         * @param {Cell} toCell 
         */
        doMove(fromCell, toCell) {
            super.doMove(fromCell, toCell);
            this.callbackPlayer.askMove(this.callbackDirection);
        }
    
    }

    return Box;

});