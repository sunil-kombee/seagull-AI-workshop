import AuthLayout from "@/components/layout/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back!">
      <AuthForm mode="login" />
    </AuthLayout>
  );
}
