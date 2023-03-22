import React from 'react';

export default function ModalComponent({topModalState}: any) {

    const onClickTopModalClose=(e: any)=>{
        e.preventDefault();
        topModalState();
        let newDate = new Date();
        newDate.setDate(newDate.getDate()+1);
        document.cookie = `HYTOPMODAL=topmodalclose1day; path=/; expires=${newDate.toUTCString()};`;
    }

    return (
        <div id="modal">
            <div className="container">
                <h1><a href="!#" title="지금 가입하고 인기상품 100원에 받아가세요!">지금 가입하고 인기상품 <strong>100원</strong>에 받아가세요!</a></h1>
                <button onClick={onClickTopModalClose} className="modal-close-btn" title="하루동안 열리지 않음"><img src='./img/modal/ico_close_fff_84x84.png' alt="" /></button>
            </div>
        </div>
    );
};

