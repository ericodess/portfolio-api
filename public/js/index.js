const apiExample = document.getElementById('api-example');
const apiResponse = document.getElementById('api-response');

let exampleCode, exampleResponse;
let apiCode = {
    codeType: '',
    codeParam: '',
    codeOptions: {}
};

const setActiveButton = (targetButtonId) => {
    const buttonList = document.getElementsByClassName('api__button');
    const buttonExtraList = document.getElementById(`${targetButtonId}-endpoints-list`)

    for(let index = 0; index < buttonList .length; index ++){
        if(document.getElementById(`${buttonList[index].id}-endpoints-list`) !== null && buttonExtraList !== null){
            document.getElementById(`${buttonList[index].id}-endpoints-list`).style.visibility = 'hidden';
        }

        buttonList[index].classList.remove('--active');
    }

    const currentButton = document.getElementById(targetButtonId);

    currentButton.classList.add('--active');

    if(buttonExtraList !== null){
        buttonExtraList.style.visibility = "visible";
    }

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
    const splittedCodyType = codeType.split('-')[0];

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
        case splittedCodyType:
            apiCode.codeType = codeType;
            apiCode.codeOptions = {method: 'GET'};
            
            switch (splittedCodyType) {
                case 'courses':
                    apiCode.codeParam = '12023154';
        
                    break;
        
                case 'podcasts':
                    apiCode.codeParam = '121';
                    
                    break;
        
                case 'products':
                    apiCode.codeParam = '39';
                    
                    break;
        
                case 'posts':
                    apiCode.codeParam = '681';
        
                    break;
        
                case 'users':
                    apiCode.codeParam = 'Namahcast';
        
                    break;
            };

            break;
        
        case `${splittedCodyType}-all`:
            apiCode.codeType = splittedCodyType;
            apiCode.codeOptions = {method: 'GET'};
            apiCode.codeParam = '';

            break;

        case `${splittedCodyType}-author`:
            apiCode.codeType = splittedCodyType;
            apiCode.codeOptions = {method: 'GET'};

            switch (splittedCodyType) {
                case 'courses':
                    apiCode.codeParam = 'author/Fernanda Cunha';

                    break;
        
                case 'podcasts':
                    apiCode.codeParam = 'author/Namahcast';
                    
                    break;
        
                case 'posts':
                    apiCode.codeParam = 'author/Namahblogger';
        
                    break;
        
            };

            break;
    }
    apiCode.codeParam = apiCode.codeParam === '' ? apiCode.codeParam : encodeURI(apiCode.codeParam);

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