import * as Web3Storage from "@conun-global/web3.storage";
import { concat } from "uint8arrays";
import all from "it-all";
import fs from "fs";

let storage: any, peerID: any;

export async function initiateWeb3Storage() {
  try {
    peerID = await (await Web3Storage.getPeerId()).toString();
  } catch (err) {
    console.log("Storage initiate error " + err, "error");
  }
}

export async function executeWeb3Storage(options: any) {
  try {
    if (storage) return;

    const _options = {
      parentNode: options.parent_node,
      listen: options.listen,
      swarmKey: Buffer.from(options.swarm_key, "base64"),
      API: options.api,
      Gateway: options.gateway,
      RPC: options.rpc,
      storageDir: options.storage_dir
    };

    storage = new Web3Storage.InitStorage(_options);

    await storage?.start();
  } catch (err) {
    console.log("Storage execute error " + err, "error");
  }
}

export async function stopWeb3Storage() {
  try {
    const storageCopy = getStorage().storage;

    if (!storageCopy) return;

    await storageCopy?.stop();
  } catch (err) {
    console.log("Storage stop error " + err, "error");
  }
}

export function getPeerID() {
  return { peerID };
}

export function getStorage() {
  return { storage };
}

export async function getNode(_options: any) {
  const storage = new Web3Storage.InitStorage(_options);

  const node = await storage.getResolveStorage();

  return node;
}

export async function getContent(_options: any) {
  const node = await getNode(_options);
  const content = new Web3Storage.Content(node);

  return { content };
}

export async function getLinkedDag(_options: any) {
  const node = await getNode(_options);
  const linkedDag = new Web3Storage.LinkedDag(node);

  return linkedDag;
}

export async function uploadFileNode(path: string, options: any) {
  const _content = await getContent(options);
  const content = _content.content;

  const data = await content?.addFile(path);

  return data;
}

export async function lsDir(cid: any, options: any) {
  const _content = await getContent(options);
  const content = _content.content;

  const res = await content.lsDir(cid);

  const mutatedRes = res.map((file) => ({
    ...file,
    cid: file.cid?.toString()
  }));

  return mutatedRes;
}

export async function publishFile(obj: any, options: any) {
  const linkedDag = await getLinkedDag(options);

  const res = await linkedDag.add(obj);

  return res?.toString();
}

export async function getFilePreview(cid: any, options: any) {
  const node = await getNode(options);

  // @ts-ignore
  const preview = concat(await all(node?.cat(cid)));

  return preview;
}

export async function downloadFile(call: any, callback: any) {
  const { downloadDir, cid, name, size, options } = call.request;

  const node = await getNode(options);

  // @ts-ignore
  const chunks = await node.cat(cid);

  let totalBytes = 0;

  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }
  try {
    for await (const chunk of chunks) {
      totalBytes += chunk?.length;

      const currentPercentage = ((totalBytes * 100) / size).toFixed(2);

      fs.appendFileSync(downloadDir, Buffer.from(chunk));

      callback(null, { cid, name, currentPercentage });
    }
  } catch (err) {
    console.log(err);
  }
}
