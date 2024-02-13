import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { api } from "../../../services/api";
import styles from "./styles.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { CategoryContext } from "../../context/CategoryContext";
import getFinal from "../getFinal";

export default function Header() {
  const { signIn, isAuthenticated, user, logout } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { categories } = useContext(CategoryContext);
  const [showCategories, setShowCategories] = useState(false);
  const [search, setSearch] = useState()
  const [showSearch, setShowSearch] = useState(false)
  const [showLoginCanvas, setShowLoginCanvas] = useState(false);
  const handleCloseLoginCanvas = () => setShowLoginCanvas(false);
  const handleShowLoginCanvas = () => setShowLoginCanvas(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goLink = (link) => {
    console.log({ link });
    setShow(false);

    if (typeof window !== "undefined") {
      router.push(link);
    }
  };

    const handledShowSearch = () => {
        setShowSearch(!showSearch)
    }
  async function onLogout() {
    logout();
  }

  async function onLogin(data) {
    try {
      await signIn(data);
    } catch (error) {
      alert(
        "Email ou senha inválidos.\nCaso tenha esquecido a senha, clique em 'esqueci a senha'"
      );
      console.log("error", error);
    }
  }

  function goTo(path) {
    handleCloseLoginCanvas();
    router.push(path);
  }

  return (
    <>
      <div className={`d-block d-md-none container-fluid p-0 ${styles.root}`}>
        <div className={`${styles.row} w-100 m-0 row`}>
          <div
            className={`col-2 d-flex align-items-center justify-content-center p-0`}
          >
            <Button variant="" onClick={handleShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="30"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </Button>
          </div>

          <div
            className={`col-8 d-flex align-items-center justify-content-center p-0`}
          >
            <Link href="/">
              <Image
                width={process.env.NEXT_PUBLIC_COMPANY_NAME == 'Maggenta' ? "228" : "170"}     
                height={process.env.NEXT_PUBLIC_COMPANY_NAME == 'Maggenta' ? "41" : "40"} 
                src={process.env.NEXT_PUBLIC_COMPANY_NAME == "Maggenta" ? 'https://ajung-intelligenz.s3.amazonaws.com/teste/GrUqwLKs7NM2XKpUYp7UhvAr5vNCgIjaemjiVVXE.png' :  `/images/header/logoPepperoneMobile.png`}
                alt={`Logo ${process.env.NEXT_PUBLIC_COMPANY_NAME}`}
              />
            </Link>
          </div>

          <div
            className={`col-2 d-flex align-items-center justify-content-center p-0`}
          >
            <button onClick={handledShowSearch} className="btn p-0" type="button" data-bs-toggle="dropdown" style={{marginRight: '5px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search me-2 me-lg-3" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
            <button
              className={`${styles.buttonMenu} p-0 btn `}
              type="button"
              onClick={() => handleShowLoginCanvas()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    { showSearch &&
    <div className="d-md-none" style={{ backgroundColor: "white", width: "100%", height: "50px",  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "10px", paddingLeft: "10px" }}>
        <input type="text" className="form-control" id="searchFor" aria-describedby="searchFor" onChange={(e) => {setSearch(e.target.value.toUpperCase());}} name='busca' placeholder="Pesquisar por..." />
        <Link legacyBehavior href={`/resultado?busca=${search}`}>
            <a style={{ marginLeft: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </a>
        </Link>
    </div>
}
      {/* Offcanvas left */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
          <div className={`row d-flex align-items-center`}>
            <div className={`col-12`}>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                className="text-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className={`me-4 bi bi-facebook`}
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                className="text-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="me-4 bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </Link>
              <Link href="tel:551129715252" className="text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="me-4 bi bi-telephone-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  />
                </svg>
              </Link>
              <Link href="mailto:vendas@pepperone.com.br" className="text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="me-4 bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
              </Link>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className={`${styles.navigationList} list-group`}>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/")}
              >
                HOME
              </Button>
            </li>

            <li>
              <div className={``}>
                <button
                  className={`btn dropdown-toggle p-0 pt-2 pb-2 fw-bold ${styles.listLink}`}
                  type="button"
                  aria-expanded="false"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  PRODUTOS
                </button>

                <div
                  className={`${showCategories ? "d-block" : "d-none"} pb-4 ${
                    styles.dropMenuMobile
                  }`}
                  style={{ border: "0px" }}
                >
                  <div className={`ps-2`}>
                    <Button
                      className={`list-group-item fw-light ${styles.sublistLink}`}
                      onClick={() => goLink(`/produtos`)}
                    >
                      TODOS OS BRINDES
                    </Button>
                    {categories.map((category, index) => (
                      <div key={`category-mob-header-${index}`}>
                        <Button
                          className={`list-group-item fw-light ${styles.sublistLink}`}
                          onClick={() => goLink(`/categorias/${category.slug}-${getFinal(category.slug)}`)}
                        >
                          {category.name ? category.name.toUpperCase() : null}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/brindes-para-empresas/Imoveis")}
              >
                Imoveis
              </Button>
            </li>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/empresa-de-brindes")}
              >
                SOBRE
              </Button>
            </li>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/fale-conosco")}
              >
                CONTATO
              </Button>
            </li>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/sac")}
              >
                SAC
              </Button>
            </li>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/catalogo")}
              >
                CATÁLOGO
              </Button>
            </li>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/politicas-de-privacidade")}
              >
                POLÍTICA DE PRIVACIDADE
              </Button>
            </li>
            <li>
              <Button
                className={`list-group-item p-0 pt-2 pb-2 ${styles.listLink}`}
                onClick={() => goLink("/termos-de-uso")}
              >
                TERMOS DE USO
              </Button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Offcanvas right */}
      <Offcanvas show={showLoginCanvas} onHide={handleCloseLoginCanvas} placement="end">
        <Offcanvas.Header closeButton className="border-b">
            <Offcanvas.Title>
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    {!isAuthenticated ? (
                    <>LOGIN</>
                    ) : (
                    <>
                        Bem-vindo {user.customer.name}
                        <br />
                        <Button
                            variant="outline-dark"
                            onClick={() => onLogout()}
                            size="sm"
                        >
                            <Image
                                width="20"
                                height="20"
                                src="/images/logout.svg"
                                alt="logout"
                            />{" "}
                            &nbsp;
                            <span className={`pe-2`}>Sair</span>
                        </Button>
                    </>
                    )}
                </h5>
            </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
        {!isAuthenticated ? (
            <>
              <p>Insira seu e-mail e senha para acessar sua conta:</p>

              <form
                className={`${styles.loginForm}`}
                onSubmit={handleSubmit(onLogin)}
              >
                <div className="mb-3">
                  <div className="form-floating mb-3">
                    {/* <input type="email" className="form-control" id="floatingInputMobile" placeholder="name@example.com" /> */}
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      name="email"
                      placeholder="Seu email..."
                      {...register("email", { required: true })}
                    />
                    <label htmlFor="floatingInput">E-mail</label>
                  </div>
                </div>
                <div className="mb-3">
                  <div
                    className={`${styles.passwordField} form-floating d-flex`}
                  >
                    {/* <input type={showPassword ? "text" : "password"} className="form-control" id="floatingPasswordMobile" placeholder="Password" /> */}
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="floatingPassword"
                      name="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    <label htmlFor="floatingPasswordMobile">Senha</label>
                    <button
                      type="button"
                      className={`${styles.btnClose}`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          style={{ zIndex: 100 }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      ) : (
                        <svg
                          style={{ zIndex: 100 }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-3 d-flex justify-content-end">
                  <Button onClick={() => goTo("/recuperar-senha")} variant="link" className="text-dark">
                    Esqueci a minha senha
                  </Button>
                </div>
                <div className="mb-3">
                  Não tem cadastro,{" "}
                  <Button onClick={() => goTo("/cadastro")} variant="link" className={`text-dark`}>
                   Criar conta
                  </Button>
                </div>
                <button
                  type="submit"
                  className={`${styles.btnLogin} btn btn-dark w-100 py-3`}
                >
                  ENTRAR
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="offcanvas-body">
                {user.user && (
                  <>
                    <p>Seu atendimento exclusivo na {process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes:</p>

                    <div className={`container-fluid`}>
                      <div className={`row d-flex align-items-center mb-2`}>
                        <div className={`col-2  d-flex justify-content-center`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                            />
                          </svg>
                        </div>
                        <div className={`col-9`}>{user.user.name}</div>
                      </div>
                      <div className={`row d-flex align-items-center mb-2`}>
                        <div className={`col-2  d-flex justify-content-center`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="currentColor"
                            className="bi bi-envelope-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                          </svg>
                        </div>
                        <div className={`col-9`}>
                          <Link
                            href={`mailto:${user.user.email}`}
                            className={`text-decoration-none text-dark`}
                          >
                            {user.user.email}
                          </Link>
                        </div>
                      </div>
                      {user.user.telephone != undefined && (
                        <div className={`row d-flex align-items-center mb-2`}>
                          <div
                            className={`col-2  d-flex justify-content-center`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              fill="currentColor"
                              className="bi bi-telephone-fill"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                              />
                            </svg>
                          </div>
                          <div className={`col-9`}>
                            <Link
                              href={`tel:${user.user.telephone}`}
                              className={`text-decoration-none text-dark pe-1`}
                            >
                              {user.user.telephone}{" "}
                              {user.user.phone_extension
                                ? ` - Ramal ${user.user.phone_extension}`
                                : ""}
                            </Link>
                          </div>
                        </div>
                      )}
                      {user.user.whatsapp != undefined && (
                        <div className={`row d-flex align-items-center mb-2`}>
                          <div
                            className={`col-2 d-flex justify-content-center`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              fill="currentColor"
                              className="bi bi-whatsapp"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                          </div>
                          <div className={`col-9`}>
                            <Link
                              href={`https://wa.me/55${user.user.whatsapp
                                .replace(" ", "")
                                .replace("(", "")
                                .replace(")", "")
                                .replace("-", "")}`}
                              className={`text-decoration-none text-dark pe-1`}
                            >
                              {user.user.whatsapp}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr />
                  </>
                )}
              </div>
            </>
          )}

          <Button
            onClick={() => goTo("/carrinho")}
            className={`${styles.btnLogin} btn btn-dark w-100 py-3 mt-3`}
          >
            IR PARA CARRINHO
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
}
