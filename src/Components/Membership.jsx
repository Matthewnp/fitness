// src/Components/Membership.jsx
import { useNavigate } from "react-router";
import membershipData from "./membershipData";
import { useAuth } from "./useAuth";              
import { authClient } from "./authClient";        

function Membership() {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (planId) => {
    if (!isAuthenticated) {
      navigate("/signup", { state: { from: "/membership" } });
      return;
    }

    try {
      const res = await authClient.createCheckoutSession(
        [{ productId: planId, quantity: 1 }],
        token
      );
      if (res.url) {
        window.location.assign(res.url);
      } else {
        alert(res.message || "Payment initiated. Check your phone.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-x-5 px-2 py-2 w-auto mt-0 h-full bg-[#1a1d24]">
      <section className="space-x-0 w-auto" id="membership">
        <h2 className="text-2xl font-mono font-bold text-white text-center">
          Membership tiers
        </h2>
        <p className="text-2xl font-mono font-bold text-white text-center">
          Pick a plan. Cancel any time with 30 days' notice.
        </p>

        <div className="grid mx-auto justify-center items-center w-auto mb-10 p-5 mt-5 md:flex">
          <div className="relative grid gap-5 w-auto lg:flex md:grid-cols-2">
            {membershipData.map((m) => (
              <article
                key={m.id}
                className="space-x-3 p-3 w-auto border-2 border-orange-500 rounded shadow-2xl shadow-[#d9411f8f]"
              >
                <h3 className="text-2xl font-sans font-bold text-white text-left p-3">
                  {m.name}
                </h3>
                <p className="text-xl font-sans font-medium text-gray-500 text-left p-2">
                  ${m.price}
                  <span className="text-4xl font-mono font-bold text-white text-center">
                    {m.period}
                  </span>
                </p>

                <ul className="relative font-sans font-medium text-gray-300 p-5 text-left whitespace-nowrap">
                  <div className="space-x-1">
                    {m.features.map((feature, index) => (
                      <li key={feature}>
                        <div className="text-sm font-sans font-medium text-left flex">
                          <span className="text-orange-500 font-bold">✓</span>
                          <p>{feature}</p>
                        </div>
                        {index < m.features.length - 1 && (
                          <div className="mx-auto my-2 h-px w-auto bg-gray-700/60 flex" />
                        )}
                      </li>
                    ))}
                  </div>
                </ul>

                <button
                  onClick={() => handleCheckout(m.id)}
                  className="mb-5 flex hover:bg-[#d9411f] shadow-xl rounded relative text-xl font-mono h-13 w-57 border-2 border-[#ff5a36] cursor-pointer font-bold text-[#ff5a36] hover:text-white text-center mx-auto justify-center items-center"
                >
                  {m.button}
                </button>
              </article>
            ))}
          </div>
        </div>

        <footer className="text-sm font-mono font-medium text-white text-center mb-10">
          <p className="p-2">&copy; 2026 Pulse Studio (placeholder)</p>
        </footer>
      </section>
    </div>
  );
}

export default Membership;