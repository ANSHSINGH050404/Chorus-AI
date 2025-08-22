"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const types_1 = require("./types");
const openrouter_1 = require("./openrouter");
const uuid_1 = require("uuid");
const InMemoryStore_1 = require("./InMemoryStore");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/chat", async (req, res) => {
    const { success, data } = types_1.CreateChatSchema.safeParse(req.body);
    const conversationId = data?.conversationId ?? (0, uuid_1.v4)();
    if (!success) {
        res.status(411).json({
            message: "Incorrect input",
        });
        return;
    }
    let existingMessage = InMemoryStore_1.InMemoryStore.getInstance().get(conversationId);
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Connection', 'keep-alive');
    let response = "";
    await (0, openrouter_1.createCompletion)([...existingMessage, {
            role: types_1.Role.User,
            content: data.message
        }], data.model, (chunk) => {
        response += chunk;
        res.write(chunk);
    });
    res.end();
    InMemoryStore_1.InMemoryStore.getInstance().add(conversationId, {
        role: types_1.Role.User,
        content: data.message
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map