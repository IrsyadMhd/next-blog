import { MongoClient } from 'mongodb';

export const dbConn = async () => {
  const client = await MongoClient.connect(process.env.MONGO_DB);
  return client;
};

export const insertDoc = async (client, coll, doc) => {
  const db = client.db();
  const result = await db.collection(coll).insertOne(doc);
  return result;
};

export const getDocuments = async (client, coll, find = {}, sort) => {
  const db = client.db();
  const documents = await db.collection(coll).find(find).sort(sort).toArray();
  return documents;
};
