const EXECUTE_HANDLER = Symbol('executeHandler');


class RestaurantManagerView {
	constructor() {
		this.main = document.getElementsByTagName("main")[0];
		this.productWindow = null;
		this.openedWindows = [] // Array de ventanas abiertas
		this.bindCloseAllWindows(this.handleCloseAllWindows.bind(this));
		this.bindNavigationButtons();
	}

	showDishesInCentralZone(dishesInCategory) {
		const centralZone = document.getElementById('central-zone');

		// Iterar sobre los platos usando el iterador
		for (const dish of dishesInCategory) {
			const dishElement = document.createElement('div');
			const dishImage = document.createElement('img');
			const imagePath = "../img/" + dish.dish.image;
			dishImage.src = imagePath;
			dishImage.alt = dish.dish.getName();
			dishElement.appendChild(dishImage);
			dishElement.textContent = dish.dish.name;

			// Agregar evento de clic para mostrar los detalles del plato
			dishElement.addEventListener('click', () => this.showDishDetails(dish));
			console.log(dish);
			centralZone.appendChild(dishElement);
		}
	}

	showAllergenInCentralZone(dishesWithAllergen) {
		const centralZone = document.getElementById('central-zone');

		// Iterar sobre los platos usando el iterador
		for (const dish of dishesWithAllergen) {
			const dishElement = document.createElement('div');
			const dishImage = document.createElement('img');
			const imagePath = "../img/" + dish.dish.image;
			dishImage.src = imagePath;
			dishImage.alt = dish.dish.getName();
			dishElement.appendChild(dishImage);
			dishElement.textContent = dish.dish.name;

			// Agregar evento de clic para mostrar los detalles del plato
			dishElement.addEventListener('click', () => this.showDishDetails(dish));

			centralZone.appendChild(dishElement);
		}
	}

	showDishDetails(dish) {
		// Crear una caja para mostrar los detalles del plato
		console.log(dish);
		const detailsBox = document.createElement('div');
		detailsBox.classList.add('dish-details-box');

		const nameElement = document.createElement('h1');
		nameElement.textContent = dish.dish.name;

		const descriptionElement = document.createElement('p');
		descriptionElement.textContent = 'Descripción: ' + dish.dish.description;

		const ingredientsElement = document.createElement('p');
		ingredientsElement.textContent = 'Ingredientes: ' + dish.dish.ingredients;
		const allergensElement = document.createElement('p');
		let allergensText = 'Alergenos: ';
		dish.allergens.forEach(allergen => {
			allergensText += allergen.getName() + ', ';
		});
		allergensText = allergensText.slice(0, -2); //Eliminar coma y espacio
		allergensElement.textContent = allergensText;

		const dishImage = document.createElement('img');
		const imagePath = "../img/" + dish.dish.image;
		dishImage.src = imagePath;
		dishImage.alt = dish.dish.getName();

		// Agregar los elementos a la caja
		detailsBox.appendChild(nameElement);
		detailsBox.appendChild(descriptionElement);
		detailsBox.appendChild(ingredientsElement);
		detailsBox.appendChild(dishImage);
		detailsBox.appendChild(allergensElement);

		//Añadir el boton despues
		const viewDetailsButton = document.createElement('button');
		viewDetailsButton.textContent = 'Ver detalles en nueva ventana';
		viewDetailsButton.addEventListener('click', () => this.handleShowDishInNewWindow(dish));
		viewDetailsButton.id = 'view-details-button';

		detailsBox.appendChild(viewDetailsButton);

		const centralZone = document.getElementById('caja-plato');
		centralZone.innerHTML = '';
		centralZone.appendChild(detailsBox);
	}


	openNewWindowWithDetails(dish) {
		let name = dish.name;
		let description = dish.description;
		let image = dish.image;
		let ingredients = dish.ingredients;
		let allergens = dish.allergentens;

		const newWindow = window.open('auxPage.html', '_blank', 'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no');

		newWindow.addEventListener('load', () => {
			const main = newWindow.document.querySelector('main');
			console.log(main);

			if (dish) {
				const container = newWindow.document.createElement('div');
				container.id = 'caja-plato';
				container.insertAdjacentHTML('beforeend', `
					<div id="caja-plato">
						<div id="dish-details-box">
							<div class="card" style="width: 18rem;color:white; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.55));">
								<img class="card-img-top" src="../img/${image}" alt="${name}">
								<div class="card-body">
									<h5 class="card-title">${name}</h5>
									<p class="card-text">Descripción: ${description} Ingredientes: ${ingredients} Alergenos:${allergens} </p>
									<button onclick="window.close()">Cerrar ventana</button>
								</div>
							</div>
						</div>
					</div>
				`);
				main.appendChild(container);
				newWindow.document.body.scrollIntoView();
			}
		});

		// Añadir la nueva ventana al array de ventanas abiertas
		this.openedWindows.push(newWindow);
	}

