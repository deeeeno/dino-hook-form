# Chapter 1) register

먼저 만들어볼 것은 register 메소드이다. register 메소드의 명세를 다시 한번 살펴보자.
```
register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })
```
register는 타겟의 name과 유효성 검사 외 다른 것들이 들어있는 option들을 가지고 있다. return으로는 onChange, onBlur, name, ref가 있는데 onChange, onBlur는 `useForm({mode:"onChange or onBlur"})`인 경우 유효성 검사 메소드가 들어가는 부분인 듯 하고, ref는 React.ref를 return한다. 우선 입력과 출력의 스켈레톤 코드를 만들면 다음과 같다.
```
//mode는 useForm method의 파라미터이다.
function register(name, registerOption={}){
        const ref = createRef();
        const onFunc = ()=>{
            
        }
        return {name,[mode]:onFunc,ref};
    }
```
