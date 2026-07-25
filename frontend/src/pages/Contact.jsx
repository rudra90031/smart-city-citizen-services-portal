import {
FaPhoneAlt,
FaAmbulance,
FaFireExtinguisher,
FaShieldAlt,
FaBolt,
FaTint,
FaEnvelope,
FaBuilding,
FaClock
} from "react-icons/fa";

function Contact(){

const emergency=[
{
icon:<FaShieldAlt/>,
title:"Police",
number:"112"
},
{
icon:<FaAmbulance/>,
title:"Ambulance",
number:"108"
},
{
icon:<FaFireExtinguisher/>,
title:"Fire Brigade",
number:"101"
},
{
icon:<FaPhoneAlt/>,
title:"Women Helpline",
number:"1091"
},
{
icon:<FaBolt/>,
title:"Electricity Emergency",
number:"1912"
},
{
icon:<FaTint/>,
title:"Water Supply",
number:"1800-123-456"
}
];

return(

<section className="contact-page">

<div className="contact-hero">

<p>EMERGENCY CONTACTS</p>

<h1>Emergency Support <br/> & Helpline Center</h1>

<span>

Quick access to essential emergency services and Smart City
support whenever you need immediate assistance.

</span>

</div>

<div className="contact-grid">

{

emergency.map((item,index)=>(

<div className="contact-card" key={index}>

<div className="contact-icon">
{item.icon}
</div>

<h3>{item.title}</h3>

<h2>{item.number}</h2>

</div>

))

}

</div>

<div className="office-section">

<div>

<small>MUNICIPAL OFFICE</small>

<h2>Smart City Control Center</h2>

<p>

Municipal Corporation<br/>

Haridwar, Uttarakhand<br/>

India

</p>

</div>

<div>

<small>WORKING HOURS</small>

<h3>Monday - Friday</h3>

<p>09:00 AM - 06:00 PM</p>

</div>

<div>

<small>EMERGENCY</small>

<h3>24 × 7 Available</h3>

<p>Emergency Helplines are active throughout the day.</p>

</div>

</div>

<div className="guidelines">

<h2>Emergency Guidelines</h2>

<div className="guideline-grid">

<div>

<h4>🚑 Medical Emergency</h4>

<p>Call 108 immediately and share your exact location.</p>

</div>

<div>

<h4>🚒 Fire Emergency</h4>

<p>Evacuate the area and contact the fire brigade.</p>

</div>

<div>

<h4>🚓 Crime Emergency</h4>

<p>Dial 112 and avoid disturbing the incident location.</p>

</div>

<div>

<h4>⚡ Electrical Hazard</h4>

<p>Stay away from damaged electrical wires.</p>

</div>

<div>

<h4>💧 Water Leakage</h4>

<p>Report immediately using the Smart City Complaint Portal.</p>

</div>

<div>

<h4>🌧 Natural Disaster</h4>

<p>Follow official government instructions and move to safe areas.</p>

</div>

</div>

</div>

<div className="admin-contact">

<h2>Need Further Assistance?</h2>

<p>

For technical issues, government queries or portal support,
contact the Smart City Administration.

</p>

<div className="email-box">

<FaEnvelope/>

<span>support@smartcityportal.in</span>

</div>

</div>

</section>

);

}

export default Contact;