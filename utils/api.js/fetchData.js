const url = "https://eu-central-1.aws.data.mongodb-api.com/app/data-jfonh/endpoint/data/v1";

const postData = {
    // Your data to be sent in the request body
    key1: "value1",
    key2: "value2",
};

const requestOptions = {
    method: 'POST', // Specify the HTTP method here
    headers: {
        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        // Add any other headers as needed (e.g., API key)

        "API-key": 'uXZiztLO3tbNI5310pBrcUFJMsrEmlqYLMpaj0tze3GcoC78rUuLOd7IZqyZuDK1',
    },

    body: JSON.stringify(postData), // Convert data to JSON if sending JSON
};

fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // or response.text() depending on the expected response format
    })
    .then(data => {
        // Handle the response data
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
