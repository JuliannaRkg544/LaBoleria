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
    if (verifyCakeId === 0) {
      console.log("cake id not found ");
      return res.sendStatus(404);
    }
    const cakePrice = await db.query(`SELECT price FROM cakes WHERE id = $1 `, [order.cakeId]) 
    let totalPrice = Number(cakePrice.rows[0].price)*order.quantity
    console.log(typeof Number(cakePrice.rows[0].price))
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
