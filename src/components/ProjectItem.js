import React from 'react'

export default function ProjectItem({ project }) {

	const { title, url } = project

	return (
		<li>
			<a
				className="link js-link"
				target="_blank"
				rel="noopener noreferrer"
				href={url}
			>
				{title}
			</a>
		</li>
	)
}
