import { useEffect, useState } from "react";
import { callApi } from "../../../../api/main/api_call/api";
import { adminApi, publicApi } from "../../../../api/instance/axiosInstance";
import { toast } from "react-toastify";

const CreateService = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinStatuses, setSkinStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [serviceTypeId, setServiceTypeId] = useState(null);
  const [skinTypeIds, setSkinTypeIds] = useState([]);
  const [skinStatusIds, setSkinStatusIds] = useState([]);
  const [name, setName] = useState("");
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [serviceImage, setServiceImage] = useState("");
  const [previewImage, setPreviewImage] = useState(""); // URL ảnh preview
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setLoading(false);
    fetch();
  }, []);

  const fetch = async () => {
    const [res1, res2, res3] = await Promise.all([
      callApi({
        instance: publicApi,
        method: "get",
        url: "/services/service-types",
      }),
      callApi({
        instance: publicApi,
        method: "get",
        url: "/services/skin-types",
      }),
      callApi({
        instance: publicApi,
        method: "get",
        url: "/services/skin-statuses",
      }),
    ]);

    if (res1.success && res2.success && res3.success) {
      setServiceTypes(res1.data.serviceTypes);
      setSkinTypes(res2.data.skinTypes);
      setSkinStatuses(res3.data.skinStatuses);
      setLoading(false);
    } else {
      toast.error("Error fetching data");
    }
  };

  const handleImageUpload = (event: any, setImage: any) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64 = reader.result;
        setImage(base64);
      }
    };

    reader.readAsDataURL(file);
  };

  const toggleSelection = (id, list, setList) => {
    setList(
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
    );
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        name: "",
        stepOrder: steps.length + 1,
        description: "",
        imageBase64: "",
      },
    ]);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const handleSubmit = async () => {
    const payload = {
      description,
      serviceTypeId,
      name,
      duration,
      fee,
      imageBase64: serviceImage,
      steps,
    };

    const response = await callApi({
      instance: publicApi,
      method: "post",
      url: "/services",
      data: payload,
    });

    if (response.success) {
      toast.success("Service created successfully!");
    } else {
      toast.error("Failed to create service");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create New Service
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Service Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Fee"
          className="border p-2 rounded"
          value={fee}
          onChange={(e) => setFee(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Duration (hours)"
          className="border p-2 rounded"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setServiceTypeId(e.target.value)}
        >
          <option value="">Select Service Type</option>
          {serviceTypes.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          className="border p-2 rounded"
          onChange={(e) => handleImageUpload(e, setServiceImage)}
        />

        <img
          src={`data:image/jpeg;base64,${serviceImage.split(",")[1]}`}
          alt="Preview"
          className="mt-2 w-40 h-40 object-cover rounded-md"
        />
      </div>

      {/* Skin Types */}
      <h2 className="text-xl font-bold mt-6">Skin Types</h2>
      <div className="flex flex-wrap gap-3 mt-2">
        {skinTypes.map((type) => (
          <label
            key={type._id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={skinTypeIds.includes(type._id)}
              onChange={() =>
                toggleSelection(type._id, skinTypeIds, setSkinTypeIds)
              }
            />
            {type.name}
          </label>
        ))}
      </div>

      {/* Skin Statuses */}
      <h2 className="text-xl font-bold mt-6">Skin Statuses</h2>
      <div className="flex flex-wrap gap-3 mt-2">
        {skinStatuses.map((status) => (
          <label
            key={status._id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={skinStatusIds.includes(status._id)}
              onChange={() =>
                toggleSelection(status._id, skinStatusIds, setSkinStatusIds)
              }
            />
            {status.name}
          </label>
        ))}
      </div>

      {/* Steps */}
      <h2 className="text-xl font-bold mt-6">Steps</h2>
      {steps.map((step, index) => (
        <div key={index} className="border p-4 rounded my-2 bg-gray-50">
          <p className="text-sm font-semibold">Step {step.stepOrder}</p>
          <input
            type="text"
            placeholder="Step Name"
            className="border p-2 w-full rounded mt-2"
            value={step.name}
            onChange={(e) => handleStepChange(index, "name", e.target.value)}
          />
          <textarea
            placeholder="Step Description"
            className="border p-2 w-full rounded mt-2"
            value={step.description}
            onChange={(e) =>
              handleStepChange(index, "description", e.target.value)
            }
          />

          {/* Input chọn ảnh */}
          <input
            type="file"
            className="border p-2 w-full rounded mt-2"
            onChange={(e) =>
              handleImageUpload(e, (base64) =>
                handleStepChange(index, "imageBase64", base64)
              )
            }
          />

          {/* Ảnh preview */}
          {step.imageBase64 && (
            <img
              src={`data:image/jpeg;base64,${step.imageBase64.split(",")[1]}`}
              alt="Step Preview"
              className="mt-2 w-40 h-40 object-cover rounded-md"
            />
          )}
        </div>
      ))}

      <button
        onClick={handleAddStep}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Step
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-6 py-2 rounded mt-6 block w-full"
      >
        Create Service
      </button>
    </div>
  );
};

export default CreateService;
