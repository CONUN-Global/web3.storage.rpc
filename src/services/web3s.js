async function executeWeb3Storage(_options, callback) {
  try {
    await executeWeb3Storage(_options);
    callback(null, { payload: { success: true, msg: null } });
  } catch (err) {
    callback(null, { payload: { success: false, msg: err } });
  }
}

async function getPeerID(_, callback) {
  try {
    const peerID = await getPeerID();

    callback(null, {
      payload: { success: true, msg: null, data: peerID }
    });
  } catch (err) {
    callback(null, { payload: { success: false, msg: err, data: null } });
  }
}

const Web3StorageServices = {
  executeWeb3Storage,
  getPeerID
};

module.exports = Web3StorageServices;
