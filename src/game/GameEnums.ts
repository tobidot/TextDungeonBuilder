enum FieldBaseTypes {
    WATER = 0,
    DIRT,
    ROCK,
    LAVA,
    MAX
};

const FieldBaseTypesCharacters = [
    '~',
    ' ',
    '_',
    ',',
];

const PlayerOrders = [
    "ATTACK",
    "DIG",
    "SEARCH",
    "WEST",
    "EAST",
    "NORTH",
    "SOUTH",
]



export {
    FieldBaseTypes,
    FieldBaseTypesCharacters,
    PlayerOrders,
};