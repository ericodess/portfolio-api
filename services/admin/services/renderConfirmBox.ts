//Services
import { unfadeElement } from ".";

const renderConfirmBox = (
	targetElement: HTMLElement,
	headlineText: string,
	confirmationText: string,
	confirmationOnClickHandler: (event: MouseEvent) => void,
	isDeniable: boolean = false,
	closeText: string = "No"
) => {
	if(!document.getElementById("confirmBox")){
		const wrapper: HTMLDivElement = document.createElement("div"),
			  content: HTMLDivElement = document.createElement("div"),
			  headline: HTMLSpanElement = document.createElement("span"),
			  buttonList: HTMLUListElement = document.createElement("ul"),
			  confirmationButton: HTMLButtonElement = document.createElement("button"),
			  pendingWrappers: (HTMLDivElement | HTMLSpanElement)[] =  [],
			  pendingButtons: HTMLButtonElement [] = [];

		wrapper.id = "confimationBox";
		wrapper.classList.add("--flex-column");
		wrapper.classList.add("--flex-centered");

		content.classList.add("--flex-column");
		content.classList.add("--flex-centered");
		content.classList.add("--squircle-borders");

		headline.textContent = headlineText;

		pendingWrappers.push(headline);

		buttonList.classList.add("--flex-row");

		confirmationButton.textContent = confirmationText;
		confirmationButton.classList.add("--transiotional");
		confirmationButton.onclick = confirmationOnClickHandler;

		pendingButtons.push(confirmationButton);

		if(isDeniable){
			const closeButtonElement: HTMLButtonElement = document.createElement("button");

			closeButtonElement.textContent = closeText;
			closeButtonElement.classList.add("--transiotional");
			closeButtonElement.onclick = () => {
				if(wrapper && wrapper.parentNode === targetElement){
					targetElement.removeChild(wrapper);
				};
			};

			pendingButtons.push(closeButtonElement);
		};

		pendingButtons.forEach(pendingButton => {
			const buttonWrapper: HTMLLIElement = document.createElement("li");

			buttonWrapper.appendChild(pendingButton);

			buttonList.appendChild(buttonWrapper);
		});

		pendingWrappers.push(buttonList);

		pendingWrappers.forEach(pendingWrapepr => {
			content.appendChild(pendingWrapepr);
		});

		wrapper.appendChild(content);

		targetElement.appendChild(wrapper);

		unfadeElement(content);
	};
};

export default renderConfirmBox;