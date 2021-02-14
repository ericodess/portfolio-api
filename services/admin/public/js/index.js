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