import puppeteer from "puppeteer";
import { getTitles, getUrls } from '../handlers/util-handler.js';
import { Worker } from "node:worker_threads";

const URL_Mapping = {
  "https://vnexpress.net/": "vnexpress",
  "https://dantri.com.vn/": "dantri",
};

/**
 * This function is to combine 2 arrays: title news and urls
 * @param {String} titles - title news 
 * @param {String} urls - link 
 * @param {String} source - vnexpress or other sites
 * @returns { [Objec] } - Example: 
 * [
 *    {
 *      title : "Article 1",
 *      url: http://vnexpress.net/article-1.html/
 *      source: vnexpress
 *    }
 * ]
 */
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

/**
 * Crawling data from specified website
 * @param {String} url - http://vnexpress.net/ 
 * @returns {Array[]} - Array of object will be saved to MongoDb's documents
 */
const crawlData = async (url) => {
  const browser = await puppeteer.launch({
    headless: false, 
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
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

/**
 * Crawling data using worker_threads
 * @param {String} url - link website
 * @returns {Array[Object]}
 */
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