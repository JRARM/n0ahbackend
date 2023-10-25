
import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Connection OK')
} catch (error) {
    console.log('Connection fail :'+error)
}