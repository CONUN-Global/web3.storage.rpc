import { executeWeb3Storage, getPeerID } from "../web3/index.js";

async function execWeb3Storage(_options, callback) {
  try {
    await executeWeb3Storage(_options);
    callback(null, { payload: { success: true, msg: null } });
  } catch (err) {
    callback(null, { payload: { success: false, msg: err } });
  }
}

async function getPeerId(_, callback) {
  try {
    console.log("peerID");
    const peerID = await getPeerID();
    console.log(peerID);
    callback(null, {
      payload: { success: true, msg: null, data: peerID }
    });
  } catch (err) {
    callback(null, { payload: { success: false, msg: err, data: null } });
  }
}

export const Web3StorageServices = {
  execWeb3Storage,
  getPeerId
};
