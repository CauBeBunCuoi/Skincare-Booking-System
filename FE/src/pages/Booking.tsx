import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./BookingPage.css";
import { Header } from "../components/Header";

// Define the form data structure
interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  message?: string;
}

// Define the structure of an appointment
type Appointment = BookingFormData

const timeSlots = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];

const generateDates = (days: number): string[] => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i); // Increment by i days
      dates.push(date.toDateString()); // Format as "Day Mon DD YYYY"
    }
    return dates;
  };

const BookingPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<BookingFormData>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const dates = generateDates(10);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    setAppointments((prev) => [...prev, data]);
    reset();
    alert("Appointment booked successfully!");
  };

  return (
    <div className="container">
      <Header></Header>
      <h2 className="title">Book an Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <div className="form-group">
      <label htmlFor="date">Appointment Date</label>
      <div className="date-slot-container">
        {dates.map((date) => (
          <button
            key={date}
            type="button"
            className={`date-slot ${selectedDate === date ? "active" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {date}
          </button>
        ))}
      </div>
      {selectedDate && <input type="hidden" name="date" value={selectedDate} />}
    </div>
        <div className="form-group">
      <label htmlFor="time">Appointment Time</label>
      <div className="time-slot-container">
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            className={`time-slot ${selectedTime === time ? "active" : ""}`}
            onClick={() => handleTimeClick(time)}
          >
            {time}
          </button>
        ))}
      </div>
      {selectedTime && <input type="hidden" name="time" value={selectedTime} />}
    </div>


        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            {...register("message")}
            placeholder="Add any notes for your appointment"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>

      {appointments.length > 0 && (
        <div className="appointments">
          <h3>Appointments</h3>
          <ul>
            {appointments.map((appt, index) => (
              <li key={index}>
                <strong>{appt.name}</strong> - {appt.email}
                <br />
                {appt.date} at {appt.time}
                {appt.message && <p>Notes: {appt.message}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
