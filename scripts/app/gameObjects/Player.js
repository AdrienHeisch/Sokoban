define([

    'app/gameObjects/GameObject'

], function(GameObject) {

    class Player extends GameObject {

        /**
         * @see GameObject
         * @param {Point} position 
         * @param {Boolean} hasDirection 
         */
        constructor(position, hasDirection) {
            super(position, hasDirection);

            /**
             * Reference to a binded keyboard handler, used to remove the listener.
             * @type {Function}
             */
            this.keyboardHandler = this.keyboardHandler.bind(this);

            window.addEventListener("keydown", this.keyboardHandler);
        }

        /**
         * Handles the keyboard inputs that moves the player.
         * @param {Event} e 
         */
        keyboardHandler(e) {
            switch (e.keyCode) {
                case 90:
                case 38:
                    this.askMove(DIRECTIONS.UP);
                    break;
                case 83:
                case 40:
                    this.askMove(DIRECTIONS.DOWN);
                    break;
                case 81:
                case 37:
                    this.askMove(DIRECTIONS.LEFT);
                    break;
                case 68:
                case 39:
                    this.askMove(DIRECTIONS.RIGHT);
                    break;
            }
        }

        /**
         * @see GameObject  
         * @param {Point} direction  
         */
        askMove(direction) {
            var cells = super.askMove(direction);

            var fromCell = cells.fromCell;
            var toCell = cells.toCell;
            
            if (!toCell.content) return;
            switch (toCell.content.constructor.name) {
                case "Box":
                    toCell.content.callbackPlayer = this;
                    toCell.content.askMove(direction);
                    break;
                case "BoxStorage":
                    this.doMove(fromCell, toCell);
                    break;
            }
        }

        /**
         * Destroys an instance.
         */
        destroy() {
            super.destroy();
            window.removeEventListener("keydown", this.keyboardHandler);
        }

    }

    return Player;

});