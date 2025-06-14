'use client';
import { useEffect, useState } from "react";
import { LogInIcon, ArrowUpRight, Users, UserRound, CircleUserRound } from "lucide-react";
import Button from "@/components/ui/Button";
import { servicesList } from "@/constants/services";
import { CompanyName } from "@/constants/CompanyName";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeaderLayout({ currentService, setCurrentService }) {
	const [displayAfterHeader, setDisplayAfterHeader] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [displayLogin, setDisplayLogin] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setDisplayAfterHeader(window.scrollY > 150);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header>
			{/* Main header */}
			<div className={`bg-[var(--background)] 
				${displayAfterHeader ? "opacity-0" : "opacity-100"}
				transition-opacity duration-500 border-b pb-10 border-[var(--foreground)]/60
			`}>
				<div className="flex flex-col w-full p-4">
					<div className="flex items-center justify-between w-full">
						{/* Logo & Company */}
						<div className="flex items-center gap-3">
							<div className="rounded-xl overflow-hidden w-10 h-10">
								<Image src="/logo.png" width={1500} height={1500} alt="Logo" />
							</div>
							<h1 className="font-bold">{CompanyName}</h1>
						</div>

						{/* Buttons */}
						<div className="flex items-center gap-3">
							<Button
								title="Dashboard"
								icon={<ArrowUpRight />}
								iconPosition="right"
								variant="outline"
								className="rounded-md"
								onClick={() => {
									if (isLogin) {
										router.push('/customer/dashboard');
									} else {
										setDisplayLogin(true);
									}
								}}
							/>
							<Button
								title="Login"
								icon={<CircleUserRound size={20} />}
								iconPosition="right"
								className="rounded-md"
								onClick={() => router.push('/customer/login')}
							/>
							<Button
								title="Sign Up"
								icon={<UserRound size={20} />}
								iconPosition="right"
								className="rounded-md"
								variant="outline"
								onClick={() => router.push('/customer/signup')} // ✅ Link to SignupPage
							/>
						</div>
					</div>
				</div>

				{/* Services list */}
				<div className="bg-[var(--accent)] py-3 px-4 rounded-xl mx-auto w-xl flex justify-between items-center shadow-md border border-gray-200 opacity-100">
					<div className="flex justify-center space-x-12 flex-1">
						{servicesList.map((item) => (
							<Button
								key={item.id}
								title={item.label}
								icon={<item.icon className="h-6 w-6" />}
								iconPosition="top"
								className="max-w-xl text-sm"
								variant={currentService === item.id ? 'link' : 'none'}
								onClick={() => setCurrentService(item.id)}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Sticky header on scroll */}
			<div className={`fixed top-0 left-0 right-0 z-50 bg-[var(--accent)] shadow-lg py-2 px-3 sm:px-6 transition-transform duration-300 min-h-20 flex items-center  
				${displayAfterHeader ? "translate-y-0" : "-translate-y-full"}`}>
				<div className="w-full flex justify-between items-center">
					{/* Logo */}
					<div className="flex gap-3 items-center">
						<div className="rounded-xl overflow-hidden w-10 h-10">
							<Image src="/logo.png" width={1500} height={1500} alt="Logo" />
						</div>
						<span className="font-bold text-sm">{CompanyName}</span>
					</div>

					{/* Services */}
					<div className="flex space-x-2 sm:space-x-3">
						{servicesList.map((item) => (
							<Button
								key={item.id}
								title={item.label}
								icon={<item.icon className="h-6 w-6" />}
								iconPosition="top"
								className="max-w-xl text-[12px]"
								variant={currentService === item.id ? 'link' : 'none'}
								onClick={() => setCurrentService(item.id)}
							/>
						))}
					</div>

					{/* Right-side buttons */}
					{isLogin ? (
						<div className="flex items-center space-x-4">
							<div className="h-9 w-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
								<Users className="h-5 w-5 text-[var(--background)]" />
							</div>
						</div>
					) : (
						<div className="flex items-center space-x-2">
							<Button
								title="Login"
								icon={<LogInIcon />}
								iconPosition="right"
								className="rounded-md"
								onClick={() => router.push('/customer/login')}
							/>
							<Button
								title="Sign Up"
								icon={<UserRound />}
								iconPosition="right"
								className="rounded-md"
								variant="outline"
								onClick={() => router.push('/customer/signup')} // ✅ Link to SignupPage
							/>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
