import OpenAI from "openai";
import "dotenv/config";


const getBaseURL = () => {
  const base = process.env.OPENAI_BASE_URL || "https://generativelanguage.googleapis.com";

  return `${base.replace(/\/+$/, "")}/v1beta/openai`;
};

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
  baseURL: getBaseURL(),
});

export default ai;