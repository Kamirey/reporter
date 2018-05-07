const port = process.env.PORT || 8081;

const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");

const app = express();
const staticFileMiddleware = express.static(path.join("./dist/"));

app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);
// ^ `app.use(staticFileMiddleware)` is included twice as per https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware

app.get("/", function (req, res) {
	res.setHeader("Content-Security-Policy", "default-src 'self'");
	res.render(path.join("./dist/index.html"));
});

app.listen(port, function () {
	console.log("Server running on port %s", port);
});