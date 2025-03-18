import { Button } from "@mui/material";

const CompletedCard = ({ booking }) => {
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };

    const time = date.toLocaleTimeString("en-US", options).toUpperCase();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${time} - ${day}/${month}/${year}`;
  }

  const formatCurreny = (currency) => {
    return currency.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="w-full grid grid-cols-7 items-center">
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.booking._id}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        Lộc đẹp trai
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.service.name}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {formatDateTime(booking.booking.appointmentTime)}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {formatCurreny(booking.booking.totalFee)}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.therapist?.fullName ?? "No therapist"}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        <Button variant="contained" color="primary">
          View Execution Result
        </Button>
      </div>
    </div>
  );
};

export default CompletedCard;
