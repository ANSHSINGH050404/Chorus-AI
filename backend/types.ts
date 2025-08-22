
import {  z } from "zod";

export const MAX_INPUT_TOKEN = 1000;
export const SUPPORTER_MODELS = ["openai/gpt-4o" ,"openai/gpt-5"]
export type MODEL= typeof SUPPORTER_MODELS[number]
export const CreateChatSchema = z.object({
  conversationId: z.uuid().optional(),
  message: z.string().max(MAX_INPUT_TOKEN),
  model:z.enum(SUPPORTER_MODELS)
});


export enum Role  {
  Agent="assistant",
  User="user"
}



export type Message = {
  content: string;
  role: Role;
};


export type Messages=Message[];