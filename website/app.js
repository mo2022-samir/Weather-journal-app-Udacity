/* Global Variables */
const APIKey = '5eef825a28216f5cbba55f9b2c4fdd21&units=imperial';
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() +1) +'.'+ d.getDate()+'.'+ d.getFullYear();


// add event for btn to collect data
generate.addEventListener('click', async () => {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    // first step 
    // Fetch Data of temperature and get it grom external API  
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKey}`;
    const response = await fetch(url).then( res => res.json());
    const temp = await response.main.temp;   
    // second step
    // declare post resquest and date it will be in body
    await fetch('/sendData',{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            newDate,
            temp,
            feelings
        })
    })
    // third step
    // Update UI accordingly to data i get from server
    const resultData = await fetch('/getData').then(res => res.json());
    document.getElementById('date').innerHTML = `Current Date: ${resultData.date}`;
    document.getElementById('temp').innerHTML = `Current temp: ${resultData.temp} `;
    document.getElementById('content').innerHTML = `Feeling is: ${resultData.feelings}`;    
})

