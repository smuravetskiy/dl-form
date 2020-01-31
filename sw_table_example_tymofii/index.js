// get all people from star wars api
// fetch https://learn.javascript.ru/fetch
fetch('https://swapi.co/api/people/')
    .then(function (response) {
        // json https://learn.javascript.ru/json
        return response.json()
    })
    .then(function (body) {
        // let variable https://learn.javascript.ru/let-const
        let peoples = body.results
        // get element * https://learn.javascript.ru/searching-elements-dom
        let placeholder = document.getElementById("people")
        const thead = document.createElement('tr')
        const fields = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"]

        for (let i = 0; i < fields.length; i++) {
            // createElement https://developer.mozilla.org/ru/docs/DOM/document.appendChild
            const th = document.createElement('th')
            th.innerText = fields[i]
            // appendChild https://developer.mozilla.org/ru/docs/Web/API/Node/appendChild
            thead.appendChild(th)
        }

        placeholder.appendChild(thead)

        for (let i = 0; i < peoples.length; i++) {
            let person = peoples[i];
            const tr = document.createElement('tr')

            for (let i = 0; i < fields.length; i++) {
                const td = document.createElement('td')
                td.innerText = person[fields[i]]
                tr.appendChild(td)
            }

            placeholder.appendChild(tr)
        }
    })
    .catch(function (err) {
        console.error(err)
    })