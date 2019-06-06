const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
//const ProductService = require('./product.service');
const HTTPStatus = require('http-status');
var bodyParser = require('body-parser');

router.use(express.static('./views'))
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));


router.get('/products',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});


router.get('/category',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `category`', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});


router.get('/subcategory',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `subcategory`', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});

router.get('/produkti/:id', async function (req, res) {
 
    const connection = await SqlProvider.getConnection();

    var productId= req.params.id;
    var sql = 'SELECT * FROM `products` where productId=?';

     var result = await connection.query(sql ,[productId])

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


router.post('/:id/photos', async function (req, res) {

  const url = './public/images/' + req.files.photo.name;
  req.files.photo.mv(url, async function (error) {
      if (error) {
          return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
      }
      const connection = await SqlProvider.getConnection();

      const result = await connection.query('UPDATE `products` SET ? where productId=?', [
          {
            photoUrl: url
          },
          req.params.id]);

      const udpatedObject = result[0];

      if (udpatedObject.affectedRows === 0) {
          return res.send(HTTPStatus.NOT_FOUND).end();
      }

      return res.send(HTTPStatus.OK).end();
  });
});


router.post("/user_create",async function(req, res){

  const connection = await SqlProvider.getConnection();

  const emri = req.body.emri1
  const cmimi = req.body.cmimi1
  const pesha = req.body.pesha1
  const pershkrimi = req.body.pershkrimi1
  const kategoria = req.body.kategoria1
  const nenkategoria = req.body.nenkategoria1
  const foto = req.body.foto


  const sql = "INSERT INTO products (categoryId,subcategoryId,pName, pPrice, pWeight, pDescription,photoUrl) VALUES (?,?,?,?,?,?,?)";
  await connection.query(sql,[kategoria,nenkategoria,emri,cmimi,pesha,pershkrimi,foto], (err, results, fields) => {
  if (err) {
    console.log("Insertimi deshtoi. " + err)
    res.sendStatus(500)
    return
  }
    console.log("Insertimi u krye me sukses")
    res.end()
 });
  });



router.post('/',  async function (req, res) {

    const product = {

        categoryId: req.body.categoryId,
        subcategoryId: req.body.subcategoryId,
        pName: req.body.name,
        pPrice: req.body.price,
        pWeight: req.body.weight,
        pDescription:req.body.description,
       // photoUrl: req.body.Url
        
    }

    const connection = await SqlProvider.getConnection();

    const result = await connection.query('INSERT INTO `products` SET ?', product);
    const insertedObject = result[0];

    if (insertedObject.affectedRows === 0) {
        return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
    }

    return res.send(HTTPStatus.OK).end();
}
);




  router.put('/:id', async function (req, res) {
    
    const produkt = {}

    if (req.body.name) {
        produkt.pName = req.body.name;
    }
    if (req.body.price) {
        produkt.pPrice = req.body.price;
    }
    if (req.body.weight) {
        produkt.pWeight = req.body.weight;
    }

    const connection = await SqlProvider.getConnection();

    const result = await connection.query('Update products SET ? where productId=?', [produkt, req.params.id]);
    const udpatedObject = result[0];

    if (udpatedObject.affectedRows === 0) {
        return res.send(HTTPStatus.NOT_FOUND).end();
    }

    return res.send(HTTPStatus.OK).end();
});



  

 module.exports = router;