	handleShowDishInNewWindow = (dish) => {
		try {
			this.openNewWindowWithDetails(dish.dish);
		} catch (error) {
			console.error("Error al abrir la ventana:", error);
		}
	};


	bindShowProductInNewWindow(handler) {
		const viewDetailsButton = document.getElementById('view-details-button');
		viewDetailsButton.addEventListener('click', (event) => {
			handler(event.target.dataset.serial);
		});
	}


	closeAllOpenedWindows() {
		this.openedWindows.forEach(window => {
			window.close();
		});

		this.openedWindows = [];
	}


	bindCloseAllWindows(handler) {
		const closeAllWindowsButton = document.getElementById('close-all-windows');
		closeAllWindowsButton.addEventListener('click', handler);
	}

	handleCloseAllWindows() {
		// Crear una copia del array de ventanas abiertas
		const windowsCopy = this.openedWindows.slice();
		console.log(this.openedWindows);
		windowsCopy.forEach(windowRef => {
			if (!windowRef.closed) {
				windowRef.close();
				// Eliminar la referencia del array
				const index = this.openedWindows.indexOf(windowRef);
				if (index !== -1) {
					this.openedWindows.splice(index, 1);
				}
			}
		});
	}


	showRandomDishes(dishes) {
		const centralZone = document.getElementById('random-dish');
		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * dishes.length);
			console.log(dishes[randomIndex]);
			console.log("numero random para el elemento " + i + ": " + randomIndex);

			const dishElement = document.createElement('img');
			const imagePath = "../img/" + dishes[randomIndex].dish.image;
			dishElement.src = imagePath;
			dishElement.alt = dishes[randomIndex].dish.getName();
			centralZone.appendChild(dishElement);
		}
	}



	showAllCategories(categories) {
		const centralZone = document.getElementById('central-zone');

		categories.forEach(category => {
			const categoryElement = document.createElement('div');
			categoryElement.textContent = category.getName();
			centralZone.appendChild(categoryElement);
		});
	}

	showRestaurantInfo(restaurant) {
		const detailsBox = document.createElement('div');
		detailsBox.classList.add('dish-details-box');
		console.log(restaurant.name);
		const nameElement = document.createElement('h1');
		nameElement.textContent = restaurant.name;


		const descriptionElement = document.createElement('p');
		descriptionElement.textContent = 'Nombre del restaurante: ' + restaurant.name;

		const ingredientsElement = document.createElement('p');
		ingredientsElement.textContent = 'Descripcion: ' + restaurant.description;
		const allergensElement = document.createElement('p');
		allergensElement.textContent = 'Localizacion: ' + restaurant.location;

		// Agregar los elementos a la caja
		detailsBox.appendChild(nameElement);
		detailsBox.appendChild(descriptionElement);
		detailsBox.appendChild(ingredientsElement);
		detailsBox.appendChild(allergensElement);

		const centralZone = document.getElementById('caja-plato');
		centralZone.innerHTML = '';
		centralZone.appendChild(detailsBox);
	}

	showDishesInMenu(menu) {
		const centralZone = document.getElementById('central-zone');

		// Iterar sobre los platos del menú y mostrarlos
		menu.dishes.forEach(dish => {
			const dishElement = document.createElement('div');
			const dishImage = document.createElement('img');
			const imagePath = "../img/" + dish.image;
			dishImage.src = imagePath;
			dishImage.alt = dish.getName();
			dishElement.appendChild(dishImage);
			dishElement.textContent = dish.name;

			// Agregar evento de clic para mostrar los detalles del plato
			dishElement.addEventListener('click', () => this.showDishDetails(dish));

			centralZone.appendChild(dishElement);
		});
	}

	[EXECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
		handler(...handlerArguments);
		const scroll = document.querySelector(scrollElement);
		if (scroll) scroll.scrollIntoView();
		history.pushState(data, null, url);
		event.preventDefault();
	}

	bindInit(handler) {
		const logoElements = document.getElementsByClassName('menu__logo');
		for (const logoElement of logoElements) {
			logoElement.addEventListener('click', (event) => {
				this[EXECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
			});
		}
	}

	bindNavigationButtons() {
		window.addEventListener('popstate', () => {
			this.handleNavigation();
		});
	}




	clearCentralZone() {
		const centralZone = document.getElementById('central-zone');
		centralZone.innerHTML = '';
	}
}
export default RestaurantManagerView;
