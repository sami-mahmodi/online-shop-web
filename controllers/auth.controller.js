const { redirect } = require("express/lib/response");
const User = require("../models/user.model");
const authUtil = require("../util/authentication");
function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  await user.signUp();
  res.redirect("/login");
}
function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);

  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    redirect("/login");

    return;
  }

  const passwordIsCorrect = user.hasMatchingPassword(existingUser.password);

  if (!passwordIsCorrect) {
    redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  logout: logout,
};
