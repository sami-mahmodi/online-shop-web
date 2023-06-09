function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.save(action);
}

module.exports = {
  createUserSession: createUserSession,
};
