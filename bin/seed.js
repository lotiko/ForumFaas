const mongoose = require("mongoose");
const User = require("../models/user");
const Function = require("../models/function");
const PostModel = require("../models/post");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let fonctions = [
  {
    args: ["numbers1"],
    name: "createPhoneNumber1",
    body: " numbers = numbers1.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  },{
    args: ["numbers2"],
    name: "createPhoneNumber2",
    body: " numbers = numbers2.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  },{
    args: ["numbers"],
    name: "createPhoneNumber3",
    body: " numbers = numbers.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  },{
    args: ["numbers1"],
    name: "createPhoneNumber4",
    body: " numbers = numbers.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  },{
    args: ["numbers"],
    name: "createPhoneNumber5",
    body: " numbers = numbers.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  },{
    args: ["numbers"],
    name: "createPhoneNumber6",
    body: " numbers = numbers.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  }
];

let answers = [
  [
    {
      title: "answer",
      body: '<p>You can use the <strong>in</strong> operator to check if a key exists in an object:</p><pre><code class="language-javascript">var x = 1;\r\nvar y = 3;\r\nvar list = {0:0, 1:0, 2:0};\r\nx in list; //true\r\ny in list; //false\r\n1 in list; //true\r\ny in {3:0, 4:0, 5:0}; //true\r\n</code></pre><p>If you find the object literals too ugly you can combine it with the parameterless function tip:</p><pre><code class="language-javascript">function list()\r\n { var x = {};\r\n   for(var i=0; i &lt; arguments.length; ++i) x[arguments[i]] = 0;\r\n   return x\r\n }\r\n\r\n 5 in list(1,2,3,4,5) //true\r\n</code></pre>',
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: '<p>You can use the <strong>in</strong> operator to check if a key exists in an object:</p><pre><code class="language-javascript">var x = 1;\r\nvar y = 3;\r\nvar list = {0:0, 1:0, 2:0};\r\nx in list; //true\r\ny in list; //false\r\n1 in list; //true\r\ny in {3:0, 4:0, 5:0}; //true\r\n</code></pre><p>If you find the object literals too ugly you can combine it with the parameterless function tip:</p><pre><code class="language-javascript">function list()\r\n { var x = {};\r\n   for(var i=0; i &lt; arguments.length; ++i) x[arguments[i]] = 0;\r\n   return x\r\n }\r\n\r\n 5 in list(1,2,3,4,5) //true\r\n</code></pre>',
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: '<p>You can use the <strong>in</strong> operator to check if a key exists in an object:</p><pre><code class="language-javascript">var x = 1;\r\nvar y = 3;\r\nvar list = {0:0, 1:0, 2:0};\r\nx in list; //true\r\ny in list; //false\r\n1 in list; //true\r\ny in {3:0, 4:0, 5:0}; //true\r\n</code></pre><p>If you find the object literals too ugly you can combine it with the parameterless function tip:</p><pre><code class="language-javascript">function list()\r\n { var x = {};\r\n   for(var i=0; i &lt; arguments.length; ++i) x[arguments[i]] = 0;\r\n   return x\r\n }\r\n\r\n 5 in list(1,2,3,4,5) //true\r\n</code></pre>',
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
  ],
  [
    {
      title: "answer",
      body: '<p>You can use the <strong>in</strong> operator to check if a key exists in an object:</p><pre><code class="language-javascript">var x = 1;\r\nvar y = 3;\r\nvar list = {0:0, 1:0, 2:0};\r\nx in list; //true\r\ny in list; //false\r\n1 in list; //true\r\ny in {3:0, 4:0, 5:0}; //true\r\n</code></pre><p>If you find the object literals too ugly you can combine it with the parameterless function tip:</p><pre><code class="language-javascript">function list()\r\n { var x = {};\r\n   for(var i=0; i &lt; arguments.length; ++i) x[arguments[i]] = 0;\r\n   return x\r\n }\r\n\r\n 5 in list(1,2,3,4,5) //true\r\n</code></pre>',
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
  ],
  [
    {
      title: "answer",
      body: '<p>You can use the <strong>in</strong> operator to check if a key exists in an object:</p><pre><code class="language-javascript">var x = 1;\r\nvar y = 3;\r\nvar list = {0:0, 1:0, 2:0};\r\nx in list; //true\r\ny in list; //false\r\n1 in list; //true\r\ny in {3:0, 4:0, 5:0}; //true\r\n</code></pre><p>If you find the object literals too ugly you can combine it with the parameterless function tip:</p><pre><code class="language-javascript">function list()\r\n { var x = {};\r\n   for(var i=0; i &lt; arguments.length; ++i) x[arguments[i]] = 0;\r\n   return x\r\n }\r\n\r\n 5 in list(1,2,3,4,5) //true\r\n</code></pre>',
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
  ],
];

let posts = [
  {
    title: "programmer should know?",
    body: '<p><strong>What "Hidden Features" of JavaScript do you think every programmer should know?</strong></p><p>After having seen the excellent quality of the answers to the following questions I thought it was time to ask it for JavaScript.</p><ul><li><a href="https://stackoverflow.com/questions/954327/">Hidden Features of HTML</a></li><li><a href="https://stackoverflow.com/questions/628407">Hidden Features of CSS</a></li><li><a href="https://stackoverflow.com/questions/61401/">Hidden Features of PHP</a></li><li><a href="https://stackoverflow.com/questions/54929/">Hidden Features of ASP.NET</a></li><li><a href="https://stackoverflow.com/questions/9033/">Hidden Features of C#</a></li><li><a href="https://stackoverflow.com/questions/15496/">Hidden Features of Java</a></li><li><a href="https://stackoverflow.com/questions/101268/">Hidden Features of Python</a></li></ul><p>Even though JavaScript is arguably the most important Client Side language right now (just ask Google) it\'s surprising how little most web developers appreciate how powerful it really is.</p>',
    categorie: "question",
    userId: "",
  },
  {
    title: "programmer should kow?",
    body: '<p><strong>What "Hidden Features" of JavaScript do you think every programmer should know?</strong></p><p>After having seen the excellent quality of the answers to the following questions I thought it was time to ask it for JavaScript.</p><ul><li><a href="https://stackoverflow.com/questions/954327/">Hidden Features of HTML</a></li><li><a href="https://stackoverflow.com/questions/628407">Hidden Features of CSS</a></li><li><a href="https://stackoverflow.com/questions/61401/">Hidden Features of PHP</a></li><li><a href="https://stackoverflow.com/questions/54929/">Hidden Features of ASP.NET</a></li><li><a href="https://stackoverflow.com/questions/9033/">Hidden Features of C#</a></li><li><a href="https://stackoverflow.com/questions/15496/">Hidden Features of Java</a></li><li><a href="https://stackoverflow.com/questions/101268/">Hidden Features of Python</a></li></ul><p>Even though JavaScript is arguably the most important Client Side language right now (just ask Google) it\'s surprising how little most web developers appreciate how powerful it really is.</p>',
    categorie: "question",
    userId: "",
  },
  {
    title: "programmer shold kow?",
    body: '<p><strong>What "Hidden Features" of JavaScript do you think every programmer should know?</strong></p><p>After having seen the excellent quality of the answers to the following questions I thought it was time to ask it for JavaScript.</p><ul><li><a href="https://stackoverflow.com/questions/954327/">Hidden Features of HTML</a></li><li><a href="https://stackoverflow.com/questions/628407">Hidden Features of CSS</a></li><li><a href="https://stackoverflow.com/questions/61401/">Hidden Features of PHP</a></li><li><a href="https://stackoverflow.com/questions/54929/">Hidden Features of ASP.NET</a></li><li><a href="https://stackoverflow.com/questions/9033/">Hidden Features of C#</a></li><li><a href="https://stackoverflow.com/questions/15496/">Hidden Features of Java</a></li><li><a href="https://stackoverflow.com/questions/101268/">Hidden Features of Python</a></li></ul><p>Even though JavaScript is arguably the most important Client Side language right now (just ask Google) it\'s surprising how little most web developers appreciate how powerful it really is.</p>',
    categorie: "question",
    userId: "",
  },
];

const modo = [
  {
    name: "Antoine",
    email: "A.abernier@gmail.fr",
    password: bcrypt.hashSync("Abernier06", salt),
    posts: [],
    functions: [],
    descriptions: "hhhh",
    avatar: "/images/basicAvatar.png",
    status: "user",
    publicContact: true,
  },
  {
    name: "lolo",
    email: "A.lolo@gmail.fr",
    password: bcrypt.hashSync("Lolod06", salt),
    posts: [],
    functions: [],
    descriptions: "hhhhd",
    avatar: "/images/basicAvatar.png",
    status: "user",
    publicContact: true,
  },
];
const usersId = [];
let i = 0;

async function initdb() {
  try {
    await User.insertMany(modo)
      .then(function (usersFromDb) {
        console.log(usersFromDb);
        usersFromDb.map(async (el) => {
          posts[i].userId = el._id;
          let post = await PostModel.create(posts[i]).then(
            async (postfromDb) => {
              el.posts.push(postfromDb._id);
              el.save();
              return postfromDb;
            }
          );

          let ans = [];
          console.log("lengthanswer", answers[i].length);
          for (let j = 0; j < answers[i].length; j++) {
            // console.log('answwwwwwwwwwwwwwwer',answers[i]);
            const element = answers[i][j];
            element.userId =
              usersFromDb[Math.floor(Math.random() * usersFromDb.length)]._id;
            element.fromQuestion = post._id;
            ans.push(element);
          }
          await PostModel.insertMany(ans).then((answerFromDb) => {
            console.log(answerFromDb);
          });

          i++;
        });

        fonctions.map((fonction) => {
          let randomidex=Math.floor(Math.random() * usersFromDb.length)
          fonction.userId =
            usersFromDb[randomidex]._id;
          Function.create(fonction).then(async (fonctionFromDb) => {
           User.findById(usersFromDb[randomidex]._id)
            .then(userrandomFromDb=>{
              userrandomFromDb.functions.push(fonctionFromDb._id);
              userrandomFromDb.save();
            })
          });
        });
      })
      .catch((err) => console.log(err));

    console.log("pooooooooooooooost", posts);
  } catch (error) {}
}
initdb();
