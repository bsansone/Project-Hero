var markersData = [
  {
      lat: 41.8350,
      lng: -87.6297,
      name: "Wishnick Hall",
      address1:"3300 S Federal St",
      address2: "Chicago, IL",
      postalCode: "60616"
   },
   {
      lat: 41.831156,
      lng: -87.656709,
      name: "Bridgeport Art Center",
      address1:"3434 S Michigan Ave",
      address2: "Chicago, IL",
      postalCode: "60609"
   },
   {
      lat: 41.831525,
      lng: -87.624210,
      name: "De La Salle Institute",
      address1:"3434 S Michigan Ave",
      address2: "Chicago, IL",
      postalCode: "60616"
   } 
];

// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds and zoom level according to markers position
   var bounds = new google.maps.LatLngBounds();

   // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var name = markersData[i].name;
      var address1 = markersData[i].address1;
      var address2 = markersData[i].address2;
      var postalCode = markersData[i].postalCode;

      createMarker(latlng, name, address1, address2, postalCode);

      // Marker’s Lat. and Lng. values are added to bounds variable
      bounds.extend(latlng); 
   }

   // Finally the bounds variable is used to set the map bounds
   // with API’s fitBounds() function
   map.fitBounds(bounds);
}

// This function creates each marker and sets their Info Window content
function createMarker(latlng, name, address1, address2, postalCode){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });

   // This event expects a click on a marker
   // When this event is fired the infowindow content is created
   // and the infowindow is opened
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variable to define the HTML content to be inserted in the infowindow
      var iwContent = '<div id="iw_container">' +
      '<div class="iw_title">' + name + '</div>' +
      '<div class="iw_content">' + address1 + '<br />' +
      address2 + '<br />' +
      postalCode + '</div></div>';
      
      // including content to the infowindow
      infoWindow.setContent(iwContent);

      // opening the infowindow in the current map and at the current marker location
      infoWindow.open(map, marker);
   });
}

function initialize() {
   var chicago = {lat: 41.8781, lng: -87.6297};
   var mapOptions = {
      center: chicago,
      zoom: 10,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map'), mapOptions);

   // a new Info Window is created
   infoWindow = new google.maps.InfoWindow();

   // Event that closes the InfoWindow with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Finally displayMarkers() function is called to begin the markers creation
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);