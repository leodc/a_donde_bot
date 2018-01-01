var foursquare = require('node-foursquare-venues')(process.env.A_DONDE_FOURSQUARE_CLIENT_ID, process.env.A_DONDE_FOURSQUARE_SECRET_ID);
var winston = require('winston');

var PAGE_SIZE = 10;

var explore = function(latLng, offset, query, callback){
  winston.info("Exploring foursquare @ " + JSON.stringify(latLng), offset, query);

  var searchObj = {
    offset: offset,
    limitResponse: offset + PAGE_SIZE,
    price: "1,2,3,4",
    venuePhotos: 1,
    ll: latLng.lat + "," + latLng.lng
  };

  if( query === "none" ){
    searchObj.section = "topPicks";
  }else{
    searchObj.query = query;
  }

  foursquare.venues.explore(searchObj, callback);
};

module.exports = {
  explore: explore,
};
