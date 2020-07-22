var apiID = config.NAppID;
var apiKey = config.NAppKey;

/**
 * Use user input to search for possible foods
 */
function foodSearch() {
    let userfood = document.getElementById('foodInput').value;
    let url = 'https://trackapi.nutritionix.com/v2/search/instant?query=' + userfood;
    let myHeaders = new Headers({ 
        'x-app-id': apiID,
        'x-app-key': apiKey
    });

    fetch(url, {
        headers: myHeaders
    })
    .then((response) => response.json())
    .then((foodOptions)  => {
    console.log(foodOptions);
    })
}

/**
 * retrieve nutrition info for McDonald's medium vanilla shake
 */
function getShake() {
    getBranded("513fc9e73fe3ffd4030011a4");
}

/**
 * retrieve nutrition info for Five Guys' little fries
 */
function getFries() {
    getBranded("521b95cb4a56d006d578b9b0");
}

/**
 * retrieve nutrition info for typical chicken breast.
 */
function getChicken() {
    getCommon("grilled chicken breast");

    /** 
    let url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    let myHeaders = new Headers({
        'content-type': 'application/json',
        'x-app-id': apiID,
        'x-app-key': apiKey,
        'x-remote-user-id': '0'
    });
    let myBody = '{"query":"grilled chicken breast"}'

    fetch(url, {method: "POST", headers: myHeaders, body:myBody })
    .then((response) => response.json())
    .then((calorieInfo)  => {
    console.log(calorieInfo);
    })
    */
}

/**
* Retrieve nutrition info for a branded food
 */
function getBranded(itemID) {
    let url = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=' + itemID;
    let myHeaders = new Headers({
        'x-app-id': apiID,
        'x-app-key': apiKey
    });

    fetch(url, {
        headers: myHeaders
    })
    .then((response) => response.json())
    .then((calorieInfo)  => {
    console.log(calorieInfo);
    })
}
 

 /**
 * Retrieve nutrition info for a common food 
  */
  function getCommon(query) {
    let url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    let myHeaders = new Headers({
        'content-type': 'application/json',
        'x-app-id': apiID,
        'x-app-key': apiKey,
        'x-remote-user-id': '0'
    });

    //let myBody = ' {"query":"grilled chicken breast"}'


    let myBody = '{"query": "' + query + '"}'
    console.log(myBody);

    fetch(url, {method: "POST", headers: myHeaders, body:myBody })
    .then((response) => response.json())
    .then((calorieInfo)  => {
    console.log(calorieInfo);
    })
}