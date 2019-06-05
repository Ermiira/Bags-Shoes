const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
//const ProductService = require('./product.service');
//const HTTPStatus = require('http-status');



//qekjo po ban
router.get('/products',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products`', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});

router.get('/produkti/:id', async function (req, res) {
 
    const connection = await SqlProvider.getConnection();

    var productId= req.params.id;
    var sql = 'SELECT * FROM `products` where productId=?';

     var result = await connection.query(sql ,[productId])

     //var re=JSON.stringify(result);
     
     //var se=JSON.stringify(result);
       res.end(JSON.stringify(result)) ;
  
});


router.delete('/products/:id',async function (req, res) {

  const connection = await SqlProvider.getConnection();

  connection.query('DELETE FROM `products` WHERE `productId`=?', [req.params.id], function (error, results) {
   if (error) throw error;
   console.log("Deleted!!")
   res.end('Record has been deleted!');
 });
});





router.post("/inserto",async function(req, res){

  const connection = await SqlProvider.getConnection();

  var emri = req.body.emri1
  var cmimi = req.body.cmimi1
  var pesha = req.body.pesha1
  var pershkrimi = req.body.pershkrimi1
  var kategoria = req.body.kategoria1
  var nenkategoria = req.body.nenkategoria1
  var ngjyra = req.body.ngjyra1
  var foto = req.body.foto


  var sql = "INSERT INTO products (categoryId,subcategoryId,pName, pPrice, pWeight, pDescription, pColor,photoId) VALUES (?,?,?,?,?,?,?,?)";
  await connection.query(sql,[kategoria,nenkategoria,emri,cmimi,pesha,pershkrimi,ngjyra,foto], (err, results, fields) => {
  if (err) {
    console.log("Insertimi deshtoi. " + err)
    res.sendStatus(500)
    return
  }
    console.log("Insertimi u krye me sukses")
    res.end()
 })
  ;})


  router.put('/products/:id',async function (req, res) {

    const connection = await SqlProvider.getConnection();

    await connection.query('UPDATE `products` SET `pName`=?,`pPrice`=?,`pWeight`=? where `productId`=?', [req.body.emri1,req.body.cmimi1, req.body.pesha1, req.params.id], function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
 });


 module.exports = router;

