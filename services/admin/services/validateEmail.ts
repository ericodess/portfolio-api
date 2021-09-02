const validateEmail = (email: string): boolean => {
    if(/\S/.test(email)){
        const splicedEmail: string[] = email.split('@');

        if(
            splicedEmail.length > 1 &&
            splicedEmail[splicedEmail.length - 1].split('.').length > 1
        ){
            return true;
        };
    };

    return false;
};

export default validateEmail;