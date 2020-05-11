/*
 * @Description:
 * @version: 1.0
 * @Author: Leo
 * @Date: 2020-05-09 20:16:23
 * @LastEditors: Leo
 * @LastEditTime: 2020-05-11 13:07:11
 */
var express = require("express");
var Tiny = require("tiny");
var multer = require("multer");
var cors = require("cors");

var storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage });
var app = express();

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
      };
      data.push(media);
      db.update("media", data);
      res.send({ success: true, data: { ...req.file, ...media } });
    });

    app.listen(process.env.PORT || 4001, function () {
      console.log(`Example app listening on port ${process.env.PORT || 4001}!`);
    });
  });
});
