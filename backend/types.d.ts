import { z } from "zod";
export declare const MAX_INPUT_TOKEN = 1000;
export declare const SUPPORTER_MODELS: string[];
export type MODEL = typeof SUPPORTER_MODELS[number];
export declare const CreateChatSchema: z.ZodObject<{
    conversationId: z.ZodOptional<z.ZodUUID>;
    message: z.ZodString;
    model: z.ZodEnum<{
        [x: string]: string;
    }>;
}, z.core.$strip>;
export declare enum Role {
    Agent = "assistant",
    User = "user"
}
export type Message = {
    content: string;
    role: Role;
};
export type Messages = Message[];
//# sourceMappingURL=types.d.ts.map