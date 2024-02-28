function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ?
        input.parentElement.querySelector('div.valid-feedback') :
        input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
        messageDiv.innerHTML = message;
    }
}
function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}


function newDishValidation(handler) {
    const form = document.forms.fNewDish;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        // Validación del nombre del plato
        this.ndName.value = this.ndName.value.trim();
        if (!this.ndName.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndName, false, "El nombre del plato es obligatorio.");
            if (!firstInvalidElement) firstInvalidElement = this.ndName;
        } else {
            showFeedBack(this.ndName, true, "Correcto.");
        }

        // Validación de la imagen del plato
        if (!this.ndImg.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndImg, false, "La URL de la imagen es inválida.");
            if (!firstInvalidElement) firstInvalidElement = this.ndImg;
        } else {
            showFeedBack(this.ndImg, true, "Correcto.");
        }

        // Validación de los ingredientes
        this.ndIngredients.value = this.ndIngredients.value.trim();
        if (!this.ndIngredients.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndIngredients, false, "Los ingredientes son obligatorios.");
            if (!firstInvalidElement) firstInvalidElement = this.ndIngredients;
        } else {
            showFeedBack(this.ndIngredients, true, "Correcto.");
        }

        // Validación de la descripción
        if (!this.ndDescription.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndDescription, false, "La descripción es obligatoria.");
            if (!firstInvalidElement) firstInvalidElement = this.ndDescription;
        } else {
            showFeedBack(this.ndDescription, true, "Correcto.");
        }

        // Validación de las categorías
        if (!this.ndCategories.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndCategories, false, "Seleccione al menos una categoría.");
            if (!firstInvalidElement) firstInvalidElement = this.ndCategories;
        } else {
            showFeedBack(this.ndCategories, true, "Correcto.");
        }

        // Validación de los alergenos
        if (!this.ndAllergens.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndAllergens, false, "Seleccione al menos un alergeno.");
            if (!firstInvalidElement) firstInvalidElement = this.ndAllergens;
        } else {
            showFeedBack(this.ndAllergens, true, "Correcto.");
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ndDescription.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback,div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input, textarea, select')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.ndName.focus();
    });

    for (const input of form.querySelectorAll('input, textarea, select')) {
        input.addEventListener('change', defaultCheckElement);
    }
}

export { newDishValidation };
