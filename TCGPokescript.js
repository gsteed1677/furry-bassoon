$(document).ready(function(){ 

    $("#pokemon-rand").on("click", function(){
        let pokemonName = $("#textInput").val();
        console.log(pokemonName)
        $("#textInput").val([])

        apiPokemon(pokemonName);
})});

let apiPokemon = () => {
    let requestURL = "https://api.pokemontcg.io/v1/cards";

    $.ajax({
        url: requestURL,
        method: "GET",
    }).then(function (data) {
        console.log("data", data);
        console.log(data.name);

        let pokemon = $("#pokemon-display");
        let pokemonName = $("<p>");
        pokemonName.text("Name:" + data.results[0].name);
        pokemon.append(pokemonName);
    });
}
