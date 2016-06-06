
function initMap(){

  var finalLocation = "235 E Broadway Ste 724 Long Beach, CA 90802";
  var browserSupportFlag =  new Boolean();

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
    zoom:16,
    center: finalLocation
    //mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var street_viewOptions = {
    position: {lat: 33.7692743, lng: -118.1902628},
    pov: {heading: 55, pitch: 20},
    visible: true,
  };
  var travel;
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var pano = new google.maps.StreetViewPanorama(document.getElementById("street_view"), street_viewOptions);


  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      travel = {
        origin: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
        destination: finalLocation,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById("directions"));
      directionsService.route(travel,function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
    travel = {
      origin: "I-405 California",
      destination: finalLocation,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directions"));
    directionsService.route(travel,function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
    } else {
      alert("Your browser doesn't support geolocation.");
    }
  }
  var image = "http://www.google.com/intl/en_us/mapfiles/ms/micons/arrow.png";
  var entranceMarker = new google.maps.Marker({
    position: {lat: 33.769361, lng: -118.190050},
    map: street_view,
    icon: image,
    title: 'Parking Entrance'
  });
  entranceMarker.setMap(pano);
};
