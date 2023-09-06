const errorHandler = (err, req, res, next) => {
  switch (err.status) {
    case 400:
      res.status(400).json({
        status: "Fail",
        message: "Bad Request",
      });
      break;
    case 401:
      res.status(401).json({
        status: "Fail",
        message: "Unauthorized",
      });
      break;
    case 403:
      res.status(403).json({
        status: "Fail",
        message: "Forbidden",
      });
      break;
    case 404:
      res.status(404).json({
        status: "Fail",
        message: "Not Found",
      });
      break;
    case 409:
      res.status(409).json({
        status: "Fail",
        message: "Conflict - User already exists",
      });
      break;
    default:
      console.error("Error occurred:", err);
      res.status(500).json({
        status: "Fail",
        message: "Internal server Error",
      });
  }
};

module.exports = errorHandler;
