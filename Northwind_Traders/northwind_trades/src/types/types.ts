export type SuppliersType = {
  supplierid: number;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  region: null | string;
  postalcode: string;
  country: string;
  phone: string;
  fax: string | null;
  homepage: null;
};

export type ProductsType = {
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
};

export type OrdersType = {
  orderid: number;
  products: string;
  totalprice: number;
  quantity: string;
  shippeddate: Date;
  shipname: string;
  shipcity: string;
  shipcountry: string;
};

export type DefinedOrderType = {
  customerid: string;
  shipname: string;
  totalproducts: string;
  totalquantity: string;
  totalprice: number;
  totaldiscount: number;
  shipvia: number;
  freight: number;
  orderdate: Date;
  shippeddate: Date;
  shipcity: string;
  shipregion: null | string;
  shippostalcode: string;
  shipcountry: string;
};

export type EmployeesType = {
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
};

export type CustomersType = {
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
};
