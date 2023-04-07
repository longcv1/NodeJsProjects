export default async function getUrls(page) {
  const listLinks = [];
  const links = await page.$$(".title-news");
  for (const link of links) {
    const url = await page.evaluate(
      (el) => el.querySelector("a").getAttribute("href"),
      link
    );
    const data = !url ? '' : url;
    listLinks.push(data);
  }
  return listLinks;
}
