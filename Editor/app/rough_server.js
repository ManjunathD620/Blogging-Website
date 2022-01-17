
express = require('express');                   
fs = require('fs');
path = require('path');
multer = require('multer');
bodyParser = require('body-parser');



app = express();      
app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname , '/rough2.html'));
});

app.listen(8000,function(){
    console.log("listening on port 8000");
});

storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

upload = multer({storage:storage})

app.post('/uploads',upload.single('uploaded_file'),function(req,res,next){
    res.status(204).send();
    fs.rename(req.file.destination+req.file.originalname,("public/images/"+req.body.file_title+".png"), () => {
        console.log("\nFile Renamed!\n");

      });
})

navbar = fs.readFileSync("navbar.txt","utf-8")

app.post('/',function(req,res){
    data = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">    <link rel="stylesheet" href="css/cssForAll.css"><title>';
    data = data+(req.body.title);
    data = data+'</title></head><body>';
    data = data+navbar
    data = data+(req.body.innerhtml);
    data = data+'</body></html>';
    title = "public/html/"+req.body.title+".html";
    fs.writeFileSync(title,data,function(){
        console.log("done!");
    });
    fs.copyFileSync("public/html/"+req.body.title+".html","data/"+req.body.title+".html")
    res.sendFile(path.join(__dirname , "data/"+req.body.title+".html"));
});




