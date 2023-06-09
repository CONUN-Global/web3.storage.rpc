import {
  downloadFile,
  executeWeb3Storage,
  getContent,
  getFilePreview,
  getPeerID,
  getStorage,
  lsDir,
  publishFile,
  uploadFileNode
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

async function getContentRPC(_options: any, callback: any) {
  try {
    const content = await getContent(_options);
    console.log(content);
    callback(null, content);
  } catch (err) {
    callback(null, { content: null });
  }
}

async function getLinkedDagRPC(_: any, callback: any) {
  try {
    const linkedDag = null;

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
    callback(err, { storage: null });
  }
}

async function uploadFile(req: any, callback: any) {
  const data = req.request;
  try {
    const res = await uploadFileNode(data.path, data.options);

    const stringified = JSON.stringify(res);

    callback(null, { data: stringified });
  } catch (err) {
    callback(err, null);
  }
}

async function uploadThumbnail(req: any, callback: any) {
  const data = req.request;
  try {
    const res = await uploadFileNode(data.path, data.options);

    const stringified = JSON.stringify(res);

    callback(null, { data: stringified });
  } catch (err) {
    callback(err, null);
  }
}

async function lsDirRPC(req: any, callback: any) {
  const data = req.request;
  try {
    const res = await lsDir(data.cid, data.options);

    const stringified = JSON.stringify(res);

    callback(null, { data: stringified });
  } catch (err) {
    callback(err, null);
  }
}

async function publishFileRPC(req: any, callback: any) {
  const data = req.request;

  try {
    const res = await publishFile(JSON.parse(data.obj), data.options);

    callback(null, { data: res });
  } catch (err) {
    callback(err, null);
  }
}

async function getFilePreviewRPC(req: any, callback: any) {
  const data = req.request;

  try {
    const res = await getFilePreview(data.cid, data.options);

    callback(null, { data: res });
  } catch (err) {
    callback(err, null);
  }
}

async function downloadFileRPC(req: any, callback: any) {
  try {
    await downloadFile(req, callback);
  } catch (err) {}
}

export const Web3StorageServices: grpc.UntypedServiceImplementation = {
  executeWeb3Storage: execWeb3Storage,
  getStorage: getStorageRPC,
  getContent: getContentRPC,
  getLinkedDag: getLinkedDagRPC,
  publishFile: publishFileRPC,
  lsDir: lsDirRPC,
  uploadFile,
  getPeerId,
  uploadThumbnail,
  getFilePreview: getFilePreviewRPC,
  downloadFile: downloadFileRPC
};
