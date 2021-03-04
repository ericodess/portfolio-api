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

const appendPendingElements = (pendingElementList, targetElement) => {
    pendingElementList.forEach(pendingElement => {
        targetElement.appendChild(pendingElement);
    });
};

const addPendingClasses = (pendingClasses, targetElement) => {
    const pendingClassesList = pendingClasses.split(" ");

    pendingClassesList.forEach(pendingClass => {
        targetElement.classList.add(pendingClass);
    });
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

const renderAlertBox = (targetElement, alertText, isConfirmation, closeButtonText, confirmationButtonText, confirmationButtonOnClick) => {
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
            if(alertBoxWrapperELement && alertBoxWrapperELement.parentNode === targetElement){
                targetElement.removeChild(alertBoxWrapperELement);
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

        appendPendingElements(pendingAlertBoxElementList, alertBoxContentElement);

        alertBoxElement.appendChild(alertBoxContentElement);
        alertBoxWrapperELement.appendChild(alertBoxElement);

        targetElement.appendChild(alertBoxWrapperELement);

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

const generateLoader = () => {
    const loaderWrapperElement = document.createElement('div'),
          loaderFirstBouncerElement = document.createElement('div'),
          loaderSecondBouncerElement = document.createElement('div'),
          loaderThirdBouncerElement = document.createElement('div');

    const loaderBouncerList = [loaderFirstBouncerElement, loaderSecondBouncerElement, loaderThirdBouncerElement];

    loaderWrapperElement.classList.add("loader");
    loaderWrapperElement.id = "loader";

    appendPendingElements(loaderBouncerList, loaderWrapperElement);

    return loaderWrapperElement;
};

const generateSemiDonutChart = (chartPercentage, chartTitle, chartText, chartColor) => {
    const semiDonutChartElementWrapper = document.createElement('div'),
          semiDonutchartTitle = document.createElement('span'),
          semiDonutChartElement = document.createElement('div');

    let isColorWithoutHashTag = false;

    if(chartColor.split("#").length === 1){
        isColorWithoutHashTag = true;
    };

    semiDonutChartElementWrapper.classList.add("page__semi-donut-wrapper");

    semiDonutchartTitle.classList.add("page__semi-donut-title");
    semiDonutchartTitle.style.color = isColorWithoutHashTag ? `#${chartColor}` : chartColor;
    semiDonutchartTitle.textContent = chartTitle;

    semiDonutChartElement.classList.add("page__semi-donut");
    semiDonutChartElement.style.setProperty("--percentage", chartPercentage);
    semiDonutChartElement.style.setProperty("--fill", isColorWithoutHashTag ? `#${chartColor}` : chartColor);
    semiDonutChartElement.textContent = chartText;

    const semiDonutCharPendingElementsList = [semiDonutchartTitle, semiDonutChartElement];
    
    appendPendingElements(semiDonutCharPendingElementsList, semiDonutChartElementWrapper);

    return semiDonutChartElementWrapper;
};

const renderNavbar = () => {
    const userName = getCookie("logged_user");
    navbarLogoElement = document.getElementById("navbarLogo"),
    navbarLogoInitialsElement = document.createElement("span");
    navbarItems = document.getElementById("navbarItems"),
    loaderElement = generateLoader();
    
    navbarLogoInitialsElement.textContent = generateInitials(userName);

    navbarLogoElement.appendChild(navbarLogoInitialsElement);

    document.getElementById("navbarTableList").appendChild(loaderElement);

    fetch('/admin/dashboard/info?q=table-status', {
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
        
        loaderElement.remove();

        data.databaseStatus.tableList.forEach(currentTableName => {
            const navbarTableWrapperElement = document.createElement("li"),
                    navbarTableNameElement = document.createElement("span");

            navbarTableNameElement.textContent = currentTableName;

            navbarTableWrapperElement.onclick = () => console.log('huh');
            insertSVGPaths(navbarTableWrapperElement, tableSVGPath, "0 0 24 24");
            navbarTableWrapperElement.appendChild(navbarTableNameElement);
            navbarTableListElement.appendChild(navbarTableWrapperElement);
        });
    })
};

const elementPeriodicUpdate = (dataFetchingProcedure, updateRate) => {
    setInterval(dataFetchingProcedure, updateRate);
};

const rotateStateHandler = (targetElement, isToActivate) => {
    if(!targetElement.classList.contains("--rotating") === isToActivate){
        if(isToActivate){
            targetElement.classList.add("--rotating");
        }else{
            targetElement.classList.remove("--rotating");
            
            if(targetElement.classList.length === 0){
                targetElement.removeAttribute("class");
            };
        };
    };
};

const updatesystemMinifiedCharts = () => {
    const systemMinifiedChartsElement = document.getElementById("systemMinifiedCharts"),
          refreshButtonElement = document.getElementById("refreshButton"),
          refreshButtonSvgElement = refreshButtonElement.children[0];

    rotateStateHandler(refreshButtonSvgElement, true);

    fetch('/admin/dashboard/info?q=system-status', {
        method: 'GET',
        credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
        const systemStauts = data.systemStatus;

        const cpuUsagePercentage = systemStauts.cpu.usedPercentage,
              ramUsagePercentage = systemStauts.memory.usedPercentage,
              ramUsageGB = systemStauts.memory.usedGB,
              cpuDonutChartWrapper = systemMinifiedChartsElement.children[0],
              memoryDonutChartWrapper = systemMinifiedChartsElement.children[1];

        const cpuDonutChartElement = cpuDonutChartWrapper.children[1],
              memoryDonutChartElement = memoryDonutChartWrapper.children[1];
              
        rotateStateHandler(refreshButtonSvgElement, false);
        
        cpuDonutChartElement.style.setProperty("--percentage", cpuUsagePercentage);
        cpuDonutChartElement.textContent = `${cpuUsagePercentage}%`;

        memoryDonutChartElement.style.setProperty("--percentage", ramUsagePercentage);
        memoryDonutChartElement.textContent = `${ramUsageGB} GB`;
    })
};

const renderPageHeader = (isHeaderCentered, headerTitleElement, headerExtraElement) => {
    const pageContentElement = document.getElementById("pageContent"),
          pageHeaderPendingElements = [],
          pageHeaderElement = document.createElement("header");

    pageHeaderElement.classList.add("page__header");
    pageHeaderElement.classList.add("--full-width");

    if(isHeaderCentered){
        pageHeaderElement.classList.add("--flex-centered-items");
    };

    pageHeaderPendingElements.push(headerTitleElement);

    if(headerExtraElement){
        pageHeaderPendingElements.push(headerExtraElement);
    };

    appendPendingElements(pageHeaderPendingElements, pageHeaderElement);

    if(pageContentElement){
        pageContentElement.appendChild(pageHeaderElement);
    };
};

const renderSystemStatus = () => {
    
    /*
    const pageTitleElement = document.createElement("h1"),
          pageExtraElement = document.createElement("div"),
          pageRefreshButtonElement = document.createElement("button"),
          refreshSVGPath = [
                {
                    d: "M231.298,17.068c-57.746-0.156-113.278,22.209-154.797,62.343V17.067C76.501,7.641,68.86,0,59.434,0S42.368,7.641,42.368,17.067v102.4c-0.002,7.349,4.701,13.874,11.674,16.196l102.4,34.133c8.954,2.979,18.628-1.866,21.606-10.82c2.979-8.954-1.866-18.628-10.82-21.606l-75.605-25.156c69.841-76.055,188.114-81.093,264.169-11.252s81.093,188.114,11.252,264.169s-188.114,81.093-264.169,11.252c-46.628-42.818-68.422-106.323-57.912-168.75c1.653-9.28-4.529-18.142-13.808-19.796s-18.142,4.529-19.796,13.808c-0.018,0.101-0.035,0.203-0.051,0.304c-2.043,12.222-3.071,24.592-3.072,36.983C8.375,361.408,107.626,460.659,230.101,460.8c122.533,0.331,222.134-98.734,222.465-221.267C452.896,117,353.832,17.399,231.298,17.068z"
                }
          ];

    addPendingClasses("page__title --color-cycle", pageTitleElement);
    pageTitleElement.textContent = "Status";

    addPendingClasses("page__controller-list --flex-row --neumorphism-borders", pageExtraElement);

    pageRefreshButtonElement.id = "refreshButton";
    addPendingClasses("page__controller", pageRefreshButtonElement);
    insertSVGPaths(pageRefreshButtonElement, refreshSVGPath, "0 0 460.801 460.801");
    pageRefreshButtonElement.onclick = refreshHandler();

    pageExtraElement.appendChild(pageRefreshButtonElement);

    renderPageHeader(false, pageTitleElement, pageExtraElement);
    */

    const systemMinifiedChartsElement = document.getElementById("systemMinifiedCharts"),
          loaderElement = generateLoader();

    systemMinifiedChartsElement.appendChild(loaderElement);

    fetch('/admin/dashboard/info?q=system-status', {
        method: 'GET',
        credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
        const systemStauts = data.systemStatus;

        const cpuUsagePercentage = systemStauts.cpu.usedPercentage,
              ramUsagePercentage = systemStauts.memory.usedPercentage,
              ramUsageGB = systemStauts.memory.usedGB;

        const cpuChartElement = generateSemiDonutChart(cpuUsagePercentage, "CPU", `${cpuUsagePercentage}%`, "#17b978"),
              ramChartElement = generateSemiDonutChart(ramUsagePercentage, "RAM", `${ramUsageGB} GB`, "#086972");
  
        const pendingsystemMinifiedCharts = [cpuChartElement, ramChartElement];

        loaderElement.remove();

        appendPendingElements(pendingsystemMinifiedCharts, systemMinifiedChartsElement);
    })

    elementPeriodicUpdate(updatesystemMinifiedCharts, 300000);
};

const renderDashboard = () => {
    renderNavbar();
    
    renderSystemStatus();
}; 

const refreshHandler = () => {
    updatesystemMinifiedCharts();
};

window.onload = () => {
    const currentPathname = window.location.pathname.split('/');

    if(currentPathname[currentPathname.length - 1] === "dashboard"){
        renderDashboard();
    };
};