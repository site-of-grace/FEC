const calculateAverage = (metaData) => {
  var total = 0;
  var reviewAmount = 0;
  for (var i = 1; i <= 5; i++) {
    total += Number(metaData.ratings[i]) * i;
    reviewAmount += Number(metaData.ratings[i]);
  }
  var longAverage = (total/reviewAmount);
//Rounds to nearest .25
  return (Math.round(longAverage * 4) / 4);
};

function getThumbnailUrls(styles) {
  let urls = [];
  for (let style of styles) {
    if (style.photos[0].thumbnail_url !== null) {
      urls.push({url: style.photos[0].thumbnail_url, style_id: style.style_id});
    }
    if (style.styles && style.styles.length > 0) {
      urls = urls.concat(getThumbnailUrls(style.styles));
    }
  }
  return urls;
}

function getThumbnailMap(styles) {
  let urls = {};
  for (let style of styles) {
    if (style.photos[0].thumbnail_url !== null) {
       urls[style.style_id] = style.photos[0].thumbnail_url;
    }
    if (style.styles && style.styles.length > 0) {
      Object.assign(urls, getThumbnailUrls(style.styles));
    }
  }
  return urls;
}

module.exports = { calculateAverage, getThumbnailUrls, getThumbnailMap };