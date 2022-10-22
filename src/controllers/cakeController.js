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
    console.log(error);
    return res.sendStatus(500)
  }
}

export async function getCakes(req,res){
  try {
   const {rows: cakes} = await db.query(`SELECT * FROM cakes`)
   if(cakes.length === 0){
    return res.sendStatus(404)
   }
   res.status(200).send(cakes)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}