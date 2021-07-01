const isEmailValid = (emailInput: string): boolean => {
    if(/\S/.test(emailInput)){
        const splicedEmail: string[] = emailInput.split('@');

        if(
            splicedEmail.length > 1 &&
            splicedEmail[splicedEmail.length - 1].split('.').length > 1
        ){
            return true;
        };
    };

    return false;
};

export default isEmailValid;