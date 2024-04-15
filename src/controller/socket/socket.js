const path = require("path");

const socketIo = (req, res) => {
  console.log("socket 123");
  try {
    res.sendFile(path.resolve(__dirname, "../../../public/index.html"));
  } catch (error) {
    res.status(404).send({ message: error });
    console.log(error);
  }
};

module.exports = { socketIo };
