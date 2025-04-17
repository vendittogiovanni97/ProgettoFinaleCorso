import { Container, FormContainer } from "../styled/RegistrationStyle";
import RegistrationForm from "../Components/Auth/components/Registration/Form";
import HeaderRegistration from "../Components/Auth/components/Registration/Header";
import RegistrationButton from "../Components/Auth/components/Registration/RegistrationButton";

export default function Registration() {
  return (
    <Container
      style={{
        backgroundImage: "url(/pics/image1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FormContainer>
        <HeaderRegistration />
        <RegistrationForm />
        <div className="text-center mt-3"> 
          <RegistrationButton />
        </div>
      </FormContainer>
    </Container>
  );
}