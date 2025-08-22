import express, { response } from "express";
import { CreateChatSchema, Role } from "./types";
import { createCompletion } from "./openrouter";
import { v4 as uuidv4 } from 'uuid';
import { InMemoryStore } from "./InMemoryStore";

const app = express();

app.use(express.json());
app.post("/chat", async(req, res) => {
  const { success, data } = CreateChatSchema.safeParse(req.body);

  const conversationId=data?.conversationId ?? uuidv4()

  if (!success) {
    res.status(411).json({
      message: "Incorrect input",
    });
    return;
  }

 
 let existingMessage=InMemoryStore.getInstance().get(conversationId)

  res.setHeader('Content-Type','text/event-stream; charset=utf-8');
  res.setHeader('Connection','keep-alive')
  let response="";

  await createCompletion([...existingMessage,{
    role:Role.User,
    content:data.message
  }],data.model ,(chunk :string) =>{
   response += chunk;
   res.write(chunk)
  });

  res.end()

  InMemoryStore.getInstance().add(conversationId,{
    role:Role.User,
    content: data.message
  })


});

app.listen(3000);
