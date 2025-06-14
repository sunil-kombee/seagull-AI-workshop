import AuthLayout from "@/components/layout/AuthLayout";
import RegistrationForm from "@/components/auth/RegistrationForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Your Account">
      <RegistrationForm />
    </AuthLayout>
  );
}
