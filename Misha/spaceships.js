fetch('https://swapi.co/api/starships/')
  .then(function(response) {
  	return response.json() 
  }) 
  .then(function (body) {
    // population
    let max = 0
    let name = ''
    let starships = body.results
    
		for (let i = 1; i < starships.length; i++) {
        let starship = starships[i];
        if (max<starship.cost_in_credits) {
            max = Number(starship.cost_in_credits)
            name = starship.name
        }
    }
    
    let result =name+': '+Number(max).toLocaleString().split(',').join(' ')
    
    document.getElementsByTagName('div')[0].innerHTML = result

	})
