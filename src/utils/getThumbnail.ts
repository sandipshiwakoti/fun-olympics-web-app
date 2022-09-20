export const getThumbnailLink = (url: string) => {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
  } else {
    return null;
  }
};
