import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'

import CustomButton from '../components/CustomButton'
import RatingView from '../components/RatingView'
import Movie from '../models/Movie'

const DisplayMovie = ({ navigation, route }) => {
	const [movie, setMovie] = useState(null)
	
	useEffect(() => {
		loadMovie()
	}, [])

	const loadMovie = async () => {
		setMovie(await Movie.getById(route.params.id))
	}

	const deleteMovie = async () => {
		await Movie.deleteById(movie.id)
		navigation.navigate('Home')
	}

	const editMovie = () => {
		if (movie)
			navigation.navigate('CreateMovie', { movie })
	}

	return movie && (
		<ScrollView>
			<Image style={styles.poster} source={{ uri: movie.posterURI }} />

			<View style={styles.container}>
				<View style={styles.ratingWrapper}>
					<RatingView iconSize={35} value={movie.rating} />
				</View>

				<Text style={styles.value}>{ movie.summary }</Text>

				<Text style={styles.label}>Mes commentaires</Text>
				<Text style={styles.value}>{ movie.comments }</Text>

				<Text style={styles.label}>Lien IMDB</Text>
				<Text style={styles.value}>{ movie.imdbLink }</Text>

				<View style={styles.controlsContainer}>
					<CustomButton
						label="Modifier"
						onPress={editMovie}
					/>

					<CustomButton
						label="Supprimer"
						onPress={deleteMovie}
						style={{ backgroundColor: '#ff4a4a' }}
					/>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	},

	ratingWrapper: {
		maxWidth: '60%',
		marginTop: 10
	},

	poster: {
		width: '100%',
		height: 225
	},

	label: {
		fontSize: 20,
		marginTop: 20
	},

	value: {
		fontSize: 18,
		marginTop: 5
	},

	controlsContainer: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 20
	}
})

export default DisplayMovie