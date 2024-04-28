import React from "react";
import sass from "../main.module.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../utils/Context";
import { instance } from "../../utils/Instance";
import { useMutation, useQuery } from "@tanstack/react-query";

function Registration() {
  const { theme } = useContext(userContext);
  // const nav = useNavigate();
  // const { getLogin, change, login, register } = useContext(userContext);

  const mutation = useMutation({
    mutationFn: (data) => {
      return instance.post("/Users", data);
    },
    options: {
      timeout: 12000, // Increase timeout to 3 seconds (or a higher value if needed)
    },
  });

  // Get all users
  const { error, data, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return instance.get("Users");
    },
  });

  if (isFetched) {
    console.log(data);
  }

  if (error) return "An error has occurred: " + error.message;

  const submit = async (a) => {
    a.preventDefault();
    const fd = new FormData(a.target);

    const data = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      phoneNumber: fd.get("phoneNumber"),
      password: fd.get("password"),
      role: 0,
    };

    mutation.mutate(data);

    try {
      await mutation.mutateAsync(data);
      console.log("Post request successful!");
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // change([...register, {
    //   auth: true,
    //   email: fd.get("number"),
    //   password: fd.get("password"),
    // }])

    // getLogin(
    //   {
    //     auth: true,
    //     email: fd.get("number"),
    //     password: fd.get("password"),
    //   }
    // )

    // nav('/user')
  };

  return (
    <div className={theme ? `dark ${sass.register}` : `${sass.register}`}>
      <h1>Registration</h1>
      <form onSubmit={submit} action="">
        <div className={sass.top}>
          <input required name="firstName" type="text" placeholder="Name" />
          <input required name="lastName" type="text" placeholder="Last Name" />
        </div>
        <input
          name="phoneNumber"
          required
          type="text"
          placeholder="Telephone Number"
        />
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Registration;
