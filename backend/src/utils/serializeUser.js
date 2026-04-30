function serializeUser(user, token) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    token,
  };
}

module.exports = serializeUser;
