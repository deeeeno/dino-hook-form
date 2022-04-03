# Chapter 1) register

register는 form의 input이나 select 엘리먼트 데이터를 가져올 수 있도록 등록하는 메소드이고, 유효성 검사를 진행하게 해준다. 유효성 검사는 HTML 표준에 의거하고, 커스터마이징이 가능하다.   
여기서 중요한 것은 register는 메소드 즉 function이란 것이다! return 값이 존재하는데 문서를 보면 다음과 같다.
```
register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })
```
즉, register의 이름과 옵션들을 인자로 받아 onChange, onBlur, name, ref의 결과를 내보내는 것이다.
## Parameters
### name
뭐 말그대로 이름~
### RegisterOptions
registerOption은 위에서 설명했던 유효성 검사 혹은 다른 옵션에 대한 내용이 들어오게 된다. 먼저, 유효성 검사에 대해서 알아보자. 유효성 검사 옵션을 입력하는 방법은 크게 두가지가 있다. 각 항목별 내용을 살펴보자!
```
옵션명 : 값
옵션명 : {value:값, message:에러메세지}
```
* required   
필수로 있어야 하는 항목의 경우 true 혹은 에러 메세지를 입력해준다.
```
register("test",{required:true});
register("test",{required:"test is requried"});
```
* maxLength, minLength   
입력한 문자열의 길이를 판별한다. 옵션 이름 그대로 최대,최소 길이를 판별한다.
```
register("test",{maxLength:33,minLength:1});
register("test",{maxLength:{value:33,message:"less than 33"},minLength:{value:1,message:"more than 1"}});
```
* max, min   
이는 길이가 아닌 입력한 값의 크기를 판별한다. 숫자인 경우 사용하는게 좋을 듯?
```
register("test",{max:33,min:1});
register("test",{max:{value:33,message:"less than 33"},min:{value:1,message:"more than 1"}});
```
* pattern   
정규식 패턴 매치를 검사하는 옵션이다.
```
register("test",{pattern:/[0-9]+/});
register("test",{pattern:{value:/[0-9]+/,message:'should be only number'});
```
* validate
커스터마이징 유효성 검사를 사용할 수 있는 항목이다. 유효성 검사 콜백 함수를 전달하여 검사를 실시한다. 이 경우 Object나 배열 입력 데이터의 경우 사용하면 좋다고 한다. 위에 있는 것들은 주로 숫자, 문자열, bool 데이터에 대한 판별이기 때문이다.   

