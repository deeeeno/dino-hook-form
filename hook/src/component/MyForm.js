import {useForm} from '../hook/dino-hook-form'

function MyForm(){
    const {register,handleSubmit,formState} = useForm({mode:"onChange"});
    const onSubmit = (data)=>{
        console.log(data);
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            A : <input {...register("a",{required:'need data',pattern:{value:/A$/,message:'need to end A'}})}/><br></br>
            <div>{formState.errors.a?.type} : {formState.errors.a?.message}</div>
            </div>
            <div>
            B : <input {...register("b",{min:{value:3,message:'more than 3'},max:{value:11,message:'less than 11'}})}/><br></br>
            <div>{formState.errors.b?.type} : {formState.errors.b?.message}</div>
            </div>
            <button type="submit">SEND</button>
        </form>
    </>
}
export default MyForm;