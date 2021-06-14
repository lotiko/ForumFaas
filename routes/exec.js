const express = require("express");
const router = express.Router();
const Fun = require("../models/function");
const fs = require("fs");
const cors = require("cors");
const corsOptions = { origin: "*" };
/* GET home page */
router.get("/:name", (req, res, next) => {
  res.status(400);
  res.json({ error: "only post request are allowed on this route" });
});

router.post("/:name", cors(corsOptions), async (req, res, next) => {
  // on va chercher la function en db on crée un modules avec que l'on supprime aprés
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
      let path = `${__dirname}/../tmpfolder/${data.name}.js`;
      let args = data.args.reduce((acc, val) => {
        return acc + "," + val;
      });

      const fileText = `
function ${data.name}(${args}) {
    ${data.body}
}

module.exports = ${data.name};`;
      console.log(fileText);
      fs.writeFileSync(path, fileText, { flag: "w+" });
      // on doit enlever le module du cache en cas d'edit de la fonction sinon les update ne sont pas pris en compte
      delete require.cache[require.resolve(`../tmpfolder/${data.name}.js`)];
      const fun = require(`../tmpfolder/${data.name}.js`);
      let datatoret;
      // si une erreur a lieu durant l'éxécution on renvoi l'erreur.
      try {
        datatoret = fun.apply(this, [...valuesArgs, res]);
      } catch (error) {
        res.send({ status: "error", name: error.name, message: error.message });
        return;
      }
      fs.unlinkSync(path, (err) => {
        if (err) console.log(err);
      });
      console.log(datatoret);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({ status: "ok", data: datatoret });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
