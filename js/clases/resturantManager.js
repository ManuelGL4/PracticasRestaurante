// Importar las clases
import { Dish, Coordinate, Allergen, Restaurant, Menu, Category } from './clases.js';

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
      Object.defineProperty(this, 'categories', {
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


    Object.defineProperty(this, 'menus', {
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
    Object.defineProperty(this, 'allergens', {
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

    Object.defineProperty(this, 'restaurants', {
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

    
    Object.defineProperty(this, 'dishes', {
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
          throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
        }

        const categoryName = newCategory.getName();
        if (this.#categories.some((category) => category.getName() === categoryName)) {
          throw new Error('La categoría ya existe en el sistema.');
        }

        this.#categories.push(newCategory);
      });

      return this;
    }

    //Metodo removeCategory
    removeCategory(...categoriesToRemove) {
      categoriesToRemove.forEach((categoryToRemove) => {
        if (!categoryToRemove || !(categoryToRemove instanceof Category) || !this.#categories.includes(categoryToRemove)) {
          throw new Error('La categoría no está registrada.');
        }
    
        // Desasignar platos de la categoría
        this.#dishes.forEach(dish => {
          dish.categories.forEach(cat => {
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
      newMenus.forEach(newMenu => {
        if (!newMenu || !(newMenu instanceof Menu)) {
          throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
        }
    
        const menuName = newMenu.getName();
        if (this.#menus.some(menuObj => menuObj.menu.getName() === menuName)) {
          throw new Error('El menú ya existe en el sistema.');
        }
    
        this.#menus.push({
          menu: newMenu,
          dishes: []
        });
      });
    
      return this;
    }
    

    //Metodo removeMenu
    removeMenu(menu) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }

      // Verificar si el menú está registrado
      if (!this.#menus.includes(menu)) {
        throw new Error('El menú no está registrado.');
      }

      // Obtener los platos del menú
      const menuDishes = menu.getDishes();

      // Desasignar el menú de los platos
      menuDishes.forEach((dish) => {
        menu.setDishes(menu.getDishes().filter((d) => d !== menu));
      });

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
          throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
        }

        const allergenName = newAllergen.getName();
        if (this.#allergens.some(function (allergen) { return allergen.getName() === allergenName; })) {
          throw new Error('El alérgeno ya existe en el sistema.');
        }

        this.#allergens.push(newAllergen);
      }, this);

      return this;
    }

    //Metodo removeAllergen
    removeAllergen(...allergensToRemove) {
      allergensToRemove.forEach(function (allergenToRemove) {
        if (!allergenToRemove || !(allergenToRemove instanceof Allergen) || !this.#allergens.includes(allergenToRemove)) {
          throw new Error('El alérgeno no está registrado.');
        }

        // Desasignar platos del alérgeno
        this.#dishes.forEach(function (dish) {
          dish.setAllergens(dish.getAllergens().filter(function (a) {
            return a !== allergenToRemove;
          }));
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
          throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
        }
    
        const dishName = newDish.getName();
        if (this.#dishes.some(function (dish) { return dish.dish.name === dishName; })) {
          throw new Error('El plato ya existe en el sistema.');
        }
    
        this.#dishes.push({
          dish: newDish,
          categories: [],
          allergens: []
        });
      }, this);
    
      return this;
    }
    

      //Metodo removeDish
      removeDish(...dishesToRemove) {
        for (const dishToRemove of dishesToRemove) {
            if (!dishToRemove || !(dishToRemove instanceof Dish) || !this.#dishes.some(d => d.dish === dishToRemove)) {
                throw new Error('El plato no está registrado.');
            }
    
            // Eliminar el plato de la lista de platos
            const index = this.#dishes.findIndex(d => d.dish === dishToRemove);
            this.#dishes.splice(index, 1);
        }
        return this;
    }
    
    
    

    //Metodo addRestaurant
    addRestaurant(...newRestaurants) {
      newRestaurants.forEach(function (newRestaurant) {
        if (!newRestaurant || !(newRestaurant instanceof Restaurant)) {
          throw new Error('El restaurante debe ser un objeto Restaurant y no puede ser nulo.');
        }

        const restaurantName = newRestaurant.getName();
        if (this.#restaurants.some(function (restaurant) { return restaurant.getName() === restaurantName; })) {
          throw new Error('El restaurante ya existe en el sistema.');
        }

        this.#restaurants.push(newRestaurant);
      }, this);

      return this;
    }

    //Metodo removeRestaurant
    removeRestaurant(...restaurantsToRemove) {
      restaurantsToRemove.forEach(function (restaurantToRemove) {
        if (!restaurantToRemove || !(restaurantToRemove instanceof Restaurant) || !this.#restaurants.includes(restaurantToRemove)) {
          throw new Error('El restaurante no está registrado.');
        }

        // Eliminar el restaurante
        const index = this.#restaurants.indexOf(restaurantToRemove);
        this.#restaurants.splice(index, 1);
      }, this);

      return this;
    }

