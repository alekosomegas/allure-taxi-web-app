export default function RequestSent({ ride, contact }) {

    return (
        <div className="mail-sent">
            <h2>Thank you for your inquiry {contact.contact ? contact.name : ride.name}!<br></br> </h2>
            {contact.contact ?
            <div>
                <p>
                    We will contact you soon.
                </p>
            </div>
            :
            <div>
                <h4>We will confirm your booking soon{ride.email && ` by email to ${ride.email}`}. </h4>
                <hr></hr>
                <h4>Booking details:</h4>
                <p> <b>From: </b> {ride.route.from.address} <br></br>
                    (Notes: {ride.notesFrom} )<br></br>
                    <b>To: </b>{ride.route.to.address} <br></br>
                    (Notes: {ride.notesTo}) <br></br> 
                    <b>On:</b> {ride.dateAndTime.toDateString()} <b> At: </b>{ride.dateAndTime.toLocaleTimeString()} <br></br>
                    <b>Tel: </b> {ride.tel} <br></br>
                    <b>Car: </b> {ride.car}-Seater <br></br>
                    <b>Requests: </b> {ride.requests}    
                </p>
            </div>
            }

        </div>
    )
}