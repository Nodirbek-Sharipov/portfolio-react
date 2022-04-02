import React from 'react'
import ProjectItem from './ProjectItem'

const current_projects = [
	{
		title	: 'Rize - iOS',
		url		: 'https://apps.apple.com/us/app/rize-see-what-sparks/id1550967095',
		date	: new Date(),
	},
	{
		title	: 'Rize - android',
		url		: 'https://play.google.com/store/apps/details?id=com.joinrize.rize',
		date	: new Date(),
	},
	{
		title	: 'Rize - web',
		url		: 'https://www.joinrize.com/',
		date	: new Date(),
	},
	{
		title	: 'sdb.uz',
		url		: 'https://sdb.uz/',
		date	: new Date(),
	},
]

const old_projects = [
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
]

const ProjectsPage = ()=>{

	const [current, setCurrent] = React.useState(true)

	return (
		<div>
			<ul className="bullet">
				{current && current_projects.map((x, i) => <ProjectItem key={i} project={x}/> )}
				{!current && old_projects.map((x, i) => <ProjectItem key={i} project={x}/> )}
			</ul>
			<div style={{ marginTop: '1rem' }}>
				<a
					href='#!'
					className={`link js-link ${current && 'activeLink'}`}
					onClick={()=>setCurrent(true)}
				>Current</a>

				<a
					style={{ marginLeft: '1rem' }}
					href='#!'
					className={`link js-link ${!current && 'activeLink'}`}
					onClick={()=>setCurrent(false)}
				>Old</a>
			</div>
		</div>
	)
}

export default ProjectsPage
