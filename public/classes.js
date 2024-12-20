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
        this.goals = 0;
    }
}

class Team {
    constructor (name, players, onField, goalie) {
        this.name = name;
        this.players = players;
        this.onField = onField;
        this.goalie = goalie;
        this.score = 0;
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

        this.playType = "full strength";
        this.isRunning = false;
    }

    initiateGame () {
        if (!this.isRunning) {
            this.isRunning = true;
            this.quarter = 1;
            this.time = 0;

            setTeams();
            faceoffHandler();
        }
        // Not sure if we'll need an 'else' here...
    }

    updateGame (event) {
        // Take 'event', find how much time came off the clock for
        //   the event (based on class at bottom), take that much
        //   time off the clock, then direct to proper function
    }
    
    substitutionHandler () {
        // Automatically put in best goalie for each team
        goalie1 = team1.players.filter((player) => player.position === "goalie");
        goalie1.sort((a, b) => parseFloat(b.goalkeeping) - parseFloat(a.goalkeeping));
        team1.goalie = goalie1[0];
        goalie2 = team2.players.filter((player) => player.position === "goalie");
        goalie2.sort((a, b) => parseFloat(b.goalkeeping) - parseFloat(a.goalkeeping));
        team2.goalie = goalie2[0];
        // Put correct players on the field depending on possession
        // -1: Faceoff. Base personnel on field
        // 0: Team 1 has the ball. Offense/Defense personnel
        // 1: Team 2 has the ball. Offense/Defense personnel
        if (this.possession === -1) {
            team1.players.sort((a, b) => parseFloat(b.attack) - parseFloat(a.attack));
            team1.onField += [team1.players[0], team1.players[1], team1.players[2], team1.players[3], team1.players[4]];
            faceoffs = team1.players.filter((player) => player.position === "faceoff");
            faceoffs.sort((a, b) => parseFloat(b.faceoff) - parseFloat(a.faceoff));
            team1.players += faceoffs[0];
            team1.players.sort((a, b) => parseFloat(b.defense) - parseFloat(a.defense));
            team1.onField += [team1.players[0], team1.players[1], team1.players[2]];

            team2.players.sort((a, b) => parseFloat(b.attack) - parseFloat(a.attack));
            team2.onField += [team2.players[0], team2.players[1], team2.players[2], team2.players[3], team2.players[4]];
            faceoffs = team2.players.filter((player) => player.position === "faceoff");
            faceoffs.sort((a, b) => parseFloat(b.faceoff) - parseFloat(a.faceoff));
            team2.players += faceoffs[0];
            team2.players.sort((a, b) => parseFloat(b.defense) - parseFloat(a.defense));
            team2.onField += [team2.players[0], team2.players[1], team2.players[2]];
        } else if (this.possession === 0) {
            team1.players.sort((a, b) => parseFloat(b.attack) - parseFloat(a.attack));
            team1.onField += [team1.players[0], team1.players[1], team1.players[2], team1.players[3], team1.players[4], team1.players[5]];
            team1.players.sort((a, b) => parseFloat(b.defense) - parseFloat(a.defense));
            team1.onField += [team1.players[0], team1.players[1], team1.players[2]];

            team2.players.sort((a, b) => parseFloat(b.attack) - parseFloat(a.attack));
            team2.onField += [team2.players[0], team2.players[1], team2.players[2]];
            team2.players.sort((a, b) => parseFloat(b.defense) - parseFloat(a.defense));
            team2.onField += [team2.players[0], team2.players[1], team2.players[2], team2.players[3], team2.players[4]];           
        } else if (this.possession === 1) {
            team1.players.sort((a, b) => parseFloat(b.attack) - parseFloat(a.attack));
            team1.onField += [team1.players[0], team1.players[1], team1.players[2]];
            team1.players.sort((a, b) => parseFloat(b.defense) - parseFloat(a.defense));
            team1.onField += [team1.players[0], team1.players[1], team1.players[2], team1.players[3], team1.players[4]]; 

            team2.players.sort((a, b) => parseFloat(b.attack) - parseFloat(a.attack));
            team2.onField += [team2.players[0], team2.players[1], team2.players[2], team2.players[3], team2.players[4], team2.players[5]];
            team2.players.sort((a, b) => parseFloat(b.defense) - parseFloat(a.defense));
            team2.onField += [team2.players[0], team2.players[1], team2.players[2]];
        }
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

    groundBallHandler () {

    }

    penaltyHandler () {
        // Check if there's a penalty
        let penaltyChance = Math.random();
        if (penaltyChance >= 0.75) {
            // If there is a penalty, who is it on?
            let players = team1.onField;
            players += team2.onField;

            let random = Math.floor(Math.random() * players.length);

            let toBox = players[random - 1];
            if (team1.onField.filter((player) => player == toBox)) {
                // Remove player from field
                
            } else if (team2.onField.filter((player) => player == toBox)) {

            } else {
                throw new Error;
            }
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
