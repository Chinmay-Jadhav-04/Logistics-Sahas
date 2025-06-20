'use client';

import { useEffect, useState } from "react";
import Label from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRightToLine } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ROLES } from "@/constants/roles";

export default function LoginPage() {
	const [emailOrusername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const { user, Login } = useAuth();
	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await Login(emailOrusername, password, ROLES.CUSTOMER);
			if (res) {
				localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
				localStorage.setItem('record', JSON.stringify(res));
				localStorage.setItem('role', ROLES.CUSTOMER);
				router.push('/customer/dashboard')
			} else {
				alert('Login Unsuccessful');
			}
		} catch (err) {
			alert(err);
			console.error(err);
		}
	}

	useEffect(() => {
		if (user) {
			router.push('/customer/dashboard')
		}
	}, [user]);


	return (
		<div className="relative z-10 w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
			style={{ backgroundImage: 'url("/cargo-ship.png")' }}
		>
			<div className="absolute -z-[1] top-0 left-0 w-full min-h-screen bg-black/60"></div>
			<div className="bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
				<div className="text-center mb-6">
					<div className="text-sm font-bold text-black">Logo</div>
					<h2 className="text-2xl font-semibold text-black mt-2">Welcome to Green Ocean</h2>
					<p className="text-sm text-black mt-1">Login to Your Account</p>
				</div>

				<form action="" onSubmit={handleLogin} className="space-y-5">
					<div className="space-y-1">
						<Label>Email Address or Username</Label>

						<Input
							type="text"
							name=""
							value={emailOrusername}
							onChange={(e) => setEmailOrUsername(e.target.value)}
							placeholder='you@gmail.com'
							className="bg-green-50"
							required
						/>
					</div>

					<div className="space-y-1">
						<Label>Password</Label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='*********'
							className='bg-green-50'
						/>
					</div>
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<Checkbox
								checked={rememberMe}
								onCheckedChange={(val) => setRememberMe(Boolean(val))}
							/>
							<Label>Remember Me</Label>
						</div>
						<a href="" className="text-red-500 hover:underline">Forget Password?</a>
					</div>

					<Button type='submit' className='w-full bg-primary hover:bg-light-primary text-white'><ArrowRightToLine />Login</Button>
				</form>

				<div className="flex items-center my-4">
					<div className="flex-grow h-px bg-gray-300"></div>
					<span className="px-2 text-gray-500 text-sm">or</span>
					<div className="flex-grow h-px bg-gray-300"></div>
				</div>

				<Button
					variant='outline'
					className='w-full flex items-center justify-center gap-2'
					type='button'
				>
					<FcGoogle />
					Login with Google
				</Button>

				<p className="text-center text-sm mt-4">
					Don't have an account?{""}
					<a href="" className="text-green-700 font-semibold hover:underline">Sign Up</a>
				</p>

				<p className="text-center text-xs text-gray-700 mt-2">
					Need Help?
					<a href="mailto:support@greenlogistics.com" className="text-green-600 hover:underline">support@greenlogistics.com</a>
				</p>
			</div>
		</div>
	)
}

