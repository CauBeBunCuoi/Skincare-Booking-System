const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBookingList, setCurrentBookingList] = useState("unprocess");

  const bookingCategories = {
    unprocess: [2, 3],
    processing: [5],
    completed: [6],
    canceled: [7, 8],
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const response = await callApi({
      instance: loginRequiredApi,
      method: "get",
      url: "/bookings",
    });

    if (response.success) {
      setBookings(response.data.bookings);
      setLoading(false);
    } else {
      toast.error("Error when fetching data: " + response.message);
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    bookingCategories[currentBookingList]?.includes(
      booking.booking.bookStatusId
    )
  );

  const handleCheckIn = async (booking) => {
    const response = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: `bookings/${booking._id}/check-in`,
    });

    if (response.success) {
      toast.success("Check-in successfully!");
      fetchBookings();
    }
  };

  const handleCheckOut = async (booking) => {
    const response = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: `bookings/${booking._id}/check-out`,
    });

    if (response.success) {
      toast.success("Check-out successfully!");
      fetchBookings();
    }
  };

  const handleFeedback = async (booking, rating, feedback) => {
    const response = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: `bookings/${booking._id}/feedback`,
      data: {
        feedbackContent: feedback,
        rate: rating,
      },
    });

    if (response.success) {
      await handleCheckOut(booking);
    }
  };

  const handleAssignTherapist = async (bookingId, therapistId) => {
    const response = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: `/bookings/${bookingId}/assign-therapist`,
      data: {
        therapistId: therapistId,
      },
    });
    if (response.success) {
      toast.success("Assign therapist successfully!");
      fetchBookings();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-bold text-4xl my-10">Booking Management</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="w-[95%]">
          <div className="w-full flex justify-between">
            {Object.keys(bookingCategories).map((category) => (
              <button
                key={category}
                onClick={() => setCurrentBookingList(category)}
                className={`px-7 py-3 font-bold text-white rounded-md transition-all 
                  ${
                    category === "unprocess"
                      ? "bg-indigo-600 hover:bg-indigo-900"
                      : ""
                  }
                  ${
                    category === "processing"
                      ? "bg-blue-600 hover:bg-blue-900"
                      : ""
                  }
                  ${
                    category === "completed"
                      ? "bg-green-600 hover:bg-green-900"
                      : ""
                  }
                  ${
                    category === "canceled" ? "bg-red-600 hover:bg-red-900" : ""
                  }
                  ${
                    currentBookingList === category
                      ? "border-4 border-yellow-500"
                      : ""
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-20">
            <div className="w-full grid grid-cols-7 items-center font-bold my-5">
              <div className="col-span-1 flex flex-col items-center justify-center">
                Booking ID
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                Customer
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                Service
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                Appointment Time
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                Total Fee
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                Therapist
              </div>
            </div>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div
                  key={booking.booking._id}
                  className="py-3 border-b border-t"
                >
                  {booking.booking.bookStatusId === 2 ? (
                    <UnTherapistCard
                      onSelectTherapist={handleAssignTherapist}
                      booking={booking}
                    />
                  ) : booking.booking.bookStatusId === 3 ? (
                    <IsTherapistCard
                      onCheckIn={handleCheckIn}
                      booking={booking}
                    />
                  ) : booking.booking.bookStatusId === 5 ? (
                    <ProcessingCard
                      onFeedBack={handleFeedback}
                      booking={booking}
                    />
                  ) : booking.booking.bookStatusId === 6 ? (
                    <CompletedCard booking={booking} />
                  ) : booking.booking.bookStatusId === 7 ? (
                    <CancelledCard booking={booking} />
                  ) : null}
                </div>
              ))
            ) : (
              <p>No bookings available for this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
