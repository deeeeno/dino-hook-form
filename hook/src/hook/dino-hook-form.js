import {useEffect, useState, useRef} from 'react';



export function useForm(option={mode:'onSubmit'}){
    const nameList = []
    const [formState, setFormState] = useState({error:{}})
    const validationDict = new Map();

    const {mode} = option;
    function validation(name){
        const inputValue = document.querySelector(`input[name="${name}"]`).value;
        const validationOptions = validationDict.get(name);
        const {required} = validationOptions;
        if(required!==false){
            if(inputValue.length===0){
                setFormState({error:{[name]:{type:'required',message:required}}});
                return false;
            }
        }
        //validation 내용은 {value, message}라는 전재로
        for(const [validation,option] of Object.entries(validationOptions)){
            const {value,message} = option;
            const error = {[name]:{type:validation, message}};
            switch(validation){
                case 'min':
                    if(value > Number(inputValue)){
                        setFormState({error});
                        return false;
                    }else
                        setFormState({});
                    break;
                case 'max':
                    if(value < Number(inputValue)){
                        setFormState({error});
                        return false;
                    }else
                        setFormState({});
                    break;
                case 'minLength':
                    if(value > inputValue.length){
                        setFormState({error});
                        return false;
                    }else
                        setFormState({});
                    break;
                case 'maxLength':
                    if(value < inputValue.length){
                        setFormState({error});
                        return false;
                    }else
                        setFormState({});
                    break;
                case 'pattern':
                    if(!value.test(inputValue)){
                        setFormState({error});
                        return false;
                    }else
                        setFormState({});
                    break;
                default:
                    break;
            }
        }
        return true;
    }
    
    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        const data = {};
        for(const [name] of nameList){
            data[name] = document.querySelector(`input[name="${name}"]`).value;
            if(mode === "onSubmit"){
                if(!validation(name)) return false;
            }
        }
        return callback(data);
    }
    
    function register(name, registerOption={}){
        nameList.push(name);
        validationDict.set(name,registerOption);
        const onFunc = ()=>{
            const inputValue = document.querySelector(`input[name="${name}"]`).value;
            ///validation check
            const required = registerOption?.required;
            if(required && (required!==false)){
                if(inputValue.length===0){
                    setFormState({error:{name:{type:'required',message:required}}})
                    return false;
                }
            }

            return validation(name);
        }
        return {name,[mode]:onFunc};
    }


    return {register,handleSubmit,formState};

}