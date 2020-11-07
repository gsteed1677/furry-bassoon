// $(document).ready(function(){ 

//     $("#searchClick").on("click", function(){
//             let pokemonCard = $("#textInput").val();
//             console.log(pokemonCard)
//             $("#textInput").val("")
//             apiPokemon(pokemonCard, true);
//         });
    
//     function apiPokemon(pokemonCard) {
//         // console.log('inside of apiPokemon function')
//         console.log(pokemonCard)
//         let requestURL = "https://api.pokemontcg.io/v1/cards?name=" + (pokemonCard || '').trim().toLowerCase();
//         $.ajax({
//             url: requestURL,
//             method: "GET",
//         }).then(function (data) {
//             console.log("data", data);
//             // console.log(data.cards[0].name);
//             // console.log(data.cards[0].imageUrl)
    
    
//             let pokemon = $("#pokemon-display");
//             let pokemonCard = $("<img>");
    
//             for (var i = 0; i < data.cards.length; i++) {
    
//             pokemonCard.attr("src", "" + data.cards[i].imageUrl);
//             console.log(data.cards[i].imageUrl)
//             }
    
//             pokemon.append(pokemonCard);
//             $("#pokemon-display").empty();
//             // $("#pokemon-display").empty();
//             // pokemonCard.attr("src", "" + data.cards[0].imageUrl);
    
//             // pokemon.append(pokemonCard);
    
//         });
        
//     }
//     })