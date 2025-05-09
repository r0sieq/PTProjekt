export function generateMinesweeperMultipliers(numMines: number){
    const RTP = .96;
    const TOTAL_TILES = 25;
    const safeTiles = TOTAL_TILES - numMines;
    const multipliers = [];
    let cumProb = 1;
    for(let i = 0; i <= safeTiles; i++){
        const remainingSafe = safeTiles - (i - 1);
        const remainingTotal = TOTAL_TILES - (i - 1);
        const probability = remainingSafe / remainingTotal;
        cumProb *= probability;

        const rawMultiplier = 1 / cumProb;

        const balancedMultiplier = rawMultiplier * RTP;
        multipliers.push(Math.max(1, parseFloat(balancedMultiplier.toFixed(3))));
    }    

    return multipliers;
}

export function calculateMinesweeperMultiplier(mines: number, streak: number){

    if(streak === 0) return 1;

    const totalTiles = 25;
    const safeTiles = totalTiles - mines;
    if(mines >= totalTiles) return 0;
    if(streak > safeTiles) return 0;

    let probability = 1;

    for(let i = 0; i < streak; i++){
        probability *= (safeTiles - i) / (totalTiles - i);
    }

    if(probability === 0) return 0;

    const houseEdge = .99;
    const multiplier = houseEdge / probability;

    return parseFloat(multiplier.toFixed(4));
}