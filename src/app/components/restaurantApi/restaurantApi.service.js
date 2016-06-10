var requestParms = {
  clientId: "IY5CSJJK20BYPPSSKHFEXE45D2HNG5GMHO3VGAOSPYB5MVKB",
  clientSecret: "Z2D4LBTLPZ5UR1ZDFGYCL1ALFJNP5QZ5Y33ERG0FLSDNM30M",
  version: "20131230"
}
export class RestaurantApiService {
  constructor ($resource) {
    'ngInject';
    this.$resource=$resource;
  }

  getRestaurants(location) {
    let requestUri = 'https://api.foursquare.com/v2/venues/:action';
    return this.$resource(requestUri,
      {
        action: 'explore',
        client_id: requestParms.clientId,
        client_secret: requestParms.clientSecret,
        v: requestParms.version,
        ll:(location.latitude+','+location.longitude),
        sortByDistance:1,
        limit:30,
        venuePhotos: '1',
        intent:'food',
        callback: 'JSON_CALLBACK'
      },
      {
        get: {method: 'JSONP'}
      });
  }
  getRestaurantDetails(venueID){
    let requestUri = 'https://api.foursquare.com/v2/venues/:VENUE_ID';
    return this.$resource(requestUri,
      {
        VENUE_ID: venueID,
        client_id: requestParms.clientId,
        client_secret: requestParms.clientSecret,
        v: requestParms.version,
        callback: 'JSON_CALLBACK'
      },
      {
        get: {method: 'JSONP'}
      });
  }
}
