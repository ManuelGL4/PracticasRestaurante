class User {
  // Campos privados
  #username;
  #preferences;
  constructor(username) {
    if (!new.target) throw new Error('Acceso invalido al constructor.');;
    if (!username) throw new Error('Ponga un nombre de usuario.');;
    this.#username = username;
    Object.defineProperty(this, "username", {
      enumerable: true,
      get() {
        return this.#username;
      },
    });
    Object.defineProperty(this, "preferences", {
      enumerable: true,
      get() {
        return this.#preferences;
      },
      set(value) {
        if (!value) throw new EmptyValueException("preferences");
        this.#preferences = value;
      },
    });
  }
}
export { User };
