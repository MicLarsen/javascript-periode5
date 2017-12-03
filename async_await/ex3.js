//assignment 1 
const fetch = require("node-fetch");

async function getPlanetforFirstSpeciesInFirstMovieForPersonAsync(id) {
    try {
        
    let movieinfo = {}
    let result = await fetch("https://swapi.co/api/people/" + id + "/");
    let JSONresult = await result.json();
    movieinfo["Name"] = JSONresult.name;


    let firstFilmURL = JSONresult.films.sort()[0];
    let movieinfoResult = await fetch(firstFilmURL);
    let JSONmovieinfoResult = await movieinfoResult.json();
    movieinfo['First film'] = JSONmovieinfoResult.title;

    let firstSpeciesURL = JSONmovieinfoResult.species.sort()[0];
    let firstSpeciesResult = await fetch(firstSpeciesURL);
    let JSONfirstSpeciesResult = await firstSpeciesResult.json();
    movieinfo['First species'] = JSONfirstSpeciesResult.name;

    let homeworldForSpeciesURL = JSONfirstSpeciesResult.homeworld
    let homeworldForSpeciesResult = await fetch(homeworldForSpeciesURL)
    let JSONhomeworldForSpeciesResult = await homeworldForSpeciesResult.json()
    movieinfo['Homeworld for species'] = JSONhomeworldForSpeciesResult.name
    console.log(movieinfo)
}
    catch (error) {
        console.log('Error: ' + error.message)
    }
}

getPlanetforFirstSpeciesInFirstMovieForPersonAsync(1)
module.exports = { getPlanetforFirstSpeciesInFirstMovieForPersonAsync: getPlanetforFirstSpeciesInFirstMovieForPersonAsync }

