
$(document).ready(function () {
    $("#searchClick").on("click", function () {
      var pokemonName = $("#textInput").val();
      $("#textInput").val("");
      if (!pokemonName) {
        return;
      }
      getPokeApi(pokemonName, true);
      apiPokemon(pokemonName);
    });
    renderRecentPokemon();
    
    function getPokeApi(pokemonName, saveToLocal) {
      var requestURL =
        "https://pokeapi.co/api/v2/pokemon/" +
        (pokemonName || "").trim().toLowerCase();
      //AJAX call
      $.ajax({
        url: requestURL,
        method: "GET",
      }).then(function (data) {
        if (saveToLocal) {
          saveToLocalStorage(data.name);
          renderRecentPokemon();
        }
        $("#display-pokemon").empty();
        var pokemon = $("#display-pokemon");
        var pokeName = $("<h3>");
        var pokeMove = $("<p>");
        var pokeType = $("<p>");
        var pokeIndex = $("<p>");
        var str = "Moves: ";
        function randArr() {
          var movesArr = [];
          for (var i = 0; i < 5; i++) {
            var random = data.moves[Math.floor(Math.random() * 102)];
            movesArr.push(random);
            str += random.move.name + " -- ";
          }
        }
        randArr();
        for (var i = 0; i < data.moves.length; i++) {}
        pokeMove.text(str);
        pokeName.text("Name: " + data.name.toUpperCase());
        pokeType.text("Type: " + data.types[0].type.name.toUpperCase());
        pokeIndex.text("Pokedex #: " + data.id);
        pokemon.append(pokeName);
        pokemon.append(pokeMove);
        pokemon.append(pokeType);
        pokemon.append(pokeIndex);
      });
    };
  
    function apiPokemon(pokemonName, saveToLocal) {
      let requestURL = "https://api.pokemontcg.io/v1/cards?name=" + pokemonName;
      $.ajax({
        url: requestURL,
        method: "GET",
      }).then(function (data) {
        console.log(data.cards[0].imageUrl)
        if (saveToLocal) {
          saveToLocalStorage(data.cards[0].imageUrl);
          renderRecentPokemon();
        }
        console.log(data.cards[0]);
        let pokemon = $("#pokemon-display");
        let pokemonName = $("<img>");
        pokemonName.attr("src", "" + data.cards[0].imageUrl);
        $("#pokemon-display").empty()
        pokemon.append(pokemonName);
  
        
      });
      
    };
    function saveToLocalStorage(name) {
    var recent = localStorage.getItem("recentPokemon");
    var json = [];
    if (recent) {
      json = JSON.parse(recent);
    }
    json.push(name);
    localStorage.setItem("recentPokemon", JSON.stringify(json));
  };
  
  function loadFromLocalStorage() {
    var recent = localStorage.getItem("recentPokemon");
    if (!recent) return [];
    var json = JSON.parse(recent);
    return json.reverse();
  };
  
  function renderRecentPokemon() {
    var recentPokemon = loadFromLocalStorage();
    $("#recent-pokemon").text("Click for new moves!: ");
    for (var i = 0; i < recentPokemon.length; i++) {
      var btn = $("<button>");
      btn.text(recentPokemon[i]);
      btn.click({ name: recentPokemon[i] }, function (e) {
        getPokeApi(e.data.name);
        apiPokemon(e.data.cards[0].imageUrl)
      });
      $("#recent-pokemon").append(btn);
    }
  };
  });