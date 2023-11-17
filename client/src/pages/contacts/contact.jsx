// import React from 'react';
// import './contact.scss';

// const Contactcomp = () => {
//   return (
//     <div>
//     <span className='headingcontact'><h1>COLLEGE OF ENGINEERING</h1></span>
//     <div className="containercontact">
//       <div className="contentcontact">
//         <h3>Principal:</h3>
//         <p>Ph no +91 ##########</p>
//         <p>Email: sdfjhsj@gmail.com</p>
//       </div>
//     </div>
//     <div className="containercontact">
//       <div className="contentcontact">
//         <h3>PG Dean:</h3>
//         <p>Ph no +91 ##########</p>
//         <p>Email: sdfjhsj@gmail.com</p>
//       </div>
//     </div>
//     <div className="containercontact">
//       <div className="contentcontact">
//         <h3>UG Dean:</h3>
//         <p>Ph no +91 ##########</p>
//         <p>Email: sdfjhsj@gmail.com</p>
//       </div>
//     </div>
//     <div className="containercontact">
//       <div className="contentcontact">
//         <h3>Chairman:</h3>
//         <p>Ph no +91 ##########</p>
//         <p>Email: sdfjhsj@gmail.com</p>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Contactcomp;
// File: Contactcomp.jsx

// File: Contactcomp.jsx

// File: Contactcomp.jsx

import React from 'react';
import './contact.scss';

const Contactcomp = () => {
  const officials = [
    {
      name: 'Principal',
      NAME:'Dr.Savier J S',
      phoneNumber: '+91 47125 15502',
      email: 'principal@cet.ac.in',
    },
    {
      name: 'PG Dean',
      NAME:'Dr. Lekshmi A',
      phoneNumber: '+91 8745603876',
      email: 'a.lekshmi@cet.ac.in'
    },
    {
      name: 'UG Dean',
      NAME:'Dr. Jisha V R',
      phoneNumber: '+91 6298452745',
      email: 'deanug@cet.ac.in',
    },
    {
      name: 'Chairperson',
      NAME:'Amith K',
      phoneNumber: '+91 5657868979',
      email: 'amith@gmail.com',
    },
    // Add more officials as needed...
  ];

  return (
    <div className='contactpage'>
    <div className="contact-container">
      <span className='headingcontact'><h1>COLLEGE OF ENGINEERING</h1></span>
      <br></br>
      <br></br>
      <div className="contact-wrapper">
        {officials.map((official, index) => (
          <div className="contact-item" key={index}>
            <div className="contact-name">
              <span className="title">{official.name}:</span>
            </div>
            <div className="contact-details">
              <div className="contentcontact">
                <h2>{official.NAME}</h2>
                <h5>{official.phoneNumber}</h5>
                <p>Email: {official.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Contactcomp;


