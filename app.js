import readline from 'readline'

import isCached from './lib/cache'
import getItem from './lib/item'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

// 处理策略是：
// - 如果不存在 message.item，则直接输出
// - 如果 message.item.url 已在缓存中，则不再输出日志
// - 如果 message.item.url 未在缓存中，记录到缓存并输出日志
rl.on('line', async (line) => {
    let value = getItem(line)
    let { message } = value

    if (message && message.item) {
        let { item } = message
        let { from, section } = item
        let cached = await isCached(item.url, from, section)

        if (cached) {
            return
        }

        console.log(JSON.stringify(value))
        return
    }

    console.log(line)
})