import { parentPort } from "node:worker_threads";
import puppeteer from "puppeteer";


const getUrls = async (url) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  let listLinks = [];
  const links = await page.$$(".title-news");
  for (const link of links) {
    let url = await page.evaluate(
      (el) => el.querySelector("a").getAttribute("href"),
      link
    );

    if (!url) {
      url = " ";
    }

    listLinks.push(url);
  }

  await browser.close();

  return listLinks;
};

(async (url) => {
    const urls = await getUrls(url);
    parentPort.postMessage(urls);
})('https://vnexpress.net/');
