import { Web3Storage } from "@conun-global/web3.storage";

let storage, node, pNode, content, linkedDag, swarm, peerID;

export async function initiateWeb3Storage() {
  try {
    // const Web3Storage = await import("@conun-global/web3.storage");

    peerID = await (await Web3Storage.getPeerId()).toString();

    console.log(peerID);
  } catch (err) {
    console.log("Storage initiate error " + err, "error");
  }
}

export async function executeWeb3Storage(options) {
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

    // const Web3Storage = await import("@conun-global/web3.storage");

    storage = new Web3Storage.InitStorage(_options);

    await storage?.start();

    peerID = await (await Web3Storage.getPeerId()).toString();
    node = await storage.getResolveStorage();
    pNode = await storage.getResolveP2P();
    content = new Web3Storage.Content(node);
    linkedDag = new Web3Storage.LinkedDag(node);
    // swarm = await node.swarm.connect(swarmNode);
  } catch (err) {
    console.log("Storage execute error " + err, "error");
  }
}

export async function stopWeb3Storage() {
  try {
    const storageCopy = getStorage();

    if (!storageCopy) return;

    await storageCopy?.stop();

    node = null;
    pNode = null;
    content = null;
    linkedDag = null;
    swarm = null;
    peerID = null;
    storage = null;
  } catch (err) {
    console.log("Storage stop error " + err, "error");
  }
}

export function getPeerID() {
  return peerID;
}

export function getStorage() {
  return storage;
}

export function getNode() {
  return node;
}

export function getContent() {
  return content;
}

export function getPNode() {
  return pNode;
}

export function getLinkedDag() {
  return linkedDag;
}

module.exports = {
  initiateWeb3Storage,
  executeWeb3Storage,
  stopWeb3Storage,
  getNode,
  getStorage,
  getContent,
  getPNode,
  getLinkedDag,
  getPeerID
};
