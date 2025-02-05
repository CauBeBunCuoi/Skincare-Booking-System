import "./DoctorProfile.css";

export const DoctorProfile = () => {
    return (
        <div className="doctor-card">
          <div className="doctor-image">
            <img
              alt="Doctor's profile picture"
              src="https://storage.googleapis.com/a1aa/image/CyWoAW6byzAe1RYKQw420wAzhiq6ml0DrPb3EnxEwDI.jpg"
            />
          </div>
          <div className="doctor-info">
            <h1 className="doctor-name">
              Dr. Richard James <i className="fas fa-check-circle verified-icon"></i>
            </h1>
            <p className="doctor-specialty">
              MBBS - General physician
              <span className="experience">4 Years</span>
            </p>
            <div className="doctor-about">
              <h2>
                About <i className="fas fa-info-circle"></i>
              </h2>
              <p>
                Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.
              </p>
            </div>
            <div className="doctor-fee">
              <p>
                Appointment fee: <span>$50</span>
              </p>
            </div>
          </div>
        </div>
      );
};
