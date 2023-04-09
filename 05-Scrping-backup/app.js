import cheerio from 'cheerio'
import puppeteer from "puppeteer";
import axios from "axios";
import fs from 'fs';

const MAPPING_URL = {
    'https://vnexpress.net/': 'vnexpress',
    'https://dantri.com.vn/': 'dantri',
};

const crawlDataFromVnexpress = async (url) => {
    let articlesList = [];
    try {
        const source = MAPPING_URL[url];
        const res = await axios.get(url, {responseType: 'document'});
        const rawData = res.data;
        // Write to file
        const buff = Buffer.from(rawData, 'utf-8');
        fs.writeFileSync('log2.txt', buff);

        const $ = await cheerio.load(rawData);
        const articles = $('.title_news');
        articles.each((index, element) => {
            const url = $(element).find('a').attr('href');
            const title = $(element).find('a').attr('title');
            const payload = {
                title: title.length ? title : '',
                url: url.length ? url : '',
                source,
            }
            articlesList.push(payload);
        });
        console.log(articlesList);
        console.log(articlesList.length);
    } catch (error) {
        console.log({message: `ERROR! ${error}`});
    }
}

crawlDataFromVnexpress('https://vnexpress.net/');