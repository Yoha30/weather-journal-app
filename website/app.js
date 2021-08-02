/* Global Variables */
const apiKey = "22629635062bf601100e2097235cffa5";
let baseUrl = "http://api.openweathermap.org/";
let weather;
let feelings;
let data;
let temp;
let d = new Date(); // Create a new date instance dynamically with JS
let month = d.getMonth() + 1; // increase month number because getMonth starts with 0
let newDate = month + '.' + d.getDate() + '.' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateWeather)

/* async Function called by event listener */
async function generateWeather(e) {
    weather = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;
    await weatherApiRequest(baseUrl, apiKey, weather);
    getProjectData().then(data => saveApiResponse('/all',
        {
            temp: data,
            date: newDate,
            feelings: feelings.value
        }).then(getProjectData())
    )


}

/* Function to GET Web API Data*/
const weatherApiRequest = async (baseUrl, apiKey, weather) => {
    let link = await fetch(baseUrl + 'data/2.5/weather?zip=' + weather + '&appid=' + apiKey + '&units=metric', data = {})
    try {
        data = await link.json();
        temp = data.main.temp;
        console.log(data.main);
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const saveApiResponse = async (request, response) => {
    var newData = {};
    newData.temp = temp;
    newData.date = newDate;
    newData.feelings = feelings;
    const headers = await fetch('/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
    try {
        data = await response.json();
    } catch (error) {
        console.log("error", error);
    }
};
// Function to GET Project Data
const getProjectData = async () => {
    const header = await fetch('/all');
    try {
        data = await header.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.feelings;

    } catch (error) {
        console.log("error", error);
    }
}
