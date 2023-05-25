const grpc = require("@grpc/grpc-js");
const path = require("path");
const Web3StorageServices = require("./web3s");
const protoLoader = require("@grpc/proto-loader");

const { initiateWeb3Storage } = require("../web3");

const server = new grpc.Server();

const PROTO_PATH = "./src/protos/";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

let packageDefinitionW3S = protoLoader.loadSync(
  path.join(PROTO_PATH, "web3storage.proto"),
  options
);

const web3StorageProto = grpc.loadPackageDefinition(packageDefinitionW3S);

server.addService(
  web3StorageProto.Web3StorageService.service,
  Web3StorageServices
);

function startGRPCServer() {
  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    async (error, port) => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
      await initiateWeb3Storage();
    }
  );
}

module.exports = {
  startGRPCServer
};
