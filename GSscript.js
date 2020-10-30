$(document).ready(function() {

$("#searchClick").on("click", function() {
    var pokemonName = $("#textInput").val();
    console.log(pokemonName)
    $("#textInput").val("")
    
    getPokeApi(pokemonName);
});


var getPokeApi = function (pokemonName) {
    var requestURL = "https://pokeapi.co/api/v2/";
    //AJAX call
    $.ajax({
        url: requestURL,
        method: 'GET',
    }).then(function (data) {
        console.log('data', data)
        console.log(data.name)
    
    // var pokemon = $("#display-pokemon")

    // var pokeName = $("<h1>")

    // pokeName.text("Name: " + data.results[0].name);

    // pokemon.append(pokeName);

    })
}



//Event listener
$("#random-poke").on("click", getPokeApi);


})