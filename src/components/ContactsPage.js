import React from 'react'

import ContactItem from './ContactItem'

const contacts = [
	{
		icon : '/icons/svgs/mail.svg',
		url : 'mailto:sharipovn4@gmail.com',
		text : 'sharipovn4@gmail.com',
	},
	{
		icon : '/icons/svgs/linkedin.svg',
		url	: 'https://www.linkedin.com/in/nodirdev/',
		text : 'nodirdev',
	},
	{
		icon : '/icons/svgs/phone.svg',
		url	: 'tel:+998905572240',
		text : '+998(90)-557-2240',
	},
	{
		icon : '/icons/svgs/github.svg',
		url	: 'https://github.com/nodirbek-sharipov',
		text : '@nodirbek-sharipov',
	},
	{
		icon : '/icons/svgs/twitter.svg',
		url	: 'https://twitter.com/nodir_dev',
		text : '@nodir_dev',
	},
	// {
	// 	icon : '/icons/svgs/instagram.svg',
	// 	url	: 'https://www.instagram.com/sharipov_nodirbek',
	// 	text : '@sharipov_nodirbek',
	// },
	{
		icon : '/icons/svgs/telegram.svg',
		url	: 'https://t.me/nodirbek_sharipov',
		text : '@nodirbek_sharipov',
	},
]


const ContactsPage = ()=>{

	return (
		<ul className="contactsUl">
			{contacts.map((x, i)=> <ContactItem key={i} contact={x} />)}
		</ul>
	)
}

export default ContactsPage
