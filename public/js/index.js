const exampleCode =`
fetch('https://project-namah.herokuapp.com/api/posts/681',{
    method: 'GET'
})
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})`;

const apiExample = document.getElementById('api-example');
apiExample.textContent = exampleCode;
Prism.highlightElement(apiExample);

let exampleResponse = `
{}`;

const apiResponse = document.getElementById('api-response');
apiResponse.textContent = exampleResponse;
Prism.highlightElement(apiResponse);

const getAPI = () => {
    fetch('/api/posts/681',{
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        exampleResponse = '\n' + JSON.stringify(data, null, '   ');
        apiResponse.textContent = exampleResponse;
        Prism.highlightElement(apiResponse);
    });
};