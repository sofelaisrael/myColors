import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './App.css'

/*React Icons*/
import { BsArrow90DegLeft, BsArrow90DegRight, BsDash } from 'react-icons/bs'
import { FaArrowsAltV, FaTimes } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { BiSolidLockAlt, BiSolidLockOpenAlt } from 'react-icons/bi'
import { IoCopyOutline } from 'react-icons/io5'

/*Hooks*/
import StateHistory from './Hooks/StateHistory';
import Popup from './Components/Popup'

/* Random Color */
import uniqolor from 'uniqolor';


function App() {

	window.onload = () => {
		Generate()
	}

	useEffect(() => {
		var elem = document.getElementById("map")
		new Sortable(elem, {
			animation: 200,
			handle: '.sort',
			chosenClass: 'setup',
			dragClass: 'setu',
			ghostClass: 'set'
		})
	}, [])

	const [clicked, setClicked] = useState(false)

	const [limit, setLimit] = useState([0, 1, 2, 3, 4])

	const left = useRef(0)

	const arr = useRef([])

	const Generate = () => {
		var ar = [];
		limit.forEach(l => {
			var random = uniqolor.random()
		    arr.current = random
			var r = Object.entries(arr.current)
			ar.push(r)
		})
		setCount(ar)
		left.current = history.length
	}

	const copyToClipboard = (hex)=> {
		setClicked(false)
		const el = document.createElement('textarea');
		el.value = hex;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		const selected =
		  document.getSelection().rangeCount > 0
			? document.getSelection().getRangeAt(0)
			: false;
		el.select();
		const success = document.execCommand('copy');
		document.body.removeChild(el);
		if (selected) {
		  document.getSelection().removeAllRanges();
		  document.getSelection().addRange(selected);
		}
		return success;
	}

	const del = (id) => {
		let i = document.querySelectorAll('.item')
		let item = document.querySelector(`#${id}`)
		item.remove()
		if (i.length <= 2) {
			let ite = document.querySelector('.icons .del')
			ite.style.display = 'none'
		}	
	}
	var [count, setCount, { history, pointer, back, forwards }] = StateHistory([], 5)

	const b = () => {
		left.current--
		pointer = left.current
	}
	const f = () => {
		left.current++
		pointer = left.current
	}

    return (
		<>
			<div className="head">MyColors</div>
			<div id="map">
				{history[pointer].map((c, key) => {
					const hexVal = c[0][1].split('#')
					const copId = `copy${key}`
					const itId = `item${key}`
					return (
						<div id={itId} key={key} style={{color: !c[1][1] ? 'white' : 'black', background: c[0][1]}} className="item">
							{hexVal}
							<div className="icons">
								<div className="sort">
									<FaArrowsAltV />
								</div>
								<div className="copy">
									<IoCopyOutline id={copId} onClick={() => {
										copyToClipboard(hexVal[1])	
										setClicked(true)
										setTimeout(() => {
											setClicked(false)
										}, 2000)		
									}} />
								</div>
								<div className="lock">
									<BiSolidLockOpenAlt />			
								</div>
								<div className="del" onClick={() => {
									del(itId)
								}}>
									<FaTimes />
								</div>
							</div>
						</div>	
					)
				})}
			</div>

			<span className={clicked ? 'popup' : 'nopop'}>
				<Popup />
			</span>
			
			<div className="controls">
				<button className="btn" onClick={() => Generate()}>Generate</button>

				<button disabled={left.current <= 2 ? true : false} className="btn arr" onClick={() => {
					back()
					b()
				}} title='Back'><BsArrow90DegLeft /></button>

				<button disabled={left.current == history.length ? true : false} className="btn arr" onClick={() => {
					forwards()
					f()
				}} title='Forwards'><BsArrow90DegRight /></button>
				<div className="favourite" title='Favourites'>
					<FiHeart />
				</div>
			</div>
		</>
    );



};

export default App