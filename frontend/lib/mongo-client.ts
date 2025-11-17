import { MongoClient } from "mongodb";

// Access the environment variable. It should be available here (server-side).
const uri = process.env.MONGODB_URI;

// Check if the URI is defined, throwing an error if not.
// This is critical since the code is running on the server.
if (!uri) {
  // We throw a more descriptive error here, though the original code already did this.
  // The fix is ensuring the .env structure is correct for Next.js loading.
  throw new Error("Missing MONGODB_URI. Check your .env file.");
}

// Ensure global is properly typed for the cached client
const globalForMongo = global as unknown as {
  _mongoClient?: MongoClient;
};

let client: MongoClient;

// We use a global variable to cache the MongoClient connection 
// in development to prevent hot reloading from opening too many connections.
if (!globalForMongo._mongoClient) {
  // Initialize and connect the new client
  client = new MongoClient(uri);
  client.connect().catch(err => {
    console.error("MongoDB Connection Error:", err);
    // Optionally rethrow or handle the connection error here
    throw err;
  });
  globalForMongo._mongoClient = client;
} else {
  // Use the cached client
  client = globalForMongo._mongoClient;
}

// Log connection status for debugging (optional)
client.once('open', () => {
    console.log("MongoDB connection successful.");
});


export { client };