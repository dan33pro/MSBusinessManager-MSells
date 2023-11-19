const TABLA = {
    name: 'Clientes',
    pk: 'id_cliente',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const client = {
            id_cliente: body.id_cliente,
            nombres: body.nombres,
            apellidos: body.apellidos,
            correo: body.correo,
            codPais: body.codPais,
            numeroCelular: body.numeroCelular,
            direccion: body.direccion,
            id_ruta: body.id_ruta,
        };
        if (!client.nombres || !client.apellidos || !client.correo || !client.codPais || !client.numeroCelular ||  !client.direccion || !client.id_ruta) {
            return Promise.reject('No se indico la información necesaria');
        }
        const response = await store.upsert(TABLA, client, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del cliente');
        }
        return store.remove(TABLA, id);
    }

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};