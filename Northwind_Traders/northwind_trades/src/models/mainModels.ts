import { Sequelize, DataTypes, Deferrable } from "sequelize";
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_URL);

export const Regions = sequelize.define(
  "regions",
  {
    regionid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    regiondescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "regions",
  },
);

export const Territories = sequelize.define(
  "territories",
  {
    territoryid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    territorydescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Regions,
        key: "regionid",
      },
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "territories",
  },
);

export const Employees = sequelize.define(
  "employees",
  {
    employeeid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleofcourtesy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hiredate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reportsto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "employees",
  },
);

export const EmployeesTerritories = sequelize.define(
  "employeeterritories",
  {
    employeeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    territoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Territories,
        key: "territoryid",
      },
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "employeeterritories",
  },
);

export const Customers = sequelize.define(
  "customers",
  {
    customerid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactname: {
      type: DataTypes.STRING,
    },
    contacttitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    Region: {
      type: DataTypes.STRING,
    },
    postalcode: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    fax: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "customers",
  },
);

export const Categories = sequelize.define(
  "categories",
  {
    categoryid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "categories",
  },
);

export const Shippers = sequelize.define(
  "shippers",
  {
    shipperid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "shippers",
  },
);

export const Supplies = sequelize.define(
  "supplies",
  {
    supplierid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacttitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
    },
    postalcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fax: {
      type: DataTypes.STRING,
    },
    homepage: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "supplies",
  },
);

export const Products = sequelize.define(
  "products",
  {
    productid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supplies,
        key: "supplierid",
      },
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categories,
        key: "categoryid",
      },
    },
    quantityperunit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitinstock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitsonorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reorderlevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discontinued: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "products",
  },
);

export const Orders = sequelize.define(
  "orders",
  {
    orderid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "orderid",
    },
    customerid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Customers,
        key: "customerid",
      },
    },
    employeeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employees,
        key: "employeeid",
      },
    },
    orderdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    requiredate: {
      type: DataTypes.DATE,
    },
    shippeddate: {
      type: DataTypes.DATE,
    },
    shipvia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Shippers,
        key: "shipperid",
      },
    },
    freight: {
      type: DataTypes.FLOAT,
    },
    shipname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipaddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipcity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipregion: {
      type: DataTypes.STRING,
    },
    shippostalcode: {
      type: DataTypes.STRING,
    },
    shipcountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "orders",
  },
);

export const OrderDetails = sequelize.define(
  "orderdetails",
  {
    orderid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      references: {
        model: Orders,
        key: "orderid",
      },
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Products,
        key: "productid",
      },
    },
    unitprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: "orderdetails",
  },
);

OrderDetails.hasOne(Orders, { foreignKey: "orderid" });
Orders.belongsTo(OrderDetails, {
  foreignKey: "orderid",
});

OrderDetails.hasOne(Products, { foreignKey: "productid" });
OrderDetails.belongsTo(Products, {
  foreignKey: "productid",
});

Orders.hasOne(Shippers, { foreignKey: "shipvia" });
Orders.belongsTo(Shippers, {
  foreignKey: "shipvia",
});

OrderDetails.hasOne(Products, { foreignKey: "productid" });
OrderDetails.belongsTo(Products, {
  foreignKey: "productid",
});

Supplies.hasOne(Products, { foreignKey: "supplierid" });
Supplies.belongsTo(Products, {
  foreignKey: "supplierid",
});
