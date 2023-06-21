// import startGRPCServer from "./services/index.js";

// startGRPCServer();
import * as Web3Storage from "@conun-global/web3.storage";
const NODE_TYPE= 'TEST'
const NODE_ENV='development'

const SWARM_NODE="/ip4/54.180.152.8/tcp/4001/ipfs/12D3KooWArN5obR9i11WKj6wpyxhNTTxHw7VTEhjWJwpth5wxtur"
const PARENT_NODE=["/ip4/43.201.55.128/tcp/4002/ipfs/12D3KooWEdJVMG8jndkar5NABVoUKUhj4CKXnCBAg7NEefECM3mq", "/ip4/54.180.152.8/tcp/4001/ipfs/12D3KooWArN5obR9i11WKj6wpyxhNTTxHw7VTEhjWJwpth5wxtur", "/ip4/54.180.152.8/udp/4001/quic/p2p/12D3KooWArN5obR9i11WKj6wpyxhNTTxHw7VTEhjWJwpth5wxtur"]
const LISTEN=["/ip4/0.0.0.0/tcp/0","/ip4/0.0.0.0/tcp/0/ws"]
const API='/ip4/0.0.0.0/tcp/0'
const GATEWAY='/ip4/0.0.0.0/tcp/9090'
const RPC='/ip4/0.0.0.0/tcp/0'
const SWARM_KEY='L2tleS9zd2FybS9wc2svMS4wLjAvCi9iYXNlMTYvCmU5MDA2ZmNhY2JhZTMyYzYwZDBhZDI1NDc0NGNiNTI5MDA1YWU1YjA3NjBkN2E2ZDZlYTA1MmViYjdhODI4M2Y='


const config = {
    nodeType: NODE_TYPE,
    env: NODE_ENV,
    swarmNode: SWARM_NODE,
    network: {
      parentNode: PARENT_NODE,
      listen: LISTEN,
      API: API,
      Gateway: GATEWAY,
      RPC: RPC,
      swarmKey: SWARM_KEY
    }
};


async function executeWeb3Network() {
    const storage = new Web3Storage.InitStorage({
      parentNode: config.network.parentNode,
      swarmKey: Buffer.from(config.network.swarmKey, 'base64'),
      listen: config.network.listen,
      API: config.network.API,
      Gateway: config.network.Gateway,
      RPC: config.network.RPC,
      nodeType: config.nodeType
    })
    await storage.start();
    return storage
}


(async ()=> {
    console.log('start >>');
    const storage = await executeWeb3Network();
    const storageNode = await storage.getResolveStorage();
    const p2pNode = await storage.getResolveP2P();
    console.log('Storage peerID: ' + p2pNode.peerId.toString());
    console.log('All Config List: ', await storageNode.config.getAll())
})();


process.on('warning', e => console.warn(e.stack));

process.once('uncaughtException', function(err) {
  console.log('uncaughtException: ' + err);
});