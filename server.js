var mysql = require("mysql");
var express = require("express");
var bodyparser = require("body-parser");
var formidable=require('formidable');
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("upload"));
var fs = require("fs");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'subhra'
});

var server = app.listen(4000,function(err,res){
    if(err) throw err;
    console.log("connected to port no 4000");
});

app.get("/",function(request,response){
    var sql="select * from audio";
    connection.query(sql, function(err, result)
    {
        var data=result;
        response.render('music',{data});
    })
});


app.post('/audioupload', function(request, response)
{
    var form=new formidable.IncomingForm;
    form.parse(request,function(err, fields, files)
    {
        
        var oldpath = files.fileupload.path;
        var newpath = "C:/Users/subhranil/Desktop/exploration/upload/listen/"+files.fileupload.name;
        fs.rename(oldpath,newpath,function(err){
            if(err) throw err;
            var name1 = files.fileupload.name;
            var sql = "insert into audio(name) values (?)";
            connection.query(sql,[name1], function(err, result)
            {
                if(err)
                {
                    throw err;
                }
                console.log('uploaded');
            })
            response.end('audio uploaded');
        });
    })
})


app.get('/listen', function(req, res)
{
    var name=req.query.name;
    var data={audio:name};
    var add_playlist_query = 'select * from playlist';
    connection.query(add_playlist_query, (error, result) =>{
        if(error) throw error;
        var music = result;
        res.render('audio',{music,data});
    })
})

app.post('/audio_playlist', (req, res) =>{

    var name=req.query.name;
    var data={audio:name};

    var name = req.body.musicname;
    var add_playlist_query = 'insert into playlist values(?)';
    connection.query(add_playlist_query, [name], (error) =>{
        if(error) throw error;
        res.redirect('/');
    })
})
