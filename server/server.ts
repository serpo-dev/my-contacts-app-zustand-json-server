const jsonServer = require("json-server");
const auth = require("json-server-auth");
const contactsRouter = require("./routes/contactsRouter");
const cors = require("cors");
const routes = require("./routes.json");

console.log(routes);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router("./db.json");
const rules = auth.rewriter(routes);

const port = 3001;

server.use(cors());
server.db = router.db;

server.use(rules);
server.use(auth);
server.use("/contacts", contactsRouter);
server.use(middlewares);
server.use(router);
server.listen(port, () => console.log("Server listening on port 3001!"));
