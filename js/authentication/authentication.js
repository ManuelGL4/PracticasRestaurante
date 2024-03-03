import { User } from "../clases/user.js";

const AuthenticationService = (function () {
  let instantiated;
  function init() {
    // Inicialización del Singleton
    class Authentication {
      constructor() {
        if (!new.target) throw new Error("Acceso invalido al constructor.");
      }
      validateUser(username, password) {
        return !!(username === "admin" && password === "admin");
      }
      getUser(username) {
        let user = null;
        if (username === "admin") user = new User("admin");
        return user;
      }
    }
    const auth = new Authentication();
    Object.freeze(auth);
    return auth;
  }
  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();
export default AuthenticationService;
