
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'mapquest',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'DgO1DCsj7XDNcenJ98YROfWqtOcGt404', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);
 
  geocoder.reverse({lat:-18.9755693, lon:47.5305393}, function(err, res) {
    console.log(res);
  });
// var config = {
//     'latitude': 40.00403611111111,
//     'longitude': 116.48485555555555,
// };
// geocoding(config, (err, data) => {
//     console.log(err ? err : data);
// });