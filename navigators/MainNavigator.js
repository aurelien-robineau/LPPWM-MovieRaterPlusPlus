import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/Account'
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={BottomNavigator} />
			<Stack.Screen
				name="Account"
				component={Account}
				options={{ title: 'Mon compte' }}
			/>
		</Stack.Navigator>
	);
}
export default MainNavigator