var script = document.createElement('script');
var map_key = config.MAP_KEY;
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + map_key + '&callback=initMap&libraries=places';
script.defer = true;
script.async = true;

var map;
var service;
var infowindow;


/**
 * Attach initMap function to the window.
 */
 window.initMap = function() {
  var mountainview = new google.maps.LatLng(37.3861, -122.0839);
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
    document.getElementById('avail-map-container'), {zoom: 16, center: mountainview});

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
      resultsMap.setZoom(16);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        title: "Your Location"
      });

      buildRequest(results[0].geometry.location);

    } else {
      alert("Geocode was unsuccessful : " + status);
    }
  });
}

/**
 * Create Place request.
 */
function buildRequest(latlng) {
    var request = {
    location: latlng,
    radius: '500',
    keyword: 'healthy',
    type: ['restaurant'],
    fields: ['name', 'formatted_address', 'geometry']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });

  var request = { reference: place.reference };

  marker.addListener('click', () => {
    service.getDetails(request, function(details, status) {
      infowindow.setContent(
        '<h3>' + details.name + '<h3>' +
        '<div id="BodyContent">' + details.formatted_address + '<br/>' +
        '<a href=' + details.website +'>website</a>' + '<br/>' +
        details.formatted_phone_number + '</div>');
      infowindow.open(map, marker);
    });
  });
}

document.head.appendChild(script);
