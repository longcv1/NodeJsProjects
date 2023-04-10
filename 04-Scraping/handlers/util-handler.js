/**
 * Get all title news
 * @param {Object} page 
 * @returns {Array[]}
 */
const getTitles = async(page) => {
  let listTitles = [];
  const articles = await page.$$('.title-news');
  for (let article of articles) {
    let title = '';
    title = await page.evaluate(
      (el) => el.querySelector("a").textContent,
      article
    );
    
    if(!title) {
      title = ' ';
    }

    listTitles.push(title);
  }

  return listTitles;
};

/**
 * Get all urls
 * @param {Object} page 
 * @returns {Array[]}
 */
const getUrls =  async(page) => {
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

export {
  getTitles,
  getUrls,
}
