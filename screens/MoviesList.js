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
		setMovies((await Movie.getAllForCurrentUser()).sort((a, b) => a.id > b.id))
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
					keyExtractor={item => item.id.toString()}
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
	}
})

export default MoviesList