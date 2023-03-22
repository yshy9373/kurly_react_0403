import React from 'react';

export default function MainModalComponent({mainModalState}: any) {

    const onClickMainModalClose=(e: any)=>{
        e.preventDefault();
        mainModalState();
    }

    const onClickMainModalClose2=(e: any)=>{
        e.preventDefault();
        mainModalState();

        let newDate = new Date();
        let obj = {
            모달이름: 'mainModal',
            날짜: newDate.toUTCString()
        }
        localStorage.setItem('HYKURLYMAINMODAL', JSON.stringify(obj));
    }


    return (
        <div id='mainModal'>
            <div className="wrap">
                <div className="container">
                    <div className="img-box">
                        <a href="!#">
                            <img src="./img/modal/main_modal.jpg" alt="" />
                        </a>
                    </div>
                    <div className="button-box">
                        <button onClick={onClickMainModalClose2}>다시 안 보기</button>
                        <button onClick={onClickMainModalClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
