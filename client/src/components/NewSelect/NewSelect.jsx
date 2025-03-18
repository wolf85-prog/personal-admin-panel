import React, { useState, useRef, useEffect } from 'react';
import classes from './NewSelect.module.css';

const NewSelect = ({id, options, titleCat, setTitleCat, onChange, disabled, heigthModal}) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [image, setImage] = useState([]);
    let arraySpec = []

    useEffect(() => {
        let handler = (e) => {
          if (!menuRef.current.contains(e.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      }, []);

    const menuRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) {
           setOpen(!open); 
        } 
    };

    return (
        <div>
            {!open && (<div className={classes.dropdown}>
                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
                        >
                            <div className={classes.dropdownTitle}>
                                {titleCat}
                            </div>
                            {/* <img src={open ? VectorUp : Vector} className={'chevron-new'} alt='' style={{marginBottom: '5px'}}/> */}
                        </div>
                    </div>
                </div>
            </div>
            )}

            <div className={classes.dropdownOpen}>

                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
                        >
                            <div className={classes.dropdownTitle}>
                                {titleCat}
                            </div>
                            {/* <img src={open ? VectorUp : Vector} className={'chevron-new'} alt='' style={{marginBottom: '5px'}}/> */}
                        </div>

                        <ul className={classes.listitem}>
                            {options.map((option, index) =>
                                <li 
                                    key={id + index} 
                                    value={option.id} 
                                    onClick={(e)=> {
                                            onChange(e)
                                            setTitleCat(option.name)
                                            setOpen(false);   
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> {option.name}
                                </li>
                            )}
                        </ul>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewSelect;