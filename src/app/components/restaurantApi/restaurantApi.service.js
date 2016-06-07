var requestParms = {
  clientId: "2NVEZVMEPV4WLS3QQ0DJFWLR1PJAXBQTKREYXTNYIJBDNEYP",
  clientSecret: "4TK0IYB4W4BE0PJQPLEG5C5C1EUCXTNNQGISN1EWEF2DRCAV",
  version: "20131230"
}
export class RestaurantApiService {
  constructor ($resource) {
    'ngInject';
    this.$resource=$resource;
  }

  getRestaurants(location) {
    var requestUri = 'https://api.foursquare.com/v2/venues/:action';
    return this.$resource(requestUri,
      {
        action: 'explore',
        client_id: requestParms.clientId,
        client_secret: requestParms.clientSecret,
        v: requestParms.version,
        ll:(location.latitude+','+location.longitude),
        venuePhotos: '1',
        callback: 'JSON_CALLBACK'
      },
      {
        get: {method: 'JSONP'}
      });
  }
}
