import { changeCategoryValidation,newRestaurantValidation,removeCategoryValidation,newDishValidation, deleteDishValidator,assignDTMValidation,unassignDishFromMenuValidation, newCategoryValidation } from '../clases/validation.js';
import {
	RestaurantsManager
} from '../clases/resturantManager.js';

const EXECUTE_HANDLER = Symbol('executeHandler');


class RestaurantManagerView {
	constructor() {
		this.main = document.getElementsByTagName("main")[0];
		this.productWindow = null;
		this.openedWindows = [] // Array de ventanas abiertas
		this.bindCloseAllWindows(this.handleCloseAllWindows.bind(this));
	}

	showAdminMenu() {
		const menuOption = document.createElement('li');
		menuOption.classList.add('nav-item');
		menuOption.classList.add('dropdown');
		menuOption.insertAdjacentHTML(
			'afterbegin',
			'<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administración</a>',
		);
		const suboptions = document.createElement('ul');
		suboptions.classList.add('dropdown-menu');
		suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewDish" class="dropdown-item" href="#new-category">Crear Plato</a></li>');
		suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelDish" class="dropdown-item" href="#del-category">Eliminar Plato</a></li>');
		suboptions.insertAdjacentHTML('beforeend', '<li><a id="lassignMenu" class="dropdown-item" href="#new-product">Asignar-Desasignar Menú</a></li>');
		suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Crear-Eliminar Categorias</a></li>')
		suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewRestaurante" class="dropdown-item" href="#new-product">Crear Restaurante</a></li>');
		suboptions.insertAdjacentHTML('beforeend', '<li><a id="cCatDish" class="dropdown-item" href="#new-product">Modificar Categorias Plato</a></li>');
		menuOption.append(suboptions);
		const menu = document.querySelector('.menu');
		menu.appendChild(menuOption);
	}

	showNewDishForm(categories, allergens) {
		console.log(categories, allergens);
		const container = document.createElement('div');
		container.insertAdjacentHTML(
			'afterbegin',
			'<h1 class="display-5">Nuevo Plato</h1>',
		);
		this.main.replaceChildren();
		const form = document.createElement('form');
		form.name = 'fNewDish';
		form.setAttribute('role', 'form');
		form.setAttribute('novalidate', '');
		form.classList.add('row');
		form.classList.add('g-3');
		//name B, description = '' B, ingredients = '', image = '' B,categories B,alergens B
		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="col-md-6 mb-3">
		<label class="form-label" for="ndName">Nombre del plato</label>
		<div class="input-group">
		<span class="input-group-text"><i class="bi bi-type"></i></span>
		<input type="text" class="form-control" id="ndName"
		name="ndName"
		placeholder="Nombre del plato" value="" required>
		<div class="invalid-feedback">El nombre del plato es obligatorio.</div>
		<div class="valid-feedback">Correcto.</div>
		</div>
		</div>
		<div class="col-md-6 mb-3">
		<label class="form-label" for="ndImg">Imagen del plato</label>
		<div class="input-group">
		<span class="input-group-text"><i class="bi bi-fileimage"></i></span>
		<input type="url" class="form-control" id="ndImg" name="ndImg"
		placeholder="Imagen del plato"
		value="" required>
		<div class="invalid-feedback"></div>
		<div class="valid-feedback">Correcto.</div>
		</div>
		</div>
		<div class="col-md-12 mb-3">
<label class="form-label" for="ndIngredients">Ingredientes</label>
<div class="input-group">
<span class="input-group-text"><i class="bi bi-fileimage"></i></span>
<textarea class="form-control" id="ndIngredients" name="ndIngredients"
placeholder="Ingredientes"
value="" required></textarea>
<div class="invalid-feedback"></div>
<div class="valid-feedback">Correcto.</div>
</div>
</div>
		<div class="col-md-12 mb-3">
		<label class="form-label" for="ndDescription">Descripción</label>
		<div class="input-group">
		<span class="input-group-text"><i class="bi bi-bodytext"></i></span>
		<input type="text" class="form-control" id="ndDescription"
		name="ndDescription" value="">
		<div class="invalid-feedback"></div>
		<div class="valid-feedback">Correcto.</div>
		</div>
		</div>
		<div class="col-md-6 mb-3">
      <label class="form-label" for="ndCategories">Categorías</label>
      <select class="form-select" id="ndCategories" name="ndCategories" multiple required>
      </select>
      <div class="invalid-feedback">Seleccione al menos una categoría.</div>
	  <div class="valid-feedback">Correcto.</div>
	  </div>
    <div class="col-md-6 mb-3">
      <label class="form-label" for="ndAllergens">Alergenos</label>
      <select class="form-select" id="ndAllergens" name="ndAllergens" multiple required>
      </select>
      <div class="invalid-feedback">Seleccione al menos un alergeno.</div>
	  <div class="valid-feedback">Correcto.</div>
    </div>
		
		`,
		);
		const ndCategories = form.querySelector('#ndCategories');
		for (const category of categories) {
			ndCategories.insertAdjacentHTML('beforeend', `<option value="${category.name}">${category.name}</option>`);
		}
		const npAllergens = form.querySelector('#ndAllergens');
		for (const allergen of allergens) {
			npAllergens.insertAdjacentHTML('beforeend', `<option value="${allergen.name}">${allergen.name}</option>`);
		}

		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="mb-12">
		<button class="btn btn-primary" type="submit">Enviar</button>
		<button class="btn btn-primary" type="reset">Cancelar</button>
		</div>
		</form>`,
		);
		container.append(form);

