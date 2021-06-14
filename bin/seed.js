require("dotenv").config();
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

const fonctionsjson=require("../json/datafonctions.json");
const fonctions=JSON.parse(fonctionsjson)

/*let fonctions = [
  {
    args: ["numbers1"],
    name: "createPhoneNumber1",
    body: " numbers = numbers1.join('');\r\n  return '(' + numbers.substring(0, 3) + ') ' \r\n  + numbers.substring(3, 6) \r\n   + '-' \r\n    + numbers.substring(6)",
    userId: "",
  },
];*/

const answerjson = require("../json/dataanswer.json");
const answers = answerjson;

/*let answers = [
  [
    {
      title: "answer",
      body: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
  ],
  [
    {
      title: "answer",
      body: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "In congue. Etiam justo. Etiam pretium iaculis justo.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
    {
      title: "answer",
      body: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
      categorie: "answer",
      userId: "",
      fromQuestion: "",
    },
  ],
];*/

const postsjson = require("../json/dataposts.json");
const posts = postsjson;
/*let posts = [
  {
    title: "Director of Sales",
    body: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Recruiter",
    body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "GIS Technical Architect",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Pharmacist",
    body: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Health Coach I",
    body: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Structural Engineer",
    body: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Physical Therapy Assistant",
    body: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Project Manager",
    body: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Assistant Professor",
    body: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Geologist I",
    body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Food Chemist",
    body: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Research Assistant II",
    body: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Accounting Assistant I",
    body: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Assistant Manager",
    body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Engineer III",
    body: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Safety Technician II",
    body: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Software Test Engineer II",
    body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Business Systems Development Analyst",
    body: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Senior Quality Engineer",
    body: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Occupational Therapist",
    body: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Software Engineer III",
    body: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Community Outreach Specialist",
    body: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Dental Hygienist",
    body: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Clinical Specialist",
    body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Budget/Accounting Analyst II",
    body: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Senior Quality Engineer",
    body: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Speech Pathologist",
    body: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Teacher",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Web Designer III",
    body: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Quality Control Specialist",
    body: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Staff Accountant II",
    body: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Electrical Engineer",
    body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Paralegal",
    body: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Assistant Media Planner",
    body: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Legal Assistant",
    body: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Accounting Assistant IV",
    body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Financial Analyst",
    body: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Administrative Assistant III",
    body: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Research Assistant IV",
    body: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Electrical Engineer",
    body: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Account Coordinator",
    body: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Senior Sales Associate",
    body: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Programmer Analyst IV",
    body: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Chief Design Engineer",
    body: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Research Nurse",
    body: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Analyst Programmer",
    body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Desktop Support Technician",
    body: "Fusce consequat. Nulla nisl. Nunc nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Sales Associate",
    body: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Associate Professor",
    body: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Geological Engineer",
    body: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Biostatistician II",
    body: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Safety Technician I",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Chemical Engineer",
    body: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Associate Professor",
    body: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Analyst Programmer",
    body: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    categorie: "question",
    userId: "",
  },
  {
    title: "VP Sales",
    body: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Software Test Engineer I",
    body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    categorie: "question",
    userId: "",
  },
  {
    title: "VP Marketing",
    body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Accountant II",
    body: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Administrative Assistant IV",
    body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    categorie: "question",
    userId: "",
  },
  {
    title: "GIS Technical Architect",
    body: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Automation Specialist I",
    body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Compensation Analyst",
    body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Marketing Assistant",
    body: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Staff Accountant II",
    body: "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Marketing Manager",
    body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Programmer Analyst II",
    body: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Structural Engineer",
    body: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Recruiter",
    body: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Geologist III",
    body: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Technical Writer",
    body: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Sales Representative",
    body: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Chemical Engineer",
    body: "Fusce consequat. Nulla nisl. Nunc nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Marketing Manager",
    body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Environmental Specialist",
    body: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Environmental Tech",
    body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Safety Technician IV",
    body: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Human Resources Assistant IV",
    body: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Legal Assistant",
    body: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Speech Pathologist",
    body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Sales Representative",
    body: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Geologist II",
    body: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Research Nurse",
    body: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Programmer II",
    body: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Product Engineer",
    body: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Associate Professor",
    body: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Senior Editor",
    body: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Recruiter",
    body: "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Cost Accountant",
    body: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Research Assistant II",
    body: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Senior Quality Engineer",
    body: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "GIS Technical Architect",
    body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Associate Professor",
    body: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Account Representative I",
    body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Associate Professor",
    body: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Quality Control Specialist",
    body: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Health Coach III",
    body: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Recruiting Manager",
    body: "Fusce consequat. Nulla nisl. Nunc nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Librarian",
    body: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Financial Analyst",
    body: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Design Engineer",
    body: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Pharmacist",
    body: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Media Manager IV",
    body: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Operator",
    body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Internal Auditor",
    body: "Fusce consequat. Nulla nisl. Nunc nisl.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Staff Accountant I",
    body: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Research Assistant II",
    body: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    categorie: "question",
    userId: "",
  },
  {
    title: "VP Sales",
    body: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Developer IV",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Assistant Professor",
    body: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Help Desk Technician",
    body: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Marketing Manager",
    body: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Community Outreach Specialist",
    body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Tax Accountant",
    body: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Senior Editor",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Automation Specialist I",
    body: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Assistant Professor",
    body: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    categorie: "question",
    userId: "",
  },
  {
    title: "Internal Auditor",
    body: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    categorie: "question",
    userId: "",
  },
];*/

