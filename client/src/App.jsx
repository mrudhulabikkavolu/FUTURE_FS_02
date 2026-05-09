import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // DASHBOARD COUNTS

  const totalLeads = leads.length;

  const interestedLeads = leads.filter(
    (lead) => lead.status === "Interested"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  // SEARCH FILTER

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FORM INPUT CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN INPUT CHANGE

  const handleLoginChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      setIsLoggedIn(true);

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    }
  };

  const handleLogout = () => {

  localStorage.removeItem("token");

  setIsLoggedIn(false);

  alert("Logged Out");

};

  // ADD / UPDATE LEAD

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let response;

      if (editId) {

        response = await axios.put(
          `http://localhost:5000/api/leads/${editId}`,
          formData
        );

        alert("Lead Updated Successfully");

      } else {

        response = await axios.post(
          "http://localhost:5000/api/leads/add",
          formData
        );

        alert("Lead Added Successfully");
      }

      console.log(response.data);

      fetchLeads();

      setEditId(null);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
        notes: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error");

    }
  };

  // FETCH LEADS

  const fetchLeads = async () => {

  try {

    setLoading(true);

    const response = await axios.get(
      "http://localhost:5000/api/leads"
    );

    setLeads(response.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

  // DELETE LEAD

  const deleteLead = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/leads/${id}`
      );

      alert("Lead Deleted");

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Error deleting lead");

    }
  };

  // EDIT LEAD

  const editLead = (lead) => {

    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      status: lead.status,
      notes: lead.notes,
    });

    setEditId(lead._id);
  };

  // LOAD LEADS

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      {!isLoggedIn ? (

        // LOGIN PAGE

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

            <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold text-blue-600">
    Mini CRM
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
  >
    Logout
  </button>

</div>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full border p-3 rounded-lg"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      ) : (

        // CRM DASHBOARD

        <div className="min-h-screen bg-gray-100 p-6">

          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Mini CRM
          </h1>

          {/* DASHBOARD CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h2 className="text-2xl font-bold text-blue-600">
                {totalLeads}
              </h2>
              <p className="text-gray-600 mt-2">
                Total Leads
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h2 className="text-2xl font-bold text-yellow-500">
                {interestedLeads}
              </h2>
              <p className="text-gray-600 mt-2">
                Interested
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h2 className="text-2xl font-bold text-green-600">
                {convertedLeads}
              </h2>
              <p className="text-gray-600 mt-2">
                Converted
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h2 className="text-2xl font-bold text-red-500">
                {closedLeads}
              </h2>
              <p className="text-gray-600 mt-2">
                Closed
              </p>
            </div>

          </div>

          {/* FORM */}

          <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">

            <h2 className="text-2xl font-semibold mb-4">
              {editId ? "Edit Lead" : "Add New Lead"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Interested</option>
                <option>Converted</option>
                <option>Closed</option>
              </select>

              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 col-span-1 md:col-span-2"
              >
                {editId ? "Update Lead" : "Add Lead"}
              </button>

            </form>

          </div>

          {/* LEADS TABLE */}

          <div className="max-w-6xl mx-auto mt-10">

            <h2 className="text-2xl font-bold mb-4">
              All Leads
            </h2>

            {/* SEARCH */}

            <div className="mb-4">

              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border p-3 rounded-lg bg-white"
              />

            </div>

            <div className="overflow-x-auto">

              <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">

                <thead className="bg-blue-600 text-white">

                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Company</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Notes</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>

                </thead>

                <tbody>

  {loading ? (

    <tr>
      <td
        colSpan="7"
        className="text-center p-6 text-gray-500"
      >
        Loading leads...
      </td>
    </tr>

  ) : filteredLeads.length === 0 ? (

    <tr>
      <td
        colSpan="7"
        className="text-center p-6 text-gray-500"
      >
        No leads found
      </td>
    </tr>

  ) : (

    filteredLeads.map((lead) => (

      <tr
        key={lead._id}
        className="border-b hover:bg-gray-100"
      >

        <td className="p-3">{lead.name}</td>

        <td className="p-3">{lead.email}</td>

        <td className="p-3">{lead.phone}</td>

        <td className="p-3">{lead.company}</td>

        <td className="p-3">

          <span
            className={`px-3 py-1 rounded-full text-white text-sm font-semibold

            ${lead.status === "New" && "bg-blue-500"}

            ${lead.status === "Contacted" && "bg-yellow-500"}

            ${lead.status === "Interested" && "bg-purple-500"}

            ${lead.status === "Converted" && "bg-green-500"}

            ${lead.status === "Closed" && "bg-red-500"}
          `}
          >
            {lead.status}
          </span>

        </td>

        <td className="p-3">{lead.notes}</td>

        <td className="p-3 flex gap-2">

          <button
            onClick={() => editLead(lead)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Edit
          </button>

          <button
            onClick={() => deleteLead(lead._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>

        </td>

      </tr>

    ))

  )}

</tbody>

              </table>

            </div>

          </div>

        </div>

      )}
    </>
  );
}

export default App;