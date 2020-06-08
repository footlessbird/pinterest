// if (process.env.NODE_ENV !== "production") {
// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/api/auth", { target: "http://localhost:5000" })
//   );
//   app.use(
//     createProxyMiddleware("/api/pinss", { target: "http://localhost:5000" })
//   );
// };
// }

// import { createProxyMiddleware } from "http-proxy-middleware";

// export default function (app) {
// app.use(
//   createProxyMiddleware("/api/auth", { target: "http://localhost:5000" })
// );
// app.use(
//   createProxyMiddleware("/api/pinss", { target: "http://localhost:5000" })
// );
// app.use('/api/auth', createProxyMiddleware({
//   target: 'http://localhost:5000',
//   changeOrigin:true
// }))
// app.use('/api/pins', createProxyMiddleware({
//   target: 'http://localhost:5000',
//   changeOrigin:true
// }))
// }

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // app.use(
  //   "/api/auth",
  //   createProxyMiddleware({
  //     target: "http://localhost:5000",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/api/pins",
  //   createProxyMiddleware({
  //     target: "http://localhost:5000",
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    ["/api/auth", "/api/pins", "/api/github"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
