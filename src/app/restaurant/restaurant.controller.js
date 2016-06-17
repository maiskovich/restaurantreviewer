export class RestaurantController {
  constructor (restaurantApi,$stateParams,databaseApi) {
    'ngInject';
    this.restaurantApi=restaurantApi;
    this.databaseApi=databaseApi;
    this.restaurantID=$stateParams.id;
    this.getRestaurantDetails();
    this.itemsPerPage=3;
    this.currentPage = 1;
    this.writeReview=false;
  }
  getRestaurantDetails(){
      this.restaurantApi.getRestaurantDetails(this.restaurantID).get().$promise.then((data)=> {
        console.log(data);
        this.restaurantDetails=data.response.venue;
        let functionScope=this;
        this.rating=this.restaurantDetails.rating;
        let databaseMessages=this.databaseApi.readDatabase();
        databaseMessages.$loaded()
          .then((messages) =>{
            let messagesRestaurant=messages.filter((message) => message.restaurantID == this.restaurantID);
            console.log(messagesRestaurant);
            angular.forEach(messagesRestaurant, function(message) {
              functionScope.restaurantDetails.tips.groups[0].items.unshift({
                rating: message.rating,
                firstName:message.user,
                text: message.review
              });

            });
            console.log(functionScope.restaurantDetails.tips.groups[0].items);
            this.totalItems=this.restaurantDetails.tips.groups[0].items.length;
          });

      });
  }
  addRestaurantReview(){
    let data=new Array();
    data.restaurantID=this.restaurantID;
    data.rating=this.rating;
    data.review=this.review;
    data.author=this.author;
    this.databaseApi.addReview(data);
    this.writeReview=false;
    this.getRestaurantDetails();
  }

}
