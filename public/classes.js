class Player {
    constructor (name, attack, defense, faceoff, goalkeeping, iq, physical) {
        this.name = name;
        this.position = position;
        this.attack = attack;
        this.defense = defense;
        this.faceoff = faceoff;
        this.goalkeeping = goalkeeping;
        this.iq = iq;
        this.physical = physical;
    }
}

class Team {
    constructor (name, players, onField) {
        this.name = name;
        this.players = players;
        this.onField = onField;
        this.score = score;
    }
}

class GameState {
    constructor () {
        this.team1 = team1;
        this.team2 = team2;
        this.maxQuarters = maxQuarters;
        this.maxTime = maxTime;

        this.quarter = 0;
        this.time = -1;
        this.possession = -1;

        this.isRunning = false;
    }

    initiateGame () {
        if (!this.isRunning) {
            this.isRunning = true;
            this.quarter = 1;
            this.time = 0;

            this.faceoffHandler();
        }
        // Not sure if we'll need an 'else' here...
    }

    updateGame (event) {

    }

    faceoffHandler () {
        // Get the faceoff players in one variable
        let faceoff1 = team1.players.filter((player) => player.position === "faceoff");
        let faceoff2 = team2.players.filter((player) => player.position === "faceoff");

        // Randomize player ratings
        let fo1rating = Math.floor(Math.random() * faceoff1.rating);
        let fo2rating = Math.floor(Math.random() * faceoff2.rating);

        // Check for ground ball
        let groundBall = Math.random();
        if (groundBall >= 0.65) {
            groundBallHandler();
        } else {
            // Assign possession
            this.possession = fo1rating > fo2rating ? 0 : 1;
            updateGame("faceoff won");
            penaltyHandler();
        }
    }

    penaltyHandler () {
        // Check if there's a penalty
        let penaltyChance = Math.random();
        if (penaltyChance >= 0.75) {
            
        } else {
            turnoverHandler();
        }
    }

    turnoverHandler() {

    }
}

const events = [
    {
        type: "faceoff won",
        average: null,
        variance: null,
    },
    {
        type: "ground ball won",
        average: null,
        variance: null,
    },
    {
        type: "penalty",
        average: null,
        variance: null,
    },
    {
        type: "turnover",
        average: null,
        variance: null,
    },
    {
        type: "shot clock violation",
        average: 30,
        variance: 0
    },
    {
        type: "blocked shot",
        average: null,
        variance: null,
    },
    {
        type: "saved shot",
        average: null,
        variance: null,
    },
    {
        type: "shot off post",
        average: null,
        variance: null,
    },
    {
        type: "shot wide of post",
        average: null,
        variance: null,
    },
    {
        type: "shot made",
        average: null,
        variance: null,
    }
]

const penalties = [
    {
        type: "cross-checking",
        duration: 60,
        chance: 0.2
    }, 
    {
        type: "slashing",
        duration: 60,
        chance: 0.2
    },
    {
        type: "tripping",
        duration: 60,
        chance: 0.07
    },
    {
        type: "roughness",
        duration: 120,
        chance: 0.07
    },
    {
        type: "holding",
        duration: 30,
        chance: 0.22
    },
    {
        type: "offsides",
        duration: 30,
        chance: 0.17
    },
    {
        type: "warding",
        duration: 30,
        chance: 0.07
    }
]
