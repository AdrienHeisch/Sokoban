define([

    // List of the game objects class files.
    // Add the URL of your own objects here (base URL is scripts/)
    'app/gameObjects/Box',
    'app/gameObjects/BoxStorage',
    'app/gameObjects/Player',
    'app/gameObjects/Wall'
    ////

], function(Box, BoxStorage, Player, Wall) { // Add the name of your game objects constructors in parameters.

    /**
     * Each property represents a type of game object.
     * Each property has to be an object with :
     *      - a name corresponding to the name of the constructor of the game object.
     *      - a "hasDirection" boolean property ; if it is true, the assets will have to be
     *          saved in a folder named after the asset name found in the corresponding class file.
     * 
     * @see GameObject
     */
    var assetsConfig = {

        0: {
            name: null,
            hasDirection: false
        },

        1: {
            name: Wall,
            hasDirection: false
        },

        2: {
            name: Box,
            hasDirection: false
        },

        3: {
            name: BoxStorage,
            hasDirection: false
        },

        4: {
            name: Player,
            hasDirection: true
        }/*,

        5: {
            name: Something,
            hasDirection: false
        }*/

        // Add the your new objects here, following the pattern used above.

    };

    return assetsConfig;

});