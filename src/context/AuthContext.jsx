import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { "pepp.token": token } = parseCookies();
    const { "pepp.user": user } = parseCookies();

    if (user) {
      var localUser =  JSON.parse(localStorage.getItem("usuario"));
        console.log(localUser)
      setUser(localUser);
      setIsAuthenticated(true);
    } else if (token) {
      profile()
        .then((user) => {
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
        });
    }
  }, []);

  async function profile() {
    // console.log({user})
    const result = await api.get("site/me");
    // console.log('RETORNO DA API', result)
    setUser(result.data);
    return result.data;
  }

  async function signIn({ email, password, referer }) {
    // console.log('dados do login', email, password, referer);

    const maxAge = 60 * 60 * 2; // 2 horas
    const response = await api.post("auth/login", { email, password });
    // console.log('RESPOSTA DO LOGIN', response)
    if (response.status == 401) {
      return false
    }
    const user = response.data;
    // console.log('USUÁRIO AQUI', user);

    setCookie(undefined, "pepp.token", user.token, { maxAge });
    setCookie(undefined, "pepp.user", JSON.stringify(user), { maxAge });

    // // console.log(parseCookies())
    console.log(user)
    localStorage.setItem("usuario", JSON.stringify(user.data.usuario))
    setUser(user);
    setIsAuthenticated(true);
    /* if (referer != undefined && referer != "") {
            window.location.href = referer
        } else window.location.href = '/minha-conta' */
    return true;
  }

  function logout() {
    destroyCookie(null, "pepp.token");
    destroyCookie(null, "pepp.user");
    setIsAuthenticated(false);
    Router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
