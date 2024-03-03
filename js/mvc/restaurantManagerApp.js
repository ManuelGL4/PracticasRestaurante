import  RestaurantManagerView  from "../mvc/restaurantManagerView.js";
import RestaurantManagerController from "../mvc/restaurantManagerController.js";
import  {RestaurantsManager} from '../clases/resturantManager.js';
import AuthenticationService from '../authentication/authentication.js';

const restaurantManagerApp = new RestaurantManagerController(RestaurantsManager.getInstance(), new RestaurantManagerView(), AuthenticationService.getInstance());

export default restaurantManagerApp;
