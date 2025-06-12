'use client';
import { MailCheck, RotateCw } from 'lucide-react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function EmailVerificationPage() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-white">
            {/* Green Section - Fullscreen on mobile, left half on desktop */}
            <div
                className="flex flex-1 min-h-screen items-center justify-center text-white px-6 py-10 lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:h-full"
                style={{ background: 'linear-gradient(to bottom right, #166534, #538E69)' }}
            >
                <div className="flex flex-col items-center justify-center w-full max-w-md">
                    <img src="/emailveri.png" className="h-48 w-48 sm:h-60 sm:w-60 rounded-2xl shadow-black shadow-lg mb-8 object-contain" />
                    <h1 className="text-2xl font-bold text-center">Secure Email Verification</h1>
                    <p className="text-[#DCFCE7] mt-5 px-2 sm:px-10 text-center">
                        We've sent a verification code to your email address to ensure your account security.
                    </p>
                </div>
            </div>
            {/* Right Side - White Card, overlays on desktop */}
            <div className="w-full flex items-center justify-center py-10 lg:ml-[50vw]">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 max-w-md w-full flex flex-col items-center justify-center">
                    <div className="bg-[#16A34A] w-10 h-10 flex items-center justify-center rounded-full">
                        <MailCheck className="text-white" />
                    </div>
                    <h1 className="mt-2 text-2xl font-semibold text-black text-center">Verify Your Email</h1>
                    <p className="mt-2 text-[#4B5563] text-center">A verification code has been sent to your email:</p>
                    <p className="text-[#166534] break-all text-center">your@email.com</p>
                    <p className="text-[#374151] mt-5 text-center">Enter Verification Code :</p>

                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup className="flex gap-x-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="mt-3 w-9 h-9 rounded-lg border border-gray-300 bg-white text-center text-lg text-gray-700 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#16A34A]"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 w-full gap-4">
                        {/* Left: Refresh Code */}
                        <div className="flex items-center">
                            <RotateCw size={13} className="mr-1" />
                            <h1 className="text-sm text-[#166534] font-semibold">Refresh Code</h1>
                        </div>
                        {/* Right: Verify Button */}
                        <button className="bg-[#216C3D] text-white px-6 py-2 rounded-md">
                            Verify
                        </button>
                    </div>
                    <p className="text-[#6B7280] text-sm mt-4 text-center">Code expires in 05:00</p>
                    <div className="bg-[#e8aeae26] mt-10 text-center p-3 rounded-md w-full">
                        <p className="text-[#4B5563]">Didn't receive the code? Check your spam folder or try</p>
                    </div>
                </div>
            </div>
        </div>
    );
}