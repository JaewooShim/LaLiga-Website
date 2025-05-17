import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { Tooltip } from "react-tooltip";
import "../PlayerTable/PlayerTable.css";
import CountryName from "../CountryName";

const columnHelper = createColumnHelper();
const set = new Set(["eng", "sct", "wls"]);

const columns = [
  columnHelper.accessor("player_name", {
    cell: (info) => info.getValue(),
    header: () => <span className="">Player</span>,
  }),
  columnHelper.accessor("positions", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">Pos</span>,
    meta: {
      tooltip: `GK - Goalkeepers<br>
      DF - Defenders<br>
      MF - Midfielders<br>
      FW - Forwards
      `,
    },
  }),
  columnHelper.accessor("nation", {
    cell: (info) => (
      <span
        className="cursor-pointer"
        data-tooltip-id="nation_name"
        data-tooltip-content={CountryName(info.getValue())}
        data-tooltip-place="right"
      >
        {set.has(info.getValue()) ? (
          <img src={`/countries/${info.getValue()}.svg`} height="16" />
        ) : (
          <Flag code={info.getValue()} height="16" />
        )}
        <Tooltip id="nation_name" />
      </span>
    ),
    header: () => <span className="cursor-pointer">Nation</span>,
    meta: {
      tooltip: "Nationality of the player",
    },
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">Age</span>,
    meta: {
      tooltip: `Current Age<br>
      Age at Season Start`,
    },
  }),
  columnHelper.accessor("matches_played", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">MP</span>,
    meta: {
      tooltip: "Matches Played",
    },
  }),
  columnHelper.accessor("goals", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">Gls</span>,
    meta: {
      tooltip: "Goals",
    },
  }),
  columnHelper.accessor("assists", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">Ast</span>,
    meta: {
      tooltip: "Assists",
    },
  }),
  columnHelper.accessor("penalty_goals", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">Pk</span>,
    meta: {
      tooltip: "Penatly Kicks Made",
    },
  }),
  columnHelper.accessor("yellow_card", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">CrdY</span>,
    meta: {
      tooltip: "Yellow Cards",
    },
  }),
  columnHelper.accessor("red_card", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">CrdR</span>,
    meta: {
      tooltip: "Red Cards",
    },
  }),
  columnHelper.accessor("expected_goals", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">xG</span>,
    meta: {
      tooltip: "Expected Goals",
    },
  }),
  columnHelper.accessor("expected_assists", {
    cell: (info) => info.getValue(),
    header: () => <span className="cursor-pointer">xA</span>,
    meta: {
      tooltip: "Expected Assists",
    },
  }),
  columnHelper.accessor("team_name", {
    cell: (info) => info.getValue(),
    header: () => <span className="">Team</span>,
  }),
];

const PlayerTable = ({ data }) => {
  // const [visibleRows, setVisibleRows] = useState(15);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-h-96 overflow-y-auto sm:overflow-x-visible hide-scrollbar rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 font-semibold text-xs uppercase"
                >
                  <div
                    data-tooltip-id={header.id}
                    data-tooltip-html={header.column.columnDef.meta?.tooltip}
                    data-tooltip-place="top"
                    className=""
                  >
                    <Tooltip id={header.id} />
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
