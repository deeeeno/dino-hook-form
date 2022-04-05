# Chapter 0) useForm
useForm은 custom hook으로 form을 쉽게 사용하게 하는 훅이다. 여러 argument들이 있는데 나의 훅은 mode 파라미터만 받도록 한다. mode는 user가 submit을 하기 전 어떤 동작에 validation을 할지 정해주는 값이다. 값은 onChange, onBlur, onSubmit, onTouched, all(=onSubmit)이 있다.   

## version 1
버전1 개발에서는 `register, formState, handleSubmit`을 return할 것이다. 입력과 출력에 대해 스켈레톤 코드를 작성해보자!
```
function useForm(option={mode:'onSubmit'}){
    const [formState, setFormState] = useState({errors:{}})
    const {mode} = option;
    
    const handleSubmit = (callback) => (event) => {

    }
    
    const register(name, registerOption={}) => {
        
    }


    return {register,handleSubmit,formState};

}
```
### formState
formState는 이름 그대로 form의 react state를 의미한다. 그렇기에 useState 메소드를 사용해서 진행할 것이다. formState는 여러 데이터를 담고 있지만, version 1에선 errors 객체만 다룰 것이다. 그리고 register, handleSubmit 함수 객체를 만들어주었다. errors 객체의 내부를 보면 아래와 같은 구조를 가진다. version 2에선 list로 에러들을 가져볼 계획이다. 
```
//formState.errors
{
    "input_name" : {type:"유효성 에러 타입","message":"에러메세지","ref":"input ref"},
    .....
}
```
### function variable
함수에서 사용하는 변수들이 필요하다. `register` 메소드를 생각해보면 필요한 input을 등록해주고 이를 React.ref로 관리, 심지어 옵션들까지 추가적으로 입력해준다. 그렇다면 input에 대한 ref와 등록옵션을 저장하는 변수가 필요할 것이다. 나는 자료구조 Map을 사용하였고, 아래와 같이 명명하였다. key는 name이다.
```
const refMap = new Map();
const registerOptionMap = new Map();
```
register로 새로운 input이 등록될 때 위의 map에 넣으면 될 것이고, 유효성 검사 등이 진행될 때에는 name을 통해 get하면 될 것이다.

### validation function
그 다음으로 중요한 것은 validation function이라고 생각한다. 이 기능의 꽃이니까..! validation 기능은 공식문서에 나온 것들 중 `required, maxLength, minLength, max, min, pattern`을 먼저 다룰 것이다. validate(커스텀 function)은 version 2에서~      

### handleSubmit
handleSubmit은 submit event인 경우 발동하는 함수이다. 파라미터로 받은 콜백 함수를 form에서 관리하는 데이터들과 함께 실행시켜 준다. 한가지 특징은 `preventDefault`가 되어있다는 것이다. 그러므로, event객체를 먼저 받아 preventDefault가 되도록 한다. useForm의 모드가 onSubmit인 경우 validation이 이루어지므로 mode==onSubmit이라면 validation을 진행해주자.
```
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
```
### register
register 메소드는 input에 React.ref를 등록하고, mode에 따라 validation 핸들러를 지정해주는 메소드이다. 
```
const register = (name, registerOption={}) => {
    registerOptionMap.set(name,registerOption);
    const ref = createRef();
    refMap.set(name,ref);
    const onFunc = ()=>{

        const isValid = validation(name);

    }
    return {name,[mode]:onFunc,ref};
}
```