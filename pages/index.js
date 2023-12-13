import React, { useReducer } from "react";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SUBMIT_FORM":
      if (state.username.trim() === "" || state.password.trim() === "") {
        return { ...state, isValid: false };
      } else {
        return { ...state, isValid: true, isLoggedIn: true };
      }
    case "LOGOUT":
      return { ...state, isLoggedIn: false, username: "", password: "" };
    default:
      return state;
  }
};

export default function Home() {
  const initialState = {
    username: "",
    password: "",
    isValid: true,
    isLoggedIn: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT_FORM" });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div id="main">
      {state.isLoggedIn ? (
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          {!state.isValid && (
            <p className="invalid-error">Invalid username or password!</p>
          )}
          <section className="username-input">
            <label>Username: </label>
            <input
              type="text"
              placeholder="Username"
              className="username"
              name="username"
              value={state.username}
              onChange={handleInputChange}
            />
          </section>
          <section className="password-input">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Password"
              className="password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </section>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      )}
    </div>
  );
}