import React from 'react'

import mail from '../assets/svgs/mail.svg'
import phone from '../assets/svgs/phone.svg'
import github from '../assets/svgs/github.svg'
import twitter from '../assets/svgs/twitter.svg'
import instagram from '../assets/svgs/instagram.svg'
import telegram from '../assets/svgs/telegram.svg'
import ContactItem from './ContactItem'

const contacts = [
	{
		icon	: mail,
		url	: 'mailto:mail@nodir.dev',
		text	: 'mail@nodir.dev',
	},
	{
		icon	: phone,
		url	: 'tel:+998905572240',
		text	: '+998(90)-557-2240',
	},
	{
		icon	: github,
		url	: 'https://github.com/nodirbek-sharipov',
		text	: '@nodirbek-sharipov',
	},
	{
		icon	: twitter,
		url	: 'https://twitter.com/nodir_dev',
		text	: '@nodir_dev',
	},
	{
		icon	: instagram,
		url	: 'https://www.instagram.com/sharipov_nodirbek',
		text	: '@sharipov_nodirbek',
	},
	{
		icon	: telegram,
		url	: 'https://t.me/nodirbek_sharipov',
		text	: '@nodirbek_sharipov',
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
