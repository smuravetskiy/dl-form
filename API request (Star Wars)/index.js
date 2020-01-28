fetch('https://swapi.co/api/films/')
  .then(function(response) {
  	return response.json() 
  })
  .then(function (body) {
    // films organized by others directors
    let sum = []
    let directors = body.results
    for (let i = 0; i < directors.length; i++) {
        let director = directors[i];
        if (director.director!='George Lucas') {
            sum = sum + director.title + '<br \/>'
        }
    }
    let result = sum
    document.getElementsByTagName('p')[0].innerHTML = result
	})