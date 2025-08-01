module.exports = (req, res, next) => {
  res.success = (data, message = 'OK') => {
    res.json({ success: true, data, message });
  };
  res.error = (error, code = 400) => {
    res.status(code).json({ success: false, error, code });
  };
  next();
};
