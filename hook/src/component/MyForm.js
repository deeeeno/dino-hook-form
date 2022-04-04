import {useForm} from '../hook/dino-hook-form'
function MyForm(){
    const {register,handleSubmit,formState} = useForm();
    console.log(formState);
    const onSubmit = (data)=>{
        console.log(data);
    }
    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            A : <input {...register("a",{required:'need data'})}/><br></br>
            B : <input {...register("b",{min:{value:3,message:'more than 3'},max:{value:11,message:'less than 11'}})}/><br></br>
            <button type="submit">SEND</button>
        </form>
    </>
}
export default MyForm;