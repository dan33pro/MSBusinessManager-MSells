const auth = require("../../../tools/auth");

module.exports = function checkAuth(action) {
  async function middlewware(req, res, next) {
    switch (action) {
      case "vendor-deliver":
        let owner = req.body.id_usuario;
        await auth.check.checkRoles(req, owner, [2, 3]);
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
