import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CategoriesFallback = () => {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div id="categories-fallback" className="space-y-4">
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableCell className="w-50">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-28 ml-auto" />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>

                <TableCell className="text-right">
                  <Skeleton className="h-5 w-24 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesFallback;
