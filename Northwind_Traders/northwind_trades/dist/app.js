"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var errors_1 = require("./controllers/errors");
var helmet_1 = __importDefault(require("helmet"));
var body_parser_1 = require("body-parser");
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
var PORT = process.env.PORT;
var app = express_1.default();
app.set("view engine", "ejs");
app.use(body_parser_1.json());
app.use(helmet_1.default());
var logStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "logs.log"), {
    flags: "a",
});
app.use(morgan_1.default("combined", { stream: logStream }));
app.use(mainRoutes_1.default);
app.use(errors_1.get404);
app.use(express_1.default.static(path_1.default.join(__dirname, "/dist/utils/searchScript.js")));
var errHandler = function (err, req, res, next) {
    console.error(err.stack);
    return res.status(500).json({ message: "Internal Server Error" });
};
app.use(errHandler);
try {
    app.listen(PORT || 3000);
    console.log("Server is running on port " + PORT);
}
catch (e) {
    console.log(e);
    throw new Error("An error occured");
}
