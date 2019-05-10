// content of index.js
const http = require("http");
const port = process.env.PORT || 3000;

const requestHandler = (request, response) => {
  response.end("sopa du macaco uma delicia");
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened on http server", err);
  }

  console.log(`http server is listening on ${port}`);
});
