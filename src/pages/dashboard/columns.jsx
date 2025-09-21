import { Circle, Edit, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";

import { DataModal } from "@/components/data-example-modal";

import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center px-1 py-0.5 w-fit border rounded-md gap-x-1">
          <Circle
            className={cn({
              "size-2 shrink-0 text-background": true,
              "fill-green-500": status.toLowerCase() === "active",
              "fill-red-500": status.toLowerCase() === "inactive",
            })}
          />
          <span className="text-xs text-start">{status}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const formData = row.original;

      function editTrigger() {
        return (
          <Button variant="ghost">
            <Edit className="size-4" />
          </Button>
        );
      }
      return <DataModal initial={formData} trigger={editTrigger()} />;
    },
  },
];
