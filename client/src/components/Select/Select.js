import React from 'react';
import cl from './Select.module.css'

const Select = ({menuShow, setMenuShow, selected, placeholder}) => {

    return (
        <div 
            className={`${cl.select} ${menuShow && cl.selectClicked}`}
            onClick={()=> setMenuShow(!menuShow)}
        >
            {placeholder ? 
            <span style={{color: '#4e4e4e'}}>
                {placeholder}
            </span>
            :<span>
                {selected}
            </span>
            }
            {/* <div className={`${cl.caret} ${menuShow && cl.caretRotate}`}></div> */}
        </div>
    );
};

export default Select;