let players = [
    {
        name: "Mike Smith",
        position: "attack",
        rating: 7
    },
    {
        name: "John Doe",
        position: "attack",
        rating: 8
    },
    {
        name: "Vince McMahon",
        position: "attack", 
        rating: 6
    },
    {
        name: "Patty Mac",
        position: "attack", 
        rating: 9
    }
]

players.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
console.log(players);
