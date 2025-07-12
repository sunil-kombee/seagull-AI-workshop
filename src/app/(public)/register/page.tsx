import AuthLayout from "@/components/layout/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Your Account">
      <AuthForm mode="register" />
    </AuthLayout>
  );
}
