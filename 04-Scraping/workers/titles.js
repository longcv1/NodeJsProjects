import { parentPort } from "node:worker_threads";
import puppeteer from "puppeteer";

const getTitles = async (url) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  let listTitles = [];
  const articles = await page.$$(".title-news");
  for (let article of articles) {
    let title = "";
    title = await page.evaluate(
      (el) => el.querySelector("a").textContent,
      article
    );

    if (!title) {
      title = " ";
    }

    listTitles.push(title);
  }

  await browser.close();

  return listTitles;
}

(async (url) => {
    const titles = await getTitles(url);
    parentPort.postMessage(titles);
})('https://vnexpress.net/');
