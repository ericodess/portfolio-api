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
        exampleResponse =`
{
    "success": ${data.success},
    "posts": {
        "posts_id": ${data.posts.post_id},
        "posts_title": "${data.posts.post_title}",
        "posts_author": "${data.posts.post_author}"
    }
}`;
        apiResponse.textContent = exampleResponse;
        Prism.highlightElement(apiResponse);
    });
};