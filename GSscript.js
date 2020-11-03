$(document).ready(function() {

    $("#searchClick").on("click", function() {
    var pokemonName = $("#textInput").val();
    // console.log(pokemonName)
    $("#textInput").val("")
    
    getPokeApi(pokemonName);
});

})


var getPokeApi = function (pokemonName) {
    // console.log(pokemonName)
    var requestURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
    //AJAX call
    $.ajax({
        url: requestURL,
        method: 'GET',
    }).then(function (data) {
        console.log(data)
        console.log(data.name)
    
    $("#display-pokemon").empty();
    
    var pokemon = $("#display-pokemon");
    var pokeName = $("<h1>");
    var pokeMove = $("<p>");
    var pokeType = $("<p>");
    var pokeIndex = $("<p>");

    pokeMove.text("Moves: " + data.moves[0].move.name +", " + data.moves[1].move.name + ", " + data.moves[2].move.name + ", " + data.moves[3].move.name)
    pokeName.text("Name: " + data.name.toUpperCase());
    pokeType.text("Type: " + data.types[0].type.name);
    pokeIndex.text("Pokedex #: " + data.id);

    pokemon.append(pokeName);
    pokemon.append(pokeMove);
    pokemon.append(pokeType);
    pokemon.append(pokeIndex);

    })
}



//Event listener
