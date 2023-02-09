var express = require('express');
var router = express.Router();
const fs=require("fs");
const path=require("path");

/* GET home page. */
router.get('/',(req, res, next)=> {
  const files=fs.readdirSync(
    path.join(__dirname,"..","public","Filesystem")
  )
  res.render('index',{files,filedata:null,rohit:null} );
});


router.post("/create",(req,res,next)=>{
  fs.writeFileSync(
    path.join(__dirname,"..","public","Filesystem",req.body.filename),"this is file"
  )
   res.redirect("/file/"+req.body.filename)
});

router.get('/file/:filename',(req, res, next)=> {
  const files=fs.readdirSync(
    path.join(__dirname,"..","public","Filesystem")
  )
  const filedata=fs.readFileSync(
    path.join(__dirname,"..","public","Filesystem",req.params.filename),"utf-8"
  )
  res.render('index',{files,filedata,rohit:req.params.filename});
});



router.get('/delete/:filename',(req, res, next)=> {
  fs.unlinkSync(
    path.join(__dirname,"..","public","Filesystem",req.params.filename),
  )
  res.redirect("/");
});

router.post("/update/:filename", function(req, res, next){
  fs.writeFileSync(
    path.join(__dirname, "..", "public","Filesystem", req.params.filename),
    req.body.updata 
  )
  res.redirect("/file/"+req.params.filename);
});
module.exports = router;
