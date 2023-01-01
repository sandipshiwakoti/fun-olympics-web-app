export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const imageFallbackUrl =
  "https://mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";

export const urls = {
  login: "/auth/login",
  requestRegistration: "/auth/request-registration",
  verifyRegistration: "/auth/verify-registration",
  registration: "/auth/registration",
  resetPassword: "auth/reset-password",
  game: "/game",
  gameById: "/game/:id",
  profile: "/user/profile/me",
  broadcast: "/broadcast",
  broadcastComment: "/broadcast-comment",
  ownBroadcastComment: "/broadcast-comment/me",
  ownBroadcastCommentById: "/broadcast-comment/me/:id",
  broadcastById: "/broadcast/:id",
  highlight: "/highlight",
  highlightComment: "/highlight-comment",
  ownHighlightComment: "/highlight-comment/me",
  ownHighlightCommentById: "/highlight-comment/me/:id",
  highlightById: "/highlight/:id",
  news: "/news",
  newsById: "/news/:id",
  newsComment: "/news-comment",
  ownNewsComment: "/news-comment/me",
  ownNewsCommentById: "/news-comment/me/:id",
  user: "/user",
  userById: "/user/:id",
};
