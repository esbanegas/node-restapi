import { Router } from "express";

const router = Router();

//Database connection
import { connect } from "../database";
import { ObjectID } from "mongodb";

router.get("/", async (req, res) => {
  const db = await connect();

  const result = await db.collection("tasks").find({}).toArray();

  res.json(result);
});

router.post("/", async (req, res) => {
  const db = await connect();

  const { title, description } = req.body;

  const task = {
    title,
    description,
  };

  const result = await db.collection("tasks").insertOne(task);

  res.json(result.ops[0]);
});

router.get("/:id", async (req, res) => {
  const db = await connect();

  const { id } = req.params;

  const result = await db.collection("tasks").findOne({ _id: ObjectID(id) });

  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const db = await connect();
  const { id } = req.params;

  const result = await db.collection("tasks").deleteOne({ _id: ObjectID(id) });

  res.json(result);
});

router.put("/:id", async (req, res) => {
  const db = await connect();

  const { id } = req.params;
  const { title, description } = req.body;
  const task = {
    title,
    description,
  };

  const result = await db
    .collection("tasks")
    .updateOne({ _id: ObjectID(id) }, { $set: task });

  res.json(result);
});

export default router;
