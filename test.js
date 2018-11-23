
// var NodeGeocoder = require('node-geocoder');

// var options = {
//     provider: 'mapquest',
   
//     // Optional depending on the providers
//     httpAdapter: 'https', // Default
//     apiKey: 'DgO1DCsj7XDNcenJ98YROfWqtOcGt404', // for Mapquest, OpenCage, Google Premier
//     formatter: null         // 'gpx', 'string', ...
//   };

//   var geocoder = NodeGeocoder(options);
 
//   geocoder.reverse({lat:-18.9068244, lon:47.5234707}, function(err, res) {
//     console.log(res);
//   });
// var config = {
//     'latitude': 40.00403611111111,
//     'longitude': 116.48485555555555,
// };
// geocoding(config, (err, data) => {
//     console.log(err ? err : data);
// });
lat = -18.90304
long = 47.5127808
link = "https://api.opencagedata.com/geocode/v1/json?key=2d67453d891444d7b3a09515e952c145&q="+lat+"%2C"+long+"&pretty=1&no_annotations=1&fbclid=IwAR2zgG0IUXc3Ilbcfs9MFQRgWov7_-TsExrYUVIE_JFvlXtBlbxg_khXhkA"
var request = require('request');
request(link, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

