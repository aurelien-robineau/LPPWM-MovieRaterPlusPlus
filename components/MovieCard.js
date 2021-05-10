import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import RatingView from './RatingView'

const MovieCard = ({ movie, onPress }) => {
  return (
		<TouchableOpacity
			style={styles.card}
			onPress={() => onPress(movie.id)}
		>
			<Image style={styles.image} source={{ uri: movie.posterURI }}/>
			<View style={styles.movieInfo}>
				<Text style={styles.title}>{ movie.title }</Text>
				<RatingView iconSize={30} value={movie.rating} />
			</View>
		</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginVertical: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},

	image: {
		height: 85,
		width: 85
	},

	movieInfo: {
		marginLeft: 15
	},

	title: {
		fontSize: 20
	},

	rating: {
		fontSize: 16
	}
})

export default MovieCard