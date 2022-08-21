import db from "../db.js";

export async function createCake(req, res) {
  const cake = req.body;
  try {
    await db.query(
      `INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4) `,
      [cake.name, cake.price, cake.image, cake.description]
    );
    res.sendStatus(201);
  } catch (error) {
    return console.log(error);
  }
}
