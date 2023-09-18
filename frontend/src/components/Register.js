import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        name="register"
        className="login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          id="emailRegister"
          type="email"
          name="email"
          className="login__input"
          placeholder="Email"
          onChange={handleInputEmail}
          value={email}
          required
        />
        <input
          id="passwordRegister"
          type="password"
          name="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handleInputPassword}
          value={password}
          autoComplete="on"
          required
        />
        <button
          type="submit"
          className="login__save"
          aria-label="Кнопка зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>{" "}
      </p>
    </section>
  );
}

export default Register;
