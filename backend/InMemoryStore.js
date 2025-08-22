"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStore = void 0;
const types_1 = require("./types");
const EVICTION_TIME = 5 * 60 * 1000;
const EVICTION_CLOCK_TIME = 1 * 60 * 1000;
class InMemoryStore {
    static store;
    store;
    clock;
    constructor() {
        this.store = {};
        this.clock = setInterval(() => {
            Object.entries(this.store).forEach(([key, { evictionTime }]) => {
                if (evictionTime > Date.now()) {
                    delete this.store[key];
                }
            });
        }, EVICTION_CLOCK_TIME);
    }
    destroy() {
        clearInterval(this.clock);
    }
    static getInstance() {
        if (!InMemoryStore.store) {
            InMemoryStore.store = new InMemoryStore();
        }
        return InMemoryStore.store;
    }
    get(conversationId) {
        return this.store[conversationId]?.message ?? [];
    }
    add(conversationId, message) {
        if (!this.store[conversationId]) {
            this.store[conversationId] = {
                message: [],
                evictionTime: Date.now() + EVICTION_TIME,
            };
        }
        this.store[conversationId]?.message?.push(message);
    }
}
exports.InMemoryStore = InMemoryStore;
//# sourceMappingURL=InMemoryStore.js.map