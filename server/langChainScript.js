import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { pull } from "langchain/hub";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import * as dotenv from "dotenv";

const runLangChainScript = async (question) => {
  dotenv.config();

  const loader = new DirectoryLoader("data", {
    ".md": (path) => new TextLoader(path),
  });
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splits = await textSplitter.splitDocuments(docs);

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    embeddings: "embedding-001",
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(splits, embeddings);

  const retriever = vectorStore.asRetriever();

  const prompt = await pull("rlm/rag-prompt");

  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
  });

  // const retriever = MultiQueryRetriever.fromLLM({
  //   llm: llm,
  //   retriever: vectorStore.asRetriever(),
  // });

  // const chain = RetrievalQAChain.fromLLM(llm, retriever, prompt);

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
  });

  // const res = await chain.invoke({
  //   query: "What is an abrasion?",
  // });

  const retrievedDocs = await retriever.getRelevantDocuments(question);

  const response = await ragChain.invoke({
    question: question,
    context: retrievedDocs,
  });

  return response;
};

export default runLangChainScript;