const modojson = require("../json/datauser.json");
const modo = modojson;

/*const modo = [
  {
    name: "Florella Kamena",
    email: "fkamena0@de.vu",
    password: "OqczLsn",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/harumrepellendusin.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
  },
  {
    name: "Selestina Jillis",
    email: "sjillis1@histats.com",
    password: "torLgqn",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/suntrerummollitia.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
  },
  {
    name: "Nissie Clery",
    email: "nclery2@dmoz.org",
    password: "9iSLKQ2El8Fx",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/rerumautemiure.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  },
  {
    name: "Pauline Ramble",
    email: "pramble3@smugmug.com",
    password: "xQKcehuh4A",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/liberoquiaquidem.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    name: "Si Bault",
    email: "sbault4@blog.com",
    password: "GtKaU6pW0S",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/etexercitationemfacilis.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
  },
  {
    name: "Janie Lively",
    email: "jlively5@addtoany.com",
    password: "4VSMJ7yf1WeM",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/remdoloremquedolorum.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  },
  {
    name: "Valentino Nazair",
    email: "vnazair6@tinyurl.com",
    password: "eyFSo8Htc",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/rationeperferendiset.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
  {
    name: "Blinny McArthur",
    email: "bmcarthur7@desdev.cn",
    password: "pPOl35eaMK",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/consequaturofficiisnisi.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  },
  {
    name: "Gaspar Aleksahkin",
    email: "galeksahkin8@illinois.edu",
    password: "HC64mlJCAt",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/laborevelipsum.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  },
  {
    name: "Sawyere Bockmann",
    email: "sbockmann9@gov.uk",
    password: "a6Xm6A8d",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/corporisaperiamsimilique.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  },
  {
    name: "Lorrin Kocher",
    email: "lkochera@upenn.edu",
    password: "1qdOdIdUedJG",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/repellatutnihil.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
  },
  {
    name: "Kanya Vesco",
    email: "kvescob@marriott.com",
    password: "nBj6FeQiw",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/doloribusdolorumsunt.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  },
  {
    name: "Viva Noah",
    email: "vnoahc@omniture.com",
    password: "gLN0LJDJ4G",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/quiaeligendiad.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  },
  {
    name: "Bryant Ledekker",
    email: "bledekkerd@about.com",
    password: "inNiVIX",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/nihilautat.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
  },
  {
    name: "Kennith Menco",
    email: "kmencoe@wsj.com",
    password: "Cj3vO9C",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/sedasperioresnostrum.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  },
  {
    name: "Olivie Mercer",
    email: "omercerf@who.int",
    password: "QNVxiVb1z8",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/reiciendisvelitmagnam.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  },
  {
    name: "Ally Dimnage",
    email: "adimnageg@cnbc.com",
    password: "Q2CbqQSJ5",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/cupiditatequiaoptio.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    name: "Paulie Labdon",
    email: "plabdonh@jiathis.com",
    password: "JbV45NtEy7A",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/temporaeosaliquam.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  },
  {
    name: "Leandra Goodswen",
    email: "lgoodsweni@parallels.com",
    password: "Gp76cvBI",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/sedprovidentamet.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
  },
  {
    name: "Jocelyn Cremen",
    email: "jcremenj@furl.net",
    password: "ikMcSqy",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/autatquevoluptatem.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  },
  {
    name: "Jeramie Colebrook",
    email: "jcolebrookk@ft.com",
    password: "jd4JZW6HSx",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/officiaquiaeveniet.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  },
  {
    name: "Richard Dougary",
    email: "rdougaryl@i2i.jp",
    password: "CI8k5zLkay",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/natusestin.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  },
  {
    name: "Lucio Leicester",
    email: "lleicesterm@omniture.com",
    password: "ydVE9zeO1V",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/laboriosametesse.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  },
  {
    name: "Estrellita Charpin",
    email: "echarpinn@who.int",
    password: "h7nP4mk",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/velsolutaarchitecto.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
  },
  {
    name: "Felicity Chark",
    email: "fcharko@addtoany.com",
    password: "Kv78Vxyf6e",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/etdoloresest.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
  {
    name: "Bari Marham",
    email: "bmarhamp@icio.us",
    password: "vBD7ED4c5wM",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/voluptatesexercitationemillo.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  },
  {
    name: "Vale Follis",
    email: "vfollisq@rediff.com",
    password: "8VDcNTwSV",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/autetpossimus.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  },
  {
    name: "Suzann Mattia",
    email: "smattiar@g.co",
    password: "je6xZI",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/iddictaunde.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
  },
  {
    name: "Scarlett Wincott",
    email: "swincotts@ft.com",
    password: "GlSagFZW80",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/abcorporisquisquam.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    name: "Ewen Humblestone",
    email: "ehumblestonet@discuz.net",
    password: "GRL6c1",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/nequequiullam.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
  },
  {
    name: "Nicolina Stening",
    email: "nsteningu@squidoo.com",
    password: "6kAPHN7Z",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/dignissimosquiamaxime.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  },
  {
    name: "Brit Frango",
    email: "bfrangov@usda.gov",
    password: "bUBNOMezGX",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/quiaomnissuscipit.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  },
  {
    name: "Jaymie Matlock",
    email: "jmatlockw@nifty.com",
    password: "cSg963Svmre",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/occaecatinonet.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  },
  {
    name: "Melitta Vankin",
    email: "mvankinx@spiegel.de",
    password: "BjetbXZo8uNp",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/utnemovoluptates.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  },
  {
    name: "Clayton Pont",
    email: "cponty@blogs.com",
    password: "s8MWrP",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/beataedelectuslabore.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
  },
  {
    name: "Dacy Umney",
    email: "dumneyz@de.vu",
    password: "B07Pnz7",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/voluptasarchitectoexercitationem.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
  },
  {
    name: "Arnuad Rackam",
    email: "arackam10@time.com",
    password: "kBEIXloVUc8",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/laudantiumetaccusantium.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  },
  {
    name: "Michell Yuille",
    email: "myuille11@amazon.com",
    password: "9FR8mgVCkl",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/reiciendisautemdolore.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
  },
  {
    name: "Illa Divell",
    email: "idivell12@guardian.co.uk",
    password: "B75SOfIU5V9s",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/iurenesciuntnon.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
  },
  {
    name: "Kristopher Cheng",
    email: "kcheng13@webs.com",
    password: "t6C5a1h1",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/facerenisiest.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  },
  {
    name: "Rorie Clamp",
    email: "rclamp14@4shared.com",
    password: "0zXwCjPkWo0W",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/autdoloremmagnam.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    name: "Leora Hungerford",
    email: "lhungerford15@house.gov",
    password: "17PwjEwQo",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/reiciendisaccusantiumaut.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
  },
  {
    name: "Hal McGlaud",
    email: "hmcglaud16@earthlink.net",
    password: "7HIBGR81mGYh",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/voluptatibusrerumdoloremque.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
  },
  {
    name: "Kliment Holywell",
    email: "kholywell17@fda.gov",
    password: "J8kqlrqKEe7c",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/veritatisautemfacere.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  },
  {
    name: "Walliw Crummy",
    email: "wcrummy18@facebook.com",
    password: "PXhZmPK2VL",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/molestiasadvelit.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  },
  {
    name: "Halsey Sandon",
    email: "hsandon19@wsj.com",
    password: "udnfI6aQ",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/doloresexpeditaet.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  },
  {
    name: "Rollin Purvess",
    email: "rpurvess1a@bloglovin.com",
    password: "X7uGwWmoNc1",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/autemfugitexercitationem.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  },
  {
    name: "Ranique Johnsey",
    email: "rjohnsey1b@quantcast.com",
    password: "8oV7r6W1",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/autliberoomnis.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
  },
  {
    name: "Bird Rowell",
    email: "browell1c@msu.edu",
    password: "Lrib8lXwuCLH",
    posts: [],
    functions: [],
    avatar: "https://robohash.org/accusamusaliquamet.png?size=50x50&set=set1",
    status: "user",
    publicContact: true,
    descriptions:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
  },
  {
    name: "Suellen Sans",
    email: "ssans1d@ox.ac.uk",
    password: "uzJkUSi",
    posts: [],
    functions: [],
    avatar:
      "https://robohash.org/cupiditatedolorequisquam.png?size=50x50&set=set1",
    status: "user",
    publicContact: false,
    descriptions:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
  },
];*/

