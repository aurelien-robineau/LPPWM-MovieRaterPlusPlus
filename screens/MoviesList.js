import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet, FlatList, SafeAreaView, Text, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import MovieCard from '../components/MovieCard'
import Movie from '../models/Movie'
import CustomButton from './../components/CustomButton';

const MoviesList = ({ navigation }) => {
	const [movies, setMovies] = useState([])
	const [moviesToDisplay, setMoviesToDisplay] = useState([])
	const [research, setResearch] = useState(null)

	useEffect(() => {
		loadMovies()
	}, [])

	useEffect(() => {
		const focus = navigation.addListener('focus', () => {
			loadMovies()
		})

		return focus
	}, [navigation])

	const loadMovies = async () => {
		const userMovies = (await Movie.getAllForCurrentUser()).sort((a, b) => a.id > b.id)
		setMovies(userMovies)
		setMoviesToDisplay(userMovies)
	}

	const formatResearch = (research) => {
		return research
			.toLowerCase()
			.replace(/\s+/g, '_')
	}

	const searchMovie = (text) => {
		setResearch(text)
		if (text) {
			const formattedResearch = formatResearch(text)
			const matchingMovies = []
			movies.forEach(movie => {
				if (formatResearch(movie.title).includes(formattedResearch)) {
					matchingMovies.push(movie)
				}
			})

			setMoviesToDisplay(matchingMovies)
		}
		else {
			setMoviesToDisplay(movies)
		}
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
		<View style={styles.heightAuto}>
			{ movies.length ?
				<View style={styles.heightAuto}>
					<TextInput
						style={styles.input}
						placeholder="Recherche"
						onChangeText={searchMovie}
						value={research}
					/>
					{moviesToDisplay.length ?
						<SafeAreaView style={[styles.listContainer, styles.heightAuto]}>
							<FlatList
								data={moviesToDisplay}
								renderItem={renderMovie}
								keyExtractor={item => item.id.toString()}
							/>
						</SafeAreaView>
						:
						<View style={styles.noMoviesContainer}>
							<Text style={styles.noMoviesText}>
								Aucun résultat
							</Text>
						</View>
					}
				</View>
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
		</View>
	)
}

const styles = StyleSheet.create({
	heightAuto: {
		height: '100%',
		minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginTop: 10,
		marginHorizontal: 10
	},

	listContainer: {
		paddingBottom: 145,
		paddingTop: 5,
		paddingHorizontal: 8
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