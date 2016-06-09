export function RestaurantSmallDescriptionDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
      restaurantdata: '='
    },
    templateUrl: 'app/components/restaurantSmallDescription/restaurantSmallDescription.html'
  };

  return directive;


}


