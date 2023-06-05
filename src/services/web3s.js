var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executeWeb3Storage, getContent, getPeerID, getStorage, lsDir, publishFile, uploadFileNode } from "../web3/index.js";
function execWeb3Storage(_options, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield executeWeb3Storage(_options.request);
            callback(null, { payload: { success: true, msg: null } });
        }
        catch (err) {
            callback(null, { payload: { success: false, msg: err } });
        }
    });
}
function getPeerId(_, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const peerID = yield getPeerID();
            callback(null, peerID);
        }
        catch (err) {
            callback(null, { peerID: null });
        }
    });
}
function getContentRPC(_options, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield getContent(_options);
            console.log(content);
            callback(null, content);
        }
        catch (err) {
            callback(null, { content: null });
        }
    });
}
function getLinkedDagRPC(_, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const linkedDag = null;
            callback(null, linkedDag);
        }
        catch (err) {
            callback(null, { linkedDag: null });
        }
    });
}
function getStorageRPC(_, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storage = yield getStorage();
            callback(null, storage);
        }
        catch (err) {
            callback(err, { storage: null });
        }
    });
}
function uploadFile(req, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.request;
        try {
            const res = yield uploadFileNode(data.path, data.options);
            const stringified = JSON.stringify(res);
            callback(null, { data: stringified });
        }
        catch (err) {
            callback(err, null);
        }
    });
}
function uploadThumbnail(req, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.request;
        try {
            const res = yield uploadFileNode(data.path, data.options);
            const stringified = JSON.stringify(res);
            callback(null, { data: stringified });
        }
        catch (err) {
            callback(err, null);
        }
    });
}
function lsDirRPC(req, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.request;
        try {
            const res = yield lsDir(data.cid, data.options);
            const stringified = JSON.stringify(res);
            callback(null, { data: stringified });
        }
        catch (err) {
            callback(err, null);
        }
    });
}
function publishFileRPC(req, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.request;
        try {
            const res = yield publishFile(JSON.parse(data.obj), data.options);
            callback(null, { data: res });
        }
        catch (err) {
            callback(err, null);
        }
    });
}
export const Web3StorageServices = {
    executeWeb3Storage: execWeb3Storage,
    getStorage: getStorageRPC,
    getContent: getContentRPC,
    getLinkedDag: getLinkedDagRPC,
    publishFile: publishFileRPC,
    lsDir: lsDirRPC,
    uploadFile,
    getPeerId,
    uploadThumbnail
};
