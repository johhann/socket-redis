const moment = require('moment');
const { exec } = require('child_process');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

function sendMessage(message = null) {
    exec(`php artisan message:store ${message}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return;
        }

        console.log(`Command output: ${stdout}`);
    });
}

module.exports = { formatMessage, sendMessage };
