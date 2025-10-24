const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.warn("File not found, skipping delete:", fullPath);
      return;
    }
    fs.unlink(fullPath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting file:", unlinkErr);
      } else {
        console.log("File deleted successfully:", fullPath);
      }
    });
  });
};

exports.deleteFile = deleteFile;
