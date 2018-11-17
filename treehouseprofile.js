const https = require('https');
const urlPrefix = 'https://teamtreehouse.com/';
const urlSuffix = '.json';

function getJavaScriptScore(username) { // Function to actually retrieve scores from TeamTreehouse API:
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

module.exports.getJavaScriptScore = getJavaScriptScore;
