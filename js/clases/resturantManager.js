// Importar las clases
import {
  Dish,
  Coordinate,
  Allergen,
  Restaurant,
  Menu,
  Category,
} from "./clases.js";

const RestaurantsManager = (function () {
  let instantiated;

  class RestaurantsManager {
    #categories = [];
    #menus = [];
    #allergens = [];
    #restaurants = [];
    #dishes = [];
    #systemName;

    //Constructor de RestaurantManager
    constructor(systemName) {
      this.#systemName = systemName;
      //GETTERS ACTUALIZADOS
      Object.defineProperty(this, "categories", {
        enumerable: true,
        get() {
          const array = this.#categories;

          return {
            *[Symbol.iterator]() {
              for (const arrayCategories of array) {
                yield arrayCategories;
              }
            },
          };
        },
      });

      Object.defineProperty(this, "menus", {
        enumerable: true,
        get() {
          const array = this.#menus;
          return {
            *[Symbol.iterator]() {
              for (const arrayMenu of array) {
                yield arrayMenu;
              }
            },
          };
        },
      });
      Object.defineProperty(this, "allergens", {
        enumerable: true,
        get() {
          const array = this.#allergens;
          return {
            *[Symbol.iterator]() {
              for (const arrayAllergen of array) {
                yield arrayAllergen;
              }
            },
          };
        },
      });

      Object.defineProperty(this, "restaurants", {
        enumerable: true,
        get() {
          const array = this.#restaurants;
          return {
            *[Symbol.iterator]() {
              for (const arrayRestaurant of array) {
                yield arrayRestaurant;
              }
            },
          };
        },
      });

      Object.defineProperty(this, "dishes", {
        enumerable: true,
        get() {
          const array = this.#dishes;
          return {
            *[Symbol.iterator]() {
              for (const arrayDish of array) {
                yield arrayDish;
              }
            },
          };
        },
      });
    }

    //Getters
    getCategories() {
      return this.#categories[Symbol.iterator]();
    }

    getMenus() {
      return this.#menus[Symbol.iterator]();
    }

    getAllergens() {
      return this.#allergens[Symbol.iterator]();
    }

    getRestaurants() {
      return this.#restaurants[Symbol.iterator]();
    }

    getDishes() {
      return this.#dishes[Symbol.iterator]();
    }

    //Metodo addCategory
    addCategory(...newCategories) {
      newCategories.forEach((newCategory) => {
        if (!newCategory || !(newCategory instanceof Category)) {
          throw new Error(
            "La categoría debe ser un objeto Category y no puede ser nula."
          );
        }

        const categoryName = newCategory.getName();
        if (
          this.#categories.some(
            (category) => category.getName() === categoryName
          )
        ) {
          throw new Error("La categoría ya existe en el sistema.");
        }

        this.#categories.push(newCategory);
      });

      return this;
    }

    //Metodo removeCategory
    removeCategory(...categoriesToRemove) {
      categoriesToRemove.forEach((categoryToRemove) => {
        if (
          !categoryToRemove ||
          !(categoryToRemove instanceof Category) ||
          !this.#categories.includes(categoryToRemove)
        ) {
          throw new Error("La categoría no está registrada.");
        }

        // Desasignar platos de la categoría
        this.#dishes.forEach((dish) => {
          dish.categories.forEach((cat) => {
            if (cat === categoryToRemove) {
              this.deassignCategoryToDish(cat, dish.dish);
            }
          });
        });

        // Eliminar la categoría
        const index = this.#categories.indexOf(categoryToRemove);
        this.#categories.splice(index, 1);
      });

      return this;
    }

    //Metodo addMenu
    addMenu(...newMenus) {
      newMenus.forEach((newMenu) => {
        if (!newMenu || !(newMenu instanceof Menu)) {
          throw new Error(
            "El menú debe ser un objeto Menu y no puede ser nulo."
          );
        }

        const menuName = newMenu.getName();
        if (
          this.#menus.some((menuObj) => menuObj.menu.getName() === menuName)
        ) {
          throw new Error("El menú ya existe en el sistema.");
        }

        this.#menus.push({
          menu: newMenu,
          dishes: [],
        });
      });

      return this;
    }

    //Metodo removeMenu
    removeMenu(menu) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error("El menú debe ser un objeto Menu y no puede ser nulo.");
      }

      // Verificar si el menú está registrado
      if (!this.#menus.includes(menu)) {
        throw new Error("El menú no está registrado.");
      }

      // Eliminar el menú
      const index = this.#menus.indexOf(menu);
      if (index !== -1) {
        this.#menus.splice(index, 1);
      }

      return this;
    }

    //Metodo addAllergen
    addAllergen(...newAllergens) {
      newAllergens.forEach(function (newAllergen) {
        if (!newAllergen || !(newAllergen instanceof Allergen)) {
          throw new Error(
            "El alérgeno debe ser un objeto Allergen y no puede ser nulo."
          );
        }

        const allergenName = newAllergen.getName();
        if (
          this.#allergens.some(function (allergen) {
            return allergen.getName() === allergenName;
          })
        ) {
          throw new Error("El alérgeno ya existe en el sistema.");
        }

        this.#allergens.push(newAllergen);
      }, this);

      return this;
    }

    //Metodo removeAllergen
    removeAllergen(...allergensToRemove) {
      allergensToRemove.forEach(function (allergenToRemove) {
        if (
          !allergenToRemove ||
          !(allergenToRemove instanceof Allergen) ||
          !this.#allergens.includes(allergenToRemove)
        ) {
          throw new Error("El alérgeno no está registrado.");
        }

        // Desasignar platos del alérgeno
        this.#dishes.forEach((dish) => {
          let index = dish.allergens.findIndex(
            (aler) => aler.name === allergenToRemove.name
          );
          if (index != -1) {
            this.deassignAllergenToDish(dish.allergens[index], dish.dish);
          }
        });

        // Eliminar el alérgeno
        const index = this.#allergens.indexOf(allergenToRemove);
        this.#allergens.splice(index, 1);
      }, this);

      return this;
    }

    //Metodo addDish
    addDish(...newDishes) {
      newDishes.forEach(function (newDish) {
        if (!newDish || !(newDish instanceof Dish)) {
          throw new Error(
            "El plato debe ser un objeto Dish y no puede ser nulo."
          );
        }

        const dishName = newDish.getName();
        if (
          this.#dishes.some(function (dish) {
            return dish.dish.name === dishName;
          })
        ) {
          throw new Error("El plato ya existe en el sistema.");
        }

        this.#dishes.push({
          dish: newDish,
          categories: [],
          allergens: [],
        });
      }, this);

      return this;
    }

    //Metodo removeDish
    removeDish(...dishesToRemove) {
      for (const dishToRemove of dishesToRemove) {
        if (
          !dishToRemove ||
          !(dishToRemove instanceof Dish) ||
          !this.#dishes.some((d) => d.dish === dishToRemove)
        ) {
          throw new Error("El plato no está registrado.");
        }

        // Eliminar el plato de la lista de platos
        const index = this.#dishes.findIndex((d) => d.dish === dishToRemove);
        this.#dishes.splice(index, 1);
      }
      return this;
    }

    //Metodo addRestaurant
    addRestaurant(...newRestaurants) {
      newRestaurants.forEach(function (newRestaurant) {
        if (!newRestaurant || !(newRestaurant instanceof Restaurant)) {
          throw new Error(
            "El restaurante debe ser un objeto Restaurant y no puede ser nulo."
          );
        }

        const restaurantName = newRestaurant.getName();
        if (
          this.#restaurants.some(function (restaurant) {
            return restaurant.getName() === restaurantName;
          })
        ) {
          throw new Error("El restaurante ya existe en el sistema.");
        }

        this.#restaurants.push(newRestaurant);
      }, this);

      return this;
    }

    //Metodo removeRestaurant
    removeRestaurant(...restaurantsToRemove) {
      restaurantsToRemove.forEach(function (restaurantToRemove) {
        if (
          !restaurantToRemove ||
          !(restaurantToRemove instanceof Restaurant) ||
          !this.#restaurants.includes(restaurantToRemove)
        ) {
          throw new Error("El restaurante no está registrado.");
        }

        // Eliminar el restaurante
        const index = this.#restaurants.indexOf(restaurantToRemove);
        this.#restaurants.splice(index, 1);
      }, this);

      return this;
    }

    //Metodo assignCategoryToDish
    assignCategoryToDish(category, ...dishes) {
      if (!category || !(category instanceof Category)) {
        throw new Error(
          "La categoría debe ser un objeto Category y no puede ser nula."
        );
      }

      dishes.forEach((dish) => {
        // Verificar si dish es nulo o no es una instancia de Dish
        if (!dish || !(dish instanceof Dish)) {
          throw new Error(
            "El plato debe ser un objeto Dish y no puede ser nulo."
          );
        }

        let posiDish = this.#dishes.findIndex((d) => d.dish === dish);
        if (posiDish === -1) {
          this.addDish(dish);
          posiDish = this.#dishes.findIndex((d) => d.dish.name === dish.name);
        }

        let catIndex = this.#categories.indexOf(category);
        if (catIndex === -1) {
          this.addCategory(category);
          catIndex = this.#categories.indexOf(category);
        }

        const cat = this.#categories[catIndex];
        const dishCategories = this.#dishes[posiDish].categories;

        if (dishCategories.includes(cat)) {
          throw new Error(
            `La categoría "${category.getName()}" ya está asignada al plato "${dish.getName()}".`
          );
        }

        dishCategories.push(cat);
      });

      return this;
    }

    //Metodo deassignCategoryToDish
    deassignCategoryToDish(category, dish) {
      let positionDish = this.#dishes.findIndex((d) => d.dish === dish);
      // Verificar si dish es nulo o no está registrado
      if (positionDish === -1) {
        throw new Error("El plato no está registrado.");
      }

      let cat = this.#categories.indexOf(category);
      let categorias = this.#dishes[positionDish].categories;
      let index = categorias.findIndex((cat) => cat.name === category.name);
      // Verificar si category es nulo o no está registrada
      if (cat === -1 || index === -1) {
        throw new Error("La categoría no está registrada y/o el plato no pertenece a esa categoria.");
      }
      categorias.splice(index, 1);

      return this;
    }

    //Metodo assignAllergenToDish
    assignAllergenToDish(allergen, ...dishes) {
      dishes.forEach((dish) => {
        let positionDish = this.#dishes.findIndex((d) => d.dish === dish);
        if (positionDish === -1) {
          this.addDish(dish);
          positionDish = this.#dishes.findIndex((d) => d.dish === dish);
        }

        let allergenIndex = this.#allergens.indexOf(allergen);
        if (allergenIndex === -1) {
          this.addAllergen(allergen);
          allergenIndex = this.#allergens.indexOf(allergen);
        }

        const allergenObj = this.#allergens[allergenIndex];
        const dishAllergens = this.#dishes[positionDish].allergens;

        if (dishAllergens.includes(allergenObj)) {
          throw new Error(
            `El alérgeno "${allergen.getName()}" ya está asignado al plato "${dish.getName()}".`
          );
        }

        dishAllergens.push(allergenObj);
      });

      return this;
    }

    //Metodo deassignAllergenToDish
    deassignAllergenToDish(allergen, dish) {
      if (allergen === null) throw new Error("El alérgeno no puede ser nulo.");
      if (dish === null) throw new Error("El plato no puede ser nulo.");

      let dishpos = this.#dishes.findIndex((d) => d.dish === dish);
      if (dishpos === -1) throw new Error("El plato no está registrado.");

      let al = this.#allergens.indexOf(allergen);
      let index = this.#dishes[dishpos].allergens.indexOf(allergen);
      if (al === -1 || index === -1)
        throw new Error("El alérgeno no está asignado al plato.");

      this.#dishes[dishpos].allergens.splice(index, 1);
      return this;
    }

    //Metodo assignDishToMenu
    assignDishToMenu(menu, ...dishes) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error("El menú debe ser un objeto Menu y no puede ser nulo.");
      }

      dishes.forEach((dish) => {
        // Verificar si dish es nulo o no es una instancia de Dish
        if (!dish || !(dish instanceof Dish)) {
          throw new Error(
            "El plato debe ser un objeto Dish y no puede ser nulo."
          );
        }

        let dishIndex = this.#dishes.findIndex((d) => d.dish === dish);
        if (dishIndex === -1) {
          this.addDish(dish);
          dishIndex = this.#dishes.findIndex((d) => d.dish === dish);
        }

        const actualDish = this.#dishes[dishIndex];

        let menuIndex = this.#menus.findIndex((m) => m.menu.name === menu.name);
        if (menuIndex === -1) {
          this.addMenu(menu);
          menuIndex = this.#menus.findIndex((m) => m.menu.name === menu.name);
        }

        this.#menus[menuIndex].dishes.push(actualDish);
      });

      return this;
    }

    //Metodo deassignDishToMenu
    deassignDishToMenu(menu, dish) {
      // Verificar si menu es nulo o no es una instancia de Menu
      let menuPosit = this.#menus.findIndex((m) => m.menu.name === menu.name);
      if (menuPosit === -1) {
        throw new Error("El menú no está registrado.");
      }

      // Verificar si dish es nulo o no está registrado
      let positionDish = this.#dishes.findIndex(
        (d) => d.dish.name === dish.name
      );
      if (positionDish === -1) {
        throw new Error("El plato no está registrado.");
      }

      let men = this.#menus[menuPosit];
      let index = men.dishes.findIndex((d) => d.dish.name === dish.name);
      if (index === -1) {
        throw new Error("El plato no está registrado en este menú.");
      }
      men.dishes.splice(index, 1);

      return this;
    }

    //Metodo changeDishesPositionsInMenu
    changeDishesPositionsInMenu(menu, dish1, dish2) {
      if (menu === null) {
        throw new Error("El menú no puede ser nulo.");
      }
      if (dish1 === null || dish2 === null) {
        throw new Error("El plato no puede ser nulo.");
      }

      // Verificar si dish1 y dish2 están registrados
      const dish1Index = this.#dishes.findIndex(
        (d) => d.dish.name === dish1.name
      );
      const dish2Index = this.#dishes.findIndex(
        (d) => d.dish.name === dish2.name
      );
      if (dish1Index === -1 || dish2Index === -1) {
        throw new Error("El plato no está registrado.");
      }

      // Verificar si el menú está registrado
      const menuIndex = this.#menus.findIndex((m) => m.menu === menu);
      if (menuIndex === -1) {
        throw new Error("El menú no está registrado.");
      }

      // Obtener la lista de platos del menú
      const menuDishes = this.#menus[menuIndex].dishes;

      // Verificar si dish1 y dish2 están en el menú
      const pos1 = menuDishes.findIndex((d) => d.dish === dish1);
      const pos2 = menuDishes.findIndex((d) => d.dish === dish2);
      if (pos1 === -1 || pos2 === -1) {
        throw new Error("El plato no está registrado en este menú.");
      }

      // Intercambiar las posiciones de los platos en la lista del menú
      const temp = menuDishes[pos1];
      menuDishes[pos1] = menuDishes[pos2];
      menuDishes[pos2] = temp;

      return this;
    }

    //Metodo getDishesInCategory
    getDishesInCategory(category) {
      if (
        !category ||
        !(category instanceof Category) ||
        !this.#categories.includes(category)
      ) {
        throw new Error("La categoría no está registrada.");
      }
      if (
        this.#categories.findIndex((cat) => cat.name === category.name) === -1
      )
        throw new Error("La categoria no esta registrada");
      let dishInCat = [];
      this.#dishes.forEach((dish) => {
        if (
          dish.categories.findIndex((cat) => cat.name === category.name) !== -1
        ) {
          dishInCat.push(dish);
        }
      });

      return {
        *[Symbol.iterator]() {
          for (const dishCat of dishInCat) {
            yield dishCat;
          }
        },
      };
    }

    //Metodo getDishesWithAllergen
    getDishesWithAllergen(allergen) {
      if (
        !allergen ||
        !(allergen instanceof Allergen) ||
        !this.#allergens.includes(allergen)
      ) {
        throw new Error("El alérgeno no está registrado.");
      }
      let disArra = [];
      this.#dishes.forEach((dish) => {
        if (
          dish.allergens.findIndex((ale) => ale.name === allergen.name) !== -1
        ) {
          disArra.push(dish);
        }
      });

      return {
        *[Symbol.iterator]() {
          for (const dishCat of disArra) {
            yield dishCat;
          }
        },
      };
    }

    //Metodo findDishes
    findDishes(callback, sortFunction) {
      if (
        typeof callback !== "function" ||
        typeof sortFunction !== "function"
      ) {
        throw new Error(
          "Las funciones de callback y ordenación deben ser proporcionadas."
        );
      }

      // Filtrar los platos basados en la función de callback
      const filteredDishes = this.#dishes.filter(callback);

      // Ordenar los platos si se proporciona una función de ordenación
      if (sortFunction) {
        filteredDishes.sort(sortFunction);
      }

      return {
        [Symbol.iterator]: function* () {
          for (const dish of filteredDishes) {
            yield dish;
          }
        },
      };
    }

    // Método createDish
    createDish(name, description = "", ingredients = [], image = "") {
      const existDish = this.#dishes.find(function (dish) {
        return dish.getName() === name;
      });

      if (existDish) {
        return existDish;
      } else {
        let newDish = new Dish(name, description, ingredients, image);
        this.#dishes.push(newDish);
        return newDish;
      }
    }

    // Método createMenu
    createMenu(name, description = "") {
      const existMenu = this.#menus.find(function (menu) {
        return menu.getName() === name;
      });

      if (existMenu) {
        return existMenu;
      } else {
        let newMenu = new Menu(name, description);
        this.#menus.push(newMenu);
        return newMenu;
      }
    }

    // Método createAllergen
    createAllergen(name, description = "") {
      const existAllergen = this.#allergens.find(function (allergen) {
        return allergen.getName() === name;
      });

      if (existAllergen) {
        return existAllergen;
      } else {
        let newAllergen = new Allergen(name, description);
        this.#allergens.push(newAllergen);
        return newAllergen;
      }
    }

    // Método createCategory
    createCategory(name, description = "") {
      const existCategory = this.#categories.find(function (category) {
        return category.getName() === name;
      });

      if (existCategory) {
        return existCategory;
      } else {
        let newCategory = new Category(name, description);
        this.#categories.push(newCategory);
        return newCategory;
      }
    }

    // Método createRestaurant
    createRestaurant(name, description = "", location = null) {
      const existRestaurant = this.#restaurants.find(function (restaurant) {
        return restaurant.getName() === name;
      });

      if (existRestaurant) {
        return existRestaurant;
      } else {
        let newRestaurant = new Restaurant(name, description, location);
        this.#restaurants.push(newRestaurant);
        return newRestaurant;
      }
    }
    // Método getAllergenByName
    getAllergenByName(name) {
      const allergen = this.#allergens.find(function (allergen) {
        return allergen.getName() === name;
      });

      if (allergen) {
        return allergen;
      } else {
        throw new Error("El alérgeno especificado no está registrado.");
      }
    }

    // Método getCategoryByName
    getCategoryByName(name) {
      const category = this.#categories.find(function (category) {
        return category.getName() === name;
      });

      if (category) {
        return category;
      } else {
        throw new Error("La categoría especificada no está registrada.");
      }
    }
    removeDishByName(...dishNames) {
      for (const dishName of dishNames) {
        // Buscar el plato por su nombre
        const dishToRemove = this.#dishes.find(
          (dish) => dish.name === dishName
        );
        console.log(dishName);
        // Verificar si el plato existe y está registrado en el restaurante
        if (!dishToRemove || !this.#dishes.includes(dishToRemove)) {
          throw new Error("El plato no está registrado.");
        }

        // Desasignar el plato de todos los menús
        this.#menus.forEach((menu) => {
          const index = menu.dishes.findIndex(
            (d) => d.dish.name === dishToRemove.name
          );
          if (index !== -1) {
            this.deassignDishToMenu(menu.menu, menu.dishes[index].dish);
          }
        });

        // Eliminar el plato de la lista de platos
        const index = this.#dishes.findIndex(
          (d) => d.name === dishToRemove.name
        );
        this.#dishes.splice(index, 1);
      }
      return this;
    }
    getDishByName(name) {
      const dishObject = this.#dishes.find((d) => d.dish.getName() === name);

      if (!dishObject) {
        throw new Error(`No existe un plato con el nombre "${name}".`);
      }

      return dishObject.dish;
    }

    getMenuByName(name) {
      const menuObject = this.#menus.find(
        (menu) => menu.menu.getName() === name
      );

      if (!menuObject) {
        throw new Error(`No existe un menú con el nombre "${name}".`);
      }

      return menuObject.menu;
    }
    getCategoryByName(name) {
      const category = this.#categories.find(
        (category) => category.getName() === name
      );

      if (category) {
        return category;
      } else {
        throw new Error("La categoría especificada no está registrada.");
      }
    }
  }

  function init() {
    return new RestaurantsManager();
  }

  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();

