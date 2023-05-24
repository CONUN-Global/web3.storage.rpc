// Server (Node.js)
const http = require("http");
const messages = require("./gen/messages.js"); // Path to the generated messages.js file
const port = 1299;

function handleRequest(request, response) {
  // Parse incoming message
  const requestData = messages.Person.decode(request.body);
  const personName = requestData.name;
  const personAge = requestData.age;

  // Handle the request and prepare a response
  const responseData = new messages.Person();
  responseData.name = "John Doe";
  responseData.age = 30;

  // Send the response
  response.setHeader("Content-Type", "application/octet-stream");
  response.end(messages.Person.encode(responseData).finish());
}

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log("Server listening on port 1299");
});

// // Client (Electron.js)
// const messages = require("./messages.js"); // Path to the generated messages.js file
// const http = require("http");

// // Create a request
// const requestData = new messages.Person();
// requestData.name = "Alice";
// requestData.age = 25;

// const options = {
//   hostname: "localhost",
//   port: port,
//   path: "/",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/octet-stream"
//   }
// };

// const req = http.request(options, (res) => {
//   res.on("data", (data) => {
//     // Parse the response
//     const responseData = messages.Person.decode(data);
//     console.log("Response:", responseData);
//   });
// });

// // Send the request
// req.write(messages.Person.encode(requestData).finish());
// req.end();
