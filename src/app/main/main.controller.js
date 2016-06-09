export class MainController {
  constructor (locationApi,restaurantApi) {
    'ngInject';
    this.locationApi=locationApi;
    this.restaurantApi=restaurantApi;
    this.getRestaurants();
  }
  getRestaurants(){
    this.locationApi.getLocation().then((location)=>{
      this.restaurantApi.getRestaurants(location.coords).get().$promise.then((data)=> {
        this.restaurants=data.response.groups[0].items;
        console.log(data.response.groups[0].items);
      });
    });
  }


}