//Metodo assignCategoryToDish
assignCategoryToDish(category, ...dishs) {
  if (!category || !(category instanceof Category)) {
    throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
  }

  for (const dish of dishs) {

  // Verificar si dish es nulo o no es una instancia de Dish
  if (!dish || !(dish instanceof Dish)) {
    throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
  }
    let posi = this.#dishes.findIndex(d => d.dish === dish);
      if (posi === -1) {
          this.addDish(dish);
          posi = this.#dishes.findIndex(d => d.dish.name === dish.name);
      }
      let cat = this.#categories.indexOf(category);
      if (cat === -1) {
          this.addCategory(category);
          cat = this.#categories.indexOf(category);
      }
      // recoge la categoria del array para añadir la ya existente
      cat = this.#categories[cat];
      this.#dishes[posi].categories.push(cat);
  }
  return this;
}

    //Metodo deassignCategoryToDish
    deassignCategoryToDish(category, dish) {


      let positionDish = this.#dishes.findIndex(d => d.dish === dish);
      // Verificar si dish es nulo o no está registrado
      if (positionDish === -1) {
        throw new Error('El plato no está registrado.');
      }

      let cat = this.#categories.indexOf(category);
      let categorias = this.#dishes[positionDish].categories;
      let index = categorias.findIndex((categ) => categ.name === category.name);
      // Verificar si category es nulo o no está registrada
      if (cat === -1 || index === -1) {
        throw new Error('La categoría no está registrada.');
      }
      categorias.splice(index, 1);

      return this;
    }

    //Metodo assignAllergenToDish
    assignAllergenToDish(allergen, ...dishs) {
      for (const dish of dishs) {
          let posi = this.#dishes.findIndex(d => d.dish === dish);
          if (posi === -1) {
              this.addDish(dish);
              posi = this.#dishes.findIndex(d => d.dish === dish);
          }
          let ale = this.#allergens.indexOf(allergen);
          if (ale === -1) {
              this.addAllergen(allergen);
              ale = this.#allergens.indexOf(allergen);
          }
          ale = this.#allergens[ale];
          this.#dishes[posi].allergens.push(ale);
      }
      return this;
  }


    //Metodo deassignAllergenToDish
    deassignAllergenToDish(allergen, dish) {
      // Verificar si allergen es nulo o no está registrado
      if (!allergen || !(allergen instanceof Allergen) || !this.#allergens.includes(allergen)) {
        throw new Error('El alérgeno no está registrado.');
      }

      // Verificar si dish es nulo o no está registrado
      if (!dish || !(dish instanceof Dish) || !this.#dishes.includes(dish)) {
        throw new Error('El plato no está registrado.');
      }

      // Desasignar el plato del alergeno
      const updatedDishes = allergen.getDishes().filter(function (d) {
        return d !== dish;
      });

      allergen.setDishes(updatedDishes);

      return this;
    }

    //Metodo assignDishToMenu
    assignDishToMenu(menu, ...dishs) {
    // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }
      for (const dish of dishs) {
      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }
      let dispos = this.#dishes.findIndex(d => d.dish === dish);
      if (dispos === -1) {
        this.addDish(dish);
          dispos = this.#dishes.findIndex(d => d.dish === dish);
        }
                  let actDish = this.#dishes[dispos];

                  let menpos = this.#menus.findIndex(m => m.menu.name === menu.name);
                  if (menpos === -1) {
                      this.addMenu(menu);
                      menpos = this.#menus.findIndex(m => m.menu.name === menu.name);
                  }
                  this.#menus[menpos].dishes.push(actDish);
              }
              return this;
          }

    //Metodo deassignDishToMenu
    deassignDishToMenu(menu, dish) {
      // Verificar si menu es nulo o no es una instancia de Menu
      let menuPosit = this.#menus.findIndex(m => m.menu.name === menu.name);
      if (menuPosit === -1) {
        throw new Error('El menú no está registrado.');
      }

      // Verificar si dish es nulo o no está registrado
      let dishPosit = this.#dishes.findIndex(d => d.dish.name === dish.name);
      if (dishPosit === -1){
        throw new Error('El plato no está registrado.');
      }

      let menB = this.#menus[menuPosit];
      let index = menB.dishes.findIndex(d => d.dish.name === dish.name);
      if (index === -1){
        throw new Error('El plato no está registrado en este menú.');
      
      } 
      menB.dishes.splice(index, 1);

      return this;
  
    }
            

              
    //Metodo changeDishesPositionsInMenu
    changeDishesPositionsInMenu(menu, dish1, dish2) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }

      // Verificar si dish1 es nulo o no es una instancia de Dish
      if (!dish1 || !(dish1 instanceof Dish)) {
        throw new Error('El primer plato debe ser un objeto Dish y no puede ser nulo.');
      }

      // Verificar si dish2 es nulo o no es una instancia de Dish
      if (!dish2 || !(dish2 instanceof Dish)) {
        throw new Error('El segundo plato debe ser un objeto Dish y no puede ser nulo.');
      }


      // Obtener la posición de los platos en el array
      const index1 = menu.getDishes().indexOf(dish1);
      const index2 = menu.getDishes().indexOf(dish2);

      // Intercambiar las posiciones de los platos
      const updatedDishes = [...menu.getDishes()];
      const temp = updatedDishes[index1];
      updatedDishes[index1] = updatedDishes[index2];
      updatedDishes[index2] = temp;

      // Actualizar el array de platos en el menú
      menu.setDishes(updatedDishes);

      return this;
    }

    //Metodo getDishesInCategory
    getDishesInCategory(category) {
      if (!category || !(category instanceof Category) || !this.#categories.includes(category)) {
        throw new Error('La categoría no está registrada.');
      }
      if (this.#categories.findIndex(c => c.name === category.name) === -1) throw new CategoryNotRegisterdException();
      let platos = [];
      this.#dishes.forEach(dish => {
          if (dish.categories.findIndex(cat => cat.name === category.name) !== -1) {
              platos.push(dish);
          }
      });

      return {
          *[Symbol.iterator]() {
              for (const dishCat of platos) {
                  yield dishCat;
              }
          },
      };
  }


    //Metodo getDishesWithAllergen
    getDishesWithAllergen(allergen) {
      if (!allergen || !(allergen instanceof Allergen) || !this.#allergens.includes(allergen)) {
        throw new Error('El alérgeno no está registrado.');
      }
      let dsh = [];
      this.#dishes.forEach(dish => {
        if (dish.allergens.findIndex(al => al.name === allergen.name) !== -1) {
          dsh.push(dish);
        }
      });

      return {
          *[Symbol.iterator]() {
              for (const dishCat of dsh) {
                  yield dishCat;
              }
          }
      };
  }

    //Metodo findDishes
    findDishes(callback, sortFunction) {
      if (typeof callback !== 'function' || typeof sortFunction !== 'function') {
        throw new Error('Las funciones de callback y ordenación deben ser proporcionadas.');
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
        }
      };
    }

    // Método createDish
    createDish(name, description = '', ingredients = [], image = '') {
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
    createMenu(name, description = '') {
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
    createAllergen(name, description = '') {
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
    createCategory(name, description = '') {
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
    createRestaurant(name, description = '', location = null) {
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
            throw new Error('El alérgeno especificado no está registrado.');
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
    throw new Error('La categoría especificada no está registrada.');
  }
}
removeDishByName(...dishNames) {
  for (const dishName of dishNames) {
      // Buscar el plato por su nombre
      const dishToRemove = this.#dishes.find(dish => dish.name === dishName);
      console.log(dishName);
      // Verificar si el plato existe y está registrado en el restaurante
      if (!dishToRemove || !this.#dishes.includes(dishToRemove)) {
          throw new Error('El plato no está registrado.');
      }

      // Desasignar el plato de todos los menús
      this.#menus.forEach(menu => {
          const index = menu.dishes.findIndex(d => d.dish.name === dishToRemove.name);
          if (index !== -1) {
              this.deassignDishToMenu(menu.menu, menu.dishes[index].dish);
          }
      });

      // Eliminar el plato de la lista de platos
      const index = this.#dishes.findIndex(d => d.name === dishToRemove.name);
      this.#dishes.splice(index, 1);
  }
  return this;
}
getDishByName(name) {    
  const dishObject = this.#dishes.find(d => d.dish.getName() === name);

  if (!dishObject) {
    throw new Error(`No existe un plato con el nombre "${name}".`);
  }

  return dishObject.dish;
}

getMenuByName(name) {
  const menuObject = this.#menus.find(menu => menu.menu.getName() === name);

  if (!menuObject) {
    throw new Error(`No existe un menú con el nombre "${name}".`);
  }

  return menuObject.menu;
}
getCategoryByName(name) {
  const category = this.#categories.find(category => category.getName() === name);

  if (category) {
    return category;
  } else {
    throw new Error('La categoría especificada no está registrada.');
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
// function test() {
//   const rm = RestaurantsManager.getInstance();
//   const dish12 = new Dish('Sopa de Tomate', 'Descripción sopa de tomate', 'Ingredientes de sopa de tomate', 'sopa.jpg');
//   const dish1 = new Dish('Sopa', 'Descripción sopa de tomate', 'Ingredientes de sopa de tomate', 'sopa.jpg');

//   const category3 = new Category('Comida Asiática', 'Sabores auténticos de Asia');
//   rm.addDish(dish12);
//   rm.addCategory(category3);
//   rm.assignCategoryToDish(category3, dish12);
//   rm.assignCategoryToDish(category3, dish1);

//   rm.getCategories

// }
// test();

export { RestaurantsManager };