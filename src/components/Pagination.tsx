import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between py-4  gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="hidden xs:inline text-sm text-gray-700">
          {startItem}-{endItem} of {totalItems} items
        </span>
        {/* left side */}
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="border px-2 py-1 border-gray-300 rounded-none text-sm focus:outline-none">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectGroup>
              <SelectItem className="rounded-none" value="10">
                10 / page
              </SelectItem>
              <SelectItem className="rounded-none" value="50">
                50 / page
              </SelectItem>
              <SelectItem className="rounded-none" value="100">
                100 / page
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* right side */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex justify-center w-4 -space-x-3 ">
            <img className="h-4 w-4" src="/chevron-left-m.svg" alt="chevron" />
            <img className="h-4 w-4 " src="/chevron-left-m.svg" alt="chevron" />
          </div>
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img className="h-4 w-4" src="/chevron-left-m.svg" alt="chevron" />
        </button>

        <span className=" px-3 py-1 text-sm font-medium">{currentPage}</span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img
            className="h-4 w-4 rotate-180"
            src="/chevron-left-m.svg"
            alt="chevron"
          />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-center w-4 -space-x-3">
            <img
              className="h-4 w-4 rotate-180"
              src="/chevron-left-m.svg"
              alt="chevron"
            />
            <img
              className="h-4 w-4 rotate-180"
              src="/chevron-left-m.svg"
              alt="chevron"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
