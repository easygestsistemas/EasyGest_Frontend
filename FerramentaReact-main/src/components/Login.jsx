import { useState } from "react";
import { apiRequest, clearBasicAuth, setBasicAuth } from "../utils/api";
import "./Login.css";

const REMEMBERED_USERNAME_KEY = "easygest.rememberedUsername";

export default function Login({ onAuthenticated }) {
  const [username, setUsername] = useState(
    () => localStorage.getItem(REMEMBERED_USERNAME_KEY) || "",
  );
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() =>
    Boolean(localStorage.getItem(REMEMBERED_USERNAME_KEY)),
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const normalizedUsername = username.trim();
    if (!normalizedUsername || !password) {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);
    try {
      setBasicAuth(normalizedUsername, password);
      await apiRequest("/usuarios");
      if (rememberMe) {
        localStorage.setItem(REMEMBERED_USERNAME_KEY, normalizedUsername);
      } else {
        localStorage.removeItem(REMEMBERED_USERNAME_KEY);
      }
      onAuthenticated();
    } catch (loginError) {
      clearBasicAuth();
      setError(
        loginError.message ||
          "Não foi possível iniciar sessão. Verifique as suas credenciais.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = (event) => {
    event.preventDefault();
    setError("");
    setMessage("Para recuperar a senha, contate o administrador do sistema.");
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand-panel" aria-hidden="true">
          <div className="login-brand-mark">E</div>
          <span className="login-brand-name">EasyGest</span>
          <p>
            Gestão simples.
            <br />
            Negócio em movimento.
          </p>
          <div className="login-brand-decoration" />
        </div>

        <div className="login-form-panel">
          <header className="login-header">
            <span className="login-eyebrow">Bem-vindo.</span>
            <h1 id="login-title">Iniciar sessão</h1>
            <p>Preencha os campos para acessar a sua conta.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="login-username">E-mail</label>
              <input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="nome@empresa.com.br"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Palavra-passe</label>
              <div className="login-password-wrap">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((isVisible) => !isVisible)}
                  aria-label={
                    showPassword
                      ? "Ocultar palavra-passe"
                      : "Mostrar palavra-passe"
                  }
                  aria-pressed={showPassword}
                  disabled={loading}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  disabled={loading}
                />
                <span>Salvar senha</span>
              </label>
              <a
                className="login-recovery"
                href="#recuperacao"
                onClick={handlePasswordRecovery}
              >
                Recuperar senha
              </a>
            </div>

            {error && (
              <p className="login-message login-error" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="login-message login-info" role="status">
                {message}
              </p>
            )}

            <button className="login-submit" type="submit" disabled={loading}>
              {loading && <span className="login-spinner" aria-hidden="true" />}
              {loading ? "A iniciar sessão..." : "Entrar"}
            </button>
          </form>

          <p className="login-security-note">
            A sua sessão é protegida e os seus dados são mantidos em segurança.
          </p>
        </div>
      </section>
    </main>
  );
}
