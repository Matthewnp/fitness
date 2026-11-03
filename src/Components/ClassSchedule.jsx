// src/Components/ClassSchedule.jsx
import schedule from "./schedule";

function ClassSchedule() {
  return (
    <div className="space-x-5 px-2 py-2 w-auto mt-0 h-screen bg-[#1a1d24]">
      <section className="schedule">
        <article className="justify-center mx-auto items-center w-auto">
          <h1 className="text-2xl font-mono font-bold text-white text-center">
            📅 Weekly class schedule <span>All levels</span>
          </h1>

          <div className="space-x-2 py-2 px-2 border border-gray-700 rounded p-2 mt-2 bg-[#2c313b] gap-5 grid w-auto">
            {/* Header row */}
            <div
              role="row"
              className="grid grid-cols-5 p-2 space-x-2 mx-auto whitespace-nowrap gap-3 lg:flex md:grid-cols-5 w-full justify-between ml-auto items-center bg-[#14171d]"
            >
              <div className="text-sm font-sans p-1 text-white">Class</div>
              <div className="text-sm font-sans p-1 text-white">Day &amp; time</div>
              <div className="text-sm font-sans p-1 text-white">Instructor</div>
              <div className="text-sm font-sans p-1 text-white">Studio</div>
              <div className="text-sm font-sans p-1 text-white">Level</div>
            </div>

            {/* Rows */}
            <div className="relative border border-gray-700 rounded mt-2 bg-[#2c313b] gap-5 grid w-full">
              {schedule.map((s) => (
                <div
                  key={`${s.activities}-${s.TimeFrame}-${s.name}`}   // 👈 add key
                  role="row"
                  className="whitespace-nowrap grid grid-cols-5 gap-2 p-2 w-full bg-[#14171d]"
                >
                  <div className="text-sm font-sans p-1 text-white">{s.activities}</div>
                  <div className="text-sm font-sans p-1 text-white">{s.TimeFrame}</div>
                  <div className="text-sm font-sans p-1 text-white">{s.name}</div>
                  <div className="text-sm font-sans p-1 text-white">{s.studioName}</div>
                  <div className="text-sm font-sans p-1 text-white">{s.level}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <footer className="text-sm font-mono font-medium text-white text-center mb-10">
        <p className="p-2">&copy; 2026 Pulse Studio (placeholder)</p>
      </footer>
    </div>
  );
}

export default ClassSchedule;