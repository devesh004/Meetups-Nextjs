// /api/new-meetup  (only for post request)

// The files and folders inside api never be shown in client side.So we can use our credentials here.

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db();
    const meetUpsCollection = db.collection("meetups"); // many collection can be in a database. //simply created a con for meetups
    const result = await meetUpsCollection.insertOne(req.body);
    console.log(result);

    client.close();
    res.status(200).json({ message: "MeetUp inserted" });
  }
};

export default handler;
