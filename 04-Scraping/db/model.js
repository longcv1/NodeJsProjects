import mongoose, { Schema } from "mongoose";

const infoSchema = new Schema({
    title: String,
    url: String,
    source: String,
});

const dataSchema = new Schema({
    data: [infoSchema],
})

const Data = mongoose.model('Data', dataSchema);

export default Data;