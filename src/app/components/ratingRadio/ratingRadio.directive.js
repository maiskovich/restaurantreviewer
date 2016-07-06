export function RatingRadioDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
      ratingvalue: '=',
      readonly: '='
    },
    link: linkFunc,
    templateUrl: 'app/components/ratingRadio/ratingRadio.html'
  };

  return directive;
  function linkFunc(scope) {
    scope.internalControl = scope.control || {};
    scope.internalControl.takenTablets = 0;
    scope.setRating = function(value) {
      scope.ratingvalue = value;
    }
  }

}


