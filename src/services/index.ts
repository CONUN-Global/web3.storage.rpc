import grpc from "@grpc/grpc-js";
import path from "path";

import protoLoader from "@grpc/proto-loader";

import { initiateWeb3Storage } from "../web3/index.js";
import { Web3StorageServices } from "./web3s.js";

const server = new grpc.Server();

interface Web3StorageProto {
  Web3StorageService: {
    service: grpc.ServiceDefinition<any>;
  };
}

const PROTO_PATH = "src/protos/";

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

const web3StorageProto = grpc.loadPackageDefinition(
  packageDefinitionW3S
) as unknown as Web3StorageProto;

const web3StorageService = web3StorageProto.Web3StorageService.service;

server.addService(web3StorageService, { ...Web3StorageServices });

export function startGRPCServer() {
  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    async () => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
      await initiateWeb3Storage();
    }
  );
}
