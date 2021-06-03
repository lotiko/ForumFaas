const express = require("express");
const app = express();
const path = require("path");
const Fun = require("./models/funModel");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/forumfaas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
// const Fun = require("./models/funModel.js");

// this will accept all the calls to root URL http://localhost:8080/
// It will render the index.html available in the Project root directory as a Response
app.get("/exec/:id", (req, res) => {
  // const toexec = require(`./tmpfolder/${req.params.id}.js`);
  // let dataToret = toexec();
  // console.log(dataToret, req.body);
  // res.json({ data: dataToret });
  console.log(req.body);
  res.json(req.body);
});
app.post("/exec/:name", (req, res, next) => {
  Fun.find({ name: req.params.name })
    .then((ret) => {
      console.log(ret);
      let data = ret[0];
      let dataArgs = false;
      if (data.args.length !== 0) {
        dataArgs = [];
        data.args.forEach((nameArgs) => {
          dataArgs.push(req.body[nameArgs]);
        });
      }
      let path = `${__dirname}/tmpfolder/${data.name}.js`;
      let args = data.args.reduce((acc, val) => {
        return acc + "," + val;
      });
      console.log(args, __dirname);
      let fileText = `
function ${data.name}(${args}) {
${data.body}
}
module.exports = ${data.name};`;

      fs.writeFileSync(path, fileText, { flag: "w+" }, function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
      const fun = require(`./tmpfolder/${data.name}.js`);
      let datatoret;
      if (dataArgs) {
        datatoret = fun(...dataArgs);
      } else {
        datatoret = fun();
      }
      res.json({ data: datatoret });
    })
    .catch((err) => next(err));
});

// app.get("/nodb/launch/:id", (req, res) => {
//   res.sendFile(path.join(__dirname + "/about.html"));
//   //__dirname : It will resolve to your project folder.
// });

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
