module.exports = (req, res, next) => {
  console.log("Inmiddelware isLogMid check if user is login");
  if (!!req.user) next();
  else res.redirect("/");
};
