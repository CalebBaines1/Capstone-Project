/**
 * Use user input to search for possible foods
 */
function foodSearch() {
    let userfood = document.getElementById('foodInput').value;
    let url = 'https://trackapi.nutritionix.com/v2/search/instant?query=' + userfood;
    let myHeaders = new Headers({ 
        'x-app-id': '85f8ef5f',
        'x-app-key': '7dac3e04e347a6dc70bfd89e404501d3'
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
    let url = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=513fc9e73fe3ffd4030011a4';
    let myHeaders = new Headers({
        'x-app-id': '85f8ef5f',
        'x-app-key': '7dac3e04e347a6dc70bfd89e404501d3'
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
 * retrieve nutrition info for Five Guys' little fries
 */
function getFries() {
    let url = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=521b95cb4a56d006d578b9b0';
    let myHeaders = new Headers({
        'x-app-id': '85f8ef5f',
        'x-app-key': '7dac3e04e347a6dc70bfd89e404501d3'
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
 * retrieve nutrition info for typical chicken breast.
 */
function getChicken() {
    let url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    let myHeaders = new Headers({
        'content-type': 'application/json',
        'x-app-id': '85f8ef5f',
        'x-app-key': '7dac3e04e347a6dc70bfd89e404501d3',
        'x-remote-user-id': '0'
    });
    let myBody = '{"query":"grilled chicken breast"}'

    fetch(url, {method: "POST", headers: myHeaders, body:myBody })
    .then((response) => response.json())
    .then((calorieInfo)  => {
    console.log(calorieInfo);
    })
}