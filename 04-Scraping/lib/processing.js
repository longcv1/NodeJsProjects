import puppeteer from "puppeteer";
import { getTitles, getUrls } from '../handlers/util-handler.js';
import { Worker } from "node:worker_threads";


const URL_Mapping = {
  "https://vnexpress.net/": "vnexpress",
  "https://dantri.com.vn/": "dantri",
};

const compose = (titles, urls, source) => {
  const result = titles
    .map((item, index) => {
      return {
        title: titles[index],
        url: urls[index],
      };
    })
    .map((value) => ({ ...value, source }));

    return result;
};

const crawlData = async (url) => {
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

const crawlData_Worker = async (url) => {
  const source = URL_Mapping[url];
  const titles = await title_worker();
  const urls = await url_worker();
  const result = compose(titles, urls, source);
  return result;
}

export {
  crawlData,
  crawlData_Worker,
}