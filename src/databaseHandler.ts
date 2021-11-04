import { openDB } from 'idb'
import { RoomRental } from './model'

const dbLogBook = "LogBook"

initDB().then(() => {
    console.log('Init Done!')
})

export async function insertRoomRental(RoomRental: RoomRental) {
    const db = await openDB(dbLogBook, 1)
    await db.put('LogBook', RoomRental)
}

async function initDB() {
    const db = await openDB(dbLogBook, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('LogBook', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        },
    });
}