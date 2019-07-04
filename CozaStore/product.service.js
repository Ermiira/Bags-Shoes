const express = require('express');
const SqlProvider = require('./sql.provider')
const HTTPStatus = require('http-status');

class ProductService {
    static async getById(id){
        if (isNaN(id)) { // if id is not a number
            throw new Error(HTTPStatus.BAD_REQUEST);
        }

        const connection = await SqlProvider.getConnection();
    
        const result = await connection.query('select p.productId,p.categoryId,c.catName,p.subcategoryId,'+
        's.subcatName,p.pName,p.pPrice, p.pWeight,p.pDescription,p.photoblob,p.photourl,p.photoname'+
        '  from products p,category c,subcategory s '+
        ' where p.categoryId=c.categoryId and p.subcategoryId=s.subcategoryId and p.categoryId=s.categoryId and productId=?', id);
        const rows = result[0];
    
        if (!rows[0]) {  // if no row is returned
            throw new Error(HTTPStatus.NOT_FOUND);
        }
    
        return rows[0];
    }
}

module.exports = ProductService;