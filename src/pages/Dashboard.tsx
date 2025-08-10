import React, { useState, useEffect, useMemo } from "react";

import type { SortField, SortDirection, Comment, TableState } from "../types";
import { fetchComments } from "../utils/api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Pagination } from "../components/Pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader";

const SortIcon: React.FC<{
  field: SortField;
  currentField: SortField | null;
  direction: SortDirection;
}> = ({ field, currentField, direction }) => {
  if (currentField !== field) {
    return (
      <img className="w-3 h-3 flex-shrink-0" src="/sort-m.svg" alt="sort" />
    );
  }

  if (direction === "asc") {
    return (
      <img
        className="w-3 h-3 flex-shrink-0"
        src="/arrow-up-m.svg"
        alt="sort ascending"
      />
    );
  }

  if (direction === "desc") {
    return (
      <img
        className="w-3 h-3 flex-shrink-0 rotate-180"
        src="/arrow-up-m.svg"
        alt="sort descending"
      />
    );
  }

  return <img className="w-3 h-3 flex-shrink-0" src="/sort-m.svg" alt="sort" />;
};

export const DashboardPage: React.FC<{}> = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedCells, setExpandedCells] = useState<Set<number>>(new Set());
  const [cache, setCache] = useState<
    Map<string, { data: Comment[]; total: number }>
  >(new Map());
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleCellExpansion = (commentId: number) => {
    const newExpanded = new Set(expandedCells);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedCells(newExpanded);
  };

  const [tableState, setTableState] = useLocalStorage<TableState>(
    "dashboardState",
    {
      currentPage: 1,
      pageSize: 10,
      searchTerm: "",
      sortField: null,
      sortDirection: null,
    }
  );

  useEffect(() => {
    const loadComments = async () => {
      const cacheKey = `${tableState.currentPage}-${tableState.pageSize}`;

      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey)!;
        setComments(cachedData.data);
        setTotalItems(cachedData.total);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await fetchComments(
          tableState.currentPage,
          tableState.pageSize
        );

        const newCache = new Map(cache);
        newCache.set(cacheKey, result);
        setCache(newCache);

        setComments(result.data);
        setTotalItems(result.total);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [tableState.currentPage, tableState.pageSize]);

  const filteredAndSortedComments = useMemo(() => {
    let filtered = comments.filter((comment) => {
      if (!tableState.searchTerm) return true;

      const searchLower = tableState.searchTerm.toLowerCase();
      return (
        comment.name.toLowerCase().includes(searchLower) ||
        comment.email.toLowerCase().includes(searchLower) ||
        comment.body.toLowerCase().includes(searchLower) ||
        comment.postId.toString().includes(searchLower)
      );
    });

    if (tableState.sortField && tableState.sortDirection) {
      filtered.sort((a, b) => {
        let aVal, bVal;

        switch (tableState.sortField) {
          case "postId":
            aVal = a.postId;
            bVal = b.postId;
            break;
          case "name":
            aVal = a.name.toLowerCase();
            bVal = b.name.toLowerCase();
            break;
          case "email":
            aVal = a.email.toLowerCase();
            bVal = b.email.toLowerCase();
            break;
          default:
            return 0;
        }

        if (aVal < bVal) return tableState.sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return tableState.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    comments,
    tableState.searchTerm,
    tableState.sortField,
    tableState.sortDirection,
  ]);

  const totalPages = Math.ceil(totalItems / tableState.pageSize);

  const handleSearch = (term: string) => {
    setTableState({
      ...tableState,
      searchTerm: term,
    });
  };

  const handleSort = (field: SortField) => {
    let newDirection: SortDirection;

    if (tableState.sortField !== field) {
      newDirection = "asc";
    } else if (tableState.sortDirection === null) {
      newDirection = "asc";
    } else if (tableState.sortDirection === "asc") {
      newDirection = "desc";
    } else {
      newDirection = null;
    }

    setTableState({
      ...tableState,
      sortField: newDirection ? field : null,
      sortDirection: newDirection,
    });
  };

  const handlePageChange = (page: number) => {
    setTableState({
      ...tableState,
      currentPage: page,
    });
  };

  const handlePageSizeChange = (size: number) => {
    setCache(new Map());
    setTableState({
      ...tableState,
      pageSize: size,
      currentPage: 1,
    });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
  //       <div className="flex items-center justify-center">
  //         <Loader />
  //       </div>
  //       <p className="mt-4 text-gray-600">Loading comments...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-black">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 flex-wrap gap-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-space-mono font-bold text-gray-900">
              Comments Dashboard
            </h1>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 px-3 py-2 sm:px-4 bg-[#A0F075] text-black border-2 border-black transition-colors shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none text-sm sm:text-base cursor-pointer"
            >
              <img src="user-m.svg" className="h-4 w-4 flex-shrink-0" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <div className="relative w-full sm:max-w-md">
            <img
              src="/search-m.svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 flex-shrink-0"
            />
            <input
              type="text"
              placeholder="/ Search"
              value={tableState.searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-b border-black focus:ring-2 focus:ring-transparent outline-none transition-colors text-sm sm:text-base"
            />
          </div>
        </div>

        {/* table */}
        {loading && (
          <div className="absolute left-50 right-50  flex flex-col items-center justify-center h-screen">
            <Loader />
            <p className="mt-4 text-black">Loading comments...</p>
          </div>
        )}

        <div className="border border-black max-h-screen h-auto overflow-y-auto">
          <table className="w-full table-fixed divide-y-reverse divide-black">
            <colgroup>
              <col style={{ width: "160px" }} />
              <col style={{ width: "380px" }} />
              <col style={{ width: "300px" }} />
              <col style={{ width: isMobile ? "300px" : "auto" }} />
            </colgroup>

            <thead className="bg-gray-50 sticky top-0 z-10 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[0.5px] before:bg-black">
              <tr>
                <th
                  onClick={() => handleSort("postId")}
                  className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-black uppercase tracking-wider cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-xs sm:text-sm">/</span>
                    <span className="font-space-mono truncate">Post ID</span>
                    <SortIcon
                      field="postId"
                      currentField={tableState.sortField}
                      direction={tableState.sortDirection}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-black uppercase tracking-wider cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-xs sm:text-sm">/</span>
                    <span className="font-space-mono truncate">Name</span>
                    <SortIcon
                      field="name"
                      currentField={tableState.sortField}
                      direction={tableState.sortDirection}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-black uppercase tracking-wider cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-xs sm:text-sm">/</span>
                    <span className="font-space-mono truncate">Email</span>
                    <SortIcon
                      field="email"
                      currentField={tableState.sortField}
                      direction={tableState.sortDirection}
                    />
                  </div>
                </th>
                <th className="xl:w-auto px-3 py-3 text-left text-xs sm:text-sm font-medium text-black uppercase tracking-wider">
                  <div className="flex items-center">
                    <span className="text-xs sm:text-sm">/</span>
                    <span className="font-space-mono ml-1">Comment</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black">
              {filteredAndSortedComments.map((comment) => (
                <tr
                  key={comment.id}
                  className={`spring-expand hover:bg-[#A0F075] transition-colors cursor-pointer text-sm sm:text-base font-medium text-gray-900  ${
                    expandedCells.has(comment.id) ? "expanded" : "collapsed"
                  }`}
                  onClick={() => toggleCellExpansion(comment.id)}
                >
                  <td className="px-3 py-4 ">
                    <div
                      className={`spring-expand cursor-pointer flex items-start ${
                        expandedCells.has(comment.id) ? "expanded" : "collapsed"
                      }`}
                      title={comment.postId.toString()}
                    >
                      {comment.postId}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div
                      className={`spring-expand cursor-pointer font-semibold capitalize${
                        expandedCells.has(comment.id) ? "expanded" : "collapsed"
                      }`}
                      title={comment.name}
                    >
                      {comment.name}
                    </div>
                  </td>
                  <td className="px-3 py-4 overflow-x-auto ">
                    <div
                      className={`spring-expand cursor-pointer w-[300px] hover:underline overflow-x-auto whitespace-nowrap ${
                        expandedCells.has(comment.id) ? "expanded" : "collapsed"
                      }`}
                      title={comment.email}
                    >
                      {comment.email}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm sm:text-base font-medium text-gray-900">
                      <div
                        className={`spring-expand cursor-pointer ${
                          expandedCells.has(comment.id)
                            ? "expanded"
                            : "collapsed"
                        }`}
                        onClick={() => toggleCellExpansion(comment.id)}
                        title={comment.body}
                      >
                        {comment.body}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedComments.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm sm:text-base">
              No comments found matching your search criteria.
            </p>
          </div>
        )}

        {totalItems > 0 && (
          <div className="mt-4 flex-shrink-0">
            <Pagination
              currentPage={tableState.currentPage}
              totalPages={totalPages}
              pageSize={tableState.pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
