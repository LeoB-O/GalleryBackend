/*
 * @Description:
 * @version: 1.0
 * @Author: Leo
 * @Date: 2020-05-09 20:16:23
 * @LastEditors: Leo
 * @LastEditTime: 2020-05-11 13:48:18
 */
var express = require("express");
var bodyParser = require("body-parser")
var Tiny = require("tiny");
var multer = require("multer");
var cors = require("cors");
const { v4: uuidv4 } = require('uuid');

var storage = multer.diskStorage({
  destination: "uploads/gallery/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage });
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cors());
app.use("/gallery", express.static("uploads"));

Tiny("gallery", function (err, db) {
  db.get("media", function (err, data) {
    if (!data) {
      data = [];
      db.set("media", data);
    }
    data.length =
      data.length != undefined ? data.length : Object.keys(data).length - 1;
    data = Array.from(data);

    app.get("/gallery", function (req, res) {
      res.send({ success: true, data });
    });

    app.post("/gallery", upload.single("file"), function (req, res) {
      let media = {
        filename: req.file.filename,
        title: req.body.title,
        desc: req.body.desc,
        remove: false,
        id: uuidv4()
      };
      data.push(media);
      db.update("media", data);
      res.send({ success: true, data: { ...req.file, ...media } });
    });

    app.post("/remove", function (req, res) {
      const id = req.body.id;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data[i].remove = true;
        }
      }
      db.update("media", data);
      res.send({ success: true })
    })

    app.listen(process.env.PORT || 4001, function () {
      console.log(`Example app listening on port ${process.env.PORT || 4001}!`);
    });
  });
});
