export function findFirstThumbnail(styles) {

  if (!styles) {
    return '/icons/placeholder.svg';
  }

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    if (style.photos[0].thumbnail_url !== null) {
      return style.photos[0].thumbnail_url;
    } else if (style.length > 0) {
      return findFirstThumbnail(style);
    }
  }

  // If we haven't found a valid thumbnail URL, return the placeholder
  return '/icons/placeholder.svg';
}

export function getThumbnailUrls(styles) {
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

export function getThumbnailMap(styles) {
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
