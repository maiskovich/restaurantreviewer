/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { RestaurantController } from './restaurant/restaurant.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { RestaurantApiService } from '../app/components/restaurantApi/restaurantApi.service';
import { LocationApiService } from '../app/components/locationApi/locationApi.service';
import { DatabaseApiService } from '../app/components/databaseApi/databaseApi.service';
import { RestaurantSmallDescriptionDirective } from '../app/components/restaurantSmallDescription/restaurantSmallDescription.directive';
import { RatingRadioDirective } from '../app/components/ratingRadio/ratingRadio.directive';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('restaurantreviewer', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap','ui.bootstrap.rating','ui.bootstrap.tpls','ui.bootstrap.carousel','angular.filter', 'firebase'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('restaurantApi', RestaurantApiService)
  .service('locationApi', LocationApiService)
  .service('databaseApi', DatabaseApiService)
  .controller('MainController', MainController)
  .controller('RestaurantController', RestaurantController)
  .directive('restaurantSmalldescription',RestaurantSmallDescriptionDirective)
  .directive('ratingRadio', RatingRadioDirective)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
