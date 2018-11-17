// Use the TeamTreehouse API to fetch scores based on username.

// 1. get username from command line
// 2. create get request based on username in this format:
//  https://teamtreehouse.com/scottratigan.json
// 3. parse the JSON object to get points
// 4. display points
// 5. along the way, catch any errors that may occur

// example:
// node treehousescore.js ScottRatigan chalkers alenaholligan davemcfarland

const https = require('https');
const urlPrefix = 'https://teamtreehouse.com/';
const urlSuffix = '.json'
const usernameValidationRegEx = new RegExp(/^[a-zA-Z0-9]+$/); // alphanumeric pattern match - letters and numbers only, no spaces or special characters.
let username, argumentIndex = 1; // first index checked will be 2, arguments 1 and 2 display directory information.

if (!process.argv[2]) { // If no command line arguments are displayed, explain input required.
    console.error('You must supply one or more TeamTreehouse usernames!');
    console.error('Example: node treehousescore.js ScottRatigan');
    return;
}

do { // loop through command line arguments checking each score as we go, until we run out of usernames:
    argumentIndex++;
    username = process.argv[argumentIndex];
    if (username) {
        let usernameIsPotentiallyValid = usernameValidationRegEx.test(username);
        if (usernameIsPotentiallyValid) {
            // if Regular Expression match is true, username is comprised entirely of alphanumeric characters.
            // AKA safe to look up:
            getTreehouseJavaScriptScore(username);
        }
        else {
            console.error(`There's no way '${username}' is a valid username. Not sending request.`);
        }
    }
} while(username)

function getTreehouseJavaScriptScore(username) { // Function to actually retrieve scores from TeamTreehouse API:
    try {
        const requestURL = urlPrefix + username + urlSuffix;
        console.log('Requesting...', requestURL);
        const request = https.get(requestURL, (res) => {
            let fullResponse = '';
            res.on('data', (data) => {
                fullResponse += data.toString();
            });
            res.on('end', () => {
                if (res.statusCode === 200) { // 200 response means get request is valid.
                    try { // Putting JSON parsing in a try/catch block in case the response is mangled somehow.
                        // (Should not be possible to get this error unless TeamTreehouse disables the API or it returns malformed JSON.)
                        const jsonResponse = JSON.parse(fullResponse);
                        let points = 0;
                        points = jsonResponse.points.JavaScript;
                        console.log(`User ${username} has ${points} JavaScript points.`);
                    } catch (error) {
                        console.error('Response failed to parse with JSON.parse() method.');
                    }
                }
                else {
                    console.error(`Unable to retrieve points for username ${username}`);
                }
            });
        });
        request.on('error', (error) => {
            console.error('Error: ', error.message);
        });
    } catch (error) { // catch errors on the request itself (bad formatting of request, etc)
        console.error('Error', error.message);
    };   
}
