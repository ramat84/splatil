module.exports = {
    port: 8081,
    db: {
        host: '127.0.0.1',
        user: 'USERNAME',
        password: 'PASSWORD',
        database: 'DATABASE_NAME'
    },

    jwt: {
        expire: 12 * 30 * 24 * 60 * 60,
        secret: 'MYSECRET'
    }
}
