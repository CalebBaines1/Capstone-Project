var script = document.createElement('script');
var map_key = config.MAP_KEY;
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + map_key + '&callback=initMap';
script.defer = true;
script.async = true;

/**
 * Attach initMap function to the window.
 */
 window.initMap = function() {
  var mountainview = {lat: 37.3861, lng: -122.0839};

  var map = new google.maps.Map(
    document.getElementById('avail-map-container'), {zoom: 13, center: mountainview});

  var geocoder = new google.maps.Geocoder();

  document.getElementById("submit").addEventListener("click", function() {
    geocodeLocation(geocoder, map);
  });

}

/**
 * Convert Location into coordinates.
 */
function geocodeLocation(geocoder, resultsMap) {
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(13);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was unsuccessful : " + status);
    }
  });
}

document.head.appendChild(script);
