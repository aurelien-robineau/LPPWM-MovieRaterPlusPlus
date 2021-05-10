import AsyncStorage from '@react-native-async-storage/async-storage'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export default class User {
	constructor(username, password) {
		this.id       = null
		this.username = username
		this.password = password
	}

	async save () {
		const value = await AsyncStorage.getItem('@users')
		let users = value ? JSON.parse(value) : []

		const lastId = (await User.getLastId()) + 1
		this.id = lastId
		await User.setLastId(lastId)

		this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
		users.push(this)

		await AsyncStorage.setItem('@users', JSON.stringify(users))
	}

	static async login(username, password) {
		const value = await AsyncStorage.getItem('@users')
		const users = value ? JSON.parse(value) : []

		const JSONUser = users.filter(user => user.username === username)[0] ?? null

		if (JSONUser && await bcrypt.compare(password, JSONUser.password)) {
			return true
		}

		return false
	}

	static async getLastId() {
		const lastId = (await AsyncStorage.getItem('@lastUserId')) ?? null
		return lastId ? Number.parseInt(lastId) : 0
	}

	static async setLastId(id) {
		await AsyncStorage.setItem('@lastUserId', id.toString())
	}
}