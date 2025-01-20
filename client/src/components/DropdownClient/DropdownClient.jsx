import React, {useState, useRef, useEffect} from 'react';
import Select from '../Select/Select'
import drp from './DropdownClient.module.css'

const DropdownClient = ({options, tags, setTags, placeholder, style}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [showClose, setShowClose] = useState(false)
    

    const selectOption = e => {
        
      setTags(e.target.innerText)
      
      //console.log("spec: ", e.target.innerText)
      setMenuShow(!menuShow)
    }

    const dropdownList = options.map((option, i) =>
      <li key={i} onClick={selectOption}>{option.label}</li>
    )

    const wrapperRef = useRef(null);

  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          //alert("You clicked outside of me!");
          setMenuShow(false)
          event.stopPropagation();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [wrapperRef ]);

    return (
        <div className={drp.dropdown} ref={wrapperRef}>
            <Select
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                selected={tags}
            />
            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={style}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default DropdownClient;