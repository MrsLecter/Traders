import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL);

interface Regions
  extends Model<InferAttributes<Regions>, InferCreationAttributes<Regions>> {
  regionid: CreationOptional<number>;
  regiondescription: string;
}

export const Regions = sequelize.define<Regions>(
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

interface Territories
  extends Model<
    InferAttributes<Territories>,
    InferCreationAttributes<Territories>
  > {
  territoryid: number;
  territorydescription: string;
  regionid: number;
}

export const Territories = sequelize.define<Territories>(
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

interface Employees
  extends Model<
    InferAttributes<Employees>,
    InferCreationAttributes<Employees>
  > {
  employeeid: number;
  lastname: string;
  firstname: string;
  title: string;
  titleofcourtesy: string;
  birthdate: string;
  hiredate: string;
  address: string;
  city: string;
  region: string;
  postalcode: number;
  country: string;
  homephone: string;
  extension: string;
  notes: string;
  reportsto: number;
}

export const Employees = sequelize.define<Employees>(
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

interface EmployeesTerritories
  extends Model<
    InferAttributes<EmployeesTerritories>,
    InferCreationAttributes<EmployeesTerritories>
  > {
  employeeid: number;
  territoryid: number;
}

export const EmployeesTerritories = sequelize.define<EmployeesTerritories>(
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

interface Customers
  extends Model<
    InferAttributes<Customers>,
    InferCreationAttributes<Customers>
  > {
  customerid: string;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  Region: null | string;
  postalcode: string;
  country: string;
  phone: string;
  fax: string;
}

export const Customers = sequelize.define<Customers>(
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

interface Categories
  extends Model<
    InferAttributes<Categories>,
    InferCreationAttributes<Categories>
  > {
  categoryid: number;
  categoryname: string;
  description: string;
}

export const Categories = sequelize.define<Categories>(
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

interface Shippers
  extends Model<InferAttributes<Shippers>, InferCreationAttributes<Shippers>> {
  shipperid: number;
  companyname: string;
  phone: string;
}

export const Shippers = sequelize.define<Shippers>(
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

interface Supplies
  extends Model<InferAttributes<Supplies>, InferCreationAttributes<Supplies>> {
  supplierid: number;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  region: string;
  postalcode: string;
  country: string;
  phone: string;
  fax: string;
  homepage: string;
}

export const Supplies = sequelize.define<Supplies>(
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

interface Products
  extends Model<InferAttributes<Products>, InferCreationAttributes<Products>> {
  productid: number;
  productname: string;
  supplierid: number;
  categoryid: number;
  quantityperunit: string;
  unitprice: number;
  unitinstock: number;
  unitsonorder: number;
  reorderlevel: number;
  discontinued: number;
}

export const Products = sequelize.define<Products>(
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

interface Orders
  extends Model<InferAttributes<Orders>, InferCreationAttributes<Orders>> {
  orderid: number;
  customerid: string;
  employeeid: number;
  orderdate: Date;
  requiredate: Date;
  shippeddate: Date;
  shipvia: number;
  freight: number;
  shipname: string;
  shipaddress: string;
  shipcity: string;
  shipregion: string;
  shippostalcode: string;
  shipcountry: string;
}

export const Orders = sequelize.define<Orders>(
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

interface OrderDetails
  extends Model<
    InferAttributes<OrderDetails>,
    InferCreationAttributes<OrderDetails>
  > {
  orderid: number;
  productid: number;
  unitprice: number;
  quantity: number;
  discount: number;
}

export const OrderDetails = sequelize.define<OrderDetails>(
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
