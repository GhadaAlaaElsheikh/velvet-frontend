import LoginForm from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F2EA] px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-[#8B1E1E]">
          Admin Login
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to access the admin dashboard
        </p>

        <LoginForm />
      </div>
    </main>
  );
}