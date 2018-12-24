const images = {
    "sf1": {
        width: 5,
        length: 5,
        horizontalOverlap: 0,
        verticalOverlap: 0,
        url: require('../resources/objects/floor/floor_01_normal_S_1_1_1_1.png'),
    },
    "sw-n": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wall_01_normal_N_1_1_1_1.png'),
    },
    "sw-s": {
        width: 5,
        length: 5,
        horizontalOverlap: 3,
        verticalOverlap: 3,
        url: require('../resources/objects/wall/wall_02_normal_S_1_1_3_3.png'),
    },
    "sw-e": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wall_01_normal_E_1_1_1_1.png'),
    },
    "sw-w": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wall_01_normal_W_1_1_1_1.png'),
    },
    "sc-nw": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wallcorner_01_normal_E_1_1_1_1.png'),
    },
    "sc-ne": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wallcorner_01_normal_S_1_1_1_1.png'),
    },
    "sc-se": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wallcorner_01_normal_W_1_1_1_1.png'),
    },
    "sc-sw": {
        width: 5,
        length: 5,
        horizontalOverlap: 1,
        verticalOverlap: 1,
        url: require('../resources/objects/wall/wallcorner_01_normal_N_1_1_1_1.png'),
    },
    "door-s": {
        width: 5,
        length: 5,
        horizontalOverlap: 3,
        verticalOverlap: 3,
        url: require('../resources/objects/wall/door_01_normal_S_1_1_3_3.png'),
    },
    "bookshelf": {
        "north": {
            width: 5,
            length: 5,
            horizontalOverlap: 0,
            verticalOverlap: 0,
            url: require('../resources/objects/bookshelf/bookshelf_01_normal_N_1_1_3_3.png'),
        },
        "south": {
            width: 5,
            length: 5,
            horizontalOverlap: 0,
            verticalOverlap: 0,
            url: require('../resources/objects/bookshelf/bookshelf_01_normal_S_1_1_3_3.png'),
        },
        "east": {
            width: 5,
            length: 5,
            horizontalOverlap: 0,
            verticalOverlap: 0,
            url: require('../resources/objects/bookshelf/bookshelf_01_normal_E_1_1_3_3.png'),
        },
        "west": {
            width: 5,
            length: 5,
            horizontalOverlap: 3,
            verticalOverlap: 3,
            url: require('../resources/objects/bookshelf/bookshelf_01_normal_W_1_1_3_3.png'),
        }
    },
    "chest": {
        "north": {
            width: 5,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/chest/chest_01_normal_N_1_1_1_1.png'),
        },
        "south": {
            width: 5,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/chest/chest_01_normal_S_1_1_1_1.png'),
        },
        "east": {
            width: 5,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/chest/chest_01_normal_E_1_1_1_1.png'),
        },
        "west": {
            width: 5,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/chest/chest_01_normal_W_1_1_1_1.png'),
        }
    },
    "chest_open": {
        "north": {
            width: 5,
            length: 5,
            horizontalOverlap: 2,
            verticalOverlap: 1,
            url: require('../resources/objects/chest/chest_01_open_N_1_1_2_1.png'),
        },
        "south": {
            width: 5,
            length: 5,
            horizontalOverlap: 2,
            verticalOverlap: 1,
            url: require('../resources/objects/chest/chest_01_open_S_1_1_2_1.png'),
        },
        "east": {
            width: 5,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 2,
            url: require('../resources/objects/chest/chest_01_open_E_1_1_1_2.png'),
        },
        "west": {
            width: 5,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 2,
            url: require('../resources/objects/chest/chest_01_open_W_1_1_1_2.png'),
        }
    },
    "table": {
        "north": {
            width: 10,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/table/table_01_normal_S_1_2_1_1.png'),
        },
        "south": {
            width: 10,
            length: 5,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/table/table_01_normal_S_1_2_1_1.png'),
        },
        "east": {
            width: 5,
            length: 10,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/table/table_01_normal_W_1_2_1_1.png'),
        },
        "west": {
            width: 5,
            length: 10,
            horizontalOverlap: 1,
            verticalOverlap: 1,
            url: require('../resources/objects/table/table_01_normal_W_1_2_1_1.png'),
        }
    },
    "key": {
        width: 3,
        length: 1.2,
        horizontalOverlap: 0,
        verticalOverlap: 0,
        url: require('../resources/items/key_01.png'),
    },
    "paper": {
        url: require('../resources/items/paper_01.png'),
    }
}

export default images