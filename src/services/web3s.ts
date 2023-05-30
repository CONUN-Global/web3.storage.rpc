import { executeWeb3Storage, getPeerID } from "../web3/index.js";
import grpc from "@grpc/grpc-js";

async function execWeb3Storage(_options: any, callback: any) {
  try {
    await executeWeb3Storage(_options);
    callback(null, { payload: { success: true, msg: null } });
  } catch (err) {
    callback(null, { payload: { success: false, msg: err } });
  }
}

async function getPeerId(_: any, callback: any) {
  try {
    const peerID = await getPeerID();

    callback(null, peerID);
  } catch (err) {
    callback(null, { peerID: null });
  }
}

export const Web3StorageServices: grpc.UntypedServiceImplementation = {
  execWeb3Storage,
  getPeerId
};
