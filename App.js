import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'

import MoviesList from './screens/MoviesList'
import CreateMovie from './screens/CreateMovie'
import DisplayMovie from './screens/DisplayMovie'

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={MoviesList}
					options={{ title: 'Mes films' }}
				/>
				<Stack.Screen
					name="CreateMovie"
					component={CreateMovie}
					options={{ title: 'Nouveau film' }}
				/>
				<Stack.Screen
					name="DisplayMovie"
					component={DisplayMovie}
					options={({ navigation, route }) => ({
						title: route.params.name,
						headerLeft: () => (
							<TouchableOpacity onPress={() => navigation.navigate('Home')}>
								<Icon
									name="arrow-back"
									size={24}
									color='black'
									style={{ marginLeft: 14 }}
								/>
							</TouchableOpacity>
						)
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default App