const http = require("http");

http.createServer((req, res) => {
  res.end("Server is working!");
}).listen(5050, '127.0.0.1', () => {
  console.log("Listening on http://127.0.0.1:5050");
});
