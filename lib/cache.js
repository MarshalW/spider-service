import sqlite from 'sqlite'
import Promise from 'bluebird'
import fs from 'fs'

const dbPathRoot = __dirname + '/../cache'

let db

async function getDb(from, section) {
    if (!db) {
        // url下每个栏目一个cache数据库
        const dbPath = `${dbPathRoot}/${from}-${section}`
        fs.mkdirSync(`${dbPath}`, { recursive: true })
        const dbPromise = sqlite.open(dbPath + `/db.sqlite`, { Promise })

        db = await dbPromise
    }

    return db
}

// 注意，section='' 只针对undefined，对null不生效
async function isCached(url, from = 'default', section = '') {
    const db = await getDb(from, section)

    await db.all(`
    create table IF NOT EXISTS cache (
        id INTEGER PRIMARY KEY,
        url TEXT NOT NULL UNIQUE,
        timestamp DATE DEFAULT (datetime('now','localtime'))
    )
    `)

    const result = await db.get(`select id from cache where url=?`, url)

    let cached = false

    if (result) {
        cached = true
    } else {
        await db.run('insert into cache (url) values (?)', url)
    }

    return cached
}

export default isCached