export default async function getUrls(page) {
  const listLinks = [];
  const links = await page.$$(".title-news");
  for (const link of links) {
    let url = await page.evaluate(
      (el) => el.querySelector("a").getAttribute("href"),
      link
    );
    
    if(!url) {
      url = ' ';
    }

    listLinks.push(url);
  }
  return listLinks;
}