const usersId = [];

async function initdb() {
  try {
    const users = await User.insertMany(modo).then(function (usersFromDb) {
      fonctions.map((fonction) => {
        let randomidex = Math.floor(Math.random() * usersFromDb.length);
        fonction.userId = usersFromDb[randomidex]._id;
        Function.create(fonction).then(async (fonctionFromDb) => {
          User.findById(usersFromDb[randomidex]._id).then(
            (userrandomFromDb) => {
              userrandomFromDb.functions.push(fonctionFromDb._id);
              userrandomFromDb.save();
            }
          );
        });
      });

      return usersFromDb;
    });

    let postsfromDb = [];

    function initposts() {
      posts.map((post) => {
        console.log("coucou");
        let randomindex = Math.floor(Math.random() * users.length);
        post.userId = users[randomindex]._id;

        PostModel.create(post).then((postfromDb) => {
          console.log(postfromDb);
          users[randomindex].posts.push(postfromDb._id);
          users[randomindex].save();
          return postfromDb;
        });
      });
    }

    console.log("avant la fonction", postsfromDb);

    function initanswer() {
      PostModel.find({ categorie: "question" }).then((postfromDb) => {
        for (let i = 0; i < postfromDb.length; i++) {
          const currentpost = postfromDb[i];
          console.log("current post", currentpost._id);
          for (let j = 0; j < answers[i].length; j++) {
            let randomuser = Math.floor(Math.random() * users.length);
            const answer = answers[i][j];
            answer.fromQuestion = currentpost._id;
            answer.userId = users[randomuser]._id;

            PostModel.create(answer).then((answerFromdb) => {
              // users[randomuser].posts.push(answerFromdb._id);
              // users[randomuser].save();
            });
          }
        }
      });
    }
    const promise1 = new Promise((resolve, reject) => {
      initposts();
      setTimeout(() => {
        resolve(initanswer());
      }, 3000);
    });
  } catch (error) {
    console.log(error);
  }
}
initdb();
