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
        this.restaurantDetails=data.response.venue;
        let functionScope=this;
        let dataBaseRating=0;
        let dataBaseNumberRating=0;
        let databaseMessages=this.databaseApi.readDatabase();
        databaseMessages.$loaded()
          .then((messages) =>{
            let messagesRestaurant=messages.filter((message) => message.restaurantID == this.restaurantID);
            angular.forEach(messagesRestaurant, function(message) {
              functionScope.restaurantDetails.tips.groups[0].items.unshift({
                rating: message.rating,
                firstName:message.user,
                text: message.review
              });
              dataBaseRating+=message.rating;
              dataBaseNumberRating++;
            });
            this.rating=((this.restaurantDetails.rating*this.restaurantDetails.ratingSignals)+dataBaseRating)/(this.restaurantDetails.ratingSignals+dataBaseNumberRating);
            this.totalItems=this.restaurantDetails.tips.groups[0].items.length;
          });

      });
  }
  addRestaurantReview(){
    let data=new Array();
    data.restaurantID=this.restaurantID;
    data.rating=this.ratingNew;
    data.review=this.review;
    data.author=this.author;
    this.databaseApi.addReview(data);
    this.writeReview=false;
    this.review='';
    this.author='';
    this.getRestaurantDetails();
  }

}
