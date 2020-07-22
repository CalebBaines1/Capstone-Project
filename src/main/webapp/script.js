var map_key = config.MAP_KEY
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + map_key + '&callback=initMap';
script.defer = true;
script.async = true;

/**
 * Attach initMap function to the window.
 */
 window.initMap = function() {
  let mountainview = {lat: 37.3861, lng: -122.0839};

  let map = new google.maps.Map(
    document.getElementById('avail-map-container'), {zoom: 13, center: mountainview});
}

document.head.appendChild(script);