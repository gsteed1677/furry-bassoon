//function to save searched name to local storage
var saveToLocalStorage = function (name) {

  var recent = localStorage.getItem('recentPokemon');

  var json = [];

  if (recent) {
    json = JSON.parse(recent);
  }

  json.push(name);

  localStorage.setItem('recentPokemon', JSON.stringify(json))

}
//load data searches from local storage
var loadFromLocalStorage = function () {
  var recent = localStorage.getItem('recentPokemon');

  if (!recent) return [];

  var json = JSON.parse(recent);
  return json.reverse();
}

//search function for user input of pokemon
var renderRecentPokemon = function () {

  var recentPokemon = loadFromLocalStorage();
  $('#recent-pokemon').text('Recent Searchs: ');

  for (var i = 0; i < recentPokemon.length; i++) {
    //jquery of button creation for past pokemon search
    var btn = $("<button>");
    btn.text(recentPokemon[i])
    btn.click({ name: recentPokemon[i] }, function (e) {
      getPokeApi(e.data.name)
    })
    $('#recent-pokemon').append(btn);
  }



}
//document ready to load all code
$(document).ready(function () {
//event listener
  $("#searchClick").on("click", function () {
    var pokemonName = $("#textInput").val();
    // console.log(pokemonName)
    $("#textInput").val("")

    if (!pokemonName) {
      return;
    }

    getPokeApi(pokemonName, true);
  });
  renderRecentPokemon();
})

//fetch api request
var getPokeApi = function (pokemonName, saveToLocal) {
  var requestURL = "https://pokeapi.co/api/v2/pokemon/" + (pokemonName || '').trim().toLowerCase();
  //AJAX call
  $.ajax({
    url: requestURL,
    method: 'GET',
  }).then(function (data) {


    if (saveToLocal) {
      saveToLocalStorage(data.name);
      renderRecentPokemon();
    }
    //data display and creation of html tags
    $("#display-pokemon").empty();

    var pokemon = $("#display-pokemon");
    var pokeName = $("<h3>");
    var pokeMove = $("<p>");
    var pokeType = $("<p>");
    var pokeIndex = $("<p>");

    var str = "Moves: "
    console.log(data)
    //function to randomize arrayed moves so each input is brought back differently
    function randArr() {
      var movesArr = [];
      for (var i = 0; i < 5; i++) {

        var random = data.moves[Math.floor(Math.random() * 102)];
        movesArr.push(random);
        console.log("random", random.move.name)
        str += random.move.name + " -- "
      }
      console.log(movesArr)
    }
    randArr();

    for (var i = 0; i < data.moves.length; i++) {
    }


    //text and append elements
    pokeMove.text(str)
    pokeName.text("Name: " + data.name.toUpperCase());
    pokeType.text("Type: " + data.types[0].type.name.toUpperCase());
    pokeIndex.text("Pokedex #: " + data.id);
    pokemon.append(pokeName);
    pokemon.append(pokeMove);
    pokemon.append(pokeType);
    pokemon.append(pokeIndex);

  })
}

