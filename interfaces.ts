export interface Color {
    r: number;
    g: number;
    b: number;
}

export interface Cell extends Color {
    x: number;
    y: number;
    expectedX: number;
    expectedY: number;
    index: number;
}

export interface Game {
    cells: Cell[];
    empty: [number, number];
    size: number;
    time: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    clickCount: number;
    isGameStarted: boolean;
    isGameOver: boolean;
}

export interface Result {
    score: number;
    clickCount: number;
    time: number;
};
