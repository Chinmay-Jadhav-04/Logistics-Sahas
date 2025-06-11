'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTransportList from "./components/Transportation-Services/MobileTable";
import Table from "./components/Transportation-Services/Table";

export default function Order() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Transportation Services')
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTransportList />
				) : (
					<Table />
				)
			}
		</section>
	)
}
