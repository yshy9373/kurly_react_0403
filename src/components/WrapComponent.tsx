import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import HeaderComponent from './HeaderComponent';
import IntroMainComponent from './IntroMainComponent';
import SubMain1Component from './SubMain1Component';
import SubMain2Component from './SubMain2Component';
import SubMain3Component from './SubMain3Component';
import SubMain4Component from './SubMain4Component';
import MemberSignUpComponent from './MemberSignUpComponent';
import MemberSignInComponent from './MemberSignInComponent';
import FooterComponent from './FooterComponent';
import MainModalComponent from './MainModalComponent';
import QuickMenuComponent from './QuickMenuComponent';
import GoTopComponent from './GoTopComponent';


interface ProductType1 {
    신상품: {
        상품코드 : string;
        상품이미지 : string;
        카트이미지 : string;
        배송구분 : string;
        제조사 : string;
        상품명 : string;
        할인율 : number;
        정가 : number;
        상품정보 : string;
        판매처? : string;  
    }
}
interface ProductType2 {
    베스트: {
        상품코드 : string;
        상품이미지 : string;
        카트이미지 : string;
        배송구분 : string;
        제조사 : string;
        상품명 : string;
        할인율 : number;
        정가 : number;
        상품정보 : string;
        판매처? : string;  
    }
}
interface ProductType3 {
    알뜰쇼핑: {
        상품코드 : string;
        상품이미지 : string;
        카트이미지 : string;
        배송구분 : string;
        제조사 : string;
        상품명 : string;
        할인율 : number;
        정가 : number;
        상품정보 : string;
        판매처? : string;  
    }
}
interface ProductType4 {
    특가혜택: {
        번호: string;
        제목: string;
        이미지: string;
        소개: string;
    }
}


export default function WrapComponent(props: any) {

    const [isSub1, setIsSub1] = React.useState<ProductType1>(props.서브1메인);
    const [isSub2, setIsSub2] = React.useState<ProductType2>(props.서브2메인);
    const [isSub3, setIsSub3] = React.useState<ProductType3>(props.서브3메인);
    const [isSub4, setIsSub4] = React.useState<ProductType4>(props.서브4메인);

    const [isTopModal, setIsTopModal]         = React.useState(true);
    const [isMainModal, setIsMainModal]       = React.useState(true);


    React.useEffect(()=>{
    
        axios({
            url:'./data/product1.json',
            method:'GET'
        })
        .then((res: any)=>{
            setIsSub1({신상품: res.data.신상품});
        })
        .catch((err: any)=>{
            console.log(`AXIOS 실패 ${err}`);
        });

    },[]);

    React.useEffect(()=>{

        axios({
            url:'./data/product2.json',
            method:'GET'
        })
        .then((res)=>{
            setIsSub2({베스트: res.data.베스트});
        })
        .catch((err)=>{
            console.log(`AXIOS 실패 ${err}`);
        })
    },[]);

    React.useEffect(()=>{

        axios({
            url:'./data/product3.json',
            method:'GET'
        })
        .then((res)=>{
            setIsSub3({알뜰쇼핑: res.data.알뜰쇼핑});
        })
        .catch((err)=>{
            console.log(`AXIOS 실패 ${err}`);
        });

    },[]);

    React.useEffect(()=>{

        axios({
            url:'./data/product4.json',
            method:'GET'
        })
        .then((res)=>{
            setIsSub4({특가혜택: res.data.특가혜택});
        })
        .catch((err)=>{
            console.log(`AXIOS 실패 ${err}`);
        });

    },[]);

    const topModalState=()=>{
        setIsTopModal(false);
    }

    const mainModalState=()=>{
        setIsMainModal(false);
    }

    const topModalFn=()=>{
        if(document.cookie==='') return;

        let result = document.cookie.split(';');

        let obj: Array<any> = [];
        result.map((item, idx)=>{
            obj[idx] = {
                쿠키이름: item.split('=')[0].trim(),
                쿠키값: item.split('=')[1].trim()
            }
        });

        obj.map((item)=>{
            if(item.쿠키이름==='HYTOPMODAL' && item.쿠키값==='topmodalclose1day'){
                setIsTopModal(false);
            }
            else {
                setIsTopModal(true);
            }
        });
    }

    const mainModalFn=()=>{
        let result = null;
        for(let i=0; i<localStorage.length; i++){
            result = JSON.parse(`${localStorage.getItem('HYKURLYMAINMODAL')}`);
        }

        if(result===null || result==='') return;

        if(result.모달이름==='mainModal'){
            setIsMainModal(false);
        }
        else {
            setIsMainModal(true);
        }
    }

    React.useEffect(()=>{
        topModalFn();
        mainModalFn();
    },[]);

    


    return (
        <div id='wrap'>
            {
               isTopModal && <ModalComponent topModalState={topModalState} />
            }

            <BrowserRouter>
                <Routes>
                    <Route path ='/' element={<HeaderComponent />}>
                        <Route index element={<IntroMainComponent />}/>
                        <Route path='/신상품' element={<SubMain1Component 신상품={isSub1.신상품}/>}/>
                        <Route path='/베스트' element={<SubMain2Component 베스트={isSub2.베스트}/>}/>
                        <Route path='/알뜰쇼핑' element={<SubMain3Component 알뜰쇼핑={isSub3.알뜰쇼핑} />}/>
                        <Route path='/특가혜택' element={<SubMain4Component 특가혜택={isSub4.특가혜택} />}/>
                        <Route path='/회원가입' element={<MemberSignUpComponent />}/>
                        <Route path='/로그인' element={<MemberSignInComponent />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
           
            
            <FooterComponent />
            {
                isMainModal && <MainModalComponent mainModalState={mainModalState} />
            }
            <QuickMenuComponent />
            <GoTopComponent />
        </div>
    );
};

WrapComponent.defaultProps = {
    서브1메인: {
        신상품: {
            상품코드 : '',
            상품이미지 : '',
            카트이미지 : '',
            배송구분 : '',
            제조사 : '',
            상품명 : '',
            할인율 : 0,
            정가 : 0,
            상품정보 : '',
            판매처 : ''
        }
    },
    서브2메인: {
        베스트: {
            상품코드 : '',
            상품이미지 : '',
            카트이미지 : '',
            배송구분 : '',
            제조사 : '',
            상품명 : '',
            할인율 : 0,
            정가 : 0,
            상품정보 : '',
            판매처 : ''
        }
    },
    서브3메인: {
        알뜰쇼핑: {
            상품코드 : '',
            상품이미지 : '',
            카트이미지 : '',
            배송구분 : '',
            제조사 : '',
            상품명 : '',
            할인율 : 0,
            정가 : 0,
            상품정보 : '',
            판매처 : ''
        }
    },
    서브4메인: {
        특가혜택: {
            번호:'',
            제목:'',
            이미지:'',
            소개:''
        }
    }
    
}
