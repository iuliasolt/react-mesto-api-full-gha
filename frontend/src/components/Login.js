import React from "react";

function Login(props) {
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
    props.onLogin(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form
        name="login"
        className="login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          id="emailLogin"
          type="email"
          name="email"
          className="login__input"
          placeholder="Email"
          onChange={handleInputEmail}
          value={email}
          required
        />
        <input
          id="passwordLogin"
          type="password"
          name="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handleInputPassword}
          value={password}
          autoComplete="on"
          required
        />
        <button type="submit" className="login__save" aria-label="Кнопка войти">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
