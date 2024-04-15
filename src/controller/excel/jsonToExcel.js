const XLSX = require("xlsx");
const path = require("path");

const exportUsersToExcel = (
  UserList,
  workSheetColumnName,
  workSheetName,
  filepath
) => {
  // convert json to Array of Arrays (Data Arrays)

  const usersListData = UserList.map((user) => {
    return [user.firstname, user.lastname, user.email];
  });
  // Convert JSON data to worksheet
  const XLSXDataArray = [workSheetColumnName, ...usersListData];
  const workSheet = XLSX.utils.aoa_to_sheet(XLSXDataArray);

  // Create workbook and add worksheet

  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);

  // Write workbook to file

  XLSX.writeFile(workBook, filepath, {
    bookType: "xlsx",
    type: "buffer",
  });

  return true;
};

module.exports = { exportUsersToExcel };
