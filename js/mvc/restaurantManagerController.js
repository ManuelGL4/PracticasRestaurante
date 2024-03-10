import AuthenticationService from "../authentication/authentication.js";
import { getCookie } from "../clases/util.js";
import { RestaurantsManager } from "../clases/resturantManager.js";
import {
  Dish,
  Coordinate,
  Allergen,
  Restaurant,
  Menu,
  Category,
} from "../clases/clases.js";
import RestaurantManagerView from "./restaurantManagerView.js";

const MODEL = Symbol("RestaurantsManager");
const VIEW = Symbol("RestaurantManagerView");
const AUTH = Symbol("AUTH");
const USER = Symbol("USER");

class RestaurantManagerController {
  constructor(model, view, auth) {
    this[MODEL] = model;
    this[VIEW] = view;
    this[AUTH] = auth;
    this[USER] = null;
    this[VIEW].bindInit(this.handleInit);
    this.onLoad();
  }
  onLoad = () => {
    this.initApp();

    if (getCookie("accetedCookieMessage") !== "true") {
      this[VIEW].showCookiesMessage();
    }

    if (getCookie("username")) {
      this[VIEW].displayGreeting(getCookie("username"));
      const usernameCookie = getCookie("username");
      this[VIEW].showAuthUserProfileWCookie(usernameCookie);

      this[VIEW].showAdminMenu();
      this[VIEW].bindAdminMenu(
        this.handleNewDishForm,
        this.handleRemoveDishForm,
        this.handleAssignDishToMenuForm,
        this.handleCDCategory,
        this.handleNewRestaurantForm,
        this.handleChangeCategoryForm,
        this.handleFavDish
      );
    } else {
      this[VIEW].showIdentificationLink();
      this[VIEW].bindIdentificationLink(this.handleLoginForm);
      this.onCloseSession();
    }
    this[VIEW].bindCloseSession(this.handleCloseSession);

  };

