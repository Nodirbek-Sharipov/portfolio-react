import React from 'react'

export default function ContactItem({ contact }) {

	const { icon, url, text } = contact

	return (
		<li>
			<img
				src={icon}
				className="linkIcon"
				alt=""
			/>
			<a
				className="link js-link"
				target="_blank"
				rel="noopener noreferrer"
				href={url}
			>
				{ text }
			</a>
		</li>
	)
}
