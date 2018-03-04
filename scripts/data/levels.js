define([

], function() {
    
    /**
     * Each level is a two-dimensional array of numbers. The numbers are the IDs of the game objects in the level.
     * Any parameter can be passed to the game objects. To do so, replace the id at the desired coordinates by an array.
     * The first element of this array must be the id of the game object,
     * an the second must be an object containing the parameters.
     * @see assetsConfig
     */
    var levels = {
        
        1: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],

        2: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, [4, {direction: "RIGHT"}], 0, 0, 0, 0, 1], // In this example, the player (4) will look to the right at the beginning of the level.
            [1, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 2, 0, 3, 1],
            [1, 0, 0, 2, 1, 3, 1],
            [1, 0, 0, 0, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],

        3: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 3, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 2, 0, 3, 1],
            [1, 0, 0, 2, 1, 3, 1],
            [1, 0, 0, 2, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 1],
            [1, 3, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ]/*,

        4: [
            [0, 1, 2, 3, 4]
        ]*/

    };

    return levels;

});