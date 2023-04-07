import { load } from "cheerio";
import request from 'request-promise';
import fs from 'fs';

const MAPPING_URL = {
    'https://vnexpress.net/': 'vnexpress',
    'https://dantri.com.vn/': 'dantri',
};

const crawlDataFromVnexpress = async (url) => {
    let articlesList = [];
    try {
        const source = MAPPING_URL[url];
        const rawData = await request(url);
        const buff = Buffer.from(rawData, 'utf-8');
        fs.writeFileSync('log.txt', buff);

        const $ = load(rawData);
        const articles = $('.podcast-left');
        articles.each((index, element) => {
            const url = $(element).find('a').attr('href');
            const title = $(element).find('a').attr('title');
            const content = $(element).text().replace(/\n/g, '');
            const payload = {
                title: title.length ? title : '',
                url: url.length ? url : '',
                content: content.length ? content : '',
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