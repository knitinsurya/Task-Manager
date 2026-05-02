module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // 🔒 check if user exists (token decoded)
    if (!req.user) {
      return res.status(401).json("Unauthorized");
    }

    // 🔥 allow multiple roles (Admin, Member, etc.)
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json("Access denied");
    }

    next();
  };
};