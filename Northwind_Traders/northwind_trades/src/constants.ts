export const QUERY_ORDERS_PAGE =
  "SELECT orders.orderid ,count(orders.orderid) as products, SUM(orderdetails.quantity * orderdetails.unitprice) as totalprice, SUM(orderdetails.quantity) as quantity, orders.shippeddate, orders.shipname, orders.shipcity, orders.shipcountry  FROM orders LEFT JOIN orderdetails  on orders.orderid = orderdetails.orderid LEFT JOIN shippers on orders.shipvia=shippers.shipperid group by (orders.orderid) ORDER BY orders.orderid ASC;";

export const QUERY_DEFINED_ORDER = (orderid: string) =>
  `SELECT orders.customerid ,orders.shipname, count(orders.orderid) as totalproducts, SUM(orderdetails.quantity) as totalquantity, SUM(orderdetails.quantity * orderdetails.unitprice) as totalprice, SUM(orderdetails.quantity * orderdetails.discount) as totaldiscount, orders.shipvia, orders.freight, orders.orderdate, orders.shippeddate, orders.shipcity, orders.shipregion, orders.shippostalcode, orders.shipcountry FROM orders LEFT JOIN orderdetails on orders.orderid = orderdetails.orderid LEFT JOIN shippers on orders.shipvia=shippers.shipperid where orders.orderid = ${orderid} group by (orders.orderid) ORDER BY orders.orderid ASC;`;

export const QUERY_DEFINED_PRODUCT = (orderid: string) =>
  `SELECT orderdetails.productid, products.productname, orderdetails.quantity, orderdetails.unitprice as orderprice, (orderdetails.unitprice * orderdetails.quantity) as totalprice, (orderdetails.discount * orderdetails.quantity) as discount FROM orderdetails LEFT JOIN products on orderdetails.productid = products.productid where orderdetails.orderid = ${orderid};`;
