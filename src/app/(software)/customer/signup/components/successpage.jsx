import { Check, BadgeHelp, Handshake, Dot, LogIn } from 'lucide-react';

export default function RegistrationSuccess({ onGoToDashboard, userInfo }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-white"
            style={{
                backgroundImage: "url('/sucess.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-white w-full max-w-5xl flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden">
                {/* Left Side */}
                <div
                    className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 md:p-10"
                    style={{ background: 'linear-gradient(to bottom right, #166534, #538E69)' }}
                >
                    <div className="bg-white p-8 rounded-full">
                        <Check size={50} className="text-[#166534]" />
                    </div>
                    <h1 className="text-white text-2xl font-semibold mt-5 text-center">Welcome Aboard!</h1>
                    <p className="text-[#DCFCE7] mt-6 text-center">
                        Your journey with Green Ocean Logistics begins now
                    </p>
                    {userInfo?.fullName && (
                        <p className="text-white text-lg mt-4 text-center font-medium">
                            Hello, {userInfo.fullName}!
                        </p>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 sm:p-8 md:p-10">
                    <div className="bg-[#196740] p-4 rounded-full">
                        <BadgeHelp size={30} className="text-white" />
                    </div>
                    <h1 className="text-[#1A5A3E] mt-2 text-2xl font-semibold text-center">Registration Successful</h1>
                    <hr className="border-[#1A6140] w-20 border-t-2 mt-2" />

                    {/* Welcome Card */}
                    <div className="bg-white border border-[#BBF7D0] rounded-lg shadow-sm p-6 w-full mt-7">
                        <div className="flex items-start">
                            <Handshake className="text-[#196A41] mr-3 mt-1 w-5 h-5" />
                            <h1 className="text-xl text-[#1A5A3E] font-semibold">Welcome to Green Ocean Logistics</h1>
                        </div>
                        <p className="text-gray-600 mt-4 pl-8">
                            You have successfully created your account and are now part of our logistics network.
                        </p>
                        {userInfo?.email && (
                            <p className="text-gray-600 mt-2 pl-8 text-sm">
                                Account registered with: <span className="font-medium text-[#166534]">{userInfo.email}</span>
                            </p>
                        )}
                    </div>

                    {/* Status Card */}
                    <div className="bg-white border border-[#BBF7D0] rounded-xl p-7 w-full mt-6">
                        <div className="flex items-center mb-3">
                            <span className="bg-transparent text-[#166534] mr-3 flex items-center">
                                <Dot className="w-8 h-8" fill="#166534" />
                            </span>
                            <h1 className="text-lg font-semibold text-[#166534]">Account Status: Active</h1>
                        </div>
                        <p className="text-[#475569] text-base mb-5">
                            You can now log in and start using the<br />
                            platform to manage your logistics operations, track shipments, and access all our services.
                        </p>
                        <ul className="space-y-3 text-[#475569] text-base">
                            <li className="flex items-center">
                                <span className="bg-[#166534] rounded-full p-1 mr-2 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </span>
                                Access to dashboard and analytics
                            </li>
                            <li className="flex items-center">
                                <span className="bg-[#166534] rounded-full p-1 mr-2 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </span>
                                Real-time shipment tracking
                            </li>
                            <li className="flex items-center">
                                <span className="bg-[#166534] rounded-full p-1 mr-2 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </span>
                                24/7 customer support access
                            </li>
                            {userInfo?.documents && userInfo.documents.length > 0 && (
                                <li className="flex items-center">
                                    <span className="bg-[#166534] rounded-full p-1 mr-2 flex items-center justify-center">
                                        <Check className="h-5 w-5 text-white" />
                                    </span>
                                    Documents uploaded and verified
                                </li>
                            )}
                        </ul>
                    </div>
                    
                    <button 
                        onClick={onGoToDashboard}
                        className="bg-[#1A5A3E] text-white flex items-center justify-center gap-2 py-3 w-full rounded-md mt-3 mb-2 hover:bg-[#144A32] transition-colors"
                    >
                        <LogIn />
                        Continue to Dashboard
                    </button>
                    
                    <p className="text-[#6B7280] text-center text-sm">
                        Need help? <a href="#" className="text-red-700 hover:underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}