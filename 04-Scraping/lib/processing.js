const compose = (titles, urls, source) => {
  const result = titles
    .map((item, index) => {
      return {
        title: titles[index],
        url: urls[index],
      };
    })
    .map((value) => ({ ...value, source }));

    return result;
};

export default compose;