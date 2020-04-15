function getItem(log) {
    if (log.startsWith('{"message":')) {
        return JSON.parse(log)
    }

    return {}
}

export default getItem