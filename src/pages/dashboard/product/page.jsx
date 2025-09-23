import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { SectionCards } from "@/components/section-cards";
import { CategoryModal } from "@/components/category/data-category-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo } from "react";

import { columns } from "./columns";
import { useProducts } from "@/hooks/use-products";

export default function ProductPage() {
  const { data, loading, error, pagination, setPagination, refreshData } =
    useProducts(0, 15); // initial page + pageSize

  const memoizedColumns = useMemo(() => columns(refreshData), [refreshData]);

  const handlePageChange = (page) => {
    setPagination(page);
  };

  const addTrigger = () => (
    <Button variant="outline" className="w-12">
      <Plus className="size-4" />
    </Button>
  );

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div> */}

      <section className="p-6 gap-y-4 flex flex-col items-end">
        <CategoryModal
          initial=""
          trigger={addTrigger()}
          onSuccess={refreshData}
        />

        <DataTable
          columns={memoizedColumns}
          data={data}
          pagination={pagination}
          isLoading={loading}
        />

        <div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </section>
    </div>
  );
}