		this.main.append(container);
	}

	bindAdminMenu(hNewDish, hRemoveDish, hAssignMenuDish, hCDCategory,hNewRestaurant,hChangeCatDish) {
		const newCategoryLink = document.getElementById('lnewDish');
		newCategoryLink.addEventListener('click', (event) => {
			hNewDish();
		});
		const removeDishLink = document.getElementById('ldelDish');
		removeDishLink.addEventListener('click', (event) => {
			hRemoveDish();
		});
		const assignMenuLink = document.getElementById('lassignMenu');
		assignMenuLink.addEventListener('click', (event) => {
			hAssignMenuDish();
		});
		const categoryCDMenuLink = document.getElementById('ldelCategory');
		categoryCDMenuLink.addEventListener('click', (event) => {
			hCDCategory();
		});
		const restaurantLink = document.getElementById('lnewRestaurante');
		restaurantLink.addEventListener('click', (event) => {
			hNewRestaurant();
		});
		const changeCatDish = document.getElementById('cCatDish');
		changeCatDish.addEventListener('click', (event) => {
			hChangeCatDish();
		});
		
	}


	bindNewDishForm(handler) {
		newDishValidation(handler);
	}
	bindRemoveDishForm(handler) {
		deleteDishValidator(handler);
	}

	bindNewCategoryForm(handler) {
		newCategoryValidation(handler);
	}
	bindRemoveCategoryForm(handler) {
		removeCategoryValidation(handler);
	}

	bindAssignDishToMenu(handler){
		assignDTMValidation(handler);
	}

	bindUnassignDishFromMenu(handler) {
		unassignDishFromMenuValidation(handler);
	}
	bindNewRestaurant(handler) {
		newRestaurantValidation(handler);
	}
	bindChangeCategory(handler){
		changeCategoryValidation(handler);
	}

	showChangeCategoryForm(cat,dishes){
		const container = document.createElement('div');
		container.insertAdjacentHTML(
			'afterbegin',
			'<h1 class="display-5">Modificar categorias a plato</h1>',
		);
		this.main.replaceChildren();
		const form = document.createElement('form');
		form.name = 'fChangeCat';
		form.setAttribute('role', 'form');
		form.setAttribute('novalidate', '');
		form.classList.add('row');
		form.classList.add('g-3');
		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="col-md-6 mb-3">
      <label class="form-label" for="ccCategorie">Categorías</label>
      <select class="form-select" id="ccCategorie" name="ccCategorie" multiple required>
      </select>
      <div class="invalid-feedback">Seleccione al menos una categoría.</div>
	  <div class="valid-feedback">Correcto.</div>
	  </div>
    <div class="col-md-6 mb-3">
      <label class="form-label" for="ccDish">Plato</label>
      <select class="form-select" id="ccDish" name="ccDish" multiple required>
      </select>
      <div class="invalid-feedback">Seleccione al menos un alergeno.</div>
	  <div class="valid-feedback">Correcto.</div>
    </div>
		
		`,
		);
		const ccCategorie = form.querySelector('#ccCategorie');
		for (const category of cat) {
			ccCategorie.insertAdjacentHTML('beforeend', `<option value="${category.name}">${category.name}</option>`);
		}
		const ccDish = form.querySelector('#ccDish');
		for (const dishObj of dishes) {
			const dish = dishObj.dish;
			console.log(dish);
			ccDish.insertAdjacentHTML('beforeend', `<option value="${dish.name}">${dish.name}</option>`);
		}

		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="mb-12">
		<button class="btn btn-primary" type="submit" id="btnAssignCategory">Asignar</button>
		<button class="btn btn-primary" type="submit" id="btnDesassignCategory">Desasignar</button>
		<button class="btn btn-primary" type="reset">Cancelar</button>

		</div>
		</form>`,
		);
		container.append(form);
		this.main.append(container);
	}

	showChangeCatModal(categoria,plato,done){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Nuevo Plato';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${plato}</strong> ahora si/no pertenece a la categoria <strong>${categoria}</strong> .</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato <strong>${plato}</strong> no se ha podido asignar/desasignar</div>`,
			);
		}
		messageModal.show();
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
		});
	}

	showNewDishModal(done, dish, error) {
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Nuevo Plato';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato <strong>${dish.name}</strong> ya estaba creado. <strong>${error}</strong></div>`,
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
	}

	showRemoveDishForm(dishes) {
		this.main.replaceChildren();
		const container = document.createElement('div');
		container.classList.add('container');
		container.classList.add('my-3');
		container.id = 'remove-product';
	
		container.insertAdjacentHTML(
			'afterbegin',
			'<h1 class="display-5">Eliminar un Plato</h1>',
		);
	
		const form = document.createElement('form');
		form.name = 'fRemoveDish';
		form.setAttribute('role', 'form');
		form.setAttribute('novalidate', '');
		form.classList.add('row');
		form.classList.add('g-3');
	
		form.insertAdjacentHTML(
			'beforeend',
			`<div class="col-md-6 mb-3">
					<label class="form-label" for="rdDish">Seleccione un plato:</label>
					<select class="form-select" id="rdDish" name="rdDish" required>
					</select>
					<div class="invalid-feedback">Seleccione un plato.</div>
					<div class="valid-feedback">Correcto.</div>
				  </div>
					  </div>
					  `,
		);
		const rdDish = form.querySelector('#rdDish');
		for (const dishObj of dishes) {
			const dish = dishObj.dish;
			console.log(dish);
			rdDish.insertAdjacentHTML('beforeend', `<option value="${dish.name}">${dish.name}</option>`);
		}
	
		form.insertAdjacentHTML(
			'beforeend',
			`
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Eliminar</button>
			</div>
			</form>`,
		);
		container.append(form);
		this.main.append(container);
	}
	
	
	showRemovedDishModal(done, dish, error){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Eliminar Plato';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish}</strong> ha sido borrado de la coleccion correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> Error: <strong>${error}</strong></div>`,
			);
		}
		messageModal.show();
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
		});
	}

	showAssignMenuToDish(menus, dishes) {
		this.main.replaceChildren();
		const container = document.createElement('div');
		container.classList.add('container');
		container.classList.add('my-3');
		container.id = 'remove-product';

		container.insertAdjacentHTML(
			'afterbegin',
			'<h1 class="display-5">Asignar un menu a un plato</h1>',
		);
		console.log(dishes);
		const form = document.createElement('form');
		form.name = 'fAssignMenu';
		form.setAttribute('role', 'form');
		form.setAttribute('novalidate', '');
		form.classList.add('row');
		form.classList.add('g-3');

		form.insertAdjacentHTML(
			'beforeend',
			`<div class="col-md-6 mb-3">
					<label class="form-label" for="amdD">Seleccione un plato:</label>
					<select class="form-select" id="amdD" name="amdD" required>
					</select>
					<div class="invalid-feedback">Seleccione un plato.</div>
					<div class="valid-feedback">Correcto.</div>
				  </div>
					  </div>
					  `,
		);
		const amdD = form.querySelector('#amdD');
		for (const dishObj of dishes) {
			const dish = dishObj.dish;
			console.log(dish);
			amdD.insertAdjacentHTML('beforeend', `<option value="${dish.name}">${dish.name}</option>`);
		}
		
		
		form.insertAdjacentHTML(
			'beforeend',
			`<div class="col-md-6 mb-3">
					<label class="form-label" for="rdMenu">Seleccione el menu al que quiere asignarlo:</label>
					<select class="form-select" id="rdMenu" name="rdMenu" required>
					</select>
					<div class="invalid-feedback">Seleccione al menos un menu.</div>
					<div class="valid-feedback">Correcto.</div>
				  </div>
					  </div>
					  `,
		);
		const rdMenu = form.querySelector('#rdMenu');
		for (const menuObj of menus) {
			const menu = menuObj.menu;
			console.log(menu);
			rdMenu.insertAdjacentHTML('beforeend', `<option value="${menu.name}">${menu.name}</option>`);
		}

		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="mb-12">
		<button class="btn btn-primary" type="submit">Asignar</button>
		</div>
		</form>`,
		);
		// FALTA EL ORDENAR LOS PLATOS
		container.append(form);
		this.main.append(container);

		//Formulario para desasignar
		const removeForm = document.createElement('form');
    removeForm.name = 'fDesMenu';
    removeForm.setAttribute('role', 'form');
    removeForm.setAttribute('novalidate', '');
    removeForm.classList.add('row');
    removeForm.classList.add('g-3');

    removeForm.insertAdjacentHTML(
        'afterbegin',
        '<h1 class="display-5">Desasignar un plato de un menú</h1>',
    );

    removeForm.insertAdjacentHTML(
        'beforeend',
        `<div class="col-md-6 mb-3">
            <label class="form-label" for="ddmenu">Seleccione el menú del que desea desasignar el plato:</label>
            <select class="form-select" id="ddmenu" name="ddmenu" required>
            </select>
            <div class="invalid-feedback">Seleccione al menos un menú.</div>
            <div class="valid-feedback">Correcto.</div>
        </div>`,
    );

    const ddmenu = removeForm.querySelector('#ddmenu');
    for (const menuObj of menus) {
        const menu = menuObj.menu;
        ddmenu.insertAdjacentHTML('beforeend', `<option value="${menu.name}">${menu.name}</option>`);
    }

    removeForm.insertAdjacentHTML(
        'beforeend',
        `<div class="col-md-6 mb-3">
            <label class="form-label" for="ddDish">Seleccione el plato que desea desasignar:</label>
            <select class="form-select" id="ddDish" name="ddDish" required>
            </select>
            <div class="invalid-feedback">Seleccione un plato.</div>
            <div class="valid-feedback">Correcto.</div>
        </div>`,
    );

    const ddDish = removeForm.querySelector('#ddDish');
    for (const dishObj of dishes) {
        const dish = dishObj.dish;
        ddDish.insertAdjacentHTML('beforeend', `<option value="${dish.name}">${dish.name}</option>`);
    }

    removeForm.insertAdjacentHTML(
        'beforeend',
        `<div class="mb-3">
            <button class="btn btn-danger" type="submit">Desasignar</button>
        </div>
        </form>`,
    );

    container.append(removeForm);

    this.main.append(container);
	}

	showAssignMenuToDishModal(done, error){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Asignar menu a plato';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato ha sido añadido.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato no se ha podido añadir. <strong>${error}</strong></div>`,
			);
		}
		messageModal.show();
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
		});
	}
	
	showDesassignMenuToDishModal(done, dish, error){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Desasignar menu a plato';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido desasignado correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato <strong>${dish.name}</strong> no se ha desasignado correctamente.Compruebe que el plato <strong>${dish.name}</strong> pertenece a este menu</strong></div>`,
			);
		}
		messageModal.show();
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
		});
	}

	showCategoryForm() {
		const container = document.createElement('div');
		container.insertAdjacentHTML(
			'afterbegin',
			'<h1 class="display-5">Nueva Categoria</h1>',
		);
		this.main.replaceChildren();
		const form = document.createElement('form');
		form.name = 'fNewCategory';
		form.setAttribute('role', 'form');
		form.setAttribute('novalidate', '');
		form.classList.add('row');
		form.classList.add('g-3');
		//name,description

		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="col-md-6 mb-3">
		<label class="form-label" for="ncName">Nombre de la categoria</label>
		<div class="input-group">
		<span class="input-group-text"><i class="bi bi-type"></i></span>
		<input type="text" class="form-control" id="ncName"
		name="ncName"
		placeholder="Nombre de la categoria" value="" required>
		<div class="invalid-feedback">El nombre de la categoria es obligatorio.</div>
		<div class="valid-feedback">Correcto.</div>
		</div>
		</div>
		<div class="col-md-6 mb-3">
		<label class="form-label" for="ncDescription">Descripción de la categoria</label>
		<div class="input-group">
		<span class="input-group-text"><i class="bi bi-bodytext"></i></span>
		<input type="text" class="form-control" id="ncDescription"
		name="ncDescription" value="">
		<div class="invalid-feedback"></div>
		<div class="valid-feedback">Correcto.</div>
		</div>
		</div>
		`,
		);


		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="mb-12">
		<button class="btn btn-primary" type="submit">Añadir Categoria</button>
		<button class="btn btn-primary" type="reset">Cancelar</button>
		</div>
		</form>`,
		);
		container.append(form);

		this.main.append(container);

		//Formulario para eliminar
		const removeForm = document.createElement('form');
    removeForm.name = 'fRCat';
    removeForm.setAttribute('role', 'form');
    removeForm.setAttribute('novalidate', '');
    removeForm.classList.add('row');
    removeForm.classList.add('g-3');

    removeForm.insertAdjacentHTML(
        'afterbegin',
        '<h1 class="display-5">Desasignar un plato de un menú</h1>',
    );

    removeForm.insertAdjacentHTML(
        'beforeend',
        `<div class="col-md-6 mb-3">
            <label class="form-label" for="rCat">Seleccione la categoria que quiere eliminar:</label>
            <select class="form-select" id="rCat" name="rCat" required>
            </select>
            <div class="invalid-feedback">Seleccione al menos una categoria.</div>
            <div class="valid-feedback">Correcto.</div>
        </div>`,
    );
	//FALTA QUE SE ACTUALICE AL AÑADIR LA CATEGORIA PORQUE ESTO SE HACE ANTES DE AÑADIR LA CATEGORIA
	const rCat = removeForm.querySelector('#rCat');
	let rm = RestaurantsManager.getInstance();
	let catsIterator = rm.getCategories();
	let cats = Array.from(catsIterator);
	console.log(cats);
	
	for (const catObj of cats) {
		const category = catObj;
		console.log(category);
		rCat.insertAdjacentHTML('beforeend', `<option value="${category.name}">${category.name}</option>`);
	}
	
	

    removeForm.insertAdjacentHTML(
        'beforeend',
        `<div class="mb-3">
            <button class="btn btn-danger" type="submit">Desasignar</button>
        </div>
        </form>`,
    );

    container.append(removeForm);

    this.main.append(container);
	}

	showNewCategoryModal(done){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Crear categoria';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">Categoria añadida correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La categoria no se ha podido crear.Revise si ya existe.</div>`,
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
	}

	showNewRestaurantModal(nombre,done,error){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Nuevo Restaurante';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${nombre}</strong> ha sido creado correctamente.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato <strong>${nombre}</strong> ya estaba creado. <strong>${error}</strong></div>`,
			);
		}
		messageModal.show();
		messageModalContainer.addEventListener('hidden.bs.modal', listener, {
			once: true
		});
	}

	showRemoveCategoryModal(done,cat){
		const messageModalContainer = document.getElementById('messageModal');
		const messageModal = new bootstrap.Modal('#messageModal');
		const title = document.getElementById('messageModalTitle');
		title.innerHTML = 'Crear categoria';
		const body = messageModalContainer.querySelector('.modal-body');
		body.replaceChildren();
		if (done) {
			body.insertAdjacentHTML('afterbegin', `<div class="p-3">Categoria ${cat.name} eliminada.</div>`);
		} else {
			body.insertAdjacentHTML(
				'afterbegin',
				`<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La categoria no se ha podido borrar.</div>`,
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
	}

	showNewRestaurantForm() {
		const container = document.createElement('div');
		container.insertAdjacentHTML(
			'afterbegin',
			'<h1 class="display-5">Nuevo Restaurante</h1>',
		);
		this.main.replaceChildren();
		const form = document.createElement('form');
		form.name = 'fNewRest';
		form.setAttribute('role', 'form');
		form.setAttribute('novalidate', '');
		form.classList.add('row');
		form.classList.add('g-3');
		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="col-md-6 mb-3">
			<label class="form-label" for="nrName">Nombre del nuevo restaurante</label>
			<div class="input-group">
				<span class="input-group-text"><i class="bi bi-type"></i></span>
				<input type="text" class="form-control" id="nrName"
					name="nrName"
					placeholder="Nombre del restaurante" value="" required>
				<div class="invalid-feedback">El nombre del restaurante es obligatorio.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
		<div class="col-md-6 mb-3">
			<label class="form-label" for="nrDesc">Descripcion del restaurante</label>
			<div class="input-group">
				<span class="input-group-text"><i class="bi bi-fileimage"></i></span>
				<input type="text" class="form-control" id="nrDesc"
					name="nrDesc"
					placeholder="Este restaurante cuenta con......" value="" required>
				<div class="invalid-feedback"></div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
		<div class="col-md-6 mb-3">
			<label class="form-label" for="nrLatitude">Latitud</label>
			<div class="input-group">
				<span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
				<input type="text" class="form-control" id="nrLatitude"
					name="nrLatitude"
					placeholder="Latitud" value="" required>
				<div class="invalid-feedback"></div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
		<div class="col-md-6 mb-3">
			<label class="form-label" for="nrLongitude">Longitud</label>
			<div class="input-group">
				<span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
				<input type="text" class="form-control" id="nrLongitude"
					name="nrLongitude"
					placeholder="Longitud" value="" required>
				<div class="invalid-feedback"></div>
				<div class="valid-feedback">Correcto.</div>
			</div>
		</div>
		`,
		);
	
		form.insertAdjacentHTML(
			'beforeend',
			`
		<div class="mb-12">
			<button class="btn btn-primary" type="submit">Enviar</button>
			<button class="btn btn-primary" type="reset">Resetear</button>
		</div>
		</form>`,
		);
		container.append(form);
	
		this.main.append(container);
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
			< div id = "caja-plato" >
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
					</ >
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
		// Iterar sobre todas las ventanas abiertas y cerrarlas una por una
		this.openedWindows.forEach(window => {
			window.close();
		});

		// Limpiar el array de ventanas abiertas después de cerrarlas
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
