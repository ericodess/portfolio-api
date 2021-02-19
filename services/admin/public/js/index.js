const isEmailValid = (emailInput) => {
    if(/\S/.test(emailInput)){
        splicedEmail = emailInput.split('@');

        if(splicedEmail.length > 1 && splicedEmail[splicedEmail.length - 1].split('.').length > 1){
            return true;
        };
    };

    return false;
};

const renderFeedback = (feedbackText) => {
    if(/\S/.test(feedbackText)){
        const formSubmitButton = document.getElementById("formSubmitButton"),
              feedbackComponent = document.createElement('span'),
              formComonent = document.getElementById('loginForm');
    
        feedbackComponent.classList.add("form__feedback");
        feedbackComponent.textContent = feedbackText;
        
        formComonent.appendChild(feedbackComponent);

        formSubmitButton.setAttribute('disabled', true);
    };
};

const redirectToLocalService = (service) => {
    if(/\S/.test(service)){
        window.location.replace(`${window.location.origin}/admin/${service}`);  
    };
};

const login = (e) => {
    e.preventDefault();
    
    const loginForm = e.target;

    const formData = new FormData(loginForm);

    const formUsernameInput = formData.get('loginFormUsername'),
          formPasswordInput = formData.get('loginFormPassword');

    if(isEmailValid(formUsernameInput)){
        const formCredentials = {
                email: formUsernameInput,
                password: formPasswordInput
              },
              myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        fetch(loginForm.action, {
            headers: myHeaders,
            method: loginForm.method,
            credentials: 'include',
            body: JSON.stringify(formCredentials)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                redirectToLocalService('dashboard');
            }else{
                renderFeedback(data.description);
            };
        })
        .catch(() => renderFeedback('Please try again'))
    }else{
        renderFeedback('Invalid input');
    };
};

const formFocusHandler = () => {
    if(document.getElementById("formSubmitButton").getAttribute('disabled')){
        const loginForm = document.getElementById('loginForm'),
              formSubmitButton = document.getElementById("formSubmitButton");

        if(loginForm.lastElementChild.tagName === 'SPAN'){
            loginForm.lastElementChild.remove();
    
            formSubmitButton.removeAttribute('disabled');
        };
    };
};

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    };

    return null;
};

const generateInitials = (fullName) => {
    const splittedFullName = fullName.split(' ');
    let initals;

    if(splittedFullName.length > 0){
        const firstName = splittedFullName[0];

        if(splittedFullName.length > 1){
            const middleName = splittedFullName[1];
            
            initals = `${firstName[0]} ${middleName[0]}`
        }else{
            initals = firstName[0];
        };
    }else{
        initals = "null";
    };

    return initals;
};

const insertSVGPaths = (targetSVG, pathList, viewBox) => {
    const targetSVGContainer = document.createElementNS('http://www.w3.org/2000/svg','svg');
    targetSVGContainer.setAttribute('viewBox', viewBox);
    targetSVGContainer.setAttribute('fill', 'none');

    for(const currentPath of pathList){
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg','path');

        for(const [key, value] of Object.entries(currentPath)){
            pathElement.setAttribute(key, value);
        };

        targetSVGContainer.appendChild(pathElement);
    };

    targetSVG.appendChild(targetSVGContainer);
};

const unfade = (element) => {
    let opacity = 0.1;

    element.style.display = 'flex';

    const timer = setInterval(() => {
        if(opacity >= 1){
            clearInterval(timer);
        };

        element.style.opacity = opacity.toString();
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += opacity * 0.1;
    }, 10);
};

const renderAlertBox = (alertText, isConfirmation, closeButtonText, confirmationButtonText, confirmationButtonOnClick) => {
    if(!document.getElementById("alertBox")){
        const alertBoxWrapperELement = document.createElement('div'),
              alertBoxElement = document.createElement('div'), 
              alertBoxContentElement = document.createElement('div'),
              alertBoxTextElement = document.createElement('span'),
              alertBoxButtonListElement = document.createElement('ul'),
              alertBoxCloseButtonElement = document.createElement('button'),
              pendingAlertBoxElementList = [],
              pendingAlertBoxButtonElementList = [];

        alertBoxWrapperELement.id = "alertBox"
        alertBoxWrapperELement.style.backgroundColor = "rgba(0, 0, 0, .85)";

        alertBoxElement.classList.add("alert-box");

        alertBoxContentElement.classList.add("alert-box__content");
        alertBoxContentElement.classList.add("--squircle-borders");

        alertBoxTextElement.textContent = alertText;
        alertBoxTextElement.classList.add("alert-box__text");
        
        pendingAlertBoxElementList.push(alertBoxTextElement);
        
        alertBoxButtonListElement.classList.add("alert-box__button-list");
        alertBoxButtonListElement.classList.add("--flex-row");

        pendingAlertBoxButtonElementList.push(alertBoxCloseButtonElement);

        alertBoxCloseButtonElement.classList.add("alert-box__button");
        alertBoxCloseButtonElement.classList.add("--close-button");
        alertBoxCloseButtonElement.classList.add("--transiotional");
        alertBoxCloseButtonElement.classList.add("--round-borders");
        alertBoxCloseButtonElement.textContent = closeButtonText;
        alertBoxCloseButtonElement.onclick = () => {
            if(alertBoxWrapperELement && alertBoxWrapperELement.parentNode === document.body){
                document.body.removeChild(alertBoxWrapperELement);
            };
        };

        if(isConfirmation){
            const alertBoxConfirmationButtonElement = document.createElement('button');

            alertBoxConfirmationButtonElement.textContent = confirmationButtonText;
            alertBoxConfirmationButtonElement.classList.add("alert-box__button");
            alertBoxConfirmationButtonElement.classList.add("--confirmation-button");
            alertBoxConfirmationButtonElement.classList.add("--transiotional");
            alertBoxConfirmationButtonElement.classList.add("--round-borders");
            alertBoxConfirmationButtonElement.onclick = confirmationButtonOnClick;

            pendingAlertBoxButtonElementList.push(alertBoxConfirmationButtonElement);
        };

        pendingAlertBoxButtonElementList.forEach(pendingAlertBoxButtonELement => {
            const alertBoxButtonWrapperElement = document.createElement('li');

            alertBoxButtonWrapperElement.appendChild(pendingAlertBoxButtonELement);

            alertBoxButtonListElement.appendChild(alertBoxButtonWrapperElement);
        });

        pendingAlertBoxElementList.push(alertBoxButtonListElement);

        pendingAlertBoxElementList.forEach(pendingAlertBoxElement => {
            alertBoxContentElement.appendChild(pendingAlertBoxElement);
        });

        alertBoxElement.appendChild(alertBoxContentElement);
        alertBoxWrapperELement.appendChild(alertBoxElement);

        document.body.appendChild(alertBoxWrapperELement);

        unfade(alertBoxElement);
    };
};

