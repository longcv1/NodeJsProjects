// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import getTitles from './handlers/titles-handler.js';
import getUrls from './handlers/url-handler.js';

const URL_Mapping = {
    'https://vnexpress.net/': 'vnexpress',
    'https://dantri.com.vn/': 'dantri',
};

async function crawl(url) {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});

    const source = URL_Mapping[url];
    console.log(source);
    // ==> Get titles
    const titles = await getTitles(page);
    // ==> Get links
    const urls = await getUrls(page);
    // ==> Return payload
    const payload = titles.map((item, index) => {
        return {
            title: titles[index],
            url: urls[index],
        };
    })
    .map((value) => ({...value, source}));

    console.log(payload);
    console.log('payload---->', payload.length);

    await browser.close();
};

crawl('https://vnexpress.net/');

// const arr1 = ['a', 'b', 'c'];
// const arr2 = ['1', '2', '3'];
// const result = arr1.map((item, index) => {
//     return {
//         tit: arr1[index],
//         url: arr2[index],
//     };
// })
