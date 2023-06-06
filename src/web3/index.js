var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import * as Web3Storage from "@conun-global/web3.storage";
import { concat } from "uint8arrays";
import all from "it-all";
import fs from "fs";
let storage, peerID;
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
export function getFilePreview(cid, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = yield getNode(options);
        // @ts-ignore
        const preview = concat(yield all(node === null || node === void 0 ? void 0 : node.cat(cid)));
        return preview;
    });
}
export function downloadFile(call, callback) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const { downloadDir, cid, name, size, options } = call.request;
        const node = yield getNode(options);
        // @ts-ignore
        const chunks = yield node.cat(cid);
        let totalBytes = 0;
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }
        try {
            try {
                for (var _d = true, chunks_1 = __asyncValues(chunks), chunks_1_1; chunks_1_1 = yield chunks_1.next(), _a = chunks_1_1.done, !_a;) {
                    _c = chunks_1_1.value;
                    _d = false;
                    try {
                        const chunk = _c;
                        totalBytes += chunk === null || chunk === void 0 ? void 0 : chunk.length;
                        const currentPercentage = ((totalBytes * 100) / size).toFixed(2);
                        fs.appendFileSync(downloadDir, Buffer.from(chunk));
                        console.log(totalBytes);
                        // data streamer
                        callback(null, { cid, name, currentPercentage });
                        // call.write({
                        //   cid,
                        //   name,
                        //   currentPercentage
                        // });
                        console.log(currentPercentage);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = chunks_1.return)) yield _b.call(chunks_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // call.end();
        }
        catch (err) {
            console.log(err);
        }
    });
}
