import {useEffect, useState, useRef, createRef} from 'react';



export function useForm(option={mode:'onSubmit'}){
    const refMap = new Map();
    const [formState, setFormState] = useState({errors:{}})
    const registerOptionMap = new Map();
    const {mode} = option;

    function validation(name){
        const inputRef = refMap.get(name).current;
        const inputValue =  inputRef.value
        const validationOptions = registerOptionMap.get(name);
        const {required} = validationOptions;
        
        //validation 내용은 {value, message}라는 전재로
        for(const [validation,option] of Object.entries(validationOptions)){
            const {value,message} = option;
            const errorObj = {type:validation, message,ref:inputRef};
            switch(validation){
                case 'required':
                    if(inputValue.length===0){
                        setFormState(({errors})=>{
                            const new_error = {...errors,[name]:{type:'required',message:required,ref:inputRef}};
                            return {errors:new_error};
                        });
                        return false;
                    }else{
                        setFormState(({errors})=>{
                            const new_error = Object.fromEntries(
                                    Object.entries(errors).filter(([k,v])=>k!==name)
                            );
                            return {errors:new_error};
                        });
                    }
                    break;
                case 'min':
                    if(value > Number(inputValue)){
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            const new_error = Object.fromEntries(
                                    Object.entries(errors).filter(([k,v])=>k!==name)
                            );
                            return {errors:new_error};
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
                            const new_error = Object.fromEntries(
                                    Object.entries(errors).filter(([k,v])=>k!==name)
                            );
                            return {errors:new_error};
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
                            const new_error = Object.fromEntries(
                                    Object.entries(errors).filter(([k,v])=>k!==name)
                            );
                            return {errors:new_error};
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
                            const new_error = Object.fromEntries(
                                    Object.entries(errors).filter(([k,v])=>k!==name)
                            );
                            return {errors:new_error};
                        });
                    break;
                case 'pattern':
                    if(!value.test(inputValue)){
                        setFormState(({errors})=>{
                            return {errors:{...errors,[name]:errorObj}};
                        });
                        return false;
                    }else
                        setFormState(({errors})=>{
                            const new_error = Object.fromEntries(
                                    Object.entries(errors).filter(([k,v])=>k!==name)
                            );
                            return {errors:new_error};
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
        for(const [name,nameRef] of refMap){
            data[name] = nameRef.current.value;
            if(mode === "onSubmit"){
                if(!validation(name)) isError=true;
            }
        }
        if(mode !== "onSubmit")
            isError = Object.keys(formState.errors).length===0 ? false : true;

        return (isError) ? false : callback(data);
    }
    
    const register = (name, registerOption={}) => {
        registerOptionMap.set(name,registerOption);
        const ref = createRef();
        refMap.set(name,ref);
        const onFunc = ()=>{

            const isValid = validation(name);

        }
        return {name,[mode]:onFunc,ref};
    }


    return {register,handleSubmit,formState};

}