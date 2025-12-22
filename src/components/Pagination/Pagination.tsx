import type { JSX } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 10) },
    (_, i) => i + 1
  );

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn pagination-prev"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <FaCaretLeft />
        <p className="desktop">Prev</p>
      </button>

      <div className="pagination-numbers">
        {(() => {
          const elems: JSX.Element[] = [];
          let ellipsisInserted = false;
          for (const page of pageNumbers) {
            const isFirst = page === 1;
            const isLast = page === totalPages;
            const isCurrent = page === currentPage;
            const hideClass = !isFirst && !isLast && !isCurrent ? "hide" : "";

            elems.push(
              <button
                key={page}
                className={`pagination-btn ${hideClass} ${
                  isCurrent ? "pagination-active" : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
            if (
              isCurrent &&
              !ellipsisInserted &&
              page < totalPages &&
              totalPages > 3
            ) {
              ellipsisInserted = true;
              elems.push(
                <button
                  key={`ellipsis-${page}`}
                  className="pagination-btn ellipsis"
                  style={{ fontSize: "1.1rem" }}
                  aria-hidden
                >
                  ...
                </button>
              );
            }
          }
          return elems;
        })()}
      </div>

      <button
        className="pagination-btn pagination-next"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <p className="desktop">Next</p>
        <FaCaretRight />
      </button>
    </div>
  );
}
