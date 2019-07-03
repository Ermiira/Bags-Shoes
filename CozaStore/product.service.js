const express = require('express');
const SqlProvider = require('./sql.provider')
const HTTPStatus = require('http-status');

class ProductService {
    static async getById(id){
        if (isNaN(id)) { // if id is not a number
            throw new Error(HTTPStatus.BAD_REQUEST);
        }

        const connection = await SqlProvider.getConnection();
    
        const result = await connection.query('SELECT * FROM `products` where id=?', id);
        const rows = result[0];
    
        if (!rows[0]) {  // if no row is returned
            throw new Error(HTTPStatus.NOT_FOUND);
        }
    
        return rows[0];
    }
}

module.exports = ProductService;