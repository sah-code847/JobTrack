import { useState, useEffect } from "react";

const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "General Medicine",
];

const specializations = [
  "General Physician",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Surgeon",
];

const experienceOptions = [
  { value: "1", label: "1 Year" },
  { value: "2", label: "2 Years" },
  { value: "3", label: "3 Years" },
  { value: "5", label: "5 Years" },
  { value: "10", label: "10 Years" },
  { value: "15", label: "15 Years" },
  { value: "20", label: "20+ Years" },
];

const availabilityOptions = ["Available", "Busy", "On Leave"];

const emptyForm = {
  name: "",
  specialization: "",
  department: "",
  experience: "",
  phone: "",
  availability: "",
};

const availabilityStyle = {
  Available: "bg-green-100 text-green-700",
  Busy: "bg-yellow-100 text-yellow-700",
  "On Leave": "bg-red-100 text-red-700",
};

const doctorsPerPage = 5;

const Doctors = ({darkMode}) => {
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("doctors");
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [viewDoctor, setViewDoctor] = useState(null);
  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDepartment, availability, sortOption]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  
  const validate = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
  newErrors.name = "Name is required";
} else if (formData.name.trim().length < 3) {
  newErrors.name = "Name must be at least 3 characters";
} else if (!/^[A-Za-z. ]+$/.test(formData.name.trim())) {
  newErrors.name = "Name can only contain letters";
}
    if (formData.specialization === "") {
      newErrors.specialization = "Specialization is required";
    }

    if (formData.department === "") {
      newErrors.department = "Department is required";
    } else if (!departments.includes(formData.department)) {
      newErrors.department = "Please select a valid department";
    }

    if (formData.experience === "") {
      newErrors.experience = "Experience is required";
    }

    if (formData.phone === "") {
  newErrors.phone = "Phone is required";
} else if (!/^\d+$/.test(formData.phone)) {
  newErrors.phone = "Phone can only contain digits";
} else if (formData.phone.length !== 10) {
  newErrors.phone = "Phone must be exactly 10 digits";
} else if (!/^9[78]\d{8}$/.test(formData.phone)) {
  newErrors.phone = "Phone must start with 97 or 98";
} else if (
  doctors.some((d) => d.phone === formData.phone && d.id !== editId)
) {
  newErrors.phone = "This phone number already exists";
}

    if (formData.availability === "") {
      newErrors.availability = "Availability is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addDoctor = () => {
    if (!validate()) return;

    const newDoctor = {
      id: Date.now(),
      name: formData.name.trim(),
      specialization: formData.specialization,
      department: formData.department,
      experience: formData.experience,
      phone: formData.phone,
      availability: formData.availability,
      pin: false,
    };

    setDoctors((prev) => [...prev, newDoctor]);
    setFormData(emptyForm);
    setErrors({});
    showToast("Doctor added successfully ✅");
  };

  const startEdit = (id) => {
    if (!window.confirm("Are you sure you want to edit?")) return;

    const doctor = doctors.find((d) => d.id === id);
    setEditId(id);
    setErrors({});
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      department: doctor.department,
      experience: doctor.experience,
      phone: doctor.phone,
      availability: doctor.availability,
    });
  };

  const saveEdit = () => {
    if (!validate()) return;

    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === editId
          ? { ...doctor, ...formData, name: formData.name.trim() }
          : doctor
      )
    );
    setEditId(null);
    setFormData(emptyForm);
    setErrors({});
    showToast("Doctor updated successfully ✅");
  };

  const cancelEdit = () => {
    if (!window.confirm("Are you sure you want to cancel?")) return;

    setEditId(null);
    setFormData(emptyForm);
    setErrors({});
  };

  const deleteDoctor = (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    showToast("Deleted successfully ✅");
  };

  const pinDoctor = (id) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === id ? { ...doctor, pin: !doctor.pin } : doctor
      )
    );
  };


  const searchText = search.toLowerCase();
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(searchText) ||
        doctor.specialization.toLowerCase().includes(searchText) ||
        doctor.department.toLowerCase().includes(searchText)) &&
      (filterDepartment === "" || doctor.department === filterDepartment) &&
      (availability === "" || doctor.availability === availability)
  );

  
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortOption) {
      case "pin-asc":
        return Number(!!b.pin) - Number(!!a.pin);
      case "pin-desc":
        return Number(!!a.pin) - Number(!!b.pin);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "experience-asc":
        return Number(a.experience) - Number(b.experience);
      case "experience-desc":
        return Number(b.experience) - Number(a.experience);
      default:
        return 0;
    }
  });

 
  const totalPages = Math.max(1, Math.ceil(sortedDoctors.length / doctorsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(startIndex, startIndex + doctorsPerPage);


const fieldClass = (field, extra = "") =>
  `w-full min-w-0 border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
      : "bg-white text-gray-900 border-gray-300"
  } ${
    errors[field]
      ? "border-red-500 focus:ring-red-500"
      : "focus:ring-blue-500"
  } ${extra}`;

const filterClass =
  `w-full min-w-0 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
    darkMode
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-gray-900 border-gray-300"
  }`;

const thClass =
  `text-left px-4 sm:px-6 py-4 text-sm font-semibold ${
    darkMode ? "text-gray-200" : "text-gray-600"
  }`;

const tdClass =
  `px-4 sm:px-6 py-4 text-sm ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <div>
     
      <div className="flex items-center justify-between">
        <h1 className="font-bold px-4 py-2 text-2xl">Doctors</h1>
        <p className="px-4 text-lg text-gray-500">Manage and view all doctors</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-end mt-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={filterClass}
        >
          <option value="">Sort By</option>
          <option value="pin-asc">Pinned First</option>
          <option value="pin-desc">Unpinned First</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
          <option value="experience-asc">Experience: Low → High</option>
          <option value="experience-desc">Experience: High → Low</option>
        </select>

        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className={filterClass}
        >
          <option value="">All Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className={filterClass}
        >
          <option value="">All Availability</option>
          {availabilityOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div>
          <input
            type="text"
            value={formData.name}
            placeholder="Doctor Name..."
            onChange={(e) => handleChange("name", e.target.value)}
            className={fieldClass("name")}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <select
            value={formData.specialization}
            onChange={(e) => handleChange("specialization", e.target.value)}
            className={fieldClass("specialization", "cursor-pointer")}
          >
            <option value="">Select Specialization</option>
            {specializations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.specialization && (
            <p className="mt-1 text-sm text-red-500">{errors.specialization}</p>
          )}
        </div>

        <div>
          <select
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            className={fieldClass("department", "cursor-pointer")}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-500">{errors.department}</p>
          )}
        </div>

        <div>
          <select
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            className={fieldClass("experience", "cursor-pointer")}
          >
            <option value="">Select Experience</option>
            {experienceOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
          )}
        </div>

       <div>
  <input
    type="text"
    inputMode="numeric"
    maxLength={10}
    value={formData.phone}
    placeholder="Phone (10 digits)..."
    onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
    className={fieldClass("phone")}
  />
  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
</div>

        <div>
          <select
            value={formData.availability}
            onChange={(e) => handleChange("availability", e.target.value)}
            className={fieldClass("availability", "cursor-pointer")}
          >
            <option value="">Select Availability</option>
            {availabilityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.availability && (
            <p className="mt-1 text-sm text-red-500">{errors.availability}</p>
          )}
        </div>
      </div>

    
      {editId ? (
        <div className="flex gap-3 mt-3">
          <button
            onClick={cancelEdit}
            className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={saveEdit}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={addDoctor}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Add Doctor
          </button>
        </div>
      )}

    
      <div className={`mt-6 border rounded-xl shadow-sm overflow-x-auto ${
  darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200"
}`}>
        <table className="w-full min-w-[900px]">
          <thead className={
            darkMode ? "bg-gray-700" : "bg-gray-70"
          }>
            <tr className="border-b border-gray-200">
              <th className={thClass}>Doctor Name</th>
              <th className={thClass}>Department</th>
              <th className={thClass}>Phone</th>
              <th className={thClass}>Specialization</th>
              <th className={thClass}>Experience</th>
              <th className={thClass}>Availability</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedDoctors.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-lg font-semibold text-gray-500"
                >
                  No doctors found
                </td>
              </tr>
            ) : (
              currentDoctors.map((doctor) => (
                <tr key={doctor.id} className={`border-b transition ${
                  darkMode ? 
                  "border-gray-700 hover:bg-gray-700"
                  : "border-gray-100 hover:bg-gray-50"
                }`}>
                  <td className={tdClass}>
                    {doctor.pin && <span className="mr-1">📌</span>}
                    {doctor.name}
                  </td>
                  <td className={tdClass}>{doctor.department}</td>
                  <td className={tdClass}>{doctor.phone}</td>
                  <td className={tdClass}>{doctor.specialization}</td>
                  <td className={tdClass}>{doctor.experience} Yrs</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        availabilityStyle[doctor.availability] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {doctor.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewDoctor(doctor)}
                        className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => startEdit(doctor.id)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDoctor(doctor.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                      >
                        Delete 🗑️
                      </button>
                      <button
                        onClick={() => pinDoctor(doctor.id)}
                        className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
                      >
                        {doctor.pin ? "Unpin 📌" : "Pin 📌"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t px-6 py-4">
          <button
            onClick={() => setCurrentPage(safePage - 1)}
            disabled={safePage === 1}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
  darkMode
    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
}`}
          >
            Previous
          </button>

          <span className={`text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Page {safePage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(safePage + 1)}
            disabled={safePage === totalPages}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
  darkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-600 hover:bg-blue-700"
}`}
          >
            Next
          </button>
        </div>
      </div>

      
      {viewDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div   className={`w-full max-w-md rounded-xl p-6 shadow-xl space-y-2 ${
    darkMode
      ? "bg-gray-800 text-white border border-gray-700"
      : "bg-white text-gray-900"
  }`}>
            <h2 className="text-xl font-bold mb-3">Doctor Details</h2>
            <p>Name: {viewDoctor.name}</p>
            <p>Specialization: {viewDoctor.specialization}</p>
            <p>Department: {viewDoctor.department}</p>
            <p>Experience: {viewDoctor.experience} Years</p>
            <p>Contact No: {viewDoctor.phone}</p>
            <p>Availability: {viewDoctor.availability}</p>
            <button
              onClick={() => setViewDoctor(null)}
              className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

     
     {toast && (
  <div
    role="status"
    aria-live="polite"
    className={`fixed top-5 right-5 left-5 sm:left-auto z-[9999] px-5 py-3 rounded-lg shadow-lg text-white ${
      darkMode
        ? "bg-green-700 border border-green-500"
        : "bg-green-600"
    }`}
  >
    <p>{toast}</p>
  </div>
)}
    </div>
  );
};

export default Doctors;