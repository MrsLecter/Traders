"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mainModels_1 = require("../models/mainModels");
var utils_1 = require("../utils/utils");
var dbConnect_1 = require("../utils/dbConnect");
var Op = require("sequelize").Op;
exports.startPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).render("./pages/homePage");
        return [2 /*return*/];
    });
}); };
exports.employeesPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlReq_1, start, employees, end, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mainModels_1.Employees.sync({ alter: true })];
            case 1:
                _a.sent();
                sqlReq_1 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Employees.findAll({
                        logging: function (sql) {
                            sqlReq_1 += sql;
                        },
                    })];
            case 2:
                employees = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_1, end - start);
                res.status(200).render("./pages/employees", { data: employees });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.employeePage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var employeeid, sqlReq, start, employee, reportsTo, end, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                employeeid = req.params["employeeid"];
                sqlReq = "";
                start = performance.now();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, mainModels_1.Employees.sync({ alter: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, mainModels_1.Employees.findOne({
                        logging: function (sql) {
                            sqlReq += sql;
                        },
                        where: { employeeid: employeeid },
                    })];
            case 3:
                employee = _a.sent();
                if (!(employee === null)) return [3 /*break*/, 4];
                console.log("Not found!");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mainModels_1.Employees.findOne({
                    where: { employeeid: employee.reportsto },
                })];
            case 5:
                reportsTo = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq, end - start);
                res
                    .status(200)
                    .render("./pages/definedEmployee", { data: employee, link: reportsTo });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.customersPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlReq_2, start, customers, end, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mainModels_1.Customers.sync({ alter: true })];
            case 1:
                _a.sent();
                sqlReq_2 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Customers.findAll({
                        logging: function (sql) {
                            sqlReq_2 += sql;
                        },
                    })];
            case 2:
                customers = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_2, end - start);
                res.status(200).render("./pages/customers", { data: customers });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.customerPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerid, sqlReq_3, start, customer, end, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customerid = req.params["customerid"];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mainModels_1.Customers.sync({ alter: true })];
            case 2:
                _a.sent();
                sqlReq_3 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Customers.findOne({
                        logging: function (sql) {
                            sqlReq_3 += sql;
                        },
                        where: { customerid: customerid },
                    })];
            case 3:
                customer = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_3, end - start);
                res.status(200).render("./pages/definedCustomer", { data: customer });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.productsPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlReq_4, start, products, end, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mainModels_1.Products.sync({ alter: true })];
            case 1:
                _a.sent();
                sqlReq_4 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Products.findAll({
                        logging: function (sql) {
                            sqlReq_4 += sql;
                        },
                    })];
            case 2:
                products = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_4, end - start);
                res.status(200).render("./pages/products", { data: products });
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.productPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productid, sqlReq1_1, start1, product, end1, sqlReq2_1, start2, supplier, end2, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productid = req.params["productid"];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, mainModels_1.Products.sync({ alter: true })];
            case 2:
                _a.sent();
                sqlReq1_1 = "";
                start1 = performance.now();
                return [4 /*yield*/, mainModels_1.Products.findOne({
                        logging: function (sql) {
                            sqlReq1_1 += sql;
                        },
                        where: { productid: productid },
                    })];
            case 3:
                product = _a.sent();
                end1 = performance.now();
                utils_1.writeLog(sqlReq1_1, end1 - start1);
                sqlReq2_1 = "";
                start2 = performance.now();
                return [4 /*yield*/, mainModels_1.Supplies.findOne({
                        logging: function (sql) {
                            sqlReq2_1 += sql;
                        },
                        where: { supplierid: product.supplierid },
                    })];
            case 4:
                supplier = _a.sent();
                end2 = performance.now();
                utils_1.writeLog(sqlReq2_1, end2 - start2);
                res.status(200).render("./pages/definedProduct", {
                    data: product,
                    supplier: supplier,
                });
                return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.ordersPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlReq_5, start, _a, orders, meta, end, err_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mainModels_1.Orders.sync({ alter: true })];
            case 1:
                _b.sent();
                sqlReq_5 = "";
                start = performance.now();
                return [4 /*yield*/, dbConnect_1.sequelize.query("select orders.orderid ,count(orders.orderid) as products, SUM(orderdetails.quantity * orderdetails.unitprice) as totalprice, SUM(orderdetails.quantity) as quantity, orders.shippeddate, orders.shipname, orders.shipcity, orders.shipcountry  from orders left join orderdetails  on orders.orderid = orderdetails.orderid left join shippers on orders.shipvia=shippers.shipperid group by (orders.orderid) ORDER BY orders.orderid ASC;", {
                        logging: function (sql) {
                            sqlReq_5 += sql;
                        },
                        raw: true,
                    })];
            case 2:
                _a = _b.sent(), orders = _a[0], meta = _a[1];
                end = performance.now();
                utils_1.writeLog(sqlReq_5, end - start);
                res.status(200).render("./pages/orders", { data: orders });
                return [3 /*break*/, 4];
            case 3:
                err_7 = _b.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.orderPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orderid, sqlReq_6, start, _a, orders, meta, end, sqlReq2_2, start2, _b, products, metaProducts, end2, err_8;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                orderid = req.params["orderid"];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, mainModels_1.Orders.sync({ alter: true })];
            case 2:
                _c.sent();
                return [4 /*yield*/, mainModels_1.Products.sync({ alter: true })];
            case 3:
                _c.sent();
                sqlReq_6 = "";
                start = performance.now();
                return [4 /*yield*/, dbConnect_1.sequelize.query("select orders.customerid ,orders.shipname, count(orders.orderid) as totalproducts, SUM(orderdetails.quantity) as totalquantity, SUM(orderdetails.quantity * orderdetails.unitprice) as totalprice, SUM(orderdetails.quantity * orderdetails.discount) as totaldiscount, orders.shipvia, orders.freight, orders.orderdate, orders.shippeddate, orders.shipcity, orders.shipregion, orders.shippostalcode, orders.shipcountry from orders left join orderdetails on orders.orderid = orderdetails.orderid left join shippers on orders.shipvia=shippers.shipperid where orders.orderid = " + orderid + " group by (orders.orderid) ORDER BY orders.orderid ASC;", {
                        logging: function (sql) {
                            sqlReq_6 += sql;
                        },
                        raw: true,
                    })];
            case 4:
                _a = _c.sent(), orders = _a[0], meta = _a[1];
                end = performance.now();
                utils_1.writeLog(sqlReq_6, end - start);
                sqlReq2_2 = "";
                start2 = performance.now();
                return [4 /*yield*/, dbConnect_1.sequelize.query("select orderdetails.productid, products.productname, orderdetails.quantity, orderdetails.unitprice as orderprice, (orderdetails.unitprice * orderdetails.quantity) as totalprice, (orderdetails.discount * orderdetails.quantity) as discount from orderdetails left join products on orderdetails.productid = products.productid where orderdetails.orderid = " + orderid + ";", {
                        logging: function (sql) {
                            sqlReq2_2 += sql;
                        },
                        raw: true,
                    })];
            case 5:
                _b = _c.sent(), products = _b[0], metaProducts = _b[1];
                end2 = performance.now();
                utils_1.writeLog(sqlReq2_2, end2 - start2);
                res.status(200).render("./pages/definedOrder", {
                    data: orders[0],
                    dataProducts: products,
                });
                return [3 /*break*/, 7];
            case 6:
                err_8 = _c.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_8);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.suppliersPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlReq_7, start, suppliers, end, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mainModels_1.Supplies.sync({ alter: true })];
            case 1:
                _a.sent();
                sqlReq_7 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Supplies.findAll({
                        logging: function (sql) {
                            sqlReq_7 += sql;
                        },
                    })];
            case 2:
                suppliers = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_7, end - start);
                res.status(200).render("./pages/suppliers", { data: suppliers });
                return [3 /*break*/, 4];
            case 3:
                err_9 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.supplierPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var supplierid, sqlReq_8, start, supplier, end, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                supplierid = req.params["supplierid"];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mainModels_1.Supplies.sync({ alter: true })];
            case 2:
                _a.sent();
                sqlReq_8 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Supplies.findOne({
                        logging: function (sql) {
                            sqlReq_8 += sql;
                        },
                        where: { supplierid: supplierid },
                    })];
            case 3:
                supplier = _a.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_8, end - start);
                res.status(200).render("./pages/definedSupplier", { data: supplier });
                return [3 /*break*/, 5];
            case 4:
                err_10 = _a.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_10);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.searchPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var table, searchParam, sqlReq1_2, start1, products, end1, err_11, sqlReq_9, start, customers, end, err_12;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                table = req.query.table;
                searchParam = req.query.parametr;
                console.log("req param", req.query, "table", table, "searchparam", searchParam);
                if (!(table === "products")) return [3 /*break*/, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mainModels_1.Products.sync({ alter: true })];
            case 2:
                _b.sent();
                sqlReq1_2 = "";
                start1 = performance.now();
                return [4 /*yield*/, mainModels_1.Products.findOne({
                        logging: function (sql) {
                            sqlReq1_2 += sql;
                        },
                        where: { productname: searchParam },
                    })];
            case 3:
                products = _b.sent();
                end1 = performance.now();
                utils_1.writeLog(sqlReq1_2, end1 - start1);
                console.log("products", products);
                res.status(200).render("./pages/search", { data: products, table: table });
                return [3 /*break*/, 5];
            case 4:
                err_11 = _b.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_11);
                return [3 /*break*/, 5];
            case 5:
                if (!(table === "customers")) return [3 /*break*/, 10];
                _b.label = 6;
            case 6:
                _b.trys.push([6, 9, , 10]);
                return [4 /*yield*/, mainModels_1.Customers.sync({ alter: true })];
            case 7:
                _b.sent();
                sqlReq_9 = "";
                start = performance.now();
                return [4 /*yield*/, mainModels_1.Customers.findOne({
                        logging: function (sql) {
                            sqlReq_9 += sql;
                        },
                        where: (_a = {},
                            _a[Op.or] = [
                                {
                                    companyname: searchParam,
                                },
                                {
                                    contactname: searchParam,
                                },
                                {
                                    contacttitle: searchParam,
                                },
                            ],
                            _a),
                    })];
            case 8:
                customers = _b.sent();
                end = performance.now();
                utils_1.writeLog(sqlReq_9, end - start);
                console.log("customers", customers);
                res.status(200).render("./pages/search", { data: customers, table: table });
                return [3 /*break*/, 10];
            case 9:
                err_12 = _b.sent();
                dbConnect_1.sequelize.close();
                console.log("Error", err_12);
                return [3 /*break*/, 10];
            case 10:
                res.status(200).render("./pages/search");
                return [2 /*return*/];
        }
    });
}); };
exports.dashboardPage = function (req, res, next) {
    utils_1.readSqlLogs()
        .then(function (logs) {
        var selectCount = logs.split("SELECT").length - 1;
        var whereCount = logs.split("WHERE").length - 1;
        var joinCount = logs.split("JOIN").length - 1;
        var logsArr = logs.split(";\n");
        logsArr.pop();
        var queryCount = logsArr.length;
        res.status(200).render("./pages/dashboard", {
            data: logsArr,
            count: queryCount,
            selectCount: selectCount,
            whereCount: whereCount,
            joinCount: joinCount,
        });
    })
        .catch(function (err) {
        throw Error(err.message);
    });
};