const navbarOnClickHandler = () => {
    const navbarElement = document.getElementById("navbar");

    if(!navbarElement.classList.contains("--active-navbar")){
        navbarElement.classList.add("--active-navbar");
    }else{
        navbarElement.classList.remove("--active-navbar");
    };
};

const renderLoader = (targetElementId) => {
    const loaderWrapperElement = document.createElement('div'),
          loaderFirstBouncerElement = document.createElement('div'),
          loaderSecondBouncerElement = document.createElement('div'),
          loaderThirdBouncerElement = document.createElement('div');

    const loaderBouncerList = [loaderFirstBouncerElement, loaderSecondBouncerElement, loaderThirdBouncerElement];

    loaderWrapperElement.classList.add("loader");
    loaderWrapperElement.id = "loader";

    loaderBouncerList.forEach(pendingLoaderBouncerElement => {
        loaderWrapperElement.appendChild(pendingLoaderBouncerElement);
    });

    document.getElementById(targetElementId).appendChild(loaderWrapperElement);
};

const renderDashboard = () => {
    const userName = getCookie("logged_user");
          navbarLogoElement = document.getElementById("navbarLogo"),
          navbarLogoInitialsElement = document.createElement("span");
          navbarItems = document.getElementById("navbarItems");
          
    navbarLogoInitialsElement.textContent = generateInitials(userName);

    navbarLogoElement.appendChild(navbarLogoInitialsElement);

    renderLoader("navbarTableList");

    fetch('/admin/dashboard?q=all', {
        method: 'GET',
        credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
        const navbarTableListElement = document.getElementById("navbarTableList"),
              tableSVGPath = [
                {
                  d: "m21.5 23h-19c-1.378 0-2.5-1.122-2.5-2.5v-17c0-1.378 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.122 2.5 2.5v17c0 1.378-1.122 2.5-2.5 2.5zm-19-21c-.827 0-1.5.673-1.5 1.5v17c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-17c0-.827-.673-1.5-1.5-1.5z"
                },
                {
                  d: "m23.5 8h-23c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h23c.276 0 .5.224.5.5s-.224.5-.5.5z"
                },
                {
                  d: "m23.5 13h-23c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h23c.276 0 .5.224.5.5s-.224.5-.5.5z"
                },
                {
                  d: "m23.5 18h-23c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h23c.276 0 .5.224.5.5s-.224.5-.5.5z"
                },
                {
                  d: "m6.5 23c-.276 0-.5-.224-.5-.5v-15c0-.276.224-.5.5-.5s.5.224.5.5v15c0 .276-.224.5-.5.5z"
                },
                {
                  d: "m12 23c-.276 0-.5-.224-.5-.5v-15c0-.276.224-.5.5-.5s.5.224.5.5v15c0 .276-.224.5-.5.5z"
                },
                {
                  d: "m17.5 23c-.276 0-.5-.224-.5-.5v-15c0-.276.224-.5.5-.5s.5.224.5.5v15c0 .276-.224.5-.5.5z"
                },  
            ];
            
        document.getElementById("loader").remove();

        data.databaseStatus.tableList.forEach(currentTableName => {
            const navbarTableWrapperElement = document.createElement("li"),
                  navbarTableNameElement = document.createElement("span");

            navbarTableNameElement.textContent = currentTableName;

            insertSVGPaths(navbarTableWrapperElement, tableSVGPath, "0 0 24 24");
            navbarTableWrapperElement.appendChild(navbarTableNameElement);
            navbarTableListElement.appendChild(navbarTableWrapperElement);
        });
    })
}; 

window.onload = () => {
    const currentPathname = window.location.pathname.split('/');

    if(currentPathname[currentPathname.length - 1] === "dashboard"){
        renderDashboard();
    };
};