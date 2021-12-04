// mysql-android 연동 데이터 CRUD 예제

// 서버화일(Server.js) 실행 전 모듈 설치하기
// > npm init
// > npm install mysql --save
// > npm install express --save
// > npm install body-parser --save

require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const db = require("../plugins/mysql");
const fs = require("fs");

//앱 초기화
const app = express();
const port = process.env.VUE_APP_SERVER_PORT || 4000;
const webServer = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//정적 폴더
app.use(express.static(path.join(__dirname, "../dist")));

//Vue SSR
const { createBundleRenderer } = require("vue-server-renderer");
const template = fs.readFileSync(
  path.join(__dirname, "index.template.html"),
  "utf-8"
);
const serverBundle = require(path.join(
  __dirname,
  "../dist/vue-ssr-server-bundle.json"
));
const clientManifest = require(path.join(
  __dirname,
  "../dist/vue-ssr-client-manifest.json"
));

const render = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

app.get("*", (req, res) => {
  const ctx = {
    url: req.url,
    title: "Vue SSR App",
    metas: `<!-- inject more metas -->`,
  };

  const stream = renderer.renderToStream(ctx);

  stream
    .on("end", () => {
      console.log("스트림 렌더 종료");
    })
    .pipe(res);
});

//API 라우터
const memberRouter = require("./api/member");
app.use("/api/member", memberRouter);
//api/member/test

webServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