/*function test() {
  // Crear RestaurantsManager
const manager = RestaurantsManager.getInstance();

const category1 = new Category('CAT1', 'Descripcion cat 1');
const category2 = new Category('CAT2', 'Esta es la categoria1');
const allergen1 = new Allergen('Gluten', 'Contiene gluten');
const allergen2 = new Allergen('Pescado', 'Contiene Pescado');
const dish1 = new Dish('Ensalada', 'Descripcion ensalada', "Ingredientes de ensalada", "ensalada.jpg");
const dish2 = new Dish('Pasta', 'Espagetis', "Ingredientes de espagetis", "foto.jpg");
const coord = new Coordinate(140.40, -140.40);
const menu1 = new Menu('Primer Menu', 'Nuestro mejor menu');
const menu2 = new Menu('SEGUNDO Menu', 'Nuestro peor menu');

const restaurant1 = new Restaurant('Restaurante1', 'El mejor restaurante', coord);

// Pruebas de las funciones
try {
  // Añadir categorías
  console.log("------------------AÑADIR CATEGORIAS------------------");
  manager.addCategory(category1, category2);
  // Obtener y mostrar las categorías
  for (const category of manager.getCategories()) {
    console.log(category);
  }


  // Eliminar categorias
  console.log("------------------ELIMINAR CATEGORIAS------------------");
  manager.removeCategory(category1, category2);
  for (const category of manager.getCategories()) {
    console.log(category);
  }

  console.log("------------------AÑADIR CATEGORIA 1 DE NUEVO------------------");
  manager.addCategory(category1)
  for (const category of manager.getCategories()) {
    console.log(category);
  }

  // Añadir alérgenos
  console.log("------------------AÑADIR ALERGENOS------------------");
  manager.addAllergen(allergen1, allergen2);
  // Obtener y mostrar los alérgenos
  for (const allergen of manager.getAllergens()) {
    console.log(allergen);
  }

  // Eliminar alergeno
  manager.removeAllergen(allergen1, allergen2);
  console.log("------------------ELIMINAR ALERGENOS------------------");
  for (const allergen of manager.getAllergens()) {
    console.log(allergen);
  }

  console.log("------------------AÑADIR ALERGENO 1 DE NUEVO------------------");
  manager.addAllergen(allergen1);
  for (const allergen of manager.getAllergens()) {
    console.log(allergen);
  }

  // Añadir platos
  console.log("------------------AÑADIR PLATOS------------------");
  manager.addDish(dish1, dish2);
  for (const dish of manager.getDishes()) {
    console.log(dish);
  }

  // Eliminar platos
  console.log("------------------ELIMINAR PLATOS------------------");
  manager.removeDish(dish1, dish2);
  for (const dish of manager.getDishes()) {
    console.log(dish);
  }

  // Añadir platos
  console.log("------------------AÑADIR PLATOS DE NUEVO------------------");
  manager.addDish(dish1, dish2);
  for (const dish of manager.getDishes()) {
    console.log(dish);
  }
  
  // Añadir menú
  console.log("------------------AÑADIR MENUS------------------");
  manager.addMenu(menu1, menu2);
    // Obtener y mostrar los menús
    for (const menu of manager.getMenus()) {
      console.log(menu);
    }

  //Eliminar menu
  console.log("------------------ELIMINAR MENU 1------------------");
  manager.removeMenu(menu1);
  for (const menu of manager.getMenus()) {
    console.log(menu);
  }

  console.log("------------------AÑADIR MENU DE NUEVO------------------");
  manager.addMenu(menu1);
  for (const menu of manager.getMenus()) {
    console.log(menu);
  }

  // Añadir restaurante
  console.log("------------------AÑADIR RESTAURANTE------------------");
  manager.addRestaurant(restaurant1);
  // Obtener y mostrar los restaurantes
  for (const restaurant of manager.getRestaurants()) {
    console.log(restaurant);
  }

  // Elminiar restaurante
  console.log("------------------ELIMINAR RESTAURANTE------------------");
  manager.removeRestaurant(restaurant1);
  for (const restaurant of manager.getRestaurants()) {
    console.log(restaurant);
  }

    // Añadir restaurante
    console.log("------------------AÑADIR RESTAURANTE DE NUEVO------------------");
    manager.addRestaurant(restaurant1);
    // Obtener y mostrar los restaurantes
    for (const restaurant of manager.getRestaurants()) {
      console.log(restaurant);
    }

  //Asignar categorie al plato
  console.log("------------------ASIGNAR CATEGORIA1 AL PLATO1------------------");
  manager.assignCategoryToDish(category1, dish1);
  for (const category of manager.getCategories()) {
    console.log(category);
  }

  console.log("------------------DESASIGNAR CATEGORIA1 AL PLATO1------------------");
  manager.deassignCategoryToDish(category1,dish1);
  for (const category of manager.getCategories()) {
    console.log(category);
  }

  console.log("------------------ASIGNAR ALERGENO1 AL PLATO1------------------");
  manager.assignAllergenToDish(allergen1,dish1);
  for (const allergen of manager.getAllergens()) {
    console.log(allergen);
  }

  console.log("------------------DESASIGNAR ALERGENO1 AL PLATO1------------------");
  manager.deassignAllergenToDish(allergen1,dish1);
  for (const allergen of manager.getAllergens()) {
    console.log(allergen);
  }

  console.log("------------------ASIGNAR PLATOS AL MENU1------------------");
  manager.assignDishToMenu(menu1,dish1);
  manager.assignDishToMenu(menu1,dish2);
  for (const menu of manager.getMenus()) {
    console.log(menu);
  }
  console.log("------------------DESASIGNAR PLATOS AL MENU1------------------");
  manager.deassignDishToMenu(menu1,dish1);
  for (const menu of manager.getMenus()) {
    console.log(menu);
  }

  console.log("------------------CAMBIAR POSICION PLATOS EN MENU------------------");
  manager.changeDishesPositionsInMenu(menu1,dish1,dish2);
  for (const menu of manager.getMenus()) {
    console.log(menu);
  }
  
  const dishesIterator = manager.getDishesInCategory(category1);

  console.log('Dishes in Category:');
  for (const dish of dishesIterator) {
    console.log(dish.getName());
  }

  const dishFilterCallback = function (dish) {
  // Filtrar platos que contengan "Ensalada" en el nombre
    return dish.getName().toLowerCase().includes('ensalada');
  };

  const dishSortFunction = function (dish1, dish2) {
  // Ordenar por el nombre del plato
    return dish1.getName().localeCompare(dish2.getName());
  };

  const filteredDishesIterator = manager.findDishes(dishFilterCallback, dishSortFunction);

  // Mostrar los platos filtrados y ordenados
  console.log("Metodo FindDishes,buscando por ensalada y ordenado alfabeticamente");
  for (const dish of filteredDishesIterator) {
    console.log(dish.getName());
  }

// Ejemplo de createDish
console.log("------------------CREAR PLATO------------------");
const dish3 = manager.createDish('Ensalada Cesar', 'Descripción ensalada Cesar', ['Lechuga', 'Tomate'], 'ensalada.jpg');
const dish4 = manager.createDish('Pasta 2', 'Descripción pasta', ['Espaguetis', 'Salsa'], 'pasta.jpg');
console.log(dish3,dish4);

// Ejemplo de createMenu
console.log("------EL MENÚ YA ESTA CREADO Y AL TENER EL MISMO NOMBRE DEVUELVE EL QUE YA HABIA-------");
const menu3 = manager.createMenu('Primer Menu', 'Nuestro mejor menu');
console.log(menu3);

// Ejemplo de createAllergen
console.log("------------------CREAR ALÉRGENO------------------");
const allergen3 = manager.createAllergen('Gluten', 'Contiene gluten');
console.log(allergen3);

console.log("------------------CREAR CATEGORÍA------------------");
const category3 = manager.createCategory('Entradas', 'Categoría de entradas');
console.log(category3);

// Ejemplo de createRestaurant
console.log("------------------CREAR RESTAURANTE------------------");
const restaurant2 = manager.createRestaurant('Restaurante A', 'Descripción del restaurante A', coord);
console.log(restaurant2);

console.log("------------------CREAR RESTAURANTE QUE YA HABIA SIDO CREADO Y DEVUELVE ESE MISMO RESTAURANTE,EN LA INSTANCIACION HAY UNA NUEVA DESCRIPCION PERO EN EL OBJETO ESTA LA OTRA DESCRICPCION DE RESTAURANTE1------------------");
const restaurant3 = manager.createRestaurant('Restaurante1', 'El mejor restaurante 2', coord);
console.log(restaurant3);

} catch (error) {
  console.error('Error:', error.message);
}
}

test();*/

export { RestaurantsManager };
