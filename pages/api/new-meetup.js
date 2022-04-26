import { MongoClient } from 'mongodb'

// url -> /api/new-meetup
// POST /api/new-meetup

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body
		const client = await MongoClient.connect(
			'mongodb+srv://jordao:ljmpr1616@cluster0.7anjc.mongodb.net/meetups?retryWrites=true&w=majority'
		)
		const db = await client.db()
		const meetupsCollection = db.collection('meetups')
		const result = await meetupsCollection.insertOne(data)
		console.log(result)
		client.close()
		res.status(201).json({ message: 'Meetup Inserted!' })
	}
}
