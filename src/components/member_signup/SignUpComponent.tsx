import React, { ChangeEvent,  MouseEvent } from 'react';
import axios from 'axios';


interface MemberTypes {
    아이디: string,            
    is아이디: boolean,            
    아이디중복확인: boolean,      

    비밀번호: string,          
    pwErrMsg: string,             
    isPw: boolean,              
    비밀번호확인: string,      
    pwOkErrMsg: string,
    isPwOk: boolean,

    이름: string,            
    nameErrMsg: string,
    isName: boolean,

    이메일: string,            
    이메일중복확인: boolean,        
    emailErrMsg: string,
    isEmail: boolean,

    휴대폰: string,            
    휴대폰인증확인: boolean,        
    isHp: boolean,
    인증번호: number,
    인증번호입력상자: string,
    isHpNumOkBtn: boolean,
    isHpOkBox: boolean,
    isInputHp: boolean,
    isHpNum2Btn: boolean,
    hpErrMsg: string,
    setId: number,
    minute: number,
    second: number, 

    주소1: string,            
    주소2: string,             
    isAddrApiBtn: boolean,
    isAddrHide: boolean,

    성별: string,                        

    생년: string,                        
    생월: string,                        
    생일: string,                       
    isBirth: boolean,
    birthErrMsg: string, 

    추가입력사항: string,                
    추가입력사항입력상자: string,        
    isIdChk: boolean,
    isAddInput: boolean, 
    addInputTxt1: string, 
    addInputTxt2: string, 
    추가입력사항아이디체크: boolean,
    추가입력사항아이디: string,

    이용약관내용: Array<string>,
    이용약관동의: Array<string> 

}


