const jwt = require("jsonwebtoken");
const config = require("../../../config");
const error = require("../utils/error");
const secret = config.jwt.secret;
const store = require('../store/remote-mysql');

function getToken(auth) {
  if (!auth) {
    throw error("No viene Token", 401);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw error("Formato invalido", 401);
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function verify(token) {
  return jwt.verify(token, secret);
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

const check = {
  checkRoles: async function (req, owner, typesUser) {
    const decoded = decodeHeader(req);
    // Comprobar si es o no propio
    if (decoded.id_usuario != owner || !owner) {
      throw error("No puedes hacer esto", 403);
    } else {
      let user = await store.get({name: 'Usuarios', pk: 'id_usuario'}, decoded.id_usuario);
      let semaforo = typesUser.some(id_rol => id_rol == user[0].id_rol);
      if (!semaforo) {
        throw error("Este tipo de usuario no esta autorizado", 403);
      }
    }
  },
  checkRol: async function (req, owner, typeUser) {
    const decoded = decodeHeader(req);
    // Comprobar si es o no propio
    if (decoded.id_usuario != owner || !owner) {
      throw error("No puedes hacer esto", 403);
    } else {
      let user = await store.get({name: 'Usuarios', pk: 'id_usuario'}, decoded.id_usuario);
      if (user[0].id_rol != typeUser) {
        throw error("Este tipo de usuario no esta autorizado", 403);
      }
    }
  },
  checkValidUser: function (req) {
    const decoded = decodeHeader(req);
    // Comprobar si es o no un usuario
    if (decoded.id_usuario == null) {
      throw error("No se reconoce como usuario", 403);
    }
  },
};

module.exports = {
  check,
};
