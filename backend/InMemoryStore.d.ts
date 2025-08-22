import { Message } from "./types";
export declare class InMemoryStore {
    private static store;
    private store;
    private clock;
    private constructor();
    destroy(): void;
    static getInstance(): InMemoryStore;
    get(conversationId: string): Message[];
    add(conversationId: string, message: Message): void;
}
//# sourceMappingURL=InMemoryStore.d.ts.map