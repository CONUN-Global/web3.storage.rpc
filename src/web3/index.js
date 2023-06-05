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
            peerID = yield (yield Web3Storage.getPeerId()).toString();
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
            storage = new Web3Storage.InitStorage(_options);
            yield (storage === null || storage === void 0 ? void 0 : storage.start());
            node = yield storage.getResolveStorage();
            pNode = yield storage.getResolveP2P();
            peerID = pNode.peerId.toString();
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
            const storageCopy = getStorage().storage;
            if (!storageCopy)
                return;
            yield (storageCopy === null || storageCopy === void 0 ? void 0 : storageCopy.stop());
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
    return { storage };
}
export function getNode(_options) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = new Web3Storage.InitStorage(_options);
        const node = yield storage.getResolveStorage();
        return node;
    });
}
export function getContent(_options) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = yield getNode(_options);
        const content = new Web3Storage.Content(node);
        return { content };
    });
}
export function getLinkedDag(_options) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = yield getNode(_options);
        const linkedDag = new Web3Storage.LinkedDag(node);
        return linkedDag;
    });
}
export function uploadFileNode(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const _content = yield getContent(options);
        const content = _content.content;
        const data = yield (content === null || content === void 0 ? void 0 : content.addFile(path));
        return data;
    });
}
export function lsDir(cid, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const _content = yield getContent(options);
        const content = _content.content;
        const res = yield content.lsDir(cid);
        const mutatedRes = res.map((file) => {
            var _a;
            return (Object.assign(Object.assign({}, file), { cid: (_a = file.cid) === null || _a === void 0 ? void 0 : _a.toString() }));
        });
        return mutatedRes;
    });
}
export function publishFile(obj, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const linkedDag = yield getLinkedDag(options);
        const res = yield linkedDag.add(obj);
        return res === null || res === void 0 ? void 0 : res.toString();
    });
}
// export async function getFilePreview(cid: any, options: any) {
//   // const node = await getNode(options);
//   // const preview = concat(all(node?.cat(cid)));
//   // console.log(preview);
//   // return preview;
// }
