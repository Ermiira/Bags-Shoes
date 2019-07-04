const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
const path = require("path");
const bodyParser = require('body-parser');
const authMiddleware = require('./snipcartAuth.middleware');

const HTTPStatus = require('http-status');
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: __dirname + '/public/images' },
  {
    filename: function (req, file, cb) {
      cb(null, file.originalname + '.jpg')
    }
  });


router.use(express.static('./views'))
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));


router.get('/', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;

    res.render("product", { results: results });
  });
  res.json(results);
});


router.get("/about", function (req, res) {
  res.render("about");
})

router.get("/contact", function (req, res) {
  res.render("contact");
})


router.get('/bags', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where `categoryId`=1 ', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});

router.get('/shoes', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where `categoryId`=2 ', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});


router.get('/news', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query(`SELECT * FROM products where sector='New'`, function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});


router.get('/deals', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query(`SELECT * FROM products where sector='Deals'`, function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});

router.get('/male', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query(`SELECT * FROM products where gender='M'`, function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});

router.get('/female', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query(`SELECT * FROM products where gender='F'`, function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});


router.get('/bags/Wallets', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=1', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});



router.get('/bags/Belt', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=2', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});



router.get('/bags/Shoulder', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=3', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});




router.get('/bags/Clutch', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=4', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});



router.get('/bags/Accessories', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=5', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});


router.get('/shoes/Sandals', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=6', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});



router.get('/shoes/Heels', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=7', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});


router.get('/shoes/Sneakers', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=8', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});


router.get('/shoes/Boots', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=9', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});



router.get('/shoes/Casual', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM `products` where subcategoryId=10', function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  res.json(results);
});



router.get('/subcategory', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  var sqlcs = 'select c.categoryId,c.catName,s.subcategoryId ,s.subcatName from category c, subcategory s where c.categoryId=s.categoryId';

  await connection.query(sqlcs, function (error, subcategory, fields) {
    if (error) throw error;

    res.render("index", { subcategory: subcategory });
  });

  res.json(subcategory);

});


router.get('/:id', async function (req, res) {
 
  const connection = await SqlProvider.getConnection();

  var productId= req.params.id;
  connection.query('SELECT * FROM `products` where productId='+ productId, function (error, prod, fields) {
    if (error) throw error;
    res.render("product-detail",{ prod: prod});
  });
   //res.json(prod);

});



router.delete('/:id', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('DELETE FROM `products` WHERE `productId`=?', [req.params.id], function (error, results) {
    if (error) throw error;
    console.log("Deleted!!")
    res.end('Record has been deleted!');
  });
});




router.get("/inserto", function (req, res) {
  res.render('inserto');
});

router.post("/test", authMiddleware ,upload.single('foto'), async function (req, res) {
  const connection = await SqlProvider.getConnection();

  const url = req.file.path
  const img = fs.readFileSync(req.file.path);
  const emri = req.body.emri1
  const cmimi = req.body.cmimi1
  const pesha = req.body.pesha1
  const pershkrimi = req.body.pershkrimi1
  const kategoria = req.body.kategoria1
  const nenkategoria = req.body.nenkategoria1
  const photoname = req.file.originalname
  const gender = req.body.gjinia
  const sector = req.body.sektori
  const colors = req.body.ngjyra
  const numbers = req.body.numri
  const materials = req.body.materiali
  
  const sql = "INSERT INTO products (categoryId,subcategoryId,pName, pPrice, pWeight, pDescription,photoblob,photourl,photoname,gender,sector,colors,numbers,material) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  connection.query(sql, [kategoria, nenkategoria, emri, cmimi, pesha, pershkrimi, img, url, photoname,gender,sector,colors,numbers,materials], (err, results, fields) => {
    if (err) {
      console.log("Insertimi deshtoi. " + err)
      res.sendStatus(500)
      return
    }
    console.log("Insertimi u krye me sukses")
    res.end()
  });
});





router.post('/:id/photos', authMiddleware,async function (req, res) {

  const url = './public/images/' + req.params.photos;
  req.files.foto.mv(url, async function (error) {
    if (error) {
      return res.send(error);
    }
    const connection = await SqlProvider.getConnection();

    const result = await connection.query('UPDATE `products` SET ? where productId=?', [
      {
        photourl: url
      },
      req.params.id]);

    const udpatedObject = result[0];

    if (udpatedObject.affectedRows === 0) {
      return res.send(HTTPStatus.NOT_FOUND).end();
    }

    return res.send(HTTPStatus.OK).end();
  });
});

router.use(express.static('public'));

//url edhe blob s'ruhet
router.post('/',authMiddleware,async function (req, res) {

  const product = {
    
    categoryId: req.body.categoryId,
    subcategoryId: req.body.subcategoryId,
    pName: req.body.name,
    pPrice: req.body.price,
    pWeight: req.body.weight,
    pDescription: req.body.description,
    photoblob: req.body.pblob,
    photourl: req.body.url
    //photourl:req.file.path
  }

  const connection = await SqlProvider.getConnection();

  const result = await connection.query('INSERT INTO `products` SET ?', product);
  const insertedObject = result[0];

  if (insertedObject.affectedRows === 0) {
    return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.send(HTTPStatus.OK).end();
});

//tash ta provojm

//kta se kom prek se ka pas ba
router.put('/:id', authMiddleware,async function (req, res) {

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


router.post('/webhook', async function (req, res) {
  if (req.body.eventName === "order.completed") {
      req.body.content.items.forEach(function(item){
          // increase item order count

          const pId = req.body.content.items.id
          const connection =  SqlProvider.getConnection();
           nrOrders=nrOrders+1;

          const result =  connection.query('Update orders SET nrOrders='+nrOrders +'where productId='+pId,[nrOrders, pId]);
          const udpatedObject = result[0];

          if (udpatedObject.affectedRows === 0) {
            return res.send(HTTPStatus.NOT_FOUND).end();
          }
                 return res.send(HTTPStatus.OK).end();

        });
  
      }
  
  console.log(req.body);
  return res.sendStatus(HTTPStatus.OK).end();
});



module.exports = router;