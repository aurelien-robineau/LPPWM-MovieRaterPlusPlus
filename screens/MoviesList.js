import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import MovieCard from '../components/MovieCard'
import Movie from '../models/Movie'
import CustomButton from './../components/CustomButton';

const MoviesList = ({ navigation }) => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		loadMovies()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadMovies()
		})

		return unsubscribe
	}, [navigation])

	const loadMovies = async () => {
		setMovies((await Movie.getAll()).sort((a, b) => a.id > b.id))
	}

	const renderMovie = ({ item }) => {
		return (
			<MovieCard
				movie={item}
				onPress={() => navigation.navigate('DisplayMovie', { name: item.title, id: item.id })}
			/>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			{ movies.length ?
				<FlatList
					data={movies}
					renderItem={renderMovie}
					keyExtractor={item => item.id}
				/>
				:
				<View style={styles.noMoviesContainer}>
					<Text style={styles.noMoviesText}>
						Pas de films...
					</Text>
					<CustomButton
						label="En créer un"
						onPress={() => navigation.navigate('CreateMovie')}
					/>
				</View>
			}
			<TouchableOpacity
					style={styles.addMovieButtonContainer}
					onPress={() => navigation.navigate('CreateMovie')}
			>
				<Icon containerStyle={styles.addMovieButton} name="add" size={30} color="white" />
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get('window').height - StatusBar.currentHeight
	},

	noMoviesContainer: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 50
	},

	noMoviesText: {
		fontSize: 18
	},

	addMovieButtonContainer: {
		position: 'absolute',
		right: 25,
		bottom: 30
	},

	addMovieButton: {
		backgroundColor: 'black',
		padding: 15,
		borderRadius: 30
	}
})

export default MoviesList