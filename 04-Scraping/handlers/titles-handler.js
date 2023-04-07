
export default async function getTitles(page) {
  let listTitles = [];
  const articles = await page.$$('.title-news');
  for (let article of articles) {
    let title = '';
    title = await page.evaluate(
      (el) => el.querySelector("a").textContent,
      article
    );
    
    if(!title) {
      console.log('----1----');
      title = 'EMPTY';
    }

    listTitles.push(title);
  }

  return listTitles;
};
