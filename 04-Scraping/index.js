import express from 'express';
import { crawlData, crawlData_Worker } from "./lib/processing.js";
import {connectDB, saveToDb, getAllData} from "./db/connection.js";

const PORT = 3000 || process.env.PORT;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  const result = await getAllData();
  let records = [];
  result.forEach(items => {
    if(items?.data) {
      items.data.forEach(item => records.push(item));
    }
  });
  res.render('index.ejs', {records});
});

app.listen(PORT, async() => {
  console.log(`listen to PORT ${PORT}...`);
  await connectDB();
  const payload = await crawlData("https://vnexpress.net/");
  await saveToDb(payload);
});