  initApp() {
    const manager = RestaurantsManager.getInstance();

    fetch('http://127.0.0.1:5500/js/json/datos.json')
    .then(response => response.json())
    .then(data => {
        const { dishes, categories, allergens, menus, restaurants } = data;

        for (const dish of dishes) {
            const newDish = new Dish(dish.name, dish.description, dish.ingredients, dish.image);
            manager.addDish(newDish);
        }
        
        for (const category of categories) {
            const newCategory = new Category(category.name, category.description);
            manager.addCategory(newCategory);
        }

        const category1 = manager.getCategoryByName("Platos Rapidos");
        const category2 = manager.getCategoryByName("Platos con sabor a Mar");
        const category3 = manager.getCategoryByName("Platos de carne");

        manager.assignCategoryToDish(category1, manager.getDishByName("Ensalada"));
        manager.assignCategoryToDish(category1, manager.getDishByName("Pasta Carbonara"));
        manager.assignCategoryToDish(category1, manager.getDishByName("Pizza Margarita"));
        manager.assignCategoryToDish(category1, manager.getDishByName("Hamburguesa"));
        manager.assignCategoryToDish(category2, manager.getDishByName("Sushi"));
        manager.assignCategoryToDish(category2, manager.getDishByName("Tacos"));
        manager.assignCategoryToDish(category2, manager.getDishByName("Filete de Salmón"));
        manager.assignCategoryToDish(category2, manager.getDishByName("Paella"));
        manager.assignCategoryToDish(category3, manager.getDishByName("Filete"));
        manager.assignCategoryToDish(category3, manager.getDishByName("Curry de Pollo"));
        manager.assignCategoryToDish(category3, manager.getDishByName("Lasagna"));
        manager.assignCategoryToDish(category3, manager.getDishByName("Sopa"));
        
        console.log('CATEGORÍAS INICIALIZADAS:');
        for (const category of manager.categories) {
            console.log(category);
        }

        console.log('PLATOS INICIALIZADOS:');
        for (const dish of manager.dishes) {
            console.log(dish);
        }

        for (const allergen of allergens) {
            const newAllergen = new Allergen(allergen.name, allergen.description);
            manager.addAllergen(newAllergen);
        }
        const allergen1 = manager.getAllergenByName("Gluten");
        const allergen2 = manager.getAllergenByName("Lactosa");
        const allergen3 = manager.getAllergenByName("Nueces");
        const allergen4 =manager.getAllergenByName("Mariscos");
        manager.assignAllergenToDish(allergen1, manager.getDishByName("Ensalada"));
        manager.assignAllergenToDish(allergen2, manager.getDishByName("Pasta Carbonara"));
        manager.assignAllergenToDish(allergen1, manager.getDishByName("Pizza Margarita"));
        manager.assignAllergenToDish(allergen1, manager.getDishByName("Hamburguesa"));
        manager.assignAllergenToDish(allergen2, manager.getDishByName("Sushi"));
        manager.assignAllergenToDish(allergen3, manager.getDishByName("Tacos"));
        manager.assignAllergenToDish(allergen2, manager.getDishByName("Filete de Salmón"));
        manager.assignAllergenToDish(allergen3,  manager.getDishByName("Paella"));
        manager.assignAllergenToDish(allergen1, manager.getDishByName("Filete"));
        manager.assignAllergenToDish(allergen1, manager.getDishByName("Curry de Pollo"));
        manager.assignAllergenToDish(allergen4, manager.getDishByName("Lasagna"));
        manager.assignAllergenToDish(allergen4, manager.getDishByName("Sopa"));
        manager.assignAllergenToDish(allergen4, manager.getDishByName("Ensalada"));

        console.log('ALERGENOS INICIALIZADOS:');
        for (const allergen of manager.allergens) {
            console.log(allergen);
        }
        for (const dish of manager.dishes) {
          console.log(dish);
      }

        for (const menuData of menus) {
            const newMenu = new Menu(menuData.name, menuData.description);
            manager.addMenu(newMenu);
            for (const dishName of menuData.dishes) {
                const dish = manager.getDishByName(dishName);
                if (dish) {
                    manager.assignDishToMenu(newMenu, dish);
                }
            }
        }
        console.log('MENUS INICIALIZADOS:');
        for (const menu of manager.menus) {
            console.log(menu);
        }

        for (const restaurantData of restaurants) {
            const newRestaurant = new Restaurant(restaurantData.name, restaurantData.description, restaurantData.coordinate);
            manager.addRestaurant(newRestaurant);
        }
        console.log('RESTAURANTES INICIALIZADOS:');
        for (const restaurant of manager.restaurants) {
            console.log(restaurant);
        }

    //Pasar las categorias a array
    let categoriesArra = [];
    for (const category of manager.getCategories()) {
      categoriesArra.push(category);
    }

    //Pasar los platos a array
    let dishesArra = [];
    for (const dish of manager.getDishes()) {
      dishesArra.push(dish);
    }
    //Pasar los alergenos a array
    let alergensArra = [];
    for (const dish of manager.getAllergens()) {
      alergensArra.push(dish);
    }

    let menusArra = [];
    for (const dish of manager.getMenus()) {
      menusArra.push(dish);
    }

    console.log(menusArra);
    console.log(alergensArra);
    console.log(dishesArra);

    console.log(categoriesArra);

    // Crear un menú de navegación con enlaces a las categorías
    const menu = document.createElement("ul");
    menu.classList.add("lista");

    // Crear y agregar enlaces para cada categoría al menú
    categoriesArra.forEach((category) => {
      const menuItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = category.getName();
      link.addEventListener("click", () => this.handleCategoryClick(category));
      menuItem.appendChild(link);
      menu.appendChild(menuItem);
    });

    // Crear y agregar enlaces para cada alergeno al menú
    alergensArra.forEach((alergen) => {
      const menuItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = alergen.getName();
      link.addEventListener("click", () => this.handleAllergenClick(alergen));
      menuItem.appendChild(link);
      menu.appendChild(menuItem);
    });

    let restaurantsArra = [];
    for (const dish of manager.getRestaurants()) {
      restaurantsArra.push(dish);
    }
    console.log(restaurantsArra);

    const selectRestaurant = document.createElement("select");

    restaurantsArra.forEach((restaurant) => {
      const option = document.createElement("option");
      option.value = restaurant.getName();
      option.textContent = restaurant.getName();
      selectRestaurant.appendChild(option);
    });
    menusArra.forEach((menuAct) => {
      const menuItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = menuAct.menu.getName();
      link.addEventListener("click", () => this.handleMenuClick(menuAct));
      menuItem.appendChild(link);
      menu.appendChild(menuItem);
    });

    selectRestaurant.addEventListener("change", (event) => {
      const selectedRestaurantName = event.target.value;
      const selectedRestaurant = restaurants.find(
        (restaurant) => restaurant.getName() === selectedRestaurantName
      );
      if (selectedRestaurant) {
        this[VIEW].showRestaurantInfo(selectedRestaurant);
      }
    });

    // Agregar el menú desplegable al contenedor deseado en el HTML
    const dropdownContainer = document.getElementById("dropdown-container");
    dropdownContainer.appendChild(selectRestaurant);

    const menuContainer = document.getElementById("lista-container");
    menuContainer.appendChild(menu);

    //Mostrar categorias y platos aleatorios
    this[VIEW].showAllCategories(categoriesArra);
    this[VIEW].showRandomDishes(dishesArra);

    });

  } //Fin InitApp

  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  handleLogin = (username, password) => {
    if (this[AUTH].validateUser(username, password)) {
      this[USER] = this[AUTH].getUser(username);

      this.onOpenSession();
    } else {
      this[VIEW].showInvalidUserMessage();
    }
  };
  onOpenSession() {
    console.log("HAS INICIADO SESION");
    const usernameCookie = getCookie("username");

    this[VIEW].showAuthUserProfile(this[USER]);
    this[VIEW].displayGreeting(usernameCookie);
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this.onLoad();
  }

