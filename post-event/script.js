// function https://learn.javascript.ru/function-expressions
(function () {
    function getCoordiantes() {
        navigator.geolocation.getCurrentPosition(
            function (pos) {
                // var https://learn.javascript.ru/var
                var crd = pos.coords;
                console.log(pos)

                setValue('shirota', crd.latitude)
                setValue('dolgota', crd.longitude)
            }, function (err) {
                setValue('shirota', 46.4825)
                setValue('dolgota', 30.7233)
                console.error(err)
            }
        )
    }

    function getValue(id) {
        // get element * https://learn.javascript.ru/searching-elements-dom
        return document.getElementById(id).value;
    }


    function setValue(id, value) {
        document.getElementById(id).value = value;
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                // Строки-шаблоны https://learn.javascript.ru/es-string
                document.getElementById('rawData').value += `Place #${i + 1}: ${JSON.stringify(place, null, 2)}\n`;
            }
        }
    }

    function onEventSubmit(evt) {
        // event https://learn.javascript.ru/obtaining-event-object
        evt.preventDefault();

        var place = new google.maps.LatLng(
            getValue("shirota"),
            getValue("dolgota")
        );

        map = new google.maps.Map(document.getElementById("map"), {
            center: place,
            zoom: 15
        });

        // object https://learn.javascript.ru/object
        var request = {
            location: place,
            radius: getValue("radius"),
            type: ["restaurant"]
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    // events https://learn.javascript.ru/introduction-browser-events
    document.getElementById("evtForm").addEventListener("submit", onEventSubmit);
    document.getElementById('get-coordiantes').addEventListener('click', getCoordiantes)
})();
