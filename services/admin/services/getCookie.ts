const getCookie = (name: string): string => {
	let cookieValue = "";

    if(typeof window !== "undefined"){
		const nameEQ: string = name + "=",
			  ca = document.cookie.split(';');

    	for(let i = 0; i < ca.length; i++){
    	    let c = ca[i];

    	    while(c.charAt(0) === ' '){
				c = c.substring(1, c.length);
			};
	
    	    if(c.indexOf(nameEQ) == 0){
				cookieValue = c.substring(nameEQ.length, c.length);
			};
    	};
	};

    return cookieValue;
};

export default getCookie;