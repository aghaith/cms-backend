import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await 
            mongoose.set("strictQuery", false);
            mongoose.connect(process.env.DATABASE)

        console.log('MongoDB Connected')
    } catch (error) {
        console.error('DB CONNECTION ERROR: ', error)
        process.exit(1)
    }
}

export default connectDB