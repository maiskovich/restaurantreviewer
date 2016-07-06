export class MainController {
  constructor (locationApi,restaurantApi,databaseApi) {
    'ngInject';
    this.locationApi=locationApi;
    this.restaurantApi=restaurantApi;
    this.databaseApi=databaseApi;
    this.getRestaurants();
    this.mainpage=true;

  }
  getRestaurants(){
    //Start the database api object to read the stored reviews
    let databaseReviews=this.databaseApi.readDatabase();
    //Get the location
    this.locationApi.getLocation().then((location)=>{
      //Pass the location to the restaurant api
      this.restaurantApi.getRestaurants(location.coords).get().$promise.then((data)=> {
        //Set the restaurants to the view
        this.restaurants=data.response.groups[0].items;
        //When the database is loaded, we check if there is any review for the restaurants we got from the restaurant api
        databaseReviews.$loaded()
          .then((reviews) =>{
            //Check restaurant by restaurant
            angular.forEach(this.restaurants, function(restaurant) {
              //Filter the reviews that are from this restaurant by restaurantID
              let reviewsRestaurant=reviews.filter((review) => review.restaurantID == restaurant.venue.id);
              //Variable to store database ratings
              let dataBaseRating=0;
              //Variable to count number of ratings
              let dataBaseNumberRating=0;
              angular.forEach(reviewsRestaurant, function(review) {
                //Sum all the ratings for this restaurant
                dataBaseRating += review.rating;
                //Count the number of reviews for this restaurant
                dataBaseNumberRating++;
              });
              /**Gets an average rating, taking the average rating from restaurant api multiplied by the number of ratings in the api
              *, summing the database ratings and diving the result by the total number of ratings(restaurant api+database reviews)
               */
               restaurant.venue.rating=((restaurant.venue.rating*restaurant.venue.ratingSignals)+dataBaseRating)/(restaurant.venue.ratingSignals+dataBaseNumberRating);
              //Update the ratingSignals property adding the number of reviews in the database
              restaurant.venue.ratingSignals=restaurant.venue.ratingSignals+dataBaseNumberRating;

            });

          });

      });
    });
  }


}
