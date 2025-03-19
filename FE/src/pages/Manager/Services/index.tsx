import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { publicApi } from "../../../api/instance/axiosInstance";
import { callApi } from "../../../api/main/api_call/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const response = await callApi({
      instance: publicApi,
      method: "get",
      url: "/services",
    });

    if (response.success) {
      setServices(response.data.services);
      setLoading(false);
    } else {
      toast.error("Error when fetching data: " + response.message);
      setLoading(false);
    }
  };

  console.log(services)

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-10">Services</h1>
      <div className="w-[90%] mx-auto mt-5 flex justify-end">
        <Button
          onClick={() => {
            navigate("/manager/services/create");
          }}
          variant="contained"
          color="primary"
        >
          Add Service
        </Button>
      </div>
      <div className="w-[90%] mx-auto mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Duration (Hours)</th>
                <th className="border p-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border hover:bg-gray-100">
                  <td className="border p-2 text-center">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2">{service.name}</td>
                  <td className="border p-2">{service.description}</td>
                  <td className="border p-2 text-center">
                    {service.duration} giờ
                  </td>
                  <td className="border p-2 text-right">
                    {formatCurrency(service.fee)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Services;
