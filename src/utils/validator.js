export function required(value, message = 'This field is required'){
    return value && String(value).trim() ? "" : message;
}

export function isEmail(value, message = 'Email is required'){
    if(!value) return;
    
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) ? "" : message;
}

export function validator(value, rules = []){
    for(const rule of rules){
        const err = rule(value)
        if(err) return err;
    }

    return "";
}