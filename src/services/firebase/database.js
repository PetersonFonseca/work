import { getDatabase } from 'firebase/database'
import { app } from './app.js'

export const database = getDatabase(app)
