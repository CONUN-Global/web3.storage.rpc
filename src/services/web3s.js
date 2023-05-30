var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executeWeb3Storage, getPeerID } from "../web3/index.js";
function execWeb3Storage(_options, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield executeWeb3Storage(_options);
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
            console.log("peerID");
            const peerID = yield getPeerID();
            console.log(peerID);
            callback(null, peerID);
        }
        catch (err) {
            callback(null, { peerID: null });
        }
    });
}
export const Web3StorageServices = {
    execWeb3Storage,
    getPeerId
};
