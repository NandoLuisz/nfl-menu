import { Outlet } from "react-router";

export default function LayoutSign(){
    return(
        <div className="w-full h-screen flex items-center justify-center bg-zinc-100 px-5 py-5 font-pattern">
            <div className="w-[80%] h-160 shadow-2xl rounded-sm flex px-3 py-3">
                <div className="w-1/2 h-full">
                    <img 
                        src="/background_food.webp" 
                        alt="Food" 
                        className="w-full h-full object-cover rounded-sm"
                    />
                </div>
                <div className="w-1/2 h-full flex items-start justify-start">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}