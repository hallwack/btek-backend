const check = (req, res, next) => {
  if (req.body.username) {
    return next();
  } else {
    return res.status(400).json({
      success: false,
      message: "Create User unsuccessfully",
    });
  }
};
