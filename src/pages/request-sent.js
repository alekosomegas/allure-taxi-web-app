export default function RequestSent({ date, ride, route, contact }) {

    return (
        <div className="mail-sent">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Thank you for your inquiry, {contact.contact ? contact.name : ride.name}!<br></br> </h2>
            {contact.contact ?
            <div>
                <p>
                    We will contact you soon.
                </p>
            </div>
            :
            <div>
                <h4>We will confirm your booking by sending an email to {ride.email}. </h4>
                <br></br>
                <h4>Booking details:</h4>
                <p> <b>From: </b> {route.from.address} <br></br>
                    (Notes: {ride.notesFrom} )<br></br>
                    <b>To: </b>{route.to.address} <br></br>
                    (Notes: {ride.notesTo}) <br></br> 
                    <b>On:</b> {date.toDateString()} <b> At: </b>{date.toLocaleTimeString()} <br></br>
                    <b>Tel: </b> {ride.tel} <br></br>
                    <b>Requests: </b> {ride.requests}    
                </p>
            </div>
            }

        </div>
    )
}