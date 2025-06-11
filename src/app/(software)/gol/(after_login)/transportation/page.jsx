'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "./components/Table";

export default function Order() {
  const { setTitle } = useSidebar();
  useEffect(() => {
    setTitle('Transportation Services')
  }, []);

  return (
    <section className="grid gap-8">
      {
        <Table />
      }
    </section>
  )
}
