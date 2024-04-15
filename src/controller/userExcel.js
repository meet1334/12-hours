const model = require("../model/user");
const { exportUsersToExcel } = require("./excel/jsonToExcel");
const User = model.User;

const getAllUsersToExcel = async (req, res) => {
  try {
    const users = await User.find();

    const workSheetColumnName = ["First Name", "Last Name", "Email"];

    const workSheetName = "Users";

    const filepath = "data.xlsx";
    const resExcelExport = await exportUsersToExcel(
      users,
      workSheetColumnName,
      workSheetName,
      filepath
    );

    if (resExcelExport)
      res.status(200).send({ message: "Excel export successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { getAllUsersToExcel };
