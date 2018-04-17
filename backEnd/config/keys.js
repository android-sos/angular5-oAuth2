const keys = {
    google: {
        clientID: '311396567968-32e16jcnpk5apvs8iqo6q78kek7mbipq.apps.googleusercontent.com',
        clientSecret: 'vC_JJtAXbJOGA7lI0_CZJnqF',
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    session: {
        cookieKey:"1wsxcderfvbgt",
    },
    mongodb: {
        dataBase: 'oauth-cambista-db',
        host: '127.0.0.1'
    },
    token: {
        tokenSecret: 'tokencambistatopsecret',
    }
};
module.exports = keys;