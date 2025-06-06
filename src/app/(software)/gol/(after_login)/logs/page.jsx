'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import AuditTable from "./components/AuditTable";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileAuditList from "./components/MobileAuditList";


export default function AuditLogsPage() {
	const { setTitle } = useSidebar();

	useEffect(() => {
		setTitle('Audit Log')
	}, []);

	return (
		<section className="grid gap-8 min-h-dvh">
			{
				useIsMobile() ? (
					<MobileAuditList />
				) : (
					<AuditTable />
				)
			}
		</section>
	)
}