// Use the TeamTreehouse API to fetch scores based on username.

// 1. get username from command line
// 2. create get request based on username in this format:
//  https://teamtreehouse.com/scottratigan.json
// 3. parse the JSON object to get points
// 4. display points
// 5. along the way, catch any errors that may occur

// example:
// node treehousescore.js ScottRatigan chalkers alenaholligan davemcfarland
const treehouseProfile = require('./treehouseprofile.js');

const usernameValidationRegEx = new RegExp(/^[a-zA-Z0-9]+$/); // alphanumeric pattern match - letters and numbers only, no spaces or special characters.

if (!process.argv[2]) { // If no command line arguments are displayed, explain input required.
    console.error('You must supply one or more TeamTreehouse usernames!');
    console.error('Example: node treehousescore.js ScottRatigan');
    return;
}

const usernames = process.argv.slice(2); // create array of usernames to look up.
usernames.forEach((username) => {
    let usernameIsPotentiallyValid = usernameValidationRegEx.test(username);
    if (usernameIsPotentiallyValid) {
        // if Regular Expression match is true, username is comprised entirely of alphanumeric characters.
        // AKA safe to look up:
        treehouseProfile.getJavaScriptScore(username);
    }
    else {
        console.error(`There's no way '${username}' is a valid username. Not sending request.`);
    }
});






