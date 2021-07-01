const renderFeedback = (feedbackText: string) => {
    if(/\S/.test(feedbackText)){
        const formSubmitButton: HTMLButtonElement = document.getElementById("formSubmitButton") as HTMLButtonElement,
              feedbackComponent: HTMLSpanElement = document.createElement('span') as HTMLSpanElement,
              formComponent: HTMLFormElement = document.getElementById('loginForm') as HTMLFormElement;
    
        feedbackComponent.classList.add("form__feedback");
        feedbackComponent.textContent = feedbackText;
        
        formComponent.appendChild(feedbackComponent);

        formSubmitButton.setAttribute("disabled", "true");
    };
};

export default renderFeedback;