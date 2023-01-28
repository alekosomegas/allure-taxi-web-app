import React from "react"
import Link from "next/link"

export default function Contact({ contact, setContact}) {
    React.useEffect(() => {
        setContact(prev => {
            return {
                ...prev,
                contact: false
            }
        })
    }, [])

    function handleChange(event) {
        const { name, value} = event.target
        setContact(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleSubmit() {
        setContact(prev => {
            return {
                ...prev,
                contact: true,
            }
        })
        await fetch('api/mail', {
            method: 'POST',
            body: JSON.stringify(contact)
        })
    }

    return (
        <div id="Contact">
            <div className='divider'>
            </div>
            <div className="contact-title">
                <h2>Get in touch</h2>
            </div>
            
            <form
                className="contact-form"
                onSubmit={handleSubmit}>
                <div className="contact-inputs">
                    <input
                        type={'text'}
                        placeholder="Your name"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                    />
                    <input
                        type={'email'}
                        placeholder="Your email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                    />
                    <input
                        type={'tel'}
                        placeholder="Your phone number"
                        name="tel"
                        value={contact.tel}
                        onChange={handleChange}
                    />
                </div>
                <div className="contact-ta">
                    <textarea 
                        placeholder="Your message"
                        name="message"
                        value={contact.message}
                        onChange={handleChange}
                    />
                </div>
                <div className="contact-btn">
                    <Link href={{pathname:"/request-sent", query:{}}} >
                        <button onClick={handleSubmit}>Send</button>
                    </Link>
                </div>
            </form>
        </div>

    )
}