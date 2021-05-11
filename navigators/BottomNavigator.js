import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import MoviesList from '../screens/MoviesList'
import CreateMovie from '../screens/CreateMovie'
import DisplayMovie from '../screens/DisplayMovie'

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'Home') {
					iconName = 'bookmark'
					} else if (route.name === 'DisplayMovie') {
						iconName = 'movie'
					} else if (route.name === 'CreateMovie') {
						iconName = 'add'
					}

					// You can return any component that you like here!
					return <Icon name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: 'black',
				inactiveTintColor: 'gray',
			}}>
			<Tab.Screen
				name="Home"
				component={MoviesList}
				options={({ navigation }) => ({
					title: 'Mes films',
					headerRight: () => (
						<TouchableOpacity onPress={() => navigation.navigate('Account')}>
							<Icon
								name="account-circle"
								size={24}
								color='black'
								style={{ marginRight: 20 }}
							/>
						</TouchableOpacity>
					)
				})}
			/>
			<Tab.Screen
				name="DisplayMovie"
				component={DisplayMovie}
				options={({ navigation, route }) => ({
					title: route.params?.name ?? 'Film',
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
			<Tab.Screen
				name="CreateMovie"
				component={CreateMovie}
				options={{ title: 'Nouveau film' }}
			/>
		</Tab.Navigator>
	);
}
export default BottomNavigator