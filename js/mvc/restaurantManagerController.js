import {
    RestaurantsManager
} from '../clases/resturantManager.js';
import { Dish, Coordinate, Allergen, Restaurant, Menu, Category } from '../clases/clases.js';
import RestaurantManagerView from './restaurantManagerView.js';

const MODEL = Symbol('RestaurantsManager');
const VIEW = Symbol('RestaurantManagerView');

class RestaurantManagerController {
    constructor() {
        this[MODEL] = RestaurantsManager.getInstance();
        this[VIEW] = new RestaurantManagerView;
        this[VIEW].bindInit(this.handleInit);
        this.onLoad();
    }
    onLoad = () => {
        this.initApp();
        this[VIEW].showAdminMenu();
        this[VIEW].bindAdminMenu(this.handleNewDishForm, this.handleRemoveDishForm, this.handleAssignDishToMenuForm, this.handleCDCategory,this.handleNewRestaurantForm,this.handleChangeCategoryForm);
    }

    initApp() {

        const manager = RestaurantsManager.getInstance();
        //12 PLATOS
        const dish1 = new Dish('Ensalada', 'Descripción ensalada', 'Ingredientes de ensalada', 'ensalada.jpg');
        const dish2 = new Dish('Pasta Carbonara', 'Descripción pasta carbonara', 'Ingredientes de pasta carbonara', 'carbonara.jpg');
        const dish3 = new Dish('Pizza Margarita', 'Descripción pizza margarita', 'Ingredientes de pizza margarita', 'margarita.jpg');
        const dish4 = new Dish('Hamburguesa', 'Descripción hamburguesa', 'Ingredientes de hamburguesa', 'hamburguesa.jpg');
        const dish5 = new Dish('Sushi', 'Descripción sushi', 'Ingredientes de sushi', 'sushi.jpg');
        const dish6 = new Dish('Tacos', 'Descripción tacos', 'Ingredientes de tacos', 'tacos.jpg');
        const dish7 = new Dish('Filete de Salmón', 'Descripción filete de salmón', 'Ingredientes de filete de salmón', 'salmon.jpg');
        const dish8 = new Dish('Paella', 'Descripción paella', 'Ingredientes de paella', 'paella.jpg');
        const dish9 = new Dish('Filete', 'Descripción filete', 'Ingredientes de filete', 'filete.jpg');
        const dish10 = new Dish('Curry de Pollo', 'Descripción curry de pollo', 'Ingredientes de curry de pollo', 'curry.jpg');
        const dish11 = new Dish('Lasagna', 'Descripción lasagna', 'Ingredientes de lasagna', 'lasagna.jpg');
        const dish12 = new Dish('Sopa', 'Descripción sopa', 'Ingredientes de sopa', 'sopa.jpg');
        //manager.addDish(dish4,dish5,dish6,dish7,dish8,dish9,dish10,dish11,dish12);
        //3 CATEGORIAS
        const category1 = new Category('Platos Rapidos', 'Variedad de ensaladas frescas');
        const category2 = new Category('Platos con sabor a Mar', 'Deliciosos platos tradicionales italianos');
        const category3 = new Category('Platos de carne', 'Sabores auténticos de Asia');

        manager.assignCategoryToDish(category1, dish1);
        manager.assignCategoryToDish(category1, dish2);
        manager.assignCategoryToDish(category1, dish3);
        manager.assignCategoryToDish(category1, dish4);
        manager.assignCategoryToDish(category2, dish5);
        manager.assignCategoryToDish(category2, dish6);
        manager.assignCategoryToDish(category2, dish7);
        manager.assignCategoryToDish(category2, dish8);
        manager.assignCategoryToDish(category3, dish9);
        manager.assignCategoryToDish(category3, dish10);
        manager.assignCategoryToDish(category3, dish11);
        manager.assignCategoryToDish(category3, dish12);


        //4 ALERGENOS
        const allergen1 = new Allergen('Gluten', 'Contiene gluten');
        const allergen2 = new Allergen('Lactosa', 'Contiene lactosa');
        const allergen3 = new Allergen('Nueces', 'Puede contener trazas de nueces');
        const allergen4 = new Allergen('Mariscos', 'Contiene mariscos');
        manager.assignAllergenToDish(allergen1, dish1);
        manager.assignAllergenToDish(allergen2, dish2);
        manager.assignAllergenToDish(allergen1, dish3);
        manager.assignAllergenToDish(allergen1, dish4);
        manager.assignAllergenToDish(allergen2, dish5);
        manager.assignAllergenToDish(allergen3, dish7);
        manager.assignAllergenToDish(allergen2, dish6);
        manager.assignAllergenToDish(allergen3, dish8);
        manager.assignAllergenToDish(allergen1, dish9);
        manager.assignAllergenToDish(allergen1, dish10);
        manager.assignAllergenToDish(allergen4, dish11);
        manager.assignAllergenToDish(allergen4, dish12);
        manager.assignAllergenToDish(allergen4, dish1);

        //3 MENUS
        const menu1 = new Menu('Menú Degustación', 'platos destacados.');
        const menu2 = new Menu('Menú Infantil', 'para los más pequeños.');
        const menu3 = new Menu('Menú Vegetariano', 'Para aquellos que prefieren una opción sin carne.');
        manager.assignDishToMenu(menu1, dish1);
        manager.assignDishToMenu(menu1, dish2);
        manager.assignDishToMenu(menu1, dish3);
        manager.assignDishToMenu(menu2, dish4);
        manager.assignDishToMenu(menu2, dish5);
        manager.assignDishToMenu(menu2, dish6);
        manager.assignDishToMenu(menu3, dish7);
        manager.assignDishToMenu(menu3, dish8);
        manager.assignDishToMenu(menu3, dish9);

        //3 RESTAURANTES
        const restaurant1 = new Restaurant('Restaurante Italiano', 'Ofrecemos auténtica comida italiana en un ambiente acogedor.', new Coordinate(41.9028, 12.4964));
        const restaurant2 = new Restaurant('Restaurante Mexicano', 'Disfruta de la vibrante cocina mexicana con auténticos sabores y especias.', new Coordinate(23.6345, -102.5528));
        const restaurant3 = new Restaurant('Restaurante Asiático', 'Sumérgete en la exótica comida asiática con una amplia variedad de platos y sabores.', new Coordinate(35.6895, 139.6917));
        manager.addRestaurant(restaurant1, restaurant2, restaurant3);

        //Pasar las categorias a array
        let categories = [];
        for (const category of manager.getCategories()) {
            categories.push(category);
        }
        //Pasar los platos a array
        let dishes = [];
        for (const dish of manager.getDishes()) {
            dishes.push(dish);
        }
        //Pasar los alergenos a array
        let alergens = [];
        for (const dish of manager.getAllergens()) {
            alergens.push(dish);
        }

        let menus = [];
        for (const dish of manager.getMenus()) {
            menus.push(dish);
        }

        console.log(menus);
        console.log(alergens);
        console.log(dishes);

        console.log(categories);

        // Crear un menú de navegación con enlaces a las categorías
        const menu = document.createElement('ul');
        menu.classList.add('lista');

        // Crear y agregar enlaces para cada categoría al menú
        categories.forEach(category => {
            const menuItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = category.getName();
            link.addEventListener('click', () => this.handleCategoryClick(category));
            menuItem.appendChild(link);
            menu.appendChild(menuItem);
        });

        // Crear y agregar enlaces para cada alergeno al menú
        alergens.forEach(alergen => {
            const menuItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = alergen.getName();
            link.addEventListener('click', () => this.handleAllergenClick(alergen));
            menuItem.appendChild(link);
            menu.appendChild(menuItem);
        });

        let restaurants = [];
        for (const dish of manager.getRestaurants()) {
            restaurants.push(dish);
        }
        console.log(restaurants);

        const selectRestaurant = document.createElement('select');

        restaurants.forEach(restaurant => {
            const option = document.createElement('option');
            option.value = restaurant.getName();
            option.textContent = restaurant.getName();
            selectRestaurant.appendChild(option);
        });
        menus.forEach(menuAct => {
            const menuItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = menuAct.menu.getName();
            link.addEventListener('click', () => this.handleMenuClick(menuAct));
            menuItem.appendChild(link);
            menu.appendChild(menuItem);
        });

        selectRestaurant.addEventListener('change', (event) => {
            const selectedRestaurantName = event.target.value;
            const selectedRestaurant = restaurants.find(restaurant => restaurant.getName() === selectedRestaurantName);
            if (selectedRestaurant) {
                this[VIEW].showRestaurantInfo(selectedRestaurant);
            }
        });

        // Agregar el menú desplegable al contenedor deseado en el HTML
        const dropdownContainer = document.getElementById('dropdown-container');
        dropdownContainer.appendChild(selectRestaurant);

        const menuContainer = document.getElementById('lista-container');
        menuContainer.appendChild(menu);

        //Mostrar categorias y platos aleatorios
        this[VIEW].showAllCategories(categories);
        this[VIEW].showRandomDishes(dishes);


    }//Fin InitApp



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
    }
    

    handleAssignDishToMenuForm = () => {
        const manager = RestaurantsManager.getInstance();
        const menusIterator = manager.menus;
        const dishesIterator = manager.dishes;
        this[VIEW].showAssignMenuToDish(menusIterator, dishesIterator);
        this[VIEW].bindAssignDishToMenu(this.handleAssignDishToMenu);
        this[VIEW].bindUnassignDishFromMenu(this.handleUnassignDishFromMenu);
    }

    

    handleCDCategory = () => {
        this[VIEW].showCategoryForm();
        this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
        this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
    }

    handleNewRestaurantForm= () => {
        this[VIEW].showNewRestaurantForm();
        this[VIEW].bindNewRestaurant(this.handleAddRestaurant)
    }
    handleChangeCategoryForm= () => {
        const manager = RestaurantsManager.getInstance();
        const catIterator = manager.categories;
        const dishesIterator = manager.dishes;
        console.log(catIterator,dishesIterator);

        this[VIEW].showChangeCategoryForm(catIterator,dishesIterator);
        this[VIEW].bindChangeCategory(this.handleChangeCategory);
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
                    throw new Error(`Error al asignar la categoría al plato: ${assignError.message}`);
                }
            }
    
            if (action === "desasignar") {
                console.log("ENTRA EN EL BUCLE DESASIGNAR");
                try {
                    const success = manager.deassignCategoryToDish(cat, dis);
                    done = success ? true : false;
                    console.log(done);
                } catch (deassignError) {
                    throw new Error(`Error al desasignar la categoría al plato: ${deassignError.message}`);
                }
            }
        } catch (exception) {
            done = false;
            error = exception.message;
        }
    
        //this[VIEW].showChangeCatModal(categoria, plato, done, error);
    }
    

    handleAddRestaurant(nombre,descripcion,latitud,longitud){
        console.log(nombre,descripcion,latitud,longitud);
        const manager = RestaurantsManager.getInstance();
        let done;
        let error;
        try {
            let coord=new Coordinate(latitud,longitud);
            console.log(coord);
            let rest=new Restaurant(nombre, descripcion, coord);
            console.log(rest);
            const success = manager.addRestaurant(rest);
            done = success ? true : false;
        } catch (exception) {
            done = false;
            error = exception.message;
        }
        console.log(done);

        const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Nuevo Restaurante';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El restaurante <strong>${nombre}</strong> ha sido creado correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El restaurante <strong>${nombre}</strong> ya estaba creado. <strong>${error}</strong></div>`,
			);
		}
		messageModal.show();
		const listener = (event) => {
			if (done) {
				document.fNewDish.reset();
			}
			document.fNewDish.ncTitle.focus();
		};
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
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
        const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Crear categoria';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">Categoria ${cat} eliminada.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La categoria no se ha podido borrar.ERROR: ${error}</div>`,
			);
		}
		messageModal.show();
		const listener = (event) => {
			if (done) {
				const form = document.forms['fNewCategory'];
				if (form) {
					form.reset();
				}
			}
			const inputName = document.getElementById('ncName');
			if (inputName) {
				inputName.focus();
			}
		};
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
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
        const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Crear categoria';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">Categoria  ${name} añadida correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La categoria no se ha podido crear.Revise si ya existe.Para mas informacion compruebe esto: ${error}</div>`,
			);
		}
		messageModal.show();
		const listener = (event) => {
			if (done) {
				const form = document.forms['fNewCategory'];
				if (form) {
					form.reset();
				}
			}
			const inputName = document.getElementById('ncName');
			if (inputName) {
				inputName.focus();
			}
		};
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
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
            console.log("Plato seleccionado:", dish +" Menu seleccionado: ",menu);
            console.log(`Asignar plato '${dishName}' al menú '${selectedMenuName}'`);
            
            const success = manager.assignDishToMenu(menu, dish);
            done = success ? true : false;
        } catch (exception) {
            done = false;
            error = exception.message;
        }
        console.log(done);
        
        if (done) {
            const messageModalContainer = document.getElementById('messageModal');
            const messageModal = new bootstrap.Modal('#messageModal');
            const title = document.getElementById('messageModalTitle');
            title.innerHTML = 'Asignar Plato a categoria';
            const body = messageModalContainer.querySelector('.modal-body');
            body.replaceChildren();
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dishName}</strong> ha sido añadido correctamente al <strong>${selectedMenuName}</strong> .</div>`);
            messageModal.show();
        }else{
            const messageModalContainer = document.getElementById('messageModal');
            const messageModal = new bootstrap.Modal('#messageModal');
            const title = document.getElementById('messageModalTitle');
            title.innerHTML = 'DesAsignar Plato a categoria';
            const body = messageModalContainer.querySelector('.modal-body');
            body.replaceChildren();
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dishName}</strong> no se ha podido añadir a <strong>${selectedMenuName}</strong> .Compruebe si el menu esta ya incluido</div>`);
            messageModal.show();
        }

        //this[VIEW].showAssignMenuToDishModal(done, error);
        
    };
    handleUnassignDishFromMenu = (dishName, selectedMenuName) => {
        const manager = RestaurantsManager.getInstance();
        console.log("-------------------DESASIGNACIÓN DE PLATO DE MENÚ--------------");
        let done;
        let error;
        let dish;
        let menu;
    
        try {
            dish = manager.getDishByName(dishName);
            menu = manager.getMenuByName(selectedMenuName);
            console.log(dish +" " + menu);
            const success = manager.deassignDishToMenu(menu, dish);
            done = success ? true : false;
        } catch (exception) {
            done = false;
            error = exception.message;
        }
        console.log(done);
    
        if (done) {
            const messageModalContainer = document.getElementById('messageModal');
            const messageModal = new bootstrap.Modal('#messageModal');
            const title = document.getElementById('messageModalTitle');
            title.innerHTML = 'DesAsignar Plato a categoria';
            const body = messageModalContainer.querySelector('.modal-body');
            body.replaceChildren();
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dishName}</strong> ha sido quitado correctamente del <strong>${selectedMenuName}</strong> .</div>`);
            messageModal.show();
        }else{
            const messageModalContainer = document.getElementById('messageModal');
            const messageModal = new bootstrap.Modal('#messageModal');
            const title = document.getElementById('messageModalTitle');
            title.innerHTML = 'DesAsignar Plato a categoria';
            const body = messageModalContainer.querySelector('.modal-body');
            body.replaceChildren();
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dishName}</strong> no se ha podido quitar de <strong>${selectedMenuName}</strong> .Compruebe que el plato este en el menú</div>`);
            messageModal.show();
        }
        //this[VIEW].showDesassignMenuToDishModal(done,dish,error);
    };  
    



    handleRemoveDish = (dishName) => {
        const manager = RestaurantsManager.getInstance();
        console.log("-------------------EL PLATO QUE SE VA A BORRAR ES--------------");
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
            const messageModalContainer = document.getElementById('messageModal');
            const messageModal = new bootstrap.Modal('#messageModal');
            const title = document.getElementById('messageModalTitle');
            title.innerHTML = 'Borrar plato del sistema';
            const body = messageModalContainer.querySelector('.modal-body');
            body.replaceChildren();
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dishName}</strong> ha sido eliminado correctamente .</div>`);
            messageModal.show();
        }else{
            const messageModalContainer = document.getElementById('messageModal');
            const messageModal = new bootstrap.Modal('#messageModal');
            const title = document.getElementById('messageModalTitle');
            title.innerHTML = 'Borrar plato del sistema';
            const body = messageModalContainer.querySelector('.modal-body');
            body.replaceChildren();
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dishName}</strong> no se ha podido eliminar</div>`);
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
    

    handleCreateDish = (name, description, ingredients, image, categories, allergens) => {
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
            manager.assignAllergenToDish(manager.getAllergenByName(allergens),dish);
            done = success ? true : false;
        } catch (exception) {
            done = false;
            error = exception.message;
        }
        this[VIEW].showNewDishModal(done, dish, error);
    };










    closeAllOpenedWindows() {
        // Itera sobre todas las ventanas abiertas y las cierra
        this[VIEW].openedWindows.forEach(window => {
            window.close();
        });

        // Limpia el array de ventanas abiertas
        this[VIEW].openedWindows = [];
    }

    handleNavigation() {
        const state = history.state;
        if (state) {
            switch (state.action) {
                case 'init':
                    this.handleInit();
                    break;
                case 'showCategory':
                    this.handleShowCategory(state.category);
                    break;
                case 'showDish':
                    this.handleShowDish(state.dish);
                    break;
            }
        }
    }

}


export default RestaurantManagerController;