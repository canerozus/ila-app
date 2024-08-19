import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useUserContext } from "../../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { formData, setFormData } = useUserContext();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      cv: e.target.files[0],
    }));
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last name is required.";
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required.";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be 11 digits.";
    }

    if (!formData.summary.trim()) {
      validationErrors.summary = "Summary is required.";
    } else if (formData.summary.trim().length < 20) {
      validationErrors.summary = "Summary must be at least 20 characters.";
    }

    if (!formData.cv) {
      validationErrors.cv = "CV is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const updatedData = {
        ...formData,
        registered: true,
        userId: user.sub,
      };

      setFormData(updatedData);

      localStorage.setItem("formData", JSON.stringify(updatedData));

      navigate("/");
    }
  };

  if (formData.registered && formData.userId === user.sub) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center">You have already registered!</h1>
            <Link to="/" className="btn btn-custom w-100">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="summary" className="form-label">
                Summary:
              </label>
              <textarea
                id="summary"
                name="summary"
                className={`form-control ${errors.summary ? "is-invalid" : ""}`}
                rows="4"
                value={formData.summary}
                onChange={handleChange}
                required
              />
              {errors.summary && (
                <div className="invalid-feedback">{errors.summary}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="cv" className="form-label">
                Upload CV:
              </label>
              <input
                type="file"
                id="cv"
                name="cv"
                className={`form-control ${errors.cv ? "is-invalid" : ""}`}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
              {errors.cv && <div className="invalid-feedback">{errors.cv}</div>}
            </div>
            <button type="submit" className="btn btn-custom w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
