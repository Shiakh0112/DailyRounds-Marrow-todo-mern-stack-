import React from "react";

const FilterBar = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
}) => {
  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-100 rounded-md shadow-md">
      <input
        name="tag"
        value={filters.tag}
        onChange={handleChange}
        placeholder="Tag"
        className="border border-gray-300 px-3 py-2 rounded-md w-40"
      />
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-md w-40"
      >
        <option value="">Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        name="user"
        value={filters.user}
        onChange={handleChange}
        placeholder="@username"
        className="border border-gray-300 px-3 py-2 rounded-md w-40"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-md w-40"
      >
        <option value="createdAt">Date</option>
        <option value="priority">Priority</option>
      </select>
      <select
        value={sortDir}
        onChange={(e) => setSortDir(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-md w-40"
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
};

export default FilterBar;
