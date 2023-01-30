import React from "react"
import { useRouter } from "next/router"
import {changeSingleStateValue} from '../util'

export default function Contact({ contact, setContact}) {
    const router = useRouter();
    const [sendClicked, setSendClicked] = React.useState(false)

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
        if(name === "tel" && isNaN(event.nativeEvent.data)) {
            return}
        setContact(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function validateInputs() {
        let formIsValid = true

        if(!contact.name) {
            formIsValid = false
        }
        if(!contact.email && !contact.tel) {
            formIsValid = false
        }
        if(!contact.message) {
            formIsValid = false
        }

        return formIsValid;
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setSendClicked(true)
        if (validateInputs()) {
            changeSingleStateValue(setContact, "contact", true)
            await fetch('api/mail', {
                method: 'POST',
                body: JSON.stringify(contact)
            })

            router.push("/request-sent")
        } else {

        }

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
                        placeholder="Your name*"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        className={`${sendClicked && !contact.name && "check"}`}
                    />
                    <input
                        type={'email'}
                        placeholder="Your email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        className={`${sendClicked && (!contact.tel && !contact.email) && "check"}`}
                    />
                    <input
                        type={'tel'}
                        placeholder="Your phone number"
                        name="tel"
                        value={contact.tel}
                        onChange={handleChange}
                        className={`${sendClicked && (!contact.tel && !contact.email) && "check"}`}
                    />
                </div>
                <div className="contact-ta">
                    <textarea 
                        placeholder="Your message*"
                        name="message"
                        value={contact.message}
                        onChange={handleChange}
                        className={`${sendClicked && !contact.message && "check"}`}
                    />
                </div>
                <div className="contact-btn">
                        <button onClick={handleSubmit}>Send</button>
                </div>
            </form>
        </div>

    )
}