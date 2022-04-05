import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
function HookForm(){
    const { register, handleSubmit, formState} = useForm({mode:'onBlur'});
    const onSubmit = (data)=>{
        console.log(data);
    }
    useEffect(()=>{
        const {errors} = formState;
        console.dir(errors);
    },[formState]);
    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            A : <input id="a" {...register("a", {required:true, maxLength:5})}/><br></br>
            <div>{formState.errors.a?.type}</div>
            B : <input id="b" {...register("b", {
                            required:"need value", 
                            pattern:{value:/[0-9]+/g,message:'need to be number'},
                            minLength:{value:3,message:'length more than 3'},
                            min:{value:5,message:'more than 5'}, 
                            max:{value:7,message:'less than 7'},
                            
            })}/>
            <br></br>
            <div>{formState.errors.b?.type}</div>
            C : <input id="b" {...register("c", {pattern:{value:/C$/,message:'need to end with C'}})}/><br></br>
            <div>{formState.errors.c?.message}</div>
            <button type="submit">SEND</button>
        </form>
    
    
    
    </>
}
export default HookForm;