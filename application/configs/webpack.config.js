const { EnvironmentPlugin } = require('webpack');
// const Dotenv = require('dotenv')

// Dotenv.config();

module.exports = {
    plugins: [
        new EnvironmentPlugin([
            'API_URL',
            'PDF_URL',
            'PRINT_URL',
            'FILE_URL',
            'USERNAME',
            'PASSWORD'
        ])
    ]
};