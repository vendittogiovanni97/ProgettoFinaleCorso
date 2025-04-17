import { Container, FormContainer } from "../styled/LoginStyled";
import ButtonFacebook from "../Components/Auth/components/Login/ButtonFacebook";
import ButtonGoogle from "../Components/Auth/components/Login/ButtonGoogle";
import ButtonRegistrati from "../Components/Auth/components/Login/ButtonRegistrati";
import LoginForm from "../Components/Auth/components/Login/Form";
import HeaderLogin from "../Components/Auth/components/Login/Header";
import HeaderPage from "../Components/Auth/components/Login/HeaderPage";
import RecuperPassword from "../Components/Auth/components/Login/RecuperaPassword";

export default function LoginPages() {
  return (
    <Container
      style={{
        backgroundImage: "url(/pics/image1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HeaderPage />
      <FormContainer style={{ position: "fixed" }}>
        <HeaderLogin />
        <LoginForm />
        <RecuperPassword />
        <div className="text-center mt-3">
          <ButtonGoogle />
          <ButtonFacebook />
          <ButtonRegistrati />
        </div>
      </FormContainer>
    </Container>
  );
}
