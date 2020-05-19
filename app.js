var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var multer = require('multer')
var app = express();
var path = require("path");
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var user_sch = require('./schema/User_schema.js');
var prod_sch = require('./schema/Product_schema.js');
var fs = require("fs")
const dotenv = require('dotenv');
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', function () {
    console.log('Connection to Mongo established.');
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db(process.env.DBNAME);
    }
});
mongoose.connect(process.env.MONGODBURL, { dbName: process.env.DBNAME, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => {
    if (err) {

        console.log("TEST", err)
        return err;
    }
})
var storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './media');
    },
    filename: (req, file, cb) => {
        console.log(file);
        let myarray = [];
        myarray.push(JSON.parse(req.body.pdata));

        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, (myarray[0].pname).substring(0, 3) + file.originalname);
        // cb(null, (myarray[0].pname).substring(0, 3) + file.originalname + '.' + filetype);
    }
});
var upload = multer({ storage: storage });


app.get("/", (req, res) => {
    res.json("Connected");
    res.end();
});
app.get("/media/:imgname", (req, res) => {
    fs.readFile('./media/' + req.params.imgname, function (err, data) {
        if (err) {
            console.log("Error", err)
            res.json("No data found")
            return;

        }
        if (data) {
            res.writeHead(200, { 'Content-type': 'image/jpeg' });
            res.write(data)
            res.end()
        }
        if (!data) {
            console.log("file", "File dp is not found")
            res.end("File dp is not found")
        }
    })
})
app.post("/reg", (req, res) => {
    user_reg = new user_sch({
        Userid: (req.body.name).substring(0, 3) + Date.now(),
        Name: req.body.name,
        Email: req.body.email,
        Pwd: req.body.password,
        Address: req.body.address,
        Role: req.body.role
    });

    user_reg.save().then(result => {
        res.json({ "status": true, "msg": "Record Insertion Success" });
        res.end();
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "msg": "Record Insertion UnSuccess", "Error": e });
        res.end();
    })
})

app.post("/login", (req, res) => {
    user_sch.find(req.body).then(result => {
        if (!result || result.lengh == 0) {
            res.json({ "status": false, "msg": "No data found" });
            res.end();
        }
        if (result) {
            res.json({ "status": true, "Data": result });
            res.end();
        }
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "Error": e });
        res.end();
    })
})

app.get("/totaluser", (req, res) => {
    user_sch.find().then(result => {
        if (!result || result.lengh == 0) {
            res.json({ "status": false, "msg": "No data found" });
            res.end();
        }
        if (result) {
            res.json({ "status": true, "Data": result });
            res.end();
        }
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "Error": e });
        res.end();
    })
})

app.get("/allproduct", (req, res) => {
    prod_sch.find().then(result => {
        if (!result || result.lengh == 0) {
            res.json({ "status": false, "msg": "No data found" });
            res.end();
        }
        if (result) {
            res.json({ "status": true, "Data": result });
            res.end();
        }
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "Error": e });
        res.end();
    })
})

app.post("/addproduct", upload.single('file'), (req, res) => {
    let myarray = [];
    myarray.push(JSON.parse(req.body.pdata));
    add_prod = new prod_sch({
        Pid: (myarray[0].pname).substring(0, 3) + Date.now(),
        Pname: myarray[0].pname,
        Pdate: Date.now(),
        Pqty: myarray[0].pqty,
        Prate: myarray[0].prate,
        Pimg: (myarray[0].pname).substring(0, 3) + req.file.originalname
    });

    add_prod.save().then(result => {
        res.json({ "status": true, "msg": "Record Insertion Success" });
        res.end();
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "msg": "Record Insertion UnSuccess", "Error": e });
        res.end();
    })
})
app.put("/updproduct/:pid", upload.single('file'), (req, res) => {
    let myarray = [];
    myarray.push(JSON.parse(req.body.pdata));
    prod_sch.findOneAndUpdate(
        { "Pid": req.params.pid },
        {
            "Pname": myarray[0].pname,
            "Pqty": myarray[0].pqty,
            "Prate": myarray[0].prate,
            "Pimg": (myarray[0].pname).substring(0, 3) + req.file.originalname
        }).then(result => {
            if (!result || result.lengh == 0) {
                res.json({ "status": false, "msg": "No data found" });
                res.end();
            }
            if (result) {
                res.json({ "status": true, "Msg": "Updated successfully" });
                res.end();
            }
        }).catch(e => {
            console.log(e)
            res.json({ "status": false, "Error": e });
            res.end();
        })
})

app.delete("/delproduct/:pid", (req, res) => {
    prod_sch.findOneAndDelete({ "Pid": req.params.pid }).then(result => {
        if (!result || result.lengh == 0) {
            res.json({ "status": false, "msg": "No data found" });
            res.end();
        }
        if (result) {
            res.json({ "status": true, "Msg": "Deleted successfully" });
            res.end();
        }
    }).catch(e => {
        console.log(e)
        res.json({ "status": false, "Error": e });
        res.end();
    })
})

var port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (!err) {
        console.log("Port is Listening on " + port);
    }
    console.log(err);
    return err;

})
