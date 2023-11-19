const auth = require("../../../tools/auth");

module.exports = function checkAuth(action) {
  function middlewware(req, res, next) {
    switch (action) {
      case "admin":
        let owner = req.body.id_usuario;
        auth.check.checkRol(req, owner, 1);
        next();
        break;
        case "valid":
          auth.check.checkValidUser(req);
          next();
          break;
      default:
        next();
    }
  }

  return middlewware;
};
