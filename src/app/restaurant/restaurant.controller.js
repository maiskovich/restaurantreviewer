export class RestaurantController {
  constructor (restaurantApi,$stateParams) {
    'ngInject';
    this.restaurantApi=restaurantApi;
    this.restaurantID=$stateParams.id;
    this.getRestaurantDetails();
    this.itemsPerPage=5;
    this.currentPage = 1;
  }
  getRestaurantDetails(){
      this.restaurantApi.getRestaurantDetails(this.restaurantID).get().$promise.then((data)=> {
        console.log(data);
        this.restaurantDetails=data.response.venue;
        this.totalItems=this.restaurantDetails.tips.groups[0].items.length;
      });
  }


}
