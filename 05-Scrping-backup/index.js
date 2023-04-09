import puppeteer from "puppeteer";
import express, { json } from 'express';
import getTitles from "./handlers/titles-handler.js";
import getUrls from "./handlers/url-handler.js";
import { Worker } from "node:worker_threads";
import compose from "./lib/processing.js";
import DataCrawl from "./db/model.js";
import {connectDB, saveToDb, getAllData} from "./db/connection.js";

const URL_Mapping = {
  "https://vnexpress.net/": "vnexpress",
  "https://dantri.com.vn/": "dantri",
};

const title_worker = async () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./workers/titles.js");
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`stopped with  ${code} exit code`));
    });
  });
};

const url_worker = async () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./workers/urls.js");
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`stopped with  ${code} exit code`));
    });
  });
};


const crawl_s1 = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const from = URL_Mapping[url];
  const titles = await getTitles(page);
  const urls = await getUrls(page);
  const result = compose(titles, urls, from);
  await browser.close();
  return result;
};

const crawl_s2 = async (url) => {
  const source = URL_Mapping[url];
  const titles = await title_worker();
  const urls = await url_worker();
  const result = compose(titles, urls, source);
  return result;
}

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  const result = await DataCrawl.find({'data.source': 'vnexpress'});
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
  const payload = await crawl_s1("https://vnexpress.net/");
  await saveToDb(payload);
  console.log('READY TO SHOW....');
});
