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
  
  var sqlcs='select c.categoryId,c.catName,s.subcategoryId ,s.subcatName from category c, subcategory s where c.categoryId=s.categoryId';
   
  await connection.query(sqlcs, function (error, subcategory, fields) {
    if (error) throw error;

    res.render("index",{subcategory:subcategory}) ;
  });

   res.json(subcategory);
   
})

 
app.get("/insert",function(req,res){
  res.render("inserto");
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
    res.end()
  });
});


app.listen(port,function(){
    console.log("app running");
})

