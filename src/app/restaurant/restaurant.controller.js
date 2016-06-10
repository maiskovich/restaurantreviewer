export class RestaurantController {
  constructor (restaurantApi,$stateParams) {
    'ngInject';
    this.restaurantApi=restaurantApi;
    this.restaurantID=$stateParams.id;
    this.getRestaurantDetails();
  }
  getRestaurantDetails(){
      this.restaurantApi.getRestaurantDetails(this.restaurantID).get().$promise.then((data)=> {
        console.log(data);
      });
  }


}
