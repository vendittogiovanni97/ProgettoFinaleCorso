import { Container, FormContainer } from "../styled/LoginStyled";
import ButtonFacebook from "../Components/Auth/components/Login/ButtonFacebook";
import ButtonGoogle from "../Components/Auth/components/Login/ButtonGoogle";
import ButtonRegistrati from "../Components/Auth/components/Login/ButtonRegistrati";
import LoginForm from "../Components/Auth/components/Login/Form";
import HeaderLogin from "../Components/Auth/components/Login/Header";
import RecuperPassword from "../Components/Auth/components/Login/RecuperaPassword";
import HeaderPage from "../Components/Auth/components/Login/HeaderPage";

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
      <FormContainer>
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
