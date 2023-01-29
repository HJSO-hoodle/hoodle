import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
import * as stringUtil from '../modules/stringUtil';

function Main() {
    const test = "오순돌";
    const [testWord, setTestWord] = useState([]);
    const [splitWord, setSplitWord] = useState([]);
    const [submitWordList, setSubmitWordList] = useState([]);
    // [
    //     [ // 첫번째 줄
    //         {
    //             value : 'ㅇ',
    //             perfect : true, // 사용되는 단어이며, 자리까지 맞는 경우
    //             used : true, // 사용되는 단어인 경우
    //         },
    //         {
    //             value : 'ㅏ',
    //             perfect : false, // 사용되는 단어이며, 자리까지 맞는 경우
    //             used : true, // 사용되는 단어인 경우
    //         }
    //         {
    //             value : 'ㅈ',
    //             perfect : false, // 사용되는 단어이며, 자리까지 맞는 경우
    //             used : false, // 사용되는 단어인 경우
    //         }
    //     ],
    //     [
    //         ...
    //     ]
    // ]

    // DidMount와 같은 것
    useEffect(() => {
        setTestWord(stringUtil.getConstantVowel(test));
    }, []);
    
    /* 화면상 키보드가 입력되는 것을 감지하는 부분
        아래와 같은 addEventListener사용시 버그 발생(뒤로가기 한번 눌렀는데 200번 찍히는등)
        window.addEventListener("keyup", (e) => {});
     */
    window.onkeyup = (e) => {
        writeWord(e);
    };

    /**
     * pc에서 키보드 입력을 통한 이벤트 처리
     * @param {*} e 키보드 이벤트
     */
    const writeWord = (e) => {
        console.log(e);
        let splitWordNew = [...splitWord];

        // 뒤로가기 기능
        if(e.code == "Backspace"){
            splitWordNew.pop();
            setSplitWord(splitWordNew);
            return false;
        }

        if(e.code == "Enter"){
            if(splitWordNew.length == testWord.length){
                checkWord();
                return false;
            } else{
                alert("음운이 부족합니다")
                return false;
            }
            
        }
        
        // 이미 칸을 모두 채웠으면 입력 못함
        if(splitWordNew.length == testWord.length || !e.code.includes("Key")){
            return false;
        }
        
        const newCV = stringUtil.changeCodeOfHangle(e.code);
        if(newCV == null){
            return false;
        }
        splitWordNew.push(stringUtil.changeCodeOfHangle(e.code));
        if(splitWordNew.length > testWord.length){
            return false;
        }
        setSplitWord(splitWordNew);
    }

    const checkWord = () => {
        let submitWordListNew = [...submitWordList];
        let submitWord = [];
        let perfectCnt = 0;
        
        for(var i=0;i<testWord.length;i++){
            if(testWord[i] == splitWord[i]){
                submitWord.push({
                    value : splitWord[i],
                    perfect : true, // 사용되는 단어이며, 자리까지 맞는 경우
                    used : true, // 사용되는 단어인 경우
                });
                perfectCnt ++;
            } else if(testWord.includes(splitWord[i])){
                submitWord.push({
                    value : splitWord[i],
                    perfect : false, // 사용되는 단어이며, 자리까지 맞는 경우
                    used : true, // 사용되는 단어인 경우
                });
            } else{
                submitWord.push({
                    value : splitWord[i],
                    perfect : false, // 사용되는 단어이며, 자리까지 맞는 경우
                    used : false, // 사용되는 단어인 경우
                });
            }
        }
        submitWordListNew.push(submitWord);
        setSubmitWordList(submitWordListNew);
        setSplitWord([]);

        if(perfectCnt == testWord.length){
            alert("정답입니다!");
        }
    }
  
    return (
        <>
            <div>
                {submitWordList.map((submitWord,idx) => (
                    <div className="wordArea">
                        {submitWord.map((obj,idx) => (
                            <div className="testWord" style={obj.perfect ? {background: "lightgreen"} : obj.used ? {background: "lightgoldenrodyellow"} : {background: "lightgray"}}>{obj.value}</div>
                        ))}
                    </div>
                ))}
                <div className="wordArea">
                    {testWord.map((obj,idx) =>(
                        <div className="splitWord">{splitWord.length > idx ? splitWord[idx] : ""}</div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Main;
