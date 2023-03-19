export function findFirstThumbnail(styles) {
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
