const apiExample = document.getElementById('api-example');
const apiResponse = document.getElementById('api-response');

let exampleCode, exampleResponse;
let apiCode = {
    codeType: '',
    codeParam: '',
    codeBranch: '',
    codeOptions: {}
};

const setActiveButton = (targetButtonId) => {
    const buttonList = document.getElementsByClassName('api__button');
    const buttonExtraList = document.getElementById(`${targetButtonId}-endpoints-list`);

    for(let index = 0; index < buttonList.length; index ++){
        let currentButton = buttonList[index];

        if(document.getElementById(`${currentButton.id}-endpoints-list`) !== null && buttonExtraList !== null){
            document.getElementById(`${currentButton.id}-endpoints-list`).style.display = 'none';
        }

        currentButton.classList.remove('--active');
    };

    const currentButton = document.getElementById(targetButtonId);

    currentButton.classList.add('--active');

    if(buttonExtraList !== null){
        buttonExtraList.style.display = 'flex';
    }

    for(let index = 0; index < buttonList.length; index ++){
        let currentElement = buttonList[index];

        if(currentButton.parentElement.id !== `${currentElement.id.split('-')[0]}-endpoints-list`){
            if(currentElement.id !== currentButton.id && document.getElementById(`${currentElement.id}-endpoints-list`)){
                document.getElementById(`${currentElement.id}-endpoints-list`).style.display = 'none'
            }
        }
    };

    exampleResponse = `
{}`;
    apiResponse.textContent = exampleResponse;
    Prism.highlightElement(apiResponse);
};

const getAPI = () => {
    fetch(`/api/${apiCode.codeBranch}/${apiCode.codeType}/${apiCode.codeParam}`,apiCode.codeOptions)
    .then(response => {
        return response.json();
    })
    .then(data => {
        exampleResponse = '\n' + JSON.stringify(data, null, '   ');

        apiResponse.textContent = exampleResponse;
        Prism.highlightElement(apiResponse);
    });
};

const setAPICode = ({codeBranch,codeType,codeParam}) => {
    codeParam = codeParam ?? '';
    codeBranch = codeBranch ?? 'v1';

    const splittedCodyType = codeType.split('-')[0];

    if(splittedCodyType === 'auth'){
        const myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json"); 

        apiCode.codeType = splittedCodyType;
        apiCode.codeOptions = {
            headers: myHeaders,
            method: "'POST'",
            body: {
                email: "'namahcast@big-bang-web.br'",
                password: "'123456'"
            }
        };
    }else{
        apiCode.codeType = splittedCodyType;
        apiCode.codeOptions = {method: "'GET'"};
    }

    apiCode.codeBranch = codeBranch;
    apiCode.codeParam = codeParam === '' ? codeParam : encodeURI(codeParam);

exampleCode =`
fetch('https://project-namah.herokuapp.com/api/${apiCode.codeBranch}/${apiCode.codeType}/${apiCode.codeParam}',${JSON.stringify(apiCode.codeOptions, null, '    ').replace(/[^\w\s:@.'-{}]/gi, '')})
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})`;
    if(apiCode.codeOptions.body !== null && apiCode.codeOptions.body !== undefined){
        apiCode.codeOptions.body = JSON.stringify(apiCode.codeOptions.body).replace(/[']/g, "");
    };
    apiCode.codeOptions.method = apiCode.codeOptions.method.replace(/[']/g, "");

    apiExample.textContent = exampleCode;

    setActiveButton(codeType);
    Prism.highlightElement(apiExample);
};

setAPICode({
    codeBranch: 'v1',
    codeType:'auth'
});