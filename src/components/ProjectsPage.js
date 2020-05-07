import React from 'react'
import ProjectItem from './ProjectItem'

const projects = [
	{
		title	: 'COVID-19',
		url		: 'https://uzcovid.netlify.app',
		date	: new Date(),
	},
	{
		title	: 'The Moment',
		url		: 'https://play.google.com/store/apps/details?id=com.nodir.themoment',
		date	: new Date(),
	},
	{
		title	: 'React UI',
		url		: 'https://ui-react.netlify.app',
		date	: new Date(),
	},
	{
		title	: 'Brick Crusher',
		url		: 'https://play.google.com/store/apps/details?id=com.NodirbekSharipov.BrickCrusher',
		date	: new Date(),
	},
	{
		title	: 'Dars Jadvali (Timetable)',
		url		: 'https://play.google.com/store/apps/details?id=com.urdu.NodirbekSharipov.DarsJadvali',
		date	: new Date(),
	},
	{
		title	: 'GPS Weather',
		url		: 'https://gps-weather.netlify.app',
		date	: new Date(),
	},
	{
		title	: 'Lotin-Krill',
		url		: 'https://lotin-krill.netlify.app',
		date	: new Date(),
	},
	{
		title	: 'Play Store Account',
		url		: 'https://play.google.com/store/apps/developer?id=Nodirbek+Sharipov',
		date	: new Date(),
	},
]

const ProjectsPage = ()=>{

	return (
		<ul className="bullet">
			{projects.map((x, i) => <ProjectItem key={i} project={x}/> )}
		</ul>
	)
}

export default ProjectsPage