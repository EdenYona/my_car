import "./login.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { ShowAuthContext } from "../../context/showAuthContext/showAuthContext";
import { useRef } from "react";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { publicRequest } from "../../requestMethods";
import { useSDK } from "@metamask/sdk-react";

const Login = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const { showLogin, setShowLogin, setShowRegister } =
    useContext(ShowAuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [account, setAccount] = useState();

  const connect = async () => {
    console.log("connecting..");
    try {
      const accounts = await sdk?.connect();
      console.log(accounts, connected, connecting, provider, chainId);
      setAccount(accounts?.[0]);
      return accounts?.[0];
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // const res = await publicRequest.post("auth/login", {
      //   email: email.current.value,
      //   password: password.current.value,
      // });

      const acc = await connect();
      console.log("My account", acc);
      // setCurrentUser(res.data);
      setCurrentUser({
        account: acc,
        phone: "1234567890",
        email: "asdasdada@dasdasdad.com"
      });
      setShowLogin(false);
      setLoading(false);
    } catch (err) {
      setErr(err.response.data);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if(connected && account) {
  //     console.log("sending...");
  //     send();
  //   }
  // }, [account]);

  const handleSwitch = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  return (
    <div className="login" style={{ zIndex: showLogin ? "10" : "-1" }}>
      <div className="card" style={{ right: showLogin ? "0" : "-100%" }}>
        <button onClick={() => setShowLogin(false)} className="login-close-btn">
          <AiOutlineClose />
        </button>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input ref={email} type="email" placeholder="Email" required />
          {err?.type === "email" && (
            <span className="error">{err.message}</span>
          )}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            required
            minLength="6"
          />
          {err?.type === "password" && (
            <span className="error">{err.message}</span>
          )}

          <button disabled={loading} type="submit" className="login-btn">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="center">
          <div className="line"></div>
          <span>or create Account</span>
          <div className="line"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleSwitch}
          className="register-btn"
        >
          create new account
        </button>
      </div>
    </div>
  );
};

export default Login;
