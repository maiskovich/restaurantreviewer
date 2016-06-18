export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
      mainpage: '='
    },
    templateUrl: 'app/components/navbar/navbar.html'
  };

  return directive;
}
