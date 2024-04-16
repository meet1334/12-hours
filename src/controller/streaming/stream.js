const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
// const fb =  require('')

// path.join(__dirname, "../../../test.txt"),
// "utf-8"

const streamFile = (req, res) => {
  //   fs.readFile(path.join(__dirname, "../../../test.txt"), (error, data) => {
  //     res.send(data);
  //   });

  // FILE READING =============================================

  //   const stream = fs.createReadStream(
  //     path.join(__dirname, "../../../test.txt"),
  //     "utf-8"
  //   );
  //   stream.on("data", (chunk) => res.write(chunk));
  //   stream.on("end", () => res.end());

  //  STREAM READ ---->ZIPPER ----> FS WRITE STREAM

  const readStream = fs.createReadStream(
    path.join(__dirname, "../../../test.txt"),
    "utf-8"
  );
  const gzipStream = zlib.createGzip();
  const writeStream = fs.createWriteStream(`./sample_${new Date()}.zip`);
  readStream.pipe(gzipStream).pipe(writeStream);
};

module.exports = { streamFile };
