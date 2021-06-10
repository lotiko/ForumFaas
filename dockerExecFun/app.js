const express = require("express");
const app = express();
const path = require("path");
const Fun = require("./models/funModel");
const fs = require("fs");
const cors = require("cors");
console.log(cors);

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

app.options("/exec/:name", cors());
app.post("/exec/:name",cors(), async (req, res, next) => {
  try {
    // console.log(req);
    Fun.find({ name: req.params.name })
      .then((ret) => {
        console.log("body", req.body);
        console.log("ret[0]", ret[0]);
        let data = ret[0];
        const valuesArgs = [];
        if (data.args.length !== 0) {
          data.args.forEach((nameArgs) => {
            valuesArgs.push(req.body[nameArgs]);
          });
        }
        console.log("valueArgs=>", valuesArgs);
        let path = `${__dirname}/tmpfolder/${data.name}.js`;
        let args = data.args.reduce((acc, val) => {
          return acc + "," + val;
        });

        const fileText = `
function ${data.name}(${args}) {
${data.body}
}
module.exports = ${data.name};`;
        // console.log(fileText, "TEWWWWWWWWWWWWWT");

        fs.writeFileSync(path, fileText, { flag: "w+" });
        const fun = require(`./tmpfolder/${data.name}.js`);
        let datatoret = fun.apply(null, valuesArgs);
        console.log(datatoret);
        fs.unlinkSync(path, (err) => {
          if (err) console.log(err);
          else console.log("GOOOOOD");
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.json({ data: datatoret });
      })
      .catch((err) => next(err));
  } catch (error) {
    next(err);
  }
});

app.listen(2323, () => {
  console.log("Listening on port 2323");
});
