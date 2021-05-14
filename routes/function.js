const express = require("express");
const router = express.Router();
const Fun = require("../models/functionModel");
const fs = require("fs");

router
  .get("/insert", (req, res, next) => {
    res.render("code/insertForm");
  })
  .post("/insert", (req, res, next) => {
    console.log(req.body);
    let funtoInsert = new Fun({
      name: req.body.namefun,
      args: req.body["args[]"],
      body: req.body.body,
      authorId: "02510214",
    });
    funtoInsert
      .save()
      .then((funFromDb) => res.send(funFromDb))
      .catch((err) => {
        console.log(err);
        next(err);
      });
  })
  .post("/fun/", (req, res, next) => {
    Fun.findById("609a8c77cd3d515e98b32096")
      .then((ret) => {
        console.log(ret);
        let path = `${__dirname}/../tmpfolder/${ret.name}.js`;
        let args = ret.args.reduce((acc, val) => acc + "," + val);
        console.log(args, __dirname);
        let fileText = `
function ${ret.name}(${args}) {
${ret.body}
}
module.exports = ${ret.name};`;

        fs.appendFileSync(path, fileText, function (err) {
          if (err) throw err;
          console.log("Saved!");
        });
        const fun = require(`../tmpfolder/${ret.name}.js`);
        let datatoret = fun(req.body.nb, req.body.str);
        res.json({ data: datatoret });
      })
      .catch((err) => next(err));
  });

module.exports = router;
