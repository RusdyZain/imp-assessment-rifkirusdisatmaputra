"use client";
interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}
export default function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;
  return (
    <div className="join flex justify-center mt-6">
      <button
        className="join-item btn"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        «
      </button>
      <button className="join-item btn">{current}</button>
      <button
        className="join-item btn"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        »
      </button>
    </div>
  );
}
