import db from "../db.js";

export async function registerOrder(req, res) {
  const order = req.body;
  try {
    const { rows: verifyClientId } = await db.query(
      `SELECT * FROM clients WHERE id=$1`,
      [order.clientId]
    );
    if (verifyClientId.length === 0) {
      console.log("client id not found");
      return res.sendStatus(404);
    }
    const { rows: verifyCakeId } = await db.query(
      `SELECT * FROM cakes WHERE id =$1`,
      [order.cakeId]
    );
    if (verifyCakeId.length === 0) {
      console.log("cake id not found ");
      return res.sendStatus(404);
    }
    const cakePrice = await db.query(`SELECT price FROM cakes WHERE id = $1 `, [
      order.cakeId,
    ]);
    let totalPrice = Number(cakePrice.rows[0].price) * order.quantity;
    console.log(typeof Number(cakePrice.rows[0].price));
    await db.query(
      ` INSERT INTO orders ("clientid","cakeid",quantity, "totalprice") VALUES ($1, $2, $3, $4)`,
      [order.clientId, order.cakeId, order.quantity, totalPrice]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getOrder(req, res) {
  try {
    const { rows: verifyOrder } = await db.query(
      `SELECT ord.id as orderid, ord.clientid, ord.cakeid, ord.quantity, ord.totalprice, ord.createdat,
      ca.name as cakename, ca.price as cakeprice, ca.description as cakedescription, ca.image,
      cli.name as clientname, cli.address as clientaddress, cli.phone as clientphone
      FROM orders ord
      JOIN clients cli ON ord.clientid = cli.id
      JOIN cakes ca ON ord.cakeid = ca.id `
    );
    const order = verifyOrder.map((ord) => {
      const {
        orderid,
        clientid,
        cakeid,
        quantity,
        totalprice,
        createdat,
        cakename,
        cakeprice,
        cakedescription,
        image,
        clientname,
        clientaddress,
        clientphone,
      } = ord;
      return {
        client:{
          id: clientid,
          name: clientname,
          address: clientaddress,
          phone: clientphone
        }, 
        cake:{
          id: cakeid,
          name: cakename,
          price: cakeprice,
          description: cakedescription,
          image: image

        }, 
         orderid,
         createdat,
         quantity,
         totalprice
      };
    });

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
