import { useState, useMemo, useCallback } from "react";
import type { CandidateResult, SortField, SortOrder } from "../types";

export function useSort(candidates: CandidateResult[] | null) {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterText, setFilterText] = useState("");

  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder(field === "candidateName" ? "asc" : "desc");
      }
    },
    [sortField]
  );

  const sorted = useMemo(() => {
    if (!candidates) return [];

    let filtered = candidates;
    if (filterText.trim()) {
      const query = filterText.toLowerCase();
      filtered = candidates.filter(
        (c) =>
          c.candidateName.toLowerCase().includes(query) ||
          c.matchingSkills.some((s) => s.toLowerCase().includes(query)) ||
          c.summary.toLowerCase().includes(query)
      );
    }

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortField === "candidateName") {
        comparison = a.candidateName.localeCompare(b.candidateName);
      } else {
        comparison = (a[sortField] as number) - (b[sortField] as number);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [candidates, sortField, sortOrder, filterText]);

  return {
    sorted,
    sortField,
    sortOrder,
    filterText,
    toggleSort,
    setFilterText,
  };
}
