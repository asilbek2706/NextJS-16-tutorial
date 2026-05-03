import mongoose, { type Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable.');
}

const mongodbUri = MONGODB_URI;

type MongooseCache = {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
    mongooseCache?: MongooseCache;
};

// Keep the connection across hot reloads in development to avoid opening
// a new MongoDB connection every time Next.js reloads server modules.
const cached = globalForMongoose.mongooseCache ?? {
    conn: null,
    promise: null,
};

globalForMongoose.mongooseCache = cached;

export async function connectToDatabase(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        // Disable command buffering so database errors surface immediately.
        cached.promise = mongoose
            .connect(mongodbUri, {
                bufferCommands: false,
            })
            .then((mongooseInstance) => mongooseInstance);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default connectToDatabase;
