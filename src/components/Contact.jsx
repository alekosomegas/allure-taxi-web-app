export default function Contact() {
    return (
        <div id="Contact">
            <div className='divider'>
            </div>
            <div>
                <h2>Contact Us</h2>
                <p>Email: kangkelidis</p>
                <p>Tel: +35799</p>
                <p>Address: +35799</p>
            </div>
            
            <form>
                <input
                    type={'text'}
                    placeholder="Name"
                />
                <input
                    type={'email'}
                    placeholder="Email"
                />
                <input
                    type={'tel'}
                    placeholder="Tel"
                />
                <textarea 
                    placeholder="Message"
                />
                <button>Send</button>
            </form>
        </div>

    )
}