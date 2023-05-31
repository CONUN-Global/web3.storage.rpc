import {
  executeWeb3Storage,
  getContent,
  getLinkedDag,
  getNode,
  getPeerID,
  getStorage
} from "../web3/index.js";
import grpc from "@grpc/grpc-js";

async function execWeb3Storage(_options: any, callback: any) {
  try {
    await executeWeb3Storage(_options.request);
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

async function getNodeRPC(_: any, callback: any) {
  try {
    const node = await getNode();

    callback(null, node);
  } catch (err) {
    callback(null, { node: null });
  }
}

async function getContentRPC(_: any, callback: any) {
  try {
    const content = await getContent();

    callback(null, content);
  } catch (err) {
    callback(null, { content: null });
  }
}

async function getLinkedDagRPC(_: any, callback: any) {
  try {
    const linkedDag = await getLinkedDag();

    callback(null, linkedDag);
  } catch (err) {
    callback(null, { linkedDag: null });
  }
}

async function getStorageRPC(_: any, callback: any) {
  try {
    const storage = await getStorage();

    callback(null, storage);
  } catch (err) {
    callback(null, { storage: null });
  }
}

export const Web3StorageServices: grpc.UntypedServiceImplementation = {
  executeWeb3Storage: execWeb3Storage,
  getPeerId,
  getNode: getNodeRPC,
  getStorage: getStorageRPC,
  getContent: getContentRPC,
  getLinkedDag: getLinkedDagRPC
};
