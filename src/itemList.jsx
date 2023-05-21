import React, { useCallback, useEffect, useState } from 'react';
import './App.css';




export const ItemList = (props) => {
    const column = [1, 2, 3, 4, 5];
    const [itemProperties, setItemProperties] = useState([]);
    

    useEffect(() => {
        const columnprop = column.map((index) => {
            return {
                "rowId": props.rowIndex,
                "id": index - 1,
                "color": "",
                "disabled": props.rowDisabled[props.rowIndex - 1],
                "value": ""
            }
        });
        setItemProperties(columnprop);

    }, []);

    useEffect(() => {

        if (itemProperties.length > 0) {
            const item = [...itemProperties];
            const result = item.map((val, index) => {
                val.disabled = props.rowDisabled[props.rowIndex - 1];
                return val;
            })
            setItemProperties(result);

        }

    }, [props.rowDisabled]);

    const handleChange = (event, index) =>{
        console.log("handlechange",event,index);
        const items = [...itemProperties];
        items[index].value = (event.target.value)?.trim().toUpperCase();
        setItemProperties(items);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {        

            let value = itemProperties.map(x => x.value);
            const items = [...itemProperties];
            if (value?.join("") == props.result) {
                let itemoutput = items.map((val) => {

                    val.disabled = true;
                    val.color = "correct";
                    return (val);
                })
                setItemProperties(itemoutput);
                alert("Great!");
            }
            else {
                let resultarray = props.result.split("");

                const itemresult = items.map((val, index) => {

                    if (val.value == resultarray[index]) {
                        val.disabled = true;
                        val.color = "correct";

                    }
                    else if (props.result.indexOf(val.value) > -1) {
                        val.disabled = true;
                        val.color = "misplaced";
                    }
                    else {
                        val.disabled = true;
                        val.color = "incorrect";
                    }
                    return (val);


                });

                setItemProperties(itemresult);
               
                props.onChange(props.rowIndex);
                if(props.rowIndex==3)
                {
                    alert("Oops! Word of the day is " +props.result);
                } 
            }
            
            

            
            
        }
    }

    return (
        <span className='td-style'>
            {
                itemProperties && itemProperties.map((item, index) => {
                    return (
                        <input type="text" maxLength={1} key={item.id} disabled={item.disabled} className={'td-style ' + item.color} value={item.value} onChange={(e)=>handleChange(e,index)} onKeyDown={(e) => handleKeyDown(e)} />
                    )
                })
            }
        </span>

    )

}

export default ItemList;



