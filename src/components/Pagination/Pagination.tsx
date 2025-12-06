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
  // Generate page numbers to display (1 to 10)
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 10) },
    (_, i) => i + 1
  );

  return (
    <div className="pagination-container">
      {/* Previous Button */}
      <button
        className="pagination-btn pagination-prev"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <FaCaretLeft />
        <p className="desktop">Prev</p>
      </button>

      {/* Page Numbers */}
      <div className="pagination-numbers">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`pagination-btn ${
              currentPage === page ? "pagination-active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
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
