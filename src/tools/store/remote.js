const request = require('request');

function createRemoteDB(host, port) {
    const URL = 'http://'+host+':'+port;

    function list(table) {
        return req('GET', table.name);
    }

    function get(table, id) {
        return req('GET', `${table.name}/${table.pk}/${id}`);
    }

    function getCompose(table, idOne, idTwo) {
        return req('GET', `${table.name}/${table.pkOne}/${table.pkTwo}/${idOne}/${idTwo}`);
    }

    function upsert(table, data, action) {
        if(action == 'insert') return req('POST', `${table.name}/${table.pk}/${action}`, data);
        if(action == 'insert-compose') return req('POST', `${table.name}/${table.pkOne}/${table.pkTwo}/${action}`, data);
        if(action == 'update') return req('PUT', `${table.name}/${table.pk}/${action}`, data);
        if(action == 'update-compose') return req('PUT', `${table.name}/${table.pkOne}/${table.pkTwo}/${action}`, data);
    }

    function query(table, query) {
        let key = Object.keys(query)[0];
        let value = query[key];

        if('pk' in table) return req(`GET`, `${table.name}/${table.pk}/${key}/${value}`);
        return req(`GET`, `query/${table.name}/${table.pkOne}/${table.pkTwo}/${key}/${value}`);
    }

    function remove(table, id) {
        return req('DELETE', `${table.name}/${table.pk}/${id}`);
    }

    function removeCompose(table, idOne, idTwo) {
        return req('DELETE', `${table.name}/${table.pkOne}/${table.pkTwo}/${idOne}/${idTwo}`);
    }

    function req(method, table, data) {
        let url = URL + '/' + table;
        let body = '';

        if(data) {
            body = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json',
                },
                url,
                body,
            }, (err, req, body) => {
                if(err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp.body);
            });
        })
    }

    return {
        list,
        get,
        getCompose,
        upsert,
        query,
        remove,
        removeCompose,
    };
}

module.exports = createRemoteDB;