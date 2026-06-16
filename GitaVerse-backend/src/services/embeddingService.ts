import { GoogleGenAI } from '@google/genai';
import pool from '../db/client';
import { toSql } from 'pgvector';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function getRelevantVerses(question: string): Promise<string> {
  const result = await genAI.models.embedContent({
    model: 'gemini-embedding-001',
    contents: question,
    config: {
      outputDimensionality: 768,
    },
  });

  const embedding = result?.embeddings![0]?.values!;

  const dbResult = await pool.query(
    `SELECT content, 1 - (embedding <=> $1) AS similarity
     FROM verse_embeddings
     ORDER BY embedding <=> $1
     LIMIT 5`,
    [toSql(embedding)]
  );

  return dbResult.rows.map(r => r.content).join('\n\n');
}