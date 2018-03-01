define([

    'app/gameObjects/GameObject'
    
], function(GameObject) {

    class Wall extends GameObject {

        /**
         * @see GameObject
         * @param {Point} position 
         * @param {Boolean} hasDirection 
         */
        constructor(position, hasDirection) {
            super(position, hasDirection);
        }

    }

    return Wall;

});