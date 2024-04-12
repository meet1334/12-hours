const path = require("path");
const model = require("../../model/user");
const User = model.User;
const CsvParser = require("json2csv").Parser;

const jsonToCsv = async (req, res) => {
  try {
    let users = [];
    const userData = await User.find();

    userData.forEach((user) => {
      const { firstname, lastname, email } = user;
      users.push({
        firstname,
        lastname,
        email,
      });
    });

    const csvFields = ["First name", "Last name", "Email"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);

    res.setHeader("content-type", "text/csv");
    res.setHeader("Content-Disposition", "attachment:filename = userData.csv");
    res.status(200).end(csvData);

    console.log("message");
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

module.exports = { jsonToCsv };
