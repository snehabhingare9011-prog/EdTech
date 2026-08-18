import React from "react";
import { useForm } from "react-hook-form";
import "./FormHook.css";

export const FormHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "fdsf",
    },
  });

  console.log("app1");

  const onSubmit = (data) => {
    console.log(data);

    // Reset form after successful submission
    reset();
  };

  return (
    <div className="form-container">

      <form className="form" onSubmit={handleSubmit(onSubmit)}>

        <h2>Create Account</h2>

        <p className="form-subtitle">
          Create your account to get started
        </p>


        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>

          <input
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", {
              required: "First name is required",
            })}
          />

          {errors.firstName && (
            <p className="error">
              {errors.firstName.message}
            </p>
          )}
        </div>


        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>

          <input
            type="text"
            placeholder="Enter your last name"
            {...register("lastName", {
              required: "Last name is required",
            })}
          />

          {errors.lastName && (
            <p className="error">
              {errors.lastName.message}
            </p>
          )}
        </div>


        {/* Email */}
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />

          {errors.email && (
            <p className="error">
              {errors.email.message}
            </p>
          )}
        </div>


        {/* Password */}
        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="error">
              {errors.password.message}
            </p>
          )}
        </div>


        {/* Submit Button */}
        <button type="submit">
          Create Account
        </button>

      </form>
    </div>
  );
};

// export default App1;