define([

    'app/gameObjects/GameObject',

], function(GameObject) {

    class BoxStorage extends GameObject {
    
        /**
         * @see GameObject
         * @param {Point} position 
         * @param {Boolean} hasDirection 
         */
        constructor(position, hasDirection, params) {
            super(position, hasDirection, params);

            Main.level.winCondition++;
        }
    
    }

    return BoxStorage;

});