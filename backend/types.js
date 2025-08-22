"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.CreateChatSchema = exports.SUPPORTER_MODELS = exports.MAX_INPUT_TOKEN = void 0;
const zod_1 = require("zod");
exports.MAX_INPUT_TOKEN = 1000;
exports.SUPPORTER_MODELS = ["openai/gpt-4o", "openai/gpt-5"];
exports.CreateChatSchema = zod_1.z.object({
    conversationId: zod_1.z.uuid().optional(),
    message: zod_1.z.string().max(exports.MAX_INPUT_TOKEN),
    model: zod_1.z.enum(exports.SUPPORTER_MODELS)
});
var Role;
(function (Role) {
    Role["Agent"] = "assistant";
    Role["User"] = "user";
})(Role || (exports.Role = Role = {}));
//# sourceMappingURL=types.js.map