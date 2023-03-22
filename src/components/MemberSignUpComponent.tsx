import React from 'react';
import SignUpComponent from './member_signup/SignUpComponent';
import ConfirmModalComponent from './member_signup/ConfirmModalComponent';

export default function MemberSignUpComponent({introMainFn}: any){


    const [state, setState] = React.useState({
        is컨펌모달: false,
        msg:'',
        isTimer: false
    });

    const isConfirmModalFn=(msg: string)=>{
        setState({
            ...state,
            is컨펌모달: true,
            msg:msg
        })
    }

    const isConfirmModalCloseFn=()=>{
        let isTimer = false;

        if( state.msg.indexOf('인증번호') >= 0 ){  
            isTimer = true; 
        }
        else {
            isTimer = false; 
        }

        setState({
            ...state,
            is컨펌모달: false,
            msg: '',
            isTimer: isTimer
        })
    }

    return(
        <>  
            <SignUpComponent isConfirmModalFn={isConfirmModalFn} isTimer={state.isTimer} introMainFn={introMainFn} />
            { state.is컨펌모달 && <ConfirmModalComponent msg={state.msg} isConfirmModalCloseFn={isConfirmModalCloseFn} /> }
        </>
    )
};