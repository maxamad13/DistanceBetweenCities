$(document).ready(function () {


    var myLatng = {
        lat: 36.1,
        lng: -86.7
    };
    var mapOptions = {
        center: myLatng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
       // mapTypeId: google.maps.MapTypeId.HYBRID
    };

    //create map
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);


    //create direction servi object to use the route method and a result for our request


    var directionsService = new google.maps.DirectionsService();


    //crate a directionsrenderer object which used to display the route
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    //From and Destitanion value

    //var origin = document.getElementById("from").value;
    //var destination = $("#to").val()
    //calculate route
    function calcRoute() {
        var request = {
            origin: $("#from").val(),
            destination: $("#to").val(),
            travelMode: google.maps.TravelMode.DRIVING

        }

        //pass the request to the route method
        directionsService.route(request, function (result, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                console.log(result)
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] })
                //center map in 
                map.setCenter(myLatng);

                //show error message
                $("#output").html("<div class='alert-danger'>Could not retrive driving distance.</div>")
            }

            $("#output").html("<div class='alert-info'>From:  " + $("#from").val() + "<br /> TO:  " + $("#to").val() + "<br /> Distance:  " +
                result.routes[0].legs[0].distance.text + "<br />Duration:  " +
                result.routes[0].legs[0].duration.text + "</Div>")

            //display route
            directionsDisplay.setDirections(result);

        })


    }

    //google auto complete api
   

    // submit button and calls the calculate mehtod
    $("#submit").click(function () {
        //console.log("this is origin" + $("#from").val());
        
        calcRoute();
    })

});

var options = {
    types: ['(cities)']
}
var input1 = document.getElementById("from");

var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);