export default function SignUpComponent({회원, isConfirmModalFn, isTimer, introMainFn}: any) {


    const [state, setState] = React.useState<MemberTypes>(회원); 
     
    
    const onChangeId=(e: ChangeEvent<HTMLInputElement>)=>{

        const regExp1: RegExp = /[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]/g;
        const regExp2: RegExp = /.{6,16}/g;
        const regExp3: RegExp = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regExp4: RegExp = /\s/g;

        let {value} = e.target;
        let 아이디: string = '';
        let is아이디: boolean = false;

        아이디 = value.replace(regExp1, '');

        if( regExp2.test(아이디)===false || regExp3.test(아이디)===false || regExp4.test(아이디)===true ) {
            is아이디 = true;
        }
        else {
            is아이디 = false;
        }

        setState({
            ...state,
            아이디: 아이디,
            is아이디: is아이디
        })
    }

    
    const onClickIdOkBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const regExp2: RegExp = /.{6,16}/g;                               
        const regExp3: RegExp = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;            
        const regExp4: RegExp = /\s/g;  
        const thisVal = state.아이디;
        let result: Array<boolean> = [];
        let 아이디중복확인 = false;

        if( regExp2.test(thisVal)===false || regExp3.test(thisVal)===false || regExp4.test(thisVal)===true ){                        
            isConfirmModalFn('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else{ 
            axios({ 
                url:'https://idealicehee.com/react_cra_5/member_select.php',
                method:'GET'
            })
            .then((res)=>{

                result = res.data.map((item: any) => item.아이디===state.아이디);
                if(result.includes(true)){
                    isConfirmModalFn('사용 불가능한 아이디 입니다');
                    아이디중복확인 = false;
                }
                else {
                    isConfirmModalFn('사용 가능한 아이디 입니다');
                    아이디중복확인 = true;
                }

                setState({
                    ...state,
                    아이디중복확인: 아이디중복확인  
                })
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });
        }

    }

 
    const onChangePw=(e: ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target;
        const regExp1: RegExp = /.{10,}/g;
        const regExp2: RegExp = /((?=.*[A-Za-z]+)(?=.*[0-9]+))|((?=.*[A-Za-z]+)(?=.*[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+))|((?=.*[0-9]+)(?=.*[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]+))/g;
        const regExp3: RegExp = /\s/g;
        const regExp4: RegExp = /(\d)\1\1/g;

        let pwErrMsg: string = '';
        let isPw: boolean = false;

        if(regExp1.test(value)===false){
            pwErrMsg = '최소 10자 이상 입력';
            isPw = true;
        }
        else if(regExp2.test(value)===false || regExp3.test(value)===true){
            pwErrMsg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw = true;
        }
        else if(regExp4.test(value)===true){
            pwErrMsg = '동일한 숫자 3개 이상 연속 사용 불가';
            isPw = true;
        }
        else {
            pwErrMsg = '';
            isPw = false;
        }

        setState({
            ...state,
            비밀번호: value,
            pwErrMsg: pwErrMsg,
            isPw: isPw
        })
    }

    
    const onChangePwOk=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        let pwOkErrMsg: string = '';
        let isPwOk: boolean = false;

        if( state.비밀번호 !== value){
            pwOkErrMsg = '동일한 비밀번호를 입력';
            isPwOk = true;
        }
        else {
            pwOkErrMsg = '';
            isPwOk = false;
        }

        setState({
            ...state,
            pwOkErrMsg: pwOkErrMsg,
            isPwOk: isPwOk,
            비밀번호확인: value
        })
    }

   
    const onChangeName=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const regExp: RegExp = /[`~!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]/g;
        let 이름: string = '';
        let nameErrMsg: string = '';
        let isName: boolean = false;

        이름 = value.replace(regExp, '');
        if(이름===''){
            nameErrMsg = '이름을 입력해 주세요.';
            isName = true;
        }
        else {
            nameErrMsg = '';
            isName = false;
        }

        setState({
            ...state,
            이름: 이름,
            nameErrMsg: nameErrMsg,
            isName: isName
        })
    }


    const onChangeEmail=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const regExp1: RegExp = /\s/g;
        const regExp2: RegExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+\.[A-Za-z]{2,3}$/g;
        let emailErrMsg: string = '';
        let isEmail: boolean = false;

        if(regExp1.test(value)===true || regExp2.test(value)===false){
            emailErrMsg = '이메일 형식으로 입력해 주세요.';
            isEmail = true;
        }
        if(value===''){
            emailErrMsg = '이메일을 입력해 주세요.';
            isEmail = true;
        }

        setState({
            ...state,
            이메일: value,
            emailErrMsg: emailErrMsg,
            isEmail: isEmail
        })
    }

    const onClickEmailOk=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const {이메일} = state;
        const regExp1: RegExp = /\s/g;
        const regExp2: RegExp = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+\.[A-Za-z]{2,3}$/g;
        let result: Array<boolean> = [];
        let 이메일중복확인: boolean = false;

        if(이메일===''){
            isConfirmModalFn('이메일을 입력해 주세요.');
        }
        else if( regExp1.test(이메일)===true || regExp2.test(이메일)===false ){
            isConfirmModalFn('이메일 형식으로 입력해 주세요.');
        }
        else {
            axios({
                url:'https://idealicehee.com/react_cra_5/member_select.php',
                method:'GET'
            })
            .then((res)=>{
                result = res.data.map((item: any)=>item.이메일===이메일);
                if(result.includes(true)){
                    isConfirmModalFn('사용 불가능한 이메일 입니다.');
                    이메일중복확인 = false;
                }
                else {
                    isConfirmModalFn('사용할 수 있는 이메일 입니다.');
                    이메일중복확인 = true;
                }
                setState({
                    ...state,
                    이메일중복확인: 이메일중복확인
                })
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err);
            });
        }
    }

  
    const onChangeHp=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const regExp1: RegExp = /[^\d]/g;
        let 휴대폰: string = '';
        let isHp: boolean = false;
        let hpErrMsg: string = '';

        휴대폰 = value.replace(regExp1, '');

        if( 휴대폰.length >= 1 ){
            isHp = true;
        }
        else {
            isHp = false;
        }

        if(state.isHpNum2Btn===false){
            if( 휴대폰.length >= 1 ){
                hpErrMsg='';
            }
            else {
                hpErrMsg='휴대폰 번호를 입력해 주세요.';
            }
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            isHp: isHp,
            hpErrMsg: hpErrMsg
        })
    }

   
    const onClickHpNum=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        let num: number = 0;
        let isHpOkBox: boolean = false;
        let isHp: boolean = true;
        let isInputHp: boolean = false;
        let 인증번호입력상자: string = '';

        const regExp2: RegExp = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
        num = Math.floor(Math.random()*900000+100000);

        if( regExp2.test(state.휴대폰)===false ){
            isConfirmModalFn('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
            isHpOkBox = false;
            isHp = true;
            isInputHp = false;
        }
        else {
            isConfirmModalFn(`인증번호가 발송되었습니다.\n${num}`);
            isHpOkBox = true;
            isHp = false;
            isInputHp = true;
            인증번호입력상자 = '';
        }

        setState({
            ...state,
            인증번호: num,
            인증번호입력상자: 인증번호입력상자,
            isHpOkBox: isHpOkBox,
            isHp: isHp,
            isInputHp: isInputHp
        })

    }


    const onChangeInputHpOk=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        let isHpNumOkBtn: boolean = false;
        let 인증번호입력상자 = '';
        const regExp1 = /[^\d]/g;

        인증번호입력상자 = value.replace(regExp1, '');

        if( 인증번호입력상자.length >= 1 ){
            isHpNumOkBtn = true;
            clearInterval( state.setId );
        }
        else {
            isHpNumOkBtn = false;
        }

        setState({
            ...state,
            인증번호입력상자: 인증번호입력상자,
            isHpNumOkBtn: isHpNumOkBtn
        })
    }

   
    const onClickHpOkBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        let 휴대폰인증확인: boolean = false;
        let isHpOkBox = true;
        let isHpNum2Btn: boolean = false;

        if(Number(state.인증번호입력상자)===state.인증번호){
            isConfirmModalFn('인증에 성공 하였습니다.');
            isHpOkBox = false;
            휴대폰인증확인 = true;
            isHpNum2Btn = true;
        }
        else {
            isConfirmModalFn('잘못된 인증 코드 입니다.');
            isHpOkBox = true;
            휴대폰인증확인 = false;
            isHpNum2Btn = false;
        }

        setState({
            ...state,
            isHp: false,
            isHpOkBox: isHpOkBox,
            휴대폰인증확인: 휴대폰인증확인,
            isHpNum2Btn: isHpNum2Btn
        })
    }

    
    const onClickHpNum2Btn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        setState({
            ...state,
            isInputHp: false,
            isHpNum2Btn: false,
            isHpNumOkBtn: false,
            isHp: true,
            휴대폰: '',
            hpErrMsg:'휴대폰 번호를 입력해 주세요.'
        })
    }

    
    function hpTimerCount(){
        let setId: any = 0;
        let minute: number = 2;
        let second: number = 59;
        setId = setInterval(function(){
            second--;
            if(second<0){
                second=59;
                minute--;
                if(minute<0){
                    clearInterval(setId);
                    minute=0;
                    second=0;
                    isConfirmModalFn(`유효 시간이 만료되었습니다.\n 다시 시도해 주세요.`);
                }
            }

            setState({
                ...state,
                setId: setId,
                minute: minute,
                second: second
            })
        }, 1000);
    }
    React.useEffect(()=>{
        isTimer && hpTimerCount();
    }, [isTimer]);

   
    const addressSearchFn=()=>{
        const _fileName: string = './popup.html';
        const _winName: string = '_address_api';
        const _width: number = 530;
        const _height: number = 569;
        const _top: number = (window.innerHeight-_height)/2;
        const _left: number = (window.innerWidth-_width)/2;
        window.open( _fileName, _winName, `width=${_width}, height=${_height}, top=${_top}, left=${_left}`);
    }

    const onClickAddressSearchBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        addressSearchFn();
    }

   
    const onChangeInputAddr1=(e: ChangeEvent<HTMLInputElement>)=>{
        setState({
            ...state,
            주소1: e.target.value
        })
    }

 
    const onChangeInputAddr2=(e: ChangeEvent<HTMLInputElement>)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }

   
    const onClickAddrReBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        addressSearchFn();
    }

    const getSessionAddress=()=>{

        function getPromise(){
            return new Promise((resolved: any, rejected: any)=>{

                let 주소1: string = '';
                let 주소2: string = '';
                let isAddrApiBtn: boolean = false;
                let isAddrHide: boolean = false;

                if( sessionStorage.getItem('kurly_search_address') !== null ){
                    주소1 = JSON.parse(`${sessionStorage.getItem('kurly_search_address')}`).주소1;
                    주소2 = JSON.parse(`${sessionStorage.getItem('kurly_search_address')}`).주소2;
                    isAddrApiBtn = true; 
                    isAddrHide = true; 

                    const Obj = {
                        주소1: 주소1,
                        주소2: 주소2,
                        isAddrApiBtn: isAddrApiBtn,
                        isAddrHide: isAddrHide
                    }

                    resolved(Obj); 
                }
                else {
                    rejected('주소 가져오기 실패!');
                }

            });
        }


        getPromise()
        .then((res: any)=>{
            setState({
                ...state,
                주소1: res.주소1,
                주소2: res.주소2,
                isAddrApiBtn: res.isAddrApiBtn,
                isAddrHide: res.isAddrHide
            });
        })
        .catch((err)=>{
            console.log( err );
        });

    }


    React.useEffect(()=>{
        getSessionAddress();
    },[state.주소1, state.주소2]);


    const onChangeGender=(e: ChangeEvent<HTMLInputElement>)=>{
        let 성별: string = '';

        if(e.target.checked){
            성별 = e.target.value;
        }
        else {
            성별 = e.target.value;
        }

        setState({
            ...state,
            성별: 성별
        })
    }


    React.useEffect(()=>{
        const newYear = new Date().getFullYear(); 
        const regExp2 = /^(?:0?[1-9]|1[0-2]$)/g;
        const regExp3 = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1]$)/g;
        let isBirth = false;
        let birthErrMsg = '';

        if( state.생년==='' && state.생월==='' && state.생일==='' ){
            isBirth = false;
            birthErrMsg = '';
        }
        else {

            if( Number(state.생년) > newYear ){
                isBirth = true;
                birthErrMsg = '생년월일이 미래로 입력 되었습니다.';
            }
            else if( Number(state.생년) < newYear-100 ){
                isBirth = true;
                birthErrMsg = '생년월일을 다시 확인해주세요.';
            }
            else if( Number(state.생년) >= newYear-14 ){
                isBirth = true;
                birthErrMsg = '만 14세 미만은 가입이 불가합니다.';
            }
            else {
                if( regExp2.test(state.생월) === false ){
                    isBirth = true;
                    birthErrMsg = '태어난 월을 정확하게 입력해주세요.';
                }
                else {
                    if( regExp3.test(state.생일) === false ){
                        isBirth = true;
                        birthErrMsg = '태어난 일을 정확하게 입력해주세요.';
                    }
                    else {
                        isBirth = false;
                        birthErrMsg = '';
                    }
                }
            }
        }
        setState({
            ...state,
            isBirth: isBirth,
            birthErrMsg: birthErrMsg
        })
    },[]);

 
    const onChangeYear=(e: ChangeEvent<HTMLInputElement>)=>{

        const regExp1: RegExp = /[^\d]/g;
        let 생년: string = '';
        생년 = e.target.value.replace(regExp1, '');

        setState({
            ...state,
            생년: 생년
        })
    }


    const onChangeMonth=(e: ChangeEvent<HTMLInputElement>)=>{

        const regExp1: RegExp = /[^\d]/g;
        let 생월: string = '';
        생월 = e.target.value.replace(regExp1, '');

        setState({
            ...state,
            생월: 생월
        })
    }

    
    const onChangeDate=(e: ChangeEvent<HTMLInputElement>)=>{

        const regExp1: RegExp = /[^\d]/g;
        let 생일: string = '';
        생일 = e.target.value.replace(regExp1, '');

        setState({
            ...state,
            생일: 생일
        })
    }


    const onChangeAddInput=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        let isAddInput: boolean = false;
        let addInputTxt1: string = '';
        let addInputTxt2: string = '';
        let isIdChk: boolean = false;

        isAddInput = true;
        addInputTxt1 = value;

        if( value === '친구초대 추천인 아이디' ){
            addInputTxt2 = '가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.';
            isIdChk = true;
        }
        else {
            addInputTxt2 = '추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.\n가입 이후는 수정이 불가능 합니다.\n대소문자 및 띄어쓰기에 유의해주세요.';
            isIdChk = false;
        }

        setState({
            ...state,
            isAddInput: isAddInput,
            addInputTxt1: addInputTxt1,
            addInputTxt2: addInputTxt2,
            isIdChk: isIdChk,
            추가입력사항: value
        })
    }


    const onChangeAddInputBox=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setState({
            ...state,
            추가입력사항입력상자: value
        })
    }

    
    const onClickIdChkBtn=(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const {value}: any = e.target;
        let result: Array<boolean> = [];
        let 추가입력사항아이디체크 = false;
        let 추가입력사항아이디 = '';

        if( state.추가입력사항입력상자 === '' ){                        
            isConfirmModalFn('아이디를 입력해 주세요.');
        }
        else{ 
            axios({ // CORS API
                url:'https://idealicehee.com/react_cra_5/member_select.php',
                method:'GET'
            })
            .then((res)=>{

                result = res.data.map((item: any) => item.아이디 === state.추가입력사항입력상자);
                if(result.includes(true)){
                    isConfirmModalFn('존재하는 아이디 입니다.\n친구초대 이벤트에 참여 가능해요.');
                    추가입력사항아이디체크 = true;
                    추가입력사항아이디 = value;
                }
                else {
                    isConfirmModalFn('존재하지 않는 아이디 입니다.');
                    추가입력사항아이디체크 = false;
                }

                setState({
                    ...state,
                    추가입력사항아이디체크: 추가입력사항아이디체크,
                    추가입력사항아이디: 추가입력사항아이디
                })
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err );
            });
        }
    }


    const onChangeServiceAllCheck=(e: ChangeEvent<HTMLInputElement>)=>{
        const {checked} = e.target;
        let 이용약관동의: Array<string> = [];

        if( checked === true ){
            이용약관동의 = state.이용약관내용;
        }
        else {
            이용약관동의 = [];
        }

        setState({
            ...state,
            이용약관동의: 이용약관동의
        })
    }

   
    const onChangeServiceCheck=(e: ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.target;
        let imsi: Array<string> = [];
        if( checked === true ){
            if( value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                if( state.이용약관동의.includes('SMS')===false && state.이용약관동의.includes('이메일')===false){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value, 'SMS', '이메일']});
                }
                else if( state.이용약관동의.includes('SMS')===true && state.이용약관동의.includes('이메일')===false){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value, '이메일']});
                }
                else if( state.이용약관동의.includes('SMS')===false && state.이용약관동의.includes('이메일')===true){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value, 'SMS']});
                }
                else if( state.이용약관동의.includes('SMS')===true && state.이용약관동의.includes('이메일')===true){
                    setState({...state, 이용약관동의: [...state.이용약관동의, value]});
                }               
            }
            else if( value==='SMS' && state.이용약관동의.includes('이메일')===true ){
                setState({...state, 이용약관동의: [...state.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', value]});
            }
            else if( value==='이메일' && state.이용약관동의.includes('SMS')===true ){
                setState({...state, 이용약관동의: [...state.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', value]});
            }
            else {
                setState({...state, 이용약관동의: [...state.이용약관동의, value]});
            }
        }
        else{ 
            if( value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                imsi = state.이용약관동의.filter((item)=>item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                imsi = imsi.filter((item)=>item !== 'SMS');
                imsi = imsi.filter((item)=>item !== '이메일');
                setState({...state, 이용약관동의: imsi});
            }
            else if( value === 'SMS' && state.이용약관동의.includes('이메일')===true ){
                imsi = state.이용약관동의.filter((item)=>item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                imsi = imsi.filter((item)=>item !== 'SMS');
                setState({...state, 이용약관동의: imsi});
            }
            else if( value === '이메일' && state.이용약관동의.includes('SMS')===true ){
                imsi = state.이용약관동의.filter((item)=>item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                imsi = imsi.filter((item)=>item !== '이메일');
                setState({...state, 이용약관동의: imsi});
            }
            else {
                imsi = state.이용약관동의.filter((item)=>item !== value);
                setState({...state, 이용약관동의: imsi});
            }
        }
    }

    const onSubmitEvent=(e: React.FormEvent)=>{
        e.preventDefault();

        let cnt = 0;
        state.이용약관동의.map((item)=>{
            if(item.indexOf('필수')!==-1){
                cnt++;
            }
        });

        if(state.아이디중복확인===false){
            isConfirmModalFn('아이디 중복 체크를 해주세요.');
        }
        else if(state.이메일중복확인===false){
            isConfirmModalFn('이메일 중복 체크를 해주세요.');
        }
        else if(state.휴대폰인증확인===false){
            isConfirmModalFn('휴대폰 인증을 진행해 주세요.');
        }
        else if(state.비밀번호===''){
            isConfirmModalFn('비밀번호를 입력해 주세요.');
        }
        else if(state.비밀번호확인===''){
            isConfirmModalFn('한 번 더 비밀번호를 입력해 주세요.');
        }
        else if(state.이름===''){
            isConfirmModalFn('이름을 입력해 주세요.');
        }
        else if(state.주소1===''){
            isConfirmModalFn('주소를 검색해 주세요.');
        }
        else if(state.주소2===''){
            isConfirmModalFn('나머지 주소를 입력해 주세요.');
        }
        else if( cnt !== 3 ){
            isConfirmModalFn('이용약관동의 필수 항목을 체크해 주세요.');
        }
        else {
            const regExp: RegExp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            const newFormData: any = new FormData();
            newFormData.append('id', state.아이디);
            newFormData.append('pw', state.비밀번호);
            newFormData.append('irum', state.이름);
            newFormData.append('email', state.이메일);
            newFormData.append('hp', state.휴대폰.replace(regExp, '$1-$2-$3'));
            newFormData.append('addr', `${state.주소1} ${state.주소2}`);
            newFormData.append('gender', state.성별);
            newFormData.append('birth', `${state.생년}-${state.생월}-${state.생일}`);
            newFormData.append('addInput', `${state.추가입력사항} ${state.추가입력사항입력상자}`);
            newFormData.append('service', state.이용약관동의);
            newFormData.append('gaibDate', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);
        
    
            axios({
                url:'https://idealicehee.com/react_cra_5/member_insert.php',
                method: 'POST',
                data: newFormData
            })
            .then((res)=>{
                if( res.data.indexOf('성공') !== -1 ){
                    introMainFn();
                }
            })
            .catch((err)=>{
                console.log('AXIOS 실패 : ', err);
            });
        }
    }


    return (
        <main id="main">
            <section id="signUp">
                <div className="container">
                    <div className="title">
                        <div className="main-title">
                            <h2>회원가입</h2>
                        </div>
                        <div className="sub-title">
                            <span><i>*</i>필수입력사항</span>
                        </div>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitEvent} name="form_sign_up" autoComplete="off" id="formSignUp" method="post" action="./member_sign_up.php">
                            <ul>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>아이디</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            maxLength={16} 
                                            name="input_id" 
                                            id="inputId" 
                                            placeholder="아이디를 입력해주세요" 
                                            onChange = {onChangeId}
                                            value={state.아이디}
                                            />
                                            <button 
                                            type="button" 
                                            className="id-ok-btn"
                                            onClick={onClickIdOkBtn}
                                            >
                                                중복확인
                                            </button>
                                            <p className={`error-message${state.is아이디 ? ' on':''}`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>비밀번호</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="password" 
                                            name="input_pw1" 
                                            id="inputPw1" 
                                            placeholder="비밀번호를 입력해주세요"
                                            onChange={onChangePw}
                                            />
                                            <p className={`error-message${state.isPw ? ' on': ''}`}>{state.pwErrMsg}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>비밀번호확인</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="password" 
                                            name="input_pw2" 
                                            id="inputPw2" 
                                            placeholder="비밀번호를 한번 더 입력해주세요" 
                                            onChange={onChangePwOk}
                                            />
                                            <p className={`error-message${state.isPwOk ? ' on': ''}`}>{state.pwOkErrMsg}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>이름</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            maxLength={20} 
                                            name="input_name" 
                                            id="inputName" 
                                            placeholder="이름을 입력해주세요" 
                                            onChange={onChangeName}
                                            value={state.이름}
                                            />
                                            <p className={`error-message${state.isName ? ' on': ''}`}>{state.nameErrMsg}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>이메일</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            name="input_email" 
                                            id="inputEmail" 
                                            placeholder="예: marketkurly@kurly.com" 
                                            onChange={onChangeEmail}
                                            />
                                            <button 
                                            type="button" 
                                            className="email-ok-btn"
                                            onClick={onClickEmailOk}
                                            >
                                                중복확인
                                            </button>
                                            <p className={`error-message${state.isEmail ? ' on':''}`}>{state.emailErrMsg}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>휴대폰</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            disabled={state.isInputHp}
                                            type="text" 
                                            maxLength={11} 
                                            name="input_hp" 
                                            id="inputHp" 
                                            placeholder="숫자만 입력해주세요." 
                                            onChange={onChangeHp}
                                            value={state.휴대폰}
                                            />
                                            <button 
                                            disabled={!state.isHp}
                                            type="button" 
                                            className={`hp-num-btn${state.isHp ? ' on': ''}`}
                                            onClick={onClickHpNum}
                                            >
                                                인증번호 받기
                                            </button>
                                            <button 
                                            type="button" 
                                            className={`hp-num2-btn${state.isHpNum2Btn ? ' on':''}`}
                                            onClick={onClickHpNum2Btn}
                                            >
                                                다른번호 인증
                                            </button>
                                            <p className={`error-message${state.isHpNum2Btn ? '':' on'}`}>{state.hpErrMsg}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className={`hp-ok-box${state.isHpOkBox ? ' on': ''}`}>
                                    <div className="left">
                                        <div className="left-wrap">
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            maxLength={6} 
                                            name="input_hp_ok" 
                                            id="inputHpOk" 
                                            onChange={onChangeInputHpOk}
                                            value={state.인증번호입력상자}
                                            />
                                            <span className='time-count'>
                                                {`${state.minute<10? `0${state.minute}`:state.minute} : ${state.second<10?`0${state.second}`:state.second}`}
                                            </span>
                                            <button 
                                            disabled={!state.isHpNumOkBtn} 
                                            type="button" 
                                            className={`hp-num-ok-btn${state.isHpNumOkBtn ? ' on': ''}`}
                                            onClick={onClickHpOkBtn}
                                            >
                                                인증번호 확인
                                            </button>
                                            <p className="info-message hp-info-message">
                                                인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>주소</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            className={`addr-hide${state.isAddrHide ? ' on': ''}`} 
                                            name="input_addr1" 
                                            id="inputAddr1" 
                                            placeholder="카카오 주소 검색 API" 
                                            onChange={onChangeInputAddr1}
                                            value={state.주소1}
                                            />
                                            <button 
                                            type="button" 
                                            className={`addr-hide addr-re-btn${state.isAddrHide ? ' on' : ''}`}
                                            onClick={onClickAddrReBtn}
                                            >
                                                <img src="./img/sign_up/ico_search.svg" alt="" />
                                                재검색
                                            </button>
                                            <button 
                                            type="button" 
                                            className={`addr-api-btn${state.isAddrApiBtn ? ' on' : ''}`}
                                            onClick={onClickAddressSearchBtn}
                                            >
                                                <img src="./img/sign_up/ico_search.svg" alt="" />
                                                주소검색
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className={`addr-hide${state.isAddrHide ? ' on' : ''}`}>
                                    <div className="left">
                                        <div className="left-wrap">
                                        
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <input 
                                            type="text" 
                                            name="input_addr2" 
                                            id="inputAddr2" 
                                            placeholder="나머지 주소를 입력해주세요" 
                                            onChange={onChangeInputAddr2}
                                            value={state.주소2}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li className={`addr-hide${state.isAddrHide ? ' on' : ''}`}>
                                    <div className="left">
                                        <div className="left-wrap">
                                        
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap">
                                            <em className="addr-map-area">샛별배송</em>
                                            <p className="addr-info addr-info2">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>성별</strong></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap gender">
                                            <label htmlFor="male"><input onChange={onChangeGender} type="radio" name="gender" id="male" className="gender-btn" value="남자"             checked={state.성별.includes('남자')}/>남자</label>
                                            <label htmlFor="female"><input onChange={onChangeGender} type="radio" name="gender" id="female" className="gender-btn" value="여자"         checked={state.성별.includes('여자')}/>여자</label>
                                            <label htmlFor="unselect"><input onChange={onChangeGender} type="radio" name="gender" id="unselect" className="gender-btn" value="선택안함" checked={state.성별.includes('선택안함')} />선택안함</label>  
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>생년월일</strong></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap birth">
                                            <div className="birth-box">
                                                <ul>
                                                    <li><input onChange={onChangeYear} type="text" maxLength={4} name="year" id="year" placeholder="YYYY" /></li>
                                                    <li><i>/</i></li>
                                                    <li><input onChange={onChangeMonth} type="text" maxLength={2} name="month" id="month" placeholder="MM" /></li>
                                                    <li><i>/</i></li>
                                                    <li><input onChange={onChangeDate} type="text" maxLength={2} name="date" id="date" placeholder="DD" /></li>
                                                </ul>
                                            </div>
                                            <p className={`error-message birth-error-message${state.isBirth ? ' on' : ''}`}>{state.birthErrMsg}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>추가입력 사항</strong></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap add-input-box1">
                                            <label htmlFor="addInput1"><input onChange={onChangeAddInput} type="radio" name="addInput" id="addInput1" className="add-input-btn" value="친구초대 추천인 아이디" />친구초대 추천인 아이디</label>
                                            <label htmlFor="addInput2"><input onChange={onChangeAddInput} type="radio" name="addInput" id="addInput2" className="add-input-btn" value="참여 이벤트명" />참여 이벤트명</label>
                                        </div>
                                    </div>
                                </li>
                                <li className={`add-input-box-list${state.isAddInput ? ' on' : ''}`}>
                                    <div className="left">
                                        <div className="left-wrap"></div>
                                    </div>
                                    <div className="right">
                                        <div className={`right-wrap add-input-box2${state.isAddInput ? ' on' : ''}`}>
                                            <input 
                                            type="text" 
                                            name="add-input-text" 
                                            id="addInputText" 
                                            placeholder={state.addInputTxt1}
                                            onChange={onChangeAddInputBox}
                                            />
                                            <button 
                                            type='button' 
                                            className={`id-chk-btn${state.isIdChk ? ' on' : ''}`}
                                            onClick={onClickIdChkBtn}
                                            >
                                                아이디 확인
                                            </button>
                                            <p className="add-input-guide-text">{state.addInputTxt2}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="hor-line">
                                    <hr />
                                </li>
                                <li>
                                    <div className="left">
                                        <div className="left-wrap">
                                            <label htmlFor="inputId"><strong>이용약관동의</strong><i>*</i></label>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right-wrap service">
                                            <ul>
                                                <li>
                                                    <label htmlFor="allChk"><input onChange={onChangeServiceAllCheck} checked={state.이용약관동의.length===7} type="checkbox" name="all_chk" id="allChk" value="" />전체 동의합니다.</label>
                                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk1"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('이용약관 동의(필수)')} type="checkbox" name="chk1" id="chk1" className="chk-btn" value="이용약관 동의(필수)" />이용약관 동의(필수)</label>
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk2"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')} type="checkbox" name="chk2" id="chk2" className="chk-btn" value="개인정보 수집∙이용 동의(필수)" />개인정보 수집∙이용 동의(필수)</label>
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk3"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')} type="checkbox" name="chk3" id="chk3" className="chk-btn" value="개인정보 수집∙이용 동의(선택)" />개인정보 수집∙이용 동의(선택)</label>
                                                    <button><span>약관보기</span><img src="./img/sign_up/arrow_right.svg" alt="" /></button>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk4"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')} type="checkbox" name="chk4" id="chk4" className="chk-btn" value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" />무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)</label>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk5"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('SMS')} type="checkbox" name="chk5" id="chk5" className="chk-btn" value="SMS" />SMS(선택)</label>
                                                    <label htmlFor="chk6"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('이메일')} type="checkbox" name="chk6" id="chk6" className="chk-btn" value="이메일" />이메일(선택)</label>
                                                </li>
                                                <li>
                                                    <p className='info-text'>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk7"><input onChange={onChangeServiceCheck} checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')} type="checkbox" name="chk7" id="chk7" className="chk-btn" value="본인은 만 14세 이상입니다.(필수)" />본인은 만 14세 이상입니다.(필수)</label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="button-box">
                                <button type="submit" className="submit-btn">가입하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

SignUpComponent.defaultProps = {
    회원: {
        아이디: '',            
        is아이디: false,        
        아이디중복확인: false,  

        비밀번호: '',          
        pwErrMsg: '',
        isPw: false,

        비밀번호확인: '',      
        pwOkErrMsg: '',
        isPwOk: false,

        이름: '',             
        nameErrMsg: '',
        isName: false,

        이메일: '',           
        이메일중복확인: false,  
        emailErrMsg: '',
        isEmail: false,

        휴대폰: '',           
        휴대폰인증확인: false,  
        isHp: false,
        인증번호: 0,
        인증번호입력상자: '',
        isHpNumOkBtn: false,
        isHpOkBox: false,
        isInputHp: false,
        isHpNum2Btn: false,
        hpErrMsg: '',
        setId: 0,
        minute: 2,
        second: 59,

        주소1: '',            
        주소2: '',             
        isAddrApiBtn: false,
        isAddrHide: false,

        성별: '선택안함',             

        생년: '',              
        생월: '',            
        생일: '',             
        isBirth: false,
        text: '',

        추가입력사항: '',             
        추가입력사항입력상자: '',      
        isAddInput: false,
        addInputTxt1: '',
        addInputTxt2: '',
        추가입력사항아이디체크: false,
        추가입력사항아이디: '',

        이용약관내용: [
            `이용약관 동의(필수)`,
            `개인정보 수집∙이용 동의(필수)`,
            `개인정보 수집∙이용 동의(선택)`,
            `무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)`,
            `SMS`,
            `이메일`,
            `본인은 만 14세 이상입니다.(필수)`
        ],
        이용약관동의: []        
    }
}