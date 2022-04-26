import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../components/meetups/MeetupDetail'

export default function MeetupDetails(props) {
	const { image, title, address, description } = props.meetupData
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>
			<MeetupDetail
				image={image}
				title={title}
				address={address}
				description={description}
			/>
		</>
	)
}

export const getStaticPaths = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://jordao:ljmpr1616@cluster0.7anjc.mongodb.net/meetups?retryWrites=true&w=majority'
	)
	const db = await client.db()
	const meetupsCollection = db.collection('meetups')
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()
	client.close()

	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: { meetupId: meetup._id.toString() },
		})),
	}
}

export const getStaticProps = async context => {
	const { meetupId } = context.params
	// fetch data for a single meetup
	const client = await MongoClient.connect(
		'mongodb+srv://jordao:ljmpr1616@cluster0.7anjc.mongodb.net/meetups?retryWrites=true&w=majority'
	)
	const db = await client.db()
	const meetupsCollection = db.collection('meetups')
	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	})
	client.close()

	const { title, address, image, description } = selectedMeetup
	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title,
				address,
				image,
				description,
			},
		},
	}
}
