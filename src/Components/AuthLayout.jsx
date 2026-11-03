// src/Components/AuthLayout.jsx
import { Outlet,} from "react-router";


export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#1a1d24] flex flex-col relative items-center justify-between p-6 ml-auto ">
   
      <div className="w-full  whitespace-nowrap">
        <Outlet />
      </div>
    </div>
  );
}