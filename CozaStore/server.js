var express =require('express');
var exphbs  = require('express-handlebars');
var app = express();
const productRoutes = require('./product.routes');

//mju qas me req.body.(emri te html name=)
const bodyParser=require('body-parser');


//set port
var port= process.env.PORT || 3000

app.use("/api/products/", productRoutes)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json()); // add HTTP body to req.body


//routes
app.get("/",function(req,res){
    res.render("index");
})

app.get("/about",function(req,res){
    res.render("about");
})

app.get("/contact",function(req,res){
    res.render("contact");
})


app.get("/product",function(req,res){
  res.render("product");
 })

 app.get("/product-detail",function(req,res){
    res.render("product-detail");
   })
 
   app.get("/product-detail2",function(req,res){
    res.render("product-detail2");
   })

   app.get("/product-detail3",function(req,res){
    res.render("product-detail3");
   })
 
app.listen(port,function(){
    console.log("app running");
})

app.use('/public/', express.static('public')); // sherben files static
