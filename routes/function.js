const express = require("express");
const router = express.Router();
const Fun = require("../models/functionModel");
const fs = require("fs");
const fetch = require("node-fetch");

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
  .post("/result/:name", async (req, res, next) => {
    let datatoret;
    let id;
    //     Fun.findOne({ name: req.params.name })
    //       .then((ret) => {
    //         let argsNames = [];
    //         id = ret._id;
    //         let path = `${__dirname}/../tmpfolder/${ret._id}.js`;
    //         // let path = `/var/lib/docker/volumes/volTestNode/${ret._id}.js`;
    //         let args = ret.args.map((el) => {
    //           argsNames.push(el);
    //           if (el.match(/^str/)) return String(`${el} = "${req.body[el]}"`);
    //           return `${el} = ${req.body[el]}`;
    //           // return req.body[el];
    //         });
    //         // console.log(args, __dirname);
    //         let fileText = `
    // function ${ret.name}(${args}) {
    // ${ret.body}
    // }
    // module.exports = ${ret.name};`;

    //         fs.appendFileSync(path, fileText, function (err) {
    //           if (err) throw err;
    //           console.log("Saved!");
    //         });
    // const fun = require(`../tmpfolder/${ret.name}.js`);
    // let datatoret = fun(req.body.nb, req.body.str);
    // res.json({ data: datatoret });
    // res.send("test")
    // .catch((err) => console.log("in ctch==============", err));
    //   datatoret = fetch("http://localhost:2323/indb/launch/" + id, {
    //     headers: { "Content-type": "application/json" },
    //   })
    //     .then((ret) => ret.json())
    //     .then((json) => {
    //       console.log("in fetch================", json);
    //       res.json(json);
    //     });
    // })
    // .catch((err) => next(err));
    try {
      console.log("hey you are here");
      datatoret = await fetch("http://localhost:2323/indb/launch/" + req.params.name, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(req.body),
      }).then((ret) => {
        console.log(ret);
        return ret.json();
      });
      // .then((json) => {
      //   console.log("in fetch================", json);
      //   // res.json(json);
      //   return json;
      //   // console.log(datatoret);
      //   // res.json(datatoret);
      // });
      console.log(datatoret);
      res.json(datatoret);
    } catch (error) {
      console.log(err);
    }
    // res.redirect(307, "http://localhost:2323/indb/launch/" + req.params.name);
  });

module.exports = router;
