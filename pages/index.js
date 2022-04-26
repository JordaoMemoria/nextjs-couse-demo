import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

export default function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Browse a huge list of highly active React meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	)
}

export const getStaticProps = async () => {
	// fetch data from API

	const client = await MongoClient.connect(
		'mongodb+srv://jordao:ljmpr1616@cluster0.7anjc.mongodb.net/meetups?retryWrites=true&w=majority'
	)
	const db = await client.db()
	const meetupsCollection = db.collection('meetups')
	const meetups = await meetupsCollection.find().toArray()
	client.close()

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	}
}

// export const getServerSideProps = async context => {
// 	const { req, res } = context

// 	// fetch data from an API

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	}
// }
