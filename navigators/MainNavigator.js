import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'

import MoviesList from '.././screens/MoviesList'
import CreateMovie from '.././screens/CreateMovie'
import DisplayMovie from '.././screens/DisplayMovie'
import Login from '.././screens/Login'

const Stack = createStackNavigator();

const MainNavigator = () => {
	return (
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
	);
}
export default MainNavigator