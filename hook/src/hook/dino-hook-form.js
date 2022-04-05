import {useEffect, useState, useRef} from 'react';



export function useForm(option={mode:'onSubmit'}){
    const nameList = []
    const [formState, setFormState] = useState({errors:{}})
    const validationDict = new Map();

    const {mode} = option;
    function validation(name){
        const inputValue = document.querySelector(`input[name="${name}"]`).value;
        const validationOptions = validationDict.get(name);
        const {required} = validationOptions;
        if(required!==false){
            if(inputValue.length===0){
                setFormState(({errors})=>{
                    const new_error = {...errors,[name]:{type:'required',message:required}};
                    return {errors:new_error};
                });
                return false;
            }
        }
        //validation 내용은 {value, message}라는 전재로
        for(const [validation,option] of Object.entries(validationOptions)){
            const {value,message} = option;
            const errorObj = {type:validation, message};
            switch(validation){
                case 'min':
                    if(value > Number(inputValue)){
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            delete errors[name]
                            return {errors};
                        });
                    break;
                case 'max':
                    if(value < Number(inputValue)){
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            delete errors[name]
                            return {errors};
                        });
                    break;
                case 'minLength':
                    if(value > inputValue.length){
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            delete errors[name]
                            return {errors};
                        });
                    break;
                case 'maxLength':
                    if(value < inputValue.length){
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            delete errors[name]
                            return {errors};
                        });
                    break;
                case 'pattern':
                    if(!value.test(inputValue)){
                        console.log('hi');
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            delete errors[name]
                            return {errors};
                        });
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
        let isError = false;
        for(const [name] of nameList){
            data[name] = document.querySelector(`input[name="${name}"]`).value;
            if(mode === "onSubmit"){
                if(!validation(name)) isError=true;
            }
        }
        console.log(formState);
        if(mode !== "onSubmit")
            isError = Object.keys(formState.errors).length===0 ? false : true;

        return (isError) ? false : callback(data);
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
                    //return false;
                }
            }

            const isValid = validation(name);

        }
        return {name,[mode]:onFunc};
    }


    return {register,handleSubmit,formState};

}