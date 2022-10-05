"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
require("dotenv").config();
var sequelize = new sequelize_1.Sequelize(process.env.DB_URL);
exports.Regions = sequelize.define("regions", {
    regionid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    regiondescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "regions",
});
exports.Territories = sequelize.define("territories", {
    territoryid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    territorydescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    regionid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: exports.Regions,
            key: "regionid",
        },
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "territories",
});
exports.Employees = sequelize.define("employees", {
    employeeid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    titleofcourtesy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    hiredate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    postalcode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    homephone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    extension: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    reportsto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "employees",
});
exports.EmployeesTerritories = sequelize.define("employeeterritories", {
    employeeid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    territoryid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: exports.Territories,
            key: "territoryid",
        },
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "employeeterritories",
});
exports.Customers = sequelize.define("customers", {
    customerid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    companyname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contactname: {
        type: sequelize_1.DataTypes.STRING,
    },
    contacttitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    Region: {
        type: sequelize_1.DataTypes.STRING,
    },
    postalcode: {
        type: sequelize_1.DataTypes.STRING,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    fax: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "customers",
});
exports.Categories = sequelize.define("categories", {
    categoryid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "categories",
});
exports.Shippers = sequelize.define("shippers", {
    shipperid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    companyname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "shippers",
});
exports.Supplies = sequelize.define("supplies", {
    supplierid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    companyname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contactname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contacttitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: sequelize_1.DataTypes.STRING,
    },
    postalcode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fax: {
        type: sequelize_1.DataTypes.STRING,
    },
    homepage: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "supplies",
});
exports.Products = sequelize.define("products", {
    productid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    supplierid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: exports.Supplies,
            key: "supplierid",
        },
    },
    categoryid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: exports.Categories,
            key: "categoryid",
        },
    },
    quantityperunit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    unitprice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    unitinstock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unitsonorder: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reorderlevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    discontinued: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "products",
});
exports.Orders = sequelize.define("orders", {
    orderid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: "orderid",
    },
    customerid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: exports.Customers,
            key: "customerid",
        },
    },
    employeeid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: exports.Employees,
            key: "employeeid",
        },
    },
    orderdate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    requiredate: {
        type: sequelize_1.DataTypes.DATE,
    },
    shippeddate: {
        type: sequelize_1.DataTypes.DATE,
    },
    shipvia: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: exports.Shippers,
            key: "shipperid",
        },
    },
    freight: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    shipname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shipaddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shipcity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shipregion: {
        type: sequelize_1.DataTypes.STRING,
    },
    shippostalcode: {
        type: sequelize_1.DataTypes.STRING,
    },
    shipcountry: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "orders",
});
exports.OrderDetails = sequelize.define("orderdetails", {
    orderid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: exports.Orders,
            key: "orderid",
        },
    },
    productid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: exports.Products,
            key: "productid",
        },
    },
    unitprice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "orderdetails",
});
exports.OrderDetails.hasOne(exports.Orders, { foreignKey: "orderid" });
exports.Orders.belongsTo(exports.OrderDetails, {
    foreignKey: "orderid",
});
exports.OrderDetails.hasOne(exports.Products, { foreignKey: "productid" });
exports.OrderDetails.belongsTo(exports.Products, {
    foreignKey: "productid",
});
exports.Orders.hasOne(exports.Shippers, { foreignKey: "shipvia" });
exports.Orders.belongsTo(exports.Shippers, {
    foreignKey: "shipvia",
});
exports.OrderDetails.hasOne(exports.Products, { foreignKey: "productid" });
exports.OrderDetails.belongsTo(exports.Products, {
    foreignKey: "productid",
});
exports.Supplies.hasOne(exports.Products, { foreignKey: "supplierid" });
exports.Supplies.belongsTo(exports.Products, {
    foreignKey: "supplierid",
});
