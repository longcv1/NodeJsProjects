import mongoose from "mongoose";
import DataCrawl from "./model.js";

const connectDB = async () => {
    // This is credential information, it should be protected and must not be exposed to public
    const URL = 'mongodb+srv://lubu:lubu123456@cluster0.t6ktu0v.mongodb.net/?retryWrites=true&w=majority';
    try {
      await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('CONNECT DB OK...');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}

const saveToDb = async (payload) => {
  try {
    const result = new DataCrawl({
      data: payload
    })
  
    await result.save();
    console.log('Save to db successfully...');  
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

const getAllData = async () => {
  try {
    const result = DataCrawl.find({'data.source': 'vnexpress'});
    return result;
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

export {
  connectDB,
  saveToDb,
  getAllData,
};