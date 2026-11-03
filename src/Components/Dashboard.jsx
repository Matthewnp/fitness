import { useAuth } from "./useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const planName =
    user?.plan?.name ?? user?.planName ?? user?.membership?.name;

  return (
    <main className="min-h-screen bg-[#1a1d24] p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Welcome, {user?.firstName || "Member"} 👋
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded bg-[#2b3852] p-5">
          <h2 className="mb-2 text-xl font-bold">Your Plan</h2>
          <p className="text-gray-300">
            {planName || "No active plan"}
          </p>
        </section>

        <section className="rounded bg-[#2b3852] p-5">
          <h2 className="mb-2 text-xl font-bold">Account</h2>
          <p className="text-gray-300">
            <strong>Name:</strong> {name || "Not provided"}
          </p>
          <p className="text-gray-300">
            <strong>Email:</strong> {user?.email || "Not provided"}
        </p>
        </section>
      </div>
    </main>
  );
}