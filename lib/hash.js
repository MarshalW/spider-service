import crypto from 'crypto'

function hash(data){
    return crypto.createHash('md5').update(data).digest("hex")
}

export default hash