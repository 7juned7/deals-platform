'use client';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  accessFilter: 'all' | 'public' | 'locked';
  onAccessChange: (v: 'all' | 'public' | 'locked') => void;
}

export default function DealsToolbar({
  search,
  onSearchChange,
  accessFilter,
  onAccessChange,
}: Props) {
  return (
    <div
      className="
        mb-8 flex flex-col gap-4
        md:flex-row md:items-center
      "
    >
      {/* SEARCH */}
      <div className="relative w-full md:w-2/3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          🔍
        </span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search deals"
          className="
            w-full rounded-xl border border-white/5
            bg-[#111113]
            py-2.5 pl-9 pr-4
            text-sm text-white
            placeholder-gray-500
            outline-none
            transition
            focus:border-white/20
            focus:ring-1 focus:ring-white/20
          "
        />
      </div>

      {/* FILTER */}
      <div className="w-full md:w-1/3">
        <select
          value={accessFilter}
          onChange={(e) =>
            onAccessChange(e.target.value as 'all' | 'public' | 'locked')
          }
          className="
            w-full rounded-xl border border-white/5
            bg-[#111113]
            py-2.5 px-4
            text-sm text-white
            outline-none
            transition
            focus:border-white/20
            focus:ring-1 focus:ring-white/20
          "
        >
          <option value="all">All deals</option>
          <option value="public">Public deals</option>
          <option value="locked">Locked deals</option>
        </select>
      </div>
    </div>
  );
}
