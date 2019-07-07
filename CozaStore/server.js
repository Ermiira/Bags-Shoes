var express =require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const SqlProvider = require('./sql.provider');
var app = express();
const fs = require('fs');

const productRoutes = require('./product.routes');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/public/images' },
  {
    filename: function (req, file, cb) {
      cb(null, file.originalname + '.jpg')
    }
  });


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
  }));

var port= process.env.PORT || 3000

app.use("/api/products/", productRoutes)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json()); // add HTTP body to req.body
app.use('/public/', express.static('public')); // sherben files static



//routes
app.get("/", async function(req,res){
    const connection = await SqlProvider.getConnection();
  
  var sql1='select c.categoryId,c.catName,s.subcategoryId ,s.subcatName from category c, subcategory s where c.categoryId=s.categoryId and categoryId=1';
  var sql2='select c.categoryId,c.catName,s.subcategoryId ,s.subcatName from category c, subcategory s where c.categoryId=s.categoryId and categoryId=2';
   
  await connection.query(sql1, async function (error, bags1, fields) {
    await connection.query(`Select * from products where sector='New'`, async function(error,news,fields){
      await connection.query(`Select * from products where sector='Deals'`,async function(error,deals,fields){
        await connection.query(sql2,async function (error, shoes1, fields) {
                  
        res.render("index",{ bags1:bags1 , shoes1:shoes1 , news:news , deals:deals}) ;
    });
  });
   
  });
  });
  
   
})



app.get("/insert",function(req,res){
  res.render("inserto");
})


 
app.get("/prod",async function(req,res){
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;

    res.render("prodTab", { results: results });
  
    });
})  

app.post("/test" , upload.single('foto') , async function (req, res) {

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
    res.render("prodTab");
    res.end()
  });
});

app.get('/edit/:id',async function (req, res) {

  

  const connection = await SqlProvider.getConnection();

   await connection.query('Select * from products where productId='+req.params.id+' ' , function(error, results, fields){
     if(error) throw error;

     res.render("edit", { results: results });
   });
  


});

app.post("edit/editimi/:id" , upload.single('foto') , async function (req, res) {

  const connection = await SqlProvider.getConnection();
  const id=req.params.id;
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
  
  const sql = 'UPDATE products SET categoryId='+kategoria +',subcategoryId='+nenkategoria+',pName='+emri+', pPrice='+cmimi+', pWeight='+pesha+', pDescription='+pershkrimi+',photoblob='+img+',photourl='+url+',photoname='+photoname+',gender='+gender+',sector='+sector+',colors='+colors+',numbers='+numbers+',material='+materials+' where productId='+id+'';
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log("Editimi deshtoi. " + err)
      res.sendStatus(500)
      return
    }
    console.log("Editimi u krye me sukses")
   res.redirect("prodTab");
  });
});


app.listen(port,function(){
    console.log("app running");
})

