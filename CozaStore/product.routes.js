const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
const path = require("path");
const bodyParser = require('body-parser');
const authMiddleware = require('./snipcartAuth.middleware');

const HTTPStatus = require('http-status');
const fs = require('fs');




router.use(express.static('./views'))
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));


router.get('/', async function (req, res) {

  const connection = await SqlProvider.getConnection();
   


  
      await connection.query('SELECT * FROM products', async function (error, results, fields) {
        await connection.query('SELECT * FROM category', async function (error, cat, fields) {

              res.render("product", { results: results,cat:cat });

          });
        });
      });


router.get("/about", function (req, res) {
  res.render("about");
})

router.get("/contact", function (req, res) {
  res.render("contact");
})


router.get('/bags', async function (req, res) {

  const connection = await SqlProvider.getConnection();


  var sql1='select * from category c, subcategory s where c.categoryId=s.categoryId and c.categoryId=1';

  await connection.query('SELECT * FROM `products` where `categoryId`=1 ',async function (error, results, fields) {
    await connection.query(sql1, async function (error, bags1, fields) {
 
    res.render("product", { results: results, bags1:bags1 });
     });
  });
});

router.get('/shoes', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  var sql2='select * from category c, subcategory s where c.categoryId=s.categoryId and c.categoryId=2';

  await connection.query('SELECT * FROM `products` where `categoryId`=2 ',async function (error, results, fields) {
    await connection.query(sql2, async function (error, shoes1 , fields) {
    
    res.render("product", { results: results ,shoes1:shoes1 })
  });
  });  
});



router.get('/male', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query(`SELECT * FROM products where gender='M'`, function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  
  //res.json(results);
});


router.get('/female', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query(`SELECT * FROM products where gender='F'`, function (error, results, fields) {
    if (error) throw error;
    res.render("product", { results: results })
  });
  //res.json(results);
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


// router.get('/shoes/:id', async function (req, res) {

//   const connection = await SqlProvider.getConnection();

//   await connection.query('"SELECT * FROM `products` where categoryId=2 and subcategoryId='+ req.params.id +'"', function (error, results, fields) {
//     if (error) throw error;
//     res.render("product", { results: results })
//   });
//   res.json(results);
// });


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
  var sql='select * from products p,category c,subcategory s  where p.categoryId=c.categoryId and p.subcategoryId=s.subcategoryId and p.categoryId=s.categoryId and p.productId='+ productId;
  
  await connection.query(sql , async function (error, prod, fields) {
    await connection.query(`Select * from products where sector='Like'`, async function(error,like,fields){
   
    res.render("product-detail",{ prod: prod , like:like});
  });
 });

});



router.delete('/:id', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  await connection.query('DELETE FROM `products` WHERE `productId`=?', [req.params.id], function (error, results) {
    if (error) throw error;
    console.log("Deleted!!")
    res.end('Record has been deleted!');
  });
});






router.use(express.static('public'));




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

          const result =  connection.query('" Update orders SET nrOrders='+nrOrders +'+1 where productId='+pId+'"');
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