import mongoose, { Schema } from "mongoose";

const infoSchema = new Schema({
    title: String,
    url: String,
    source: String,
});

const dataSchema = new Schema({
    data: [infoSchema],
})

const DataCrawl = mongoose.model('DataCrawl', dataSchema);

export default DataCrawl;