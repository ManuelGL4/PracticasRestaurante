const EXCECUTE_HANDLER = Symbol('excecuteHandler');

class RestaurantManagerView {
	constructor() {
		this.main = document.getElementsByTagName("main")[0];
		this.dishWindow = null;
		this.openedWindows=[] // Array de ventanas abiertas
		this.bindCloseAllWindows(this.handleCloseAllWindows.bind(this));
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
		viewDetailsButton.addEventListener('click', () => this.openNewWindowWithDetails(dish));
		viewDetailsButton.id = 'view-details-button';
		console.log(dish);

		detailsBox.appendChild(viewDetailsButton);

		const centralZone = document.getElementById('caja-plato');
		centralZone.innerHTML = '';
		centralZone.appendChild(detailsBox);
	}


	openNewWindowWithDetails(dish) {
		// Abrir una nueva ventana
		const dishWindow = window.open('auxPage.html', '_blank', 'width=1000,height=600');

		// Verificar si la ventana se abrió correctamente
		if (dishWindow) {
			const dishWindowDocument = dishWindow.document;

			// Crear el contenido HTML con los detalles del plato
			const newWindowContent = `
			<!DOCTYPE html>
			<html lang="es">

			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Practica Restaurante DOM</title>
				<link rel="stylesheet" href="../css/ventanacss.css">
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

			</head>

			<body>
				<header class="header">
					<nav class="menu">
						<img src="../img/logo.png" alt="Logo" class="menu__logo">
						<a href="#" class="menu__link">Inicio<span class="indicador" id="indicador"></span></a>
						<a href="#" class="menu__link">Menu</a>
						<a href="#" class="menu__link">Ubicacion</a>
						<a href="#" class="menu__link">Contacto</a>
						<a href="./html/nosotros.html" class="menu__link">Nosotros</a>
						<a href="./html/reservas.html" class="menu__link">Reservas</a>
					</nav>
				</header>

				<main>
				<div class="card" style="width: 18rem;color:white;	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.55));">
				<img class="card-img-top" src="../img/${dish.dish.image}" alt="${dish.dish.name}">
				<div class="card-body">
				  <h5 class="card-title">${dish.dish.name}</h5>
				  <p class="card-text">Descripción: ${dish.dish.description} Ingredientes: ${dish.dish.ingredients} Alergenos:${dish.dish.allergens} </p>
				  <button onclick="window.close()">Cerrar ventana</button>
				  </div>

			  </div>
				</main>
				<div class="footer">
					<div class="heading">
						<h2>PRESTAURANTE<sup>™</sup></h2>
					</div>
					<div class="content">
						<div class="services">
							<h4>Servicios</h4>
							<p><a href="#">Reservas</a></p>
							<p><a href="#">Envio a domicilio</a></p>
							<p><a href="#">Menu</a></p>
						</div>
						<div class="social-media">
							<h4>Redes Sociales</h4>
							<p>
								<a href="#"><i class="fab fa-twitter"></i> Twitter</a>
							</p>
							<p>
								<a href="https://www.facebook.com/"><i class="fab fa-facebook"></i> Facebook</a>
							</p>
							<p>
								<a href="https://www.instagram.com/"><i class="fab fa-instagram"></i> Instagram</a>
							</p>
						</div>
						<div class="links">
							<h4>Accesos Rapidos</h4>
							<p><a href="#">Inicio</a></p>
							<p><a href="#">Menu</a></p>
							<p><a href="#">Ubicacion</a></p>
							<p><a href="#">Contacto</a></p>
							<p><a href="#">Nosotros</a></p>
							<p><a href="#">Reservas</a></p>
						</div>
						<div class="details">
							<h4 class="address">Direccion</h4>
							<p>
								Calle inventada,10
							</p>
							<h4 class="mobile">Telefono Movil</h4>
							<p><a href="#">678475895</a></p>
							<h4 class="mail">Correo Electronico</h4>
							<p><a href="#">prestaurante@gmail.com</a></p>
						</div>
					</div>
					<footer>
						<hr />
						© 2024 Prestaurante.
					</footer>
				</div>
				<script type="module" src="../js/clases/clases.js"></script>
				<script type="module" src="../js/clases/resturantManager.js"></script>
				<script type="module" src="../js/mvc/restaurantManagerView.js"></script>
				<script type="module" src="../js/mvc/restaurantManagerController.js"></script>
				<script type="module" src="../js/mvc/restaurantManagerApp.js"></script>
			</body>

			</html>
        `;

			// Escribir el contenido en el documento de la nueva ventana
			dishWindowDocument.write(newWindowContent);
			this.openedWindows.push(dishWindow); // Agregar la ventana al array
		} else {
			// La ventana emergente fue bloqueada
			alert('La ventana emergente no se ha podido abrir');
		}
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

	bindShowDishInNewWindow(handler) {
		const viewDetailsButton = document.getElementById('view-details-button');
	
		viewDetailsButton.addEventListener('click', () => {
			if (!this.dishWindow || this.dishWindow.closed) {
				this.dishWindow = window.open('auxPage.html', '_blank', 'width=1000,height=600');
				this.dishWindow.addEventListener('DOMContentLoaded', () => {
					handler(dish); // Pasar el plato al manejador
				});
			} else {
				handler(dish); // Pasar el plato al manejador si la ventana ya esta abierta
				this.dishWindow.focus();
			}
		});
	}
	
	bindCloseAllWindows(handler) {
        const closeAllWindowsButton = document.getElementById('close-all-windows');
        closeAllWindowsButton.addEventListener('click', handler);
    }

	handleCloseAllWindows() {
		// Crear una copia del array de ventanas abiertas
		const windowsCopy = this.openedWindows.slice();
		console.log(windowsCopy);
		// Recorrer la copia del array y cerrar cada ventana
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
	
	

	clearCentralZone() {
		const centralZone = document.getElementById('central-zone');
		centralZone.innerHTML = '';
	}
}
export default RestaurantManagerView;
