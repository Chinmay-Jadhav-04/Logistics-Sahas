'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import RequestList from "./components/Table";
import MobileTransportList from "./components/Transportation-Services/MobileTable";

export default function Order() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Customer Orders')
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTransportList />
				) : (
					<RequestList />
				)
			}
		</section>
	)
}
