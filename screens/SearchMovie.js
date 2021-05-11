import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, Image } from 'react-native'
import RatingView from '../components/RatingView'

import OMBdAPI from '../services/OMBdAPI'

const SearchMovie = ({ navigation }) => {
	const [research, setResearch] = useState(null)
	const [movie, setMovie] = useState(null)

	const formatResearch = () => {
		return research
			.toLowerCase()
			.replace(/\s+/g, '_')
	}

	const searchMovie = () => {
		if (research) {
			OMBdAPI.getMovieByName(formatResearch(research))
				.then(res => {
					if (res.data.Response === 'True') {
						setMovie({
							poster: res.data.Poster,
							title: res.data.Title,
							director : res.data.Director,
							rating: Math.round(Number.parseFloat(res.data.imdbRating) / 2),
							releaseDate: new Date(res.data.Released),
							summary: res.data.Plot
						})
					}
					else {
						setMovie(null)
					}
				})
		}
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Recherche"
				onChangeText={setResearch}
				onEndEditing={searchMovie}
				value={research}
			/>
			{movie ?
				<View style={styles.movie}>
					<View style={styles.posterContainer}>
						<Image style={styles.poster} source={{ uri: movie.poster }}/>
					</View>

					<Text style={styles.title}>{ movie.title }</Text>
					<Text style={styles.director}>{ movie.director }</Text>
					<View style={styles.ratingWrapper}>
						<RatingView
							iconSize={30}
							value={movie.rating}
						/>
					</View>

					<Text style={styles.date}>Sorti le { movie.releaseDate.toLocaleDateString() }</Text>

					<Text style={styles.summary}>{ movie.summary }</Text>
				</View>
				:
				<Text style={styles.noResults}>Aucun résultat</Text>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginTop: 20
	},

	movie: {
		marginTop: 20
	},

	posterContainer: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#999999'
	},

	poster: {
		width: 130,
		height: 200
	},

	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 5
	},

	director: {
		fontSize: 18,
		color: '#999999'
	},

	ratingWrapper: {
		width: '45%'
	},

	date: {
		fontSize: 16,
		fontStyle: 'italic'
	},

	summary: {
		fontSize: 16,
		marginTop: 20
	},

	noResults: {
		fontSize: 20,
		textAlign: 'center',
		marginTop: 50
	}
})

export default SearchMovie