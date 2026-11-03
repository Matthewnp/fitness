// src/Components/Trainers.jsx
import trainer from "./trainer";

function Trainers() {
  return (
    <div className="space-x-5 px-2 py-2 w-auto mt-0 h-full bg-[#1a1d24]">
      {/* Intro */}
      <div
        className="p-2 space-x-5 px-5 py-5 w-auto justify-center items-center mx-auto relative flex"
        id="Trainers"
      >
        <div className="space-x-5 px-5 py-5 gap-5 w-auto mt-3 justify-center items-center">
          <h1 className="text-white text-3xl font-sans font-bold text-center p-5">
            Meet your trainers
          </h1>
          <p className="text-[#a3a9b5] text-sm text-center font-mono font-medium">
            Certified, friendly, and not here to shout at you.
          </p>
        </div>
      </div>

      {/* Trainer cards */}
      <article className="rounded-medium p-3  relative w-auto flex">
        <div className=" relative w-auto items-center justify-center p-1 grid  grid-cols-2 gap-2  lg:grid-cols-5 md:grid-cols-4   rounded-md shadow-3xl">
          {trainer.map((t) => (
            <div
              key={t.names}
              className="p-0 space-x-5 relative w-54 ml-5 border border-gray-500 items-center justify-center grid rounded-md shadow-3xl"
            >
              <div>
                <img
                  src={t.images?.jpg || t.image}
                  alt={t.names}
                  className="w-61 h-50 rounded-md object-cover ml-2.5"
                  
                />
              </div>

              <div>
                <div className="p-3 space-x-3 w-55 text-center">
                  <h1 className="text-xl font-serif font-bold ml-7 whitespace-nowrap text-white">
                    {t.names}
                  </h1>
                  <h3 className="text-sm font-sans ml-5 font-medium text-[#d9411f]">
                    {t.subtitle}
                  </h3>
                </div>

                <div className="p-2 space-x-3 w-56 ml-2 text-center">
                  <p className="text-sm text-center font-sans font-normal text-[#a3a9b5]">
                    {t.description}
                  </p>

                  <div className="p-2 mb-2 mt-2 space-x-3 w-40 ml-5 justify-center text-center border border-gray-400 rounded-full">
                    <i className="text-sm font-mono font-bold text-[#a3a9b5]">
                      {t.subheader}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <footer className="text-sm font-mono font-medium text-white text-center mb-10">
        <p className="p-2">&copy; 2026 Pulse Studio (placeholder)</p>
      </footer>
    </div>
  );
}

export default Trainers;