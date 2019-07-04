var express =require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const SqlProvider = require('./sql.provider');
var app = express();
const productRoutes = require('./product.routes');



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

 

app.listen(port,function(){
    console.log("app running");
})

