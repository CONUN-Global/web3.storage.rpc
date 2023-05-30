var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Web3Storage from "@conun-global/web3.storage";
let storage, node, pNode, content, linkedDag, swarm, peerID;
export function initiateWeb3Storage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const Web3Storage = await import("@conun-global/web3.storage");
            peerID = yield (yield Web3Storage.getPeerId()).toString();
            console.log(peerID);
        }
        catch (err) {
            console.log("Storage initiate error " + err, "error");
        }
    });
}
export function executeWeb3Storage(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (storage)
                return;
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
            yield (storage === null || storage === void 0 ? void 0 : storage.start());
            peerID = yield (yield Web3Storage.getPeerId()).toString();
            node = yield storage.getResolveStorage();
            pNode = yield storage.getResolveP2P();
            content = new Web3Storage.Content(node);
            linkedDag = new Web3Storage.LinkedDag(node);
            // swarm = await node.swarm.connect(swarmNode);
        }
        catch (err) {
            console.log("Storage execute error " + err, "error");
        }
    });
}
export function stopWeb3Storage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storageCopy = getStorage();
            if (!storageCopy)
                return;
            yield (storageCopy === null || storageCopy === void 0 ? void 0 : storageCopy.stop());
            node = null;
            pNode = null;
            content = null;
            linkedDag = null;
            swarm = null;
            peerID = null;
            storage = null;
        }
        catch (err) {
            console.log("Storage stop error " + err, "error");
        }
    });
}
export function getPeerID() {
    return { peerID };
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
