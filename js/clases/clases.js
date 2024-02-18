class Dish {
  constructor(name, description = '', ingredients = [], image = '') {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.image = image;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getIngredients() {
    return this.ingredients;
  }

  setIngredients(newIngredients) {
    this.ingredients = newIngredients;
  }

  getImage() {
    return this.image;
  }

  setImage(newImage) {
    this.image = newImage;
  }

  toString() {
    return `Dish: ${this.name}, Description: ${this.description}, Ingredients: [${this.ingredients.join(', ')}], Image: ${this.image}`;
  }
}

class Category {
  constructor(name, description = '') {
    this.name = name;
    this.description = description;
    this.dishes = [];
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getDishes() {
    return this.dishes;
  }

  setDishes(newDishes) {
    this.dishes = newDishes;
  }

  toString() {
    return `Category: ${this.name}, Description: ${this.description}`;
  }
}

class Allergen {
  constructor(name, description = '') {
    this.name = name;
    this.description = description;
    this.dishes = [];
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getDishes() {
    return Array.from(this.dishes);
  }

  setDishes(newDishes) {
    this.dishes = newDishes;
  }

  toString() {
    return `Allergen: ${this.name}, Description: ${this.description}`;
  }
}

class Menu {
  constructor(name, description = '') {
    this.name = name;
    this.description = description;
    this.dishes = [];
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getDishes() {
    return this.dishes;
  }

  setDishes(newDishes) {
    this.dishes = newDishes;
  }

  toString() {
    return `Menu: ${this.name}, Description: ${this.description}`;
  }
}

class Restaurant {
  constructor(name, description = '', location = null) {
    this.name = name;
    this.description = description;
    this.location = location;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getLocation() {
    return this.location;
  }

  setLocation(newLocation) {
    this.location = newLocation;
  }

  toString() {
    return `Restaurant: ${this.name}, Description: ${this.description}, Location: ${this.location}`;
  }
}

class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLatitude() {
    return this.latitude;
  }

  setLatitude(newLatitude) {
    this.latitude = newLatitude;
  }

  getLongitude() {
    return this.longitude;
  }

  setLongitude(newLongitude) {
    this.longitude = newLongitude;
  }

  toString() {
    return `Coordinate: Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
  }
}
// const dish1 = new Dish('Pasta Carbonara', 'Plato italiano', ['pasta', 'bacon', 'salsa'], '/images/pasta.jpg');
// const category1 = new Category('Italiano', 'Cocina Italiana');

// const allergen1 = new Allergen('Gluten', 'Tiene gluten');

// const menu1 = new Menu('Menu 1', 'El primer menu del restaurante');
// const coordinate1 = new Coordinate(40.7128, -74.0060);
// const restaurant1 = new Restaurant('Restaurante 1', 'El mejor restaurante', coordinate1);

export {
  Dish, Coordinate, Allergen, Restaurant, Menu, Category,
}