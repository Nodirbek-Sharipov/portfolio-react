import React from 'react'

const HomePage = ()=>{

	var ages = new Date().getFullYear() - new Date(1998, 7, 20).getFullYear()

	return (
		<p className="main__description">
			I'm a {ages}y.o. software engineer from Uzbekistan, specialized in scalability, security, immersive user experiences and full-stack development.
		</p>
	)
}

export default HomePage
