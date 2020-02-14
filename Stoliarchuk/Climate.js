fetch('https://swapi.co/api/planets/')
  .then(function(response) {
    return response.json()
  })
  .then(function(body) {
    // climate
    let clim = []
    let planets = body.results

    for (let i = 0; i < planets.length; i++) {
      let planet = planets[i];
      if (clim.indexOf(planet.climate) === -1) {
        clim = clim + (planet.climate) +'; '
      }
    }

    let result = clim.toLocaleString()

    document.getElementsByTagName('div')[0].innerHTML = result
  })
  .catch(function(error) {
    console.error(error)
  });