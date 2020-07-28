var apiID = config.NAppID;
var apiKey = config.NAppKey;

/**
* Retrieve nutrition info for a branded food
 */
async function getBranded(itemID) {
    let url = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=' + itemID;
    let myHeaders = new Headers({
        'x-app-id': apiID,
        'x-app-key': apiKey
    });

    const nutritionInfo = fetch(url, {
        headers: myHeaders
    })
    .then((response) => response.json())
    return await nutritionInfo;
}

 /**
 * Retrieve nutrition info for a common food 
  */
   async function getCommon(query) {
    let url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    let myHeaders = new Headers({
        'content-type': 'application/json',
        'x-app-id': apiID,
        'x-app-key': apiKey,
        'x-remote-user-id': '0'
    });
    let myBody = '{"query": "' + query + '"}';

    const nutritionInfo = fetch(url, {method: "POST", headers: myHeaders, body:myBody })
    .then((response) => response.json());
    return await nutritionInfo;
}

/**
*Retrieve food search results from user input
 */
function getFoodSearchJSON(food) {
    if (!search.value) {
        matchList.innerHTML = '';
        return;
    }
    let url = 'https://trackapi.nutritionix.com/v2/search/instant?query=' + food;
    let myHeaders = new Headers({ 
        'x-app-id': apiID,
        'x-app-key': apiKey
    });

    fetch(url, {
        headers: myHeaders
    })
    .then((response) => response.json())
    .then((foodOptions)  => {
    addToDOM(foodOptions);
    })
}

/**
*Add search results to web page
*/
function addToDOM(response) {
    matchList.innerHTML = '';
    let i = 0
    for (food of response.common) {
        if (i == 5) {
            break;
        }
        let a = document.createElement("li");
        a.innerText = "Common Food:" + food.food_name;
        a.setAttribute("type", "common");
        a.setAttribute("query", food.food_name);
        a.setAttribute("onclick", 'printCalories(this);')
        matchList.appendChild(a);
        i += 1;
    }
    let j = 0;
    for (food of response.branded) {
        if (j == 5) {
            break;
        }
        let a = document.createElement("li");
        a.innerText = food.brand_name + " " + food.food_name;
        a.setAttribute("type", "branded");
        a.setAttribute("id", food.nix_item_id);
        a.setAttribute("onclick", 'printCalories(this);')
        matchList.appendChild(a);
        j += 1;
    }
}

/**
* Retrieve nutrition info for food that user clicks 
 */
async function printCalories(element) {
    let type = element.getAttribute("type");
    console.log(type);
    if (type == "common") {
        let query = element.getAttribute("query");
        let nutrition = await getCommon(query)
        console.log(nutrition);
        let calories = nutrition.foods[0].nf_calories;
        console.log("This item has " + calories + " calories.");
    }
    if (type == "branded") {
        let id = element.getAttribute("id");
        let nutrition = await getBranded(id);
        console.log(nutrition);
        let calories = nutrition.foods[0].nf_calories;
        console.log("This item has " + calories + " calories.");
    }
}

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

search.addEventListener('input', () => getFoodSearchJSON(search.value));