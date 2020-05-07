import React, {
	useEffect,
} from 'react'
import { NavLink, Route } from "react-router-dom";

import './App.css'
import fg from './assets/images/fg.png'

import HomePage from './components/HomePage'
import ContactsPage from './components/ContactsPage'
import ProjectsPage from './components/ProjectsPage'
import SkillsPage from './components/SkillsPage'

function App() {


	useEffect(()=>{

		const elements = {
			overlay: document.querySelector(".js-overlay"),
			site: document.querySelector(".js-site"),
			container: document.querySelector(".js-container"),
			links: document.querySelectorAll(".js-link"),
			animins: document.querySelectorAll(".js-animin"),
			portrait: document.querySelector(".js-portrait"),
			portraitCanvas: document.querySelector(".js-portraitCanvas"),
			cursorSmall: document.querySelector(".js-cursorSmall"),
			cursorBig: document.querySelector(".js-cursorBig"),
			cursorInner: document.querySelector(".js-cursorInner"),
		}

		const options = {
			pointerFine: window.matchMedia("(pointer: fine)"),
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			windowResizeTimer: null,
			windowResizeTimeout: 100,
		}

		const transformPrefix = (()=>{
			let e = document.createElement("div")
			if (null == e.style.transform) {
				let t = ["Webkit", "Moz", "ms"]
				for (let n in t){
					if (e.style[t[n] + "Transform"] !== undefined){
						return t[n] + "Transform"
					}
				}
			}
			return "transform"
		})()

		const updateWindow = (t = options)=>{
			t.windowWidth = window.innerWidth
			t.windowHeight = window.innerHeight
		}

		const intro = function() {
			let t = {
				overlayDelay: 2e3,
				animDelay: 125,
				animIndex: 0
			}
			return {
				init: function() {
					elements.overlay.style.opacity = 0
					setTimeout(function() {
						elements.animins.forEach(function(e) {
							setTimeout(function() {
								e.style.opacity = "1"
								e.style[transformPrefix] = "translateY(0) skewY(0deg)"
							}, t.animDelay * t.animIndex)
							t.animIndex++
						})
						elements.overlay.style.display = "none"
					}, t.overlayDelay)
				}
			}
		}()

		const cursor = function() {
			let t = {
					x: options.windowWidth / 2,
					y: options.windowHeight / 2,
					lazyX: options.windowWidth / 2,
					lazyY: options.windowWidth / 2,
					ease: .2
				},
				e = {
					moveX: 0,
					moveY: 0,
					siteX: 0,
					siteY: 0,
					siteMulti: 20,
					portraitX: 0,
					portraitY: 0,
					portraitMulti: 10
				},
				o = {
					isVisible: false,
					isVisibleTimer: null,
					isVisibleTimeout: 1e3,
					isHovering: false,
					isClicked: false
				}

			function n(e) {
				t.x = e.clientX
				t.y = e.clientY
				o.isVisible = true
				if(o.isVisible){
					null !== o.isVisibleTimer && clearTimeout(o.isVisibleTimer)
				}
				o.isVisibleTimer = setTimeout(function() {
					o.isHovering || (o.isVisible = false)
				}, o.isVisibleTimeout)
			}

			function i(){
				t.lazyX += (t.x - t.lazyX) * t.ease
				t.lazyY += (t.y - t.lazyY) * t.ease
				elements.cursorSmall.style[transformPrefix] = "translate(" + t.x.toFixed(2) + "px, " + t.y.toFixed(2) + "px)"
				elements.cursorBig.style[transformPrefix] = "translate(" + t.lazyX.toFixed(2) + "px, " + t.lazyY.toFixed(2) + "px)"
				if(o.isVisible){
					elements.cursorSmall.style.opacity = "1"
					if(o.isHovering){
						elements.cursorBig.style.opacity = "0"
						if(o.isClicked){
							elements.cursorInner.style[transformPrefix] = "scale(3)"
						}else{
							elements.cursorInner.style[transformPrefix] = "scale(5)"
						}
					}else{
						elements.cursorInner.style[transformPrefix] = "scale(1)"
						elements.cursorBig.style.opacity = "0.25"
					}
				}else{
					elements.cursorSmall.style.opacity = "0"
					elements.cursorBig.style.opacity = "0"
				}
				e.moveX = (t.lazyX - options.windowWidth / 2) / (options.windowWidth / 2)
				e.moveY = (t.lazyY - options.windowHeight / 2) / (options.windowHeight / 2)
				e.siteX = e.moveX * -e.siteMulti
				e.siteY = e.moveY * -e.siteMulti
				e.portraitX = e.moveX * -e.portraitMulti
				e.portraitY = e.moveY * -e.portraitMulti
				elements.site.style[transformPrefix] = "translate(" + e.siteX.toFixed(2) + "px, " + e.siteY.toFixed(2) + "px)"
				elements.portrait.style[transformPrefix] = "translate(" + e.portraitX.toFixed(2) + "px, " + e.portraitY.toFixed(2) + "px)"
				requestAnimationFrame(i)
			}

			return {
				init: function() {
					document.addEventListener("mousemove", function(e) {
						n(e)
					}, false)
					document.addEventListener("mouseleave", function(e) {
						o.isVisible = false
					}, false)
					document.addEventListener("mousedown", function(e) {
						o.isClicked = true
						n(e)
					}, false)
					document.addEventListener("mouseup", function(e) {
						o.isClicked = false
					}, false)
					elements.links.forEach(function(t) {
						t.addEventListener("mouseenter", function(e) {
							o.isHovering = true
						}, false)
						t.addEventListener("mouseleave", function(e) {
							o.isHovering = false
						}, false)
					})
					requestAnimationFrame(i)
				}
			}
		}()

		const canvasProps = {
			ctx: elements.portraitCanvas.getContext("2d"),
			image: null,
			imageData: null,
			imageSrc: elements.portraitCanvas.getAttribute("data-src"),
			imageLoaded: false,
			sliceX: 0,
			sliceY: 0,
			sliceHeight: 0,
			minGlitches: 2,
			maxGlitches: 8,
			delayGlitchMin: 50,
			delayGlitchMax: 100,
			delayRestartMin: 1e3,
			delayRestartMax: 5e3,
		}

		const reDraw = function() {
			elements.portraitCanvas.width = options.windowHeight
			elements.portraitCanvas.height = options.windowHeight
			requestAnimationFrame(function () {
				if(canvasProps.imageLoaded){
					canvasProps.ctx.drawImage(canvasProps.image, 0, 0, elements.portraitCanvas.height, elements.portraitCanvas.height)
				}
			})
		}

		window.addEventListener("resize", function() {
			if(null !== options.windowResizeTimer){
				clearTimeout(options.windowResizeTimer)
			}
			options.windowResizeTimer = setTimeout(function() {
				updateWindow()
				reDraw()
			}, options.windowResizeTimeout)
		}, false)

		window.addEventListener("load", function() {
			intro.init()
		}, false)

		if(options.pointerFine.matches){
			cursor.init()
		}

		canvasProps.image = new Image()
		canvasProps.image.src = canvasProps.imageSrc
		canvasProps.image.addEventListener("load", function() {
			canvasProps.imageLoaded = true
			reDraw()
		})

	})

	return (
	<>
		<div className="overlay js-overlay"></div>
		<div className="site js-site">
			<div className="container js-container">
				<header className="header js-animin">
					<h1 className="header__heading"> <span className="header__name">Nodirbek Sharipov</span> <span className="header__title">Software engineer</span> </h1> </header>
				<div className="bottom">
					<main className="main js-animin">
						<Route
							exact={true}
							path="/"
							component={HomePage}
						/>

						<Route
							path="/contacts"
							component={ContactsPage}
						/>

						<Route
							path="/projects"
							component={ProjectsPage}
						/>

						<Route
							path="/skills"
							component={SkillsPage}
						/>
					</main>
					<footer className="footer js-animin">
						<ul className="footer__connect">
							<li>
								<NavLink
									activeClassName="activeLink"
									className="link js-link"
									exact={true}
									to="/"
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									activeClassName="activeLink"
									className="link js-link"
									to="/contacts"
								>
									Contacts
								</NavLink>
							</li>
							<li>
								<NavLink
									activeClassName="activeLink"
									className="link js-link"
									to="/projects"
								>
									Projects
								</NavLink>
							</li>
							<li>
								<NavLink
									activeClassName="activeLink"
									className="link js-link"
									to="/skills"
								>
									Skills
								</NavLink>
							</li>
						</ul>
					</footer>
				</div>
			</div>
		</div>
		<div className="portrait js-portrait">
			<div className="portrait__inner">
				<canvas
					className="portrait__canvas js-portraitCanvas"
					data-src={fg}
				/>
			</div>
		</div>
		<div className="cursor cursor--small js-cursorSmall">
			<div className="cursor__inner js-cursorInner"></div>
		</div>
		<div className="cursor cursor--big js-cursorBig"></div>
	</>
	)
}

export default App
