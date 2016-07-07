export class DatabaseApiService {
  constructor ($resource,$firebaseArray) {
    'ngInject';
    this.$resource=$resource;
    this.$firebaseArray=$firebaseArray;
    this.ref = new Firebase("https://resto-reviewer.firebaseio.com/data");

  }
  readDatabase() {
    // create a synchronized array
    return this.$firebaseArray(this.ref);


  }
  addReview(data) {
    let database=this.readDatabase();
    database.$add({
      restaurantID: data.restaurantID,
      rating:data.rating,
      user:data.author,
      review:data.review,
      createdAt:(Date.now()/1000)
    });
  }

}
