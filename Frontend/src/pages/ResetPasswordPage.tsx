import { ContainerResetPassword, FormContainer } from "../styled/ResetPasswordStyled";
import ResetPasswordForm from "../Components/Auth/components/ResetPassword/Form";
import HeaderResetPassword from "../Components/Auth/components/ResetPassword/Header";

export default function ResetPassword() {
  return (
    <ContainerResetPassword>
      <FormContainer>
        <HeaderResetPassword />
        <ResetPasswordForm />
      </FormContainer>
    </ContainerResetPassword>
  );
}