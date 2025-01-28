import React, {useRef, useState, useEffect} from "react";
import Icon from "../../../components/Icon";
import EmojiPicker from 'emoji-picker-react';

import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilMediaPlay
} from '@coreui/icons'

//import useAutosizeTextArea from "./useAutosizeTextArea";
import {Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

const ChatInput = ({
	showAttach,
	setShowAttach,
	showEmojis,
	setShowEmojis,
	showPicker,
	setShowPicker,
	chosenEmoji,
	mess,
	setMess,
	submitNewMessage,
	onFileChange,
	setSelectedElement,
}) => {

	const textAreaRef = useRef(null);
	//useAutosizeTextArea(textAreaRef.current, mess);

	const handleChange = (e) => {
		console.log(e.target.value)
		setMess(e.target.value)
	};

	const detectEnterPress = (e) => {
		if ((e.key === "Enter" && !e.shiftKey) || (e.keyCode === 13 && !e.shiftKey) ) {
			submitNewMessage();
		} 
	};


	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<button
			aria-label="Message options"
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			<Icon id="downArrow"/>											
		</button>
	));

	CustomToggle.displayName = "Search";

	const CustomMenu = React.forwardRef(
		({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
		  const [value, setValue] = useState('');
	  
		  return (
			<div
			  ref={ref}
			  style={{backgroundColor: '#20272b'}}
			  className={className}
			  aria-labelledby={labeledBy}
			>
			  <ul className="list-unstyled">
				{React.Children.toArray(children).filter(
				  (child) =>
					!value || child.props.children?.toLowerCase().startsWith(value),
				)}
			  </ul>
			</div>
		  );
		},
	);

	CustomMenu.displayName = CustomMenu

	const change = async (eventkey) => {
		//alert(`you chosen: ${eventkey}`)
		setSelectedElement(eventkey)
	}

	const clickEmojis = () => {
		setShowPicker(!showEmojis)
		setShowEmojis(!showEmojis)
	}

	const clickClose = () => {
		setShowEmojis(false)
		setShowPicker(false)
	}

	return (
		<div className="chat__input-wrapper">
			{/* {showEmojis && (
				<button aria-label="Close emojis" onClick={clickClose}>
					<Icon id="cancel" className="chat__input-icon" />
				</button>
			)} */}
			<button aria-label="Emojis" onClick={clickEmojis}>
				<Icon
					id="smiley"
					className={`chat__input-icon ${
						showEmojis ? "chat__input-icon--highlight" : ""
					}`}
				/>
			</button>
			{/* {showEmojis && (
				<>
					<button aria-label="Choose GIF">
						<Icon id="gif" className="chat__input-icon" />
					</button>
					<button aria-label="Choose sticker">
						<Icon id="sticker" className="chat__input-icon" />
					</button>
				</>
			)} */}
			<div className="pos-rel">
				<button aria-label="Attach" onClick={() => setShowAttach(!showAttach)}>
					<Icon
						id="attach"
						className={`chat__input-icon ${
							showAttach ? "chat__input-icon--pressed" : ""
						}`}
					/>
				</button>

				<div className={`chat__attach ${showAttach ? "chat__attach--active" : ""}`}>
						<button className="chat__attach-btn" aria-label="attachImage" key="attachImage">
							<label htmlFor='fileInput' style={{color: '#f3f3f3'}}>
								{/* <Icon id="attachImage" className="chat__attach-icon" /> */}
								Фото
							</label>
							<input
								type="file"
								id="fileInput"
								name="photo"
								style={{ display: "none" }}
								onChange={(e)=>onFileChange(e, 'image')}
							/>								
						</button>

						<button className="chat__attach-btn" aria-label="attachVideo" key="attachVideo">
							<label htmlFor='fileInput2' style={{color: '#f3f3f3'}}>
								{/* <Icon id="attachImage" className="chat__attach-icon" /> */}
								Видео
							</label>
							<input
								type="file"
								id="fileInput2"
								name="photo"
								style={{ display: "none" }}
								onChange={(e)=>onFileChange(e, 'video')}
							/>								
						</button>

						<button className="chat__attach-btn" aria-label="Choose document" key="Choose document">
							<label htmlFor='fileInput3' style={{color: '#f3f3f3'}}>
								{/* <Icon id="attachDocument" className="chat__attach-icon" /> */}
								Документы
							</label>
							<input
								type="file"
								id="fileInput3"
								name="photo"
								style={{ display: "none" }}
								onChange={(e)=>onFileChange(e, 'doc')}
							/>								
						</button>

						
				</div>
			</div>
			
			<textarea
				className="chat__input"
				placeholder="Введите сообщение"
				value={mess} 
				onChange={handleChange} 
				ref={textAreaRef}			
				rows={1}
			/>

			<button aria-label="Send message" onClick={submitNewMessage}>
				<Icon id="send" className="chat__input-icon" />
			</button>
		</div>
	);
};

export default ChatInput;
