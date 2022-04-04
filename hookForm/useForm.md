# Chapter 0) useForm

useForm은 custom hook으로 form을 쉽게 사용하게 하는 훅이다. 여러 argument들이 있는데 나의 훅은 mode 파라미터만 받도록 한다. mode는 user가 submit을 하기 전 어떤 동작에 validation을 할지 정해주는 값이다. 값은 onChange, onBlur, onSubmit, onTouched, all(=onSubmit)이 있다.   