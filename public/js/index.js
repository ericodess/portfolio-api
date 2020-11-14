const apiExample = document.getElementById('api-example');
const apiResponse = document.getElementById('api-response');

let exampleCode, exampleResponse;
let apiCode = {
    codeType: '',
    codeParam: '',
    codeOptions: {}
};

const setActiveButton = (targetButtonId) => {
    const buttonList = document.getElementsByClassName('api__buttons')[0];
    const buttonChildrenList = buttonList.children;

    for(let index = 0; index < buttonChildrenList.length; index ++){
        buttonChildrenList[index].classList.remove('--active');
    }

    const currentButton = document.getElementById(targetButtonId);

    currentButton.classList.add('--active');

    exampleResponse = `
{}`;
    apiResponse.textContent = exampleResponse;
    Prism.highlightElement(apiResponse);
};

const getAPI = () => {
    fetch(`/api/${apiCode.codeType}/${apiCode.codeParam}`,apiCode.codeOptions)
    .then(response => {
        return response.json();
    })
    .then(data => {
        exampleResponse = '\n' + JSON.stringify(data, null, '   ');
        apiResponse.textContent = exampleResponse;
        Prism.highlightElement(apiResponse);
    });
};

const setAPICode = (codeType) => {

    
    switch (codeType) {
        case 'auth':
            const myHeaders = new Headers(); 
            myHeaders.append("Content-Type", "application/json"); 

            apiCode.codeType = codeType;
            apiCode.codeParam = ''
            apiCode.codeOptions = {
                headers: myHeaders,
                method: 'POST',
                body: {
                    email: "namahcast@big-bang-web.br",
                    password: "123456"
                }
            };

            break;

        case 'courses':
            apiCode.codeType = codeType;
            apiCode.codeParam = '12023154';
            apiCode.codeOptions = {method: 'GET'};

            break;

        case 'podcasts':
            apiCode.codeType = codeType;
            apiCode.codeParam = '121';
            apiCode.codeOptions = {method: 'GET'};
            
            break;

        case 'products':
            apiCode.codeType = codeType;
            apiCode.codeParam = '39';
            apiCode.codeOptions = {method: 'GET'};
            
            break;

        case 'posts':
            apiCode.codeType = codeType;
            apiCode.codeOptions = {method: 'GET'};
            apiCode.codeParam = '681';

            break;

        case 'users':
            apiCode.codeType = codeType;
            apiCode.codeOptions = {method: 'GET'};
            apiCode.codeParam = 'Namahcast';

            break;
    }

exampleCode =`
fetch('https://project-namah.herokuapp.com/api/${apiCode.codeType}/${apiCode.codeParam}',${JSON.stringify(apiCode.codeOptions, null, '    ').replace(/[^\w\s:@.'-{}]/gi, '')})
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})`;
    apiCode.codeOptions.body = JSON.stringify(apiCode.codeOptions.body);
    apiExample.textContent = exampleCode;
    setActiveButton(codeType);
    Prism.highlightElement(apiExample);
};

setAPICode('users');

apiExample.textContent = exampleCode;
Prism.highlightElement(apiExample);

apiResponse.textContent = exampleResponse;
Prism.highlightElement(apiResponse);