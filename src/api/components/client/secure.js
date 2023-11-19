const auth = require("../../../tools/auth");

module.exports = function checkAuth(action) {
  async function middlewware(req, res, next) {
    switch (action) {
      case "vendor":
        let owner = req.body.id_usuario;
        await auth.check.checkRol(req, owner, 2);
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
