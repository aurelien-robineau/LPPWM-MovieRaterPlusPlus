import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/Account'
import BottomNavigator from './BottomNavigator'

const Stack = createStackNavigator();

const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={BottomNavigator}
				options={({ navigation }) => ({
					title: 'MovieRater',
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
				})}/>
			<Stack.Screen
				name="Account"
				component={Account}
				options={{ title: 'Mon compte' }}
			/>
		</Stack.Navigator>
	);
}
export default MainNavigator