  handleCloseSession = () => {
    this.onCloseSession();
  };

  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeDisplayGretting();
    this[VIEW].removeAdminMenu();
  }

  handleCategoryClick(category) {
    const manager = RestaurantsManager.getInstance();
    const dishesInCategory = manager.getDishesInCategory(category);

    this[VIEW].clearCentralZone();
    this[VIEW].showDishesInCentralZone(dishesInCategory);
  }

  handleAllergenClick(allergen) {
    const manager = RestaurantsManager.getInstance();
    const dishesWithAllergen = manager.getDishesWithAllergen(allergen);

    this[VIEW].clearCentralZone();
    this[VIEW].showDishesInCentralZone(dishesWithAllergen);
  }

  handleMenuClick(menu) {
    const manager = RestaurantsManager.getInstance();
    const dishesInMenu = manager.getDishesInMenu(menu);

    this[VIEW].clearCentralZone();
    this[VIEW].showDishesInMenu(dishesInMenu);
  }

  handleNewDishForm = () => {
    const manager = RestaurantsManager.getInstance();
    console.log("HAS SELECCIONADO EL FORMULARIO DE NUEVO PLATO");
    this[VIEW].showNewDishForm(manager.getCategories(), manager.getAllergens());
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleRemoveDishForm = () => {
    const manager = RestaurantsManager.getInstance();
    for (const dish of manager.getDishes()) {
      console.log(dish);
    }
    const dishesIterator = manager.dishes;
    console.log(dishesIterator);
    this[VIEW].showRemoveDishForm(dishesIterator);
    this[VIEW].bindRemoveDishForm(this.handleRemoveDish);
  };

  handleAssignDishToMenuForm = () => {
    const manager = RestaurantsManager.getInstance();
    const menusIterator = manager.menus;
    const dishesIterator = manager.dishes;
    this[VIEW].showAssignMenuToDish(menusIterator, dishesIterator);
    this[VIEW].bindAssignDishToMenu(this.handleAssignDishToMenu);
    this[VIEW].bindUnassignDishFromMenu(this.handleUnassignDishFromMenu);
  };

  handleCDCategory = () => {
    this[VIEW].showCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurant(this.handleAddRestaurant);
  };
  handleChangeCategoryForm = () => {
    const manager = RestaurantsManager.getInstance();
    const catIterator = manager.categories;
    const dishesIterator = manager.dishes;
    console.log(catIterator, dishesIterator);

    this[VIEW].showChangeCategoryForm(catIterator, dishesIterator);
    this[VIEW].bindChangeCategory(this.handleChangeCategory);
  };

  handleFavDish = () => {
    this[VIEW].showFavoriteDishes();
  }

  handleChangeCategory(categoria, plato, action) {
    //ACTION SOLO PUEDE SER:asignar/desasignar
    console.log(categoria, plato, action);
    const manager = RestaurantsManager.getInstance();
    let done;
    let error;

    try {
      let cat = manager.getCategoryByName(categoria);
      let dis = manager.getDishByName(plato);
      console.log(cat);
      console.log(dis);

      if (action === "asignar") {
        console.log("ENTRA EN EL BUCLE ASIGNAR");
        try {
          const success = manager.assignCategoryToDish(cat, dis);
          done = success ? true : false;
          console.log(done);
        } catch (assignError) {
          throw new Error(
            `Error al asignar la categoría al plato: ${assignError.message}`
          );
        }
      }

      if (action === "desasignar") {
        console.log("ENTRA EN EL BUCLE DESASIGNAR");
        try {
          const success = manager.deassignCategoryToDish(cat, dis);
          done = success ? true : false;
          console.log(done);
        } catch (deassignError) {
          throw new Error(
            `Error al desasignar la categoría al plato: ${deassignError.message}`
          );
        }
      }
    } catch (exception) {
      done = false;
      error = exception.message;
    }

    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificacion categoria";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${plato}</strong> ha sido <strong>${action}</strong> de la categoria <strong>${categoria}</strong> .</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato <strong>${plato}</strong> no ha sido <strong>${action}</strong> posible de la categoria <strong>${categoria}</strong>.ERROR:<strong>${error}</strong> .</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ncTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });

    //this[VIEW].showChangeCatModal(categoria, plato, done, error);
  }

  handleAddRestaurant(nombre, descripcion, latitud, longitud) {
    console.log(nombre, descripcion, latitud, longitud);
    const manager = RestaurantsManager.getInstance();
    let done;
    let error;
    try {
      let coord = new Coordinate(latitud, longitud);
      console.log(coord);
      let rest = new Restaurant(nombre, descripcion, coord);
      console.log(rest);
      const success = manager.addRestaurant(rest);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }
    console.log(done);

    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${nombre}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El restaurante <strong>${nombre}</strong> ya estaba creado. <strong>${error}</strong></div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ncTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
    //this[VIEW].showNewRestaurantModal(nombre,done,error);
  }

  handleRemoveCategory(cat) {
    console.log(cat);
    const manager = RestaurantsManager.getInstance();
    let done;
    let error;
    try {
      const category = manager.getCategoryByName(cat);
      console.log(category);
      const success = manager.removeCategory(category);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }
    console.log(done);
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Crear categoria";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Categoria ${cat} eliminada.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La categoria no se ha podido borrar.ERROR: ${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const form = document.forms["fNewCategory"];
        if (form) {
          form.reset();
        }
      }
      const inputName = document.getElementById("ncName");
      if (inputName) {
        inputName.focus();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
    //this[VIEW].showRemoveCategoryModal(done,cat) MIRAR HABER PORQUE NO FUNCIONA
  }

  handleCreateCategory(name, description) {
    const cat = new Category(name, description);
    console.log(name + description);
    console.log(cat);
    const manager = RestaurantsManager.getInstance();

    let done;
    let error;
    try {
      const success = manager.addCategory(cat);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }
    console.log(done);
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Crear categoria";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Categoria  ${name} añadida correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La categoria no se ha podido crear.Revise si ya existe.Para mas informacion compruebe esto: ${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const form = document.forms["fNewCategory"];
        if (form) {
          form.reset();
        }
      }
      const inputName = document.getElementById("ncName");
      if (inputName) {
        inputName.focus();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
    //        this[VIEW].showNewCategoryModal(done); MIRAR PORQUE NO VA ESTO SI SE DESCOMENTA
  }

  handleAssignDishToMenu = (dishName, selectedMenuName) => {
    const manager = RestaurantsManager.getInstance();
    console.log("-------------------ASIGNACIÓN DE PLATO A MENÚ--------------");
    let done;
    let error;
    let dish;
    let menu;

    try {
      dish = manager.getDishByName(dishName);
      menu = manager.getMenuByName(selectedMenuName);
      console.log("Plato seleccionado:", dish + " Menu seleccionado: ", menu);
      console.log(`Asignar plato '${dishName}' al menú '${selectedMenuName}'`);

      const success = manager.assignDishToMenu(menu, dish);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }
    console.log(done);

    if (done) {
      const messageModalContainer = document.getElementById("messageModal");
      const messageModal = new bootstrap.Modal("#messageModal");
      const title = document.getElementById("messageModalTitle");
      title.innerHTML = "Asignar Plato a categoria";
      const body = messageModalContainer.querySelector(".modal-body");
      body.replaceChildren();
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> ha sido añadido correctamente al <strong>${selectedMenuName}</strong> .</div>`
      );
      messageModal.show();
    } else {
      const messageModalContainer = document.getElementById("messageModal");
      const messageModal = new bootstrap.Modal("#messageModal");
      const title = document.getElementById("messageModalTitle");
      title.innerHTML = "DesAsignar Plato a categoria";
      const body = messageModalContainer.querySelector(".modal-body");
      body.replaceChildren();
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> no se ha podido añadir a <strong>${selectedMenuName}</strong> .Compruebe si el menu esta ya incluido</div>`
      );
      messageModal.show();
    }

    //this[VIEW].showAssignMenuToDishModal(done, error);
  };
  handleUnassignDishFromMenu = (dishName, selectedMenuName) => {
    const manager = RestaurantsManager.getInstance();
    console.log(
      "-------------------DESASIGNACIÓN DE PLATO DE MENÚ--------------"
    );
    let done;
    let error;
    let dish;
    let menu;

    try {
      dish = manager.getDishByName(dishName);
      menu = manager.getMenuByName(selectedMenuName);
      console.log(dish + " " + menu);
      const success = manager.deassignDishToMenu(menu, dish);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }
    console.log(done);

    if (done) {
      const messageModalContainer = document.getElementById("messageModal");
      const messageModal = new bootstrap.Modal("#messageModal");
      const title = document.getElementById("messageModalTitle");
      title.innerHTML = "DesAsignar Plato a categoria";
      const body = messageModalContainer.querySelector(".modal-body");
      body.replaceChildren();
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> ha sido quitado correctamente del <strong>${selectedMenuName}</strong> .</div>`
      );
      messageModal.show();
    } else {
      const messageModalContainer = document.getElementById("messageModal");
      const messageModal = new bootstrap.Modal("#messageModal");
      const title = document.getElementById("messageModalTitle");
      title.innerHTML = "DesAsignar Plato a categoria";
      const body = messageModalContainer.querySelector(".modal-body");
      body.replaceChildren();
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> no se ha podido quitar de <strong>${selectedMenuName}</strong> .Compruebe que el plato este en el menú</div>`
      );
      messageModal.show();
    }
    //this[VIEW].showDesassignMenuToDishModal(done,dish,error);
  };

  handleRemoveDish = (dishName) => {
    const manager = RestaurantsManager.getInstance();
    console.log(
      "-------------------EL PLATO QUE SE VA A BORRAR ES--------------"
    );
    console.log(dishName);
    let done;
    let error;
    let dish;
    try {
      dish = manager.getDishByName(dishName);
      console.log("Plato seleccionado:", dish);
      const success = manager.removeDish(dish);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }

    if (done) {
      const messageModalContainer = document.getElementById("messageModal");
      const messageModal = new bootstrap.Modal("#messageModal");
      const title = document.getElementById("messageModalTitle");
      title.innerHTML = "Borrar plato del sistema";
      const body = messageModalContainer.querySelector(".modal-body");
      body.replaceChildren();
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> ha sido eliminado correctamente .</div>`
      );
      messageModal.show();
    } else {
      const messageModalContainer = document.getElementById("messageModal");
      const messageModal = new bootstrap.Modal("#messageModal");
      const title = document.getElementById("messageModalTitle");
      title.innerHTML = "Borrar plato del sistema";
      const body = messageModalContainer.querySelector(".modal-body");
      body.replaceChildren();
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dishName}</strong> no se ha podido eliminar</div>`
      );
      messageModal.show();
    }

    //VOLVER A MOSTRAR EL FORMULARIO ACTUALIZADO
    for (const dish of manager.getDishes()) {
      console.log(dish);
    }
    const dishesIterator = manager.dishes;
    console.log(dishesIterator);
    this[VIEW].showRemoveDishForm(dishesIterator);
    this[VIEW].bindRemoveDishForm(this.handleRemoveDish);
  };

  handleCreateDish = (
    name,
    description,
    ingredients,
    image,
    categories,
    allergens
  ) => {
    const dish = new Dish(name, description, ingredients, image);

    console.log(dish);
    console.log(categories);
    console.log(allergens);

    const manager = RestaurantsManager.getInstance();

    console.log(manager.getCategoryByName(categories));
    console.log(manager.getAllergenByName(allergens));
    let done;
    let error;
    try {
      const success = manager.addDish(dish);

      // Asignar categorías y alergenos al plato

      manager.assignCategoryToDish(manager.getCategoryByName(categories), dish);
      manager.assignAllergenToDish(manager.getAllergenByName(allergens), dish);
      done = success ? true : false;
    } catch (exception) {
      done = false;
      error = exception.message;
    }
    this[VIEW].showNewDishModal(done, dish, error);
  };

  closeAllOpenedWindows() {
    // Itera sobre todas las ventanas abiertas y las cierra
    this[VIEW].openedWindows.forEach((window) => {
      window.close();
    });

    // Limpia el array de ventanas abiertas
    this[VIEW].openedWindows = [];
  }

  handleNavigation() {
    const state = history.state;
    if (state) {
      switch (state.action) {
        case "init":
          this.handleInit();
          break;
        case "showCategory":
          this.handleShowCategory(state.category);
          break;
        case "showDish":
          this.handleShowDish(state.dish);
          break;
      }
    }
  }
}

export default RestaurantManagerController;
