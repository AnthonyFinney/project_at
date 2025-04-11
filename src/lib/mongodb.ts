import { MongoClient, ServerApiVersion, Db } from "mongodb";

const url = process.env.MONGODB_URI as string;
if (!url) {
    throw new Error("No Db String Found");
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function getDb(): Promise<Db> {
    if (!dbInstance) {
        client = new MongoClient(url, options);
        await client.connect();
        dbInstance = client.db("project_at");
    }

    return dbInstance;
}
