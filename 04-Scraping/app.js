const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const scrapingResults = [
    {
        source: 'vnexpress.net',
        title: 'title',
        content: 'content',
        url: 'https://vnexpress.net/xxxx.html'
    }
]

let listTitles = [];
const listContents = [];
const listLinks = [];


async function main() {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto('https://vnexpress.net');

    // ==> Get articles
    const titles = await page.$$('.title-news');
    for(const title of titles) {
        const article = await page.evaluate(
            el => el.querySelector('a').textContent,
            title);
        
        listTitles.push(article);
    }
    
    // ==> Get contents
    const descriptions = await page.$$('.description');
    for(const desc of descriptions) {
        const content = await page.evaluate(
            el => el.querySelector('a').textContent,
            desc);
        listContents.push(content);
    }

    // ==> Get links
    const links = await page.$$('.title-news');
    for(const link of links) {
        const url = await page.evaluate(
            el => el.querySelector('a').getAttribute('href'),
            link);
        listLinks.push(url);
    }

    const result = [];
    for(i=0, j=0, k=0;
        i<listTitles.length, j<listContents.length, k<listLinks.length;
        i++,j++,k++)
    {
        const title = listTitles[i];
        const content = listContents[j];
        const link = listLinks[k];

        const temp = {
            article: title,
            description: content,
            url: link,
        };
        result.push(JSON.stringify(temp));
    }
    console.log(result);

    await browser.close();
}

main();
