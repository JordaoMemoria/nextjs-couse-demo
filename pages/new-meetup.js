import Head from 'next/head'
import { useRouter } from 'next/router'
import NewMeetupForm from '../components/meetups/NewMeetupForm'

export default function NewMeetupPage() {
	const router = useRouter()

	const addMeetupHandler = async meetupData => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(meetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		console.log('Data:', data)
		router.push('/')
	}

	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Add your own meetups and create amazing networking opporutnities.'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	)
}
