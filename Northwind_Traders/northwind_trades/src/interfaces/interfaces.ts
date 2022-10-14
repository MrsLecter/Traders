import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export interface RegionsInterface
  extends Model<
    InferAttributes<RegionsInterface>,
    InferCreationAttributes<RegionsInterface>
  > {
  regionid: CreationOptional<number>;
  regiondescription: string;
}

export interface TerritoriesInterface
  extends Model<
    InferAttributes<TerritoriesInterface>,
    InferCreationAttributes<TerritoriesInterface>
  > {
  territoryid: number;
  territorydescription: string;
  regionid: number;
}

export interface EmployeesInterface
  extends Model<
    InferAttributes<EmployeesInterface>,
    InferCreationAttributes<EmployeesInterface>
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

export interface EmployeesTerritoriesInterface
  extends Model<
    InferAttributes<EmployeesTerritoriesInterface>,
    InferCreationAttributes<EmployeesTerritoriesInterface>
  > {
  employeeid: number;
  territoryid: number;
}

export interface CustomersInterface
  extends Model<
    InferAttributes<CustomersInterface>,
    InferCreationAttributes<CustomersInterface>
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

export interface CategoriesInterface
  extends Model<
    InferAttributes<CategoriesInterface>,
    InferCreationAttributes<CategoriesInterface>
  > {
  categoryid: number;
  categoryname: string;
  description: string;
}

export interface ShippersInterface
  extends Model<
    InferAttributes<ShippersInterface>,
    InferCreationAttributes<ShippersInterface>
  > {
  shipperid: number;
  companyname: string;
  phone: string;
}

export interface SuppliesInterface
  extends Model<
    InferAttributes<SuppliesInterface>,
    InferCreationAttributes<SuppliesInterface>
  > {
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

export interface ProductsInterface
  extends Model<
    InferAttributes<ProductsInterface>,
    InferCreationAttributes<ProductsInterface>
  > {
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

export interface OrdersInterface
  extends Model<
    InferAttributes<OrdersInterface>,
    InferCreationAttributes<OrdersInterface>
  > {
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

export interface OrderDetailsInterface
  extends Model<
    InferAttributes<OrderDetailsInterface>,
    InferCreationAttributes<OrderDetailsInterface>
  > {
  orderid: number;
  productid: number;
  unitprice: number;
  quantity: number;
  discount: number;
}
