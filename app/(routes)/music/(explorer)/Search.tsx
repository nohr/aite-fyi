"use client";

import useQueryParams from "@hooks/useQueryParams";
import { useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function Search() {
  const searchRef = useRef<HTMLInputElement>(null);
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();

  //  todo: focus on mount and debounce search
  return (
    <div className=" relative flex w-fit">
      <input
        ref={searchRef}
        type="text"
        className=" pointer-events-auto h-fit w-full border-[1px] border-current bg-transparent p-2 outline-none transition-all placeholder:text-current placeholder:opacity-70 hover:bg-[var(--arc-palette-title,rgb(255_255_255_/_0.7))] hover:bg-opacity-100 focus:bg-[var(--arc-palette-title,_rgb(255_255_255_/_1))] focus:bg-opacity-70 dark:hover:bg-black dark:hover:bg-opacity-70 focus:dark:bg-black focus:dark:bg-opacity-70"
        placeholder="Search"
        value={queryParams.query}
        onChange={(e) => setQueryParams({ query: e.target.value })}
      />
      {queryParams.query && queryParams.query.length > 0 ? (
        <button
          type="button"
          title="clear"
          className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 "
          onClick={() => {
            setQueryParams({ query: "" });
            searchRef.current?.focus();
          }}
        >
          <IoIosCloseCircle className="h-4 w-4 transition-opacity hover:opacity-50" />
        </button>
      ) : null}
    </div>
  );
}
