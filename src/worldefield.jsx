import React, { useEffect, useState } from 'react';
import './App.css';
import ItemList from "./itemList.jsx";


export const WordleField = () => {
    const Row = [1, 2, 3];
    const WordOftheDay = "HAPPY";
    const [rowDisabled, setRowDisabled] = useState([false, true, true]);
    const onRowChange = (index) => {
        const newValue = [...rowDisabled];
        if (index <= 3) {
            newValue[index] = false;
            newValue[index - 1] = true;
        }        
        setRowDisabled(newValue);

    };

    return (
        <div className='header'>

            My Own Wordle
            <div className='table-style'>
                {Row.map((index) => {
                    return (
                        <div key={index}>
                            <ItemList result={WordOftheDay} rowIndex={index} rowDisabled={rowDisabled} onChange={onRowChange}></ItemList>
                        </div>)

                })
                }

            </div>
        </div>
    )

}

/* 
export const WordleField = () => {


    let board = Array().fill(0).map(row => new Array(3).fill(1))
} */
export default WordleField;