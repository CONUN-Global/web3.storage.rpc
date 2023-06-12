var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import grpc from "@grpc/grpc-js";
import path from "path";
import protoLoader from "@grpc/proto-loader";
import { initiateWeb3Storage } from "../web3/index.js";
import { Web3StorageServices } from "./web3s.js";
const server = new grpc.Server();
const PROTO_PATH = "src/protos/";
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};
let packageDefinitionW3S = protoLoader.loadSync(path.join(PROTO_PATH, "web3storage.proto"), options);
const web3StorageProto = grpc.loadPackageDefinition(packageDefinitionW3S);
const web3StorageService = web3StorageProto.Web3StorageService.service;
server.addService(web3StorageService, Object.assign({}, Web3StorageServices));
export function startGRPCServer() {
    server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => __awaiter(this, void 0, void 0, function* () {
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
        yield initiateWeb3Storage();
    }));
}
