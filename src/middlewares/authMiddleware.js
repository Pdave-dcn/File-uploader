export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.session) {
    req.session.touch();
    return next();
  }

  res.redirect("/login");
};
