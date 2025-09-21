import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { columns } from "./columns";
import data from "./data.json";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div> */}
      <section className="p-6 gap-y-4 flex flex-col items-end">
        <Button variant="outline" className="w-12">
          <Plus className="size-4" />
        </Button>
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  );
}
