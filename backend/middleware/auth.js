// middleware/auth.js
module.exports = function (req, res, next) {
  const user = req.headers['x-user'];

  if (!user) return res.status(403).json({ error: "Not authorized" });

  const parsed = JSON.parse(user);
  req.user = parsed;

  next();
};
