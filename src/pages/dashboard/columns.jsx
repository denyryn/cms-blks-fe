import { Circle, Edit, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/components/data-category-modal";

export const columns = (onDataChange) => [
  {
    accessorKey: "name",
    header: "Name",
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
      return (
        <CategoryModal
          initial={formData}
          trigger={editTrigger()}
          onSuccess={onDataChange}
        />
      );
    },
  },
];
