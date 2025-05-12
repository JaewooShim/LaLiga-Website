import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Flag from "react-world-flags";
import { Tooltip } from "react-tooltip";

const columnHelper = createColumnHelper();
const set = new Set(["eng", "sct", "wls"]);

const columns = [
  columnHelper.accessor("player_name", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Player</span>,
  }),
  columnHelper.accessor("positions", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Pos</span>,
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
      <span className="flex items-center">
        {set.has(info.getValue()) ? (
          <img src={`/countries/${info.getValue()}.svg`} height="16" />
        ) : (
          <Flag code={info.getValue()} height="16" />
        )}
      </span>
    ),
    header: () => <span className="btn btn-dark">Nation</span>,
    meta: {
      tooltip: "Nationality of the player",
    },
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Age</span>,
    meta: {
      tooltip: `Current Age<br>
      Age at Season Start`,
    },
  }),
  columnHelper.accessor("matches_played", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">MP</span>,
    meta: {
      tooltip: "Matches Played",
    },
  }),
  columnHelper.accessor("goals", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Gls</span>,
    meta: {
      tooltip: "Goals",
    },
  }),
  columnHelper.accessor("assists", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Ast</span>,
    meta: {
      tooltip: "Assists",
    },
  }),
  columnHelper.accessor("penalty_goals", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Pk</span>,
    meta: {
      tooltip: "Penatly Kicks Made",
    },
  }),
  columnHelper.accessor("yellow_card", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">CrdY</span>,
    meta: {
      tooltip: "Yellow Cards",
    },
  }),
  columnHelper.accessor("red_card", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">CrdR</span>,
    meta: {
      tooltip: "Red Cards",
    },
  }),
  columnHelper.accessor("expected_goals", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">xG</span>,
    meta: {
      tooltip: "Expected Goals",
    },
  }),
  columnHelper.accessor("expected_assists", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">xA</span>,
    meta: {
      tooltip: "Expected Assists",
    },
  }),
  columnHelper.accessor("team_name", {
    cell: (info) => info.getValue(),
    header: () => <span className="btn btn-dark">Team</span>,
  }),
];

const PlayerTable = ({ data }) => {
  const [copiedData, setCopiedData] = useState(data);
  const [visibleRows, setVisibleRows] = useState(15);

  const table = useReactTable({
    data: copiedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 15);
  };
  
  const rows = table.getRowModel().rows.slice(0, visibleRows);

  return (
    <div className="">
      <div className="">
        <table className="table">
          <thead className="thead-dark">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="" scope="col">
                    <div
                      data-tooltip-id={header.id}
                      data-tooltip-html={header.column.columnDef.meta?.tooltip}
                      data-tooltip-place="top"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                    <Tooltip id={header.id} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {rows.map((row) => (
              <tr key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRows < table.getRowModel().rows.length && (
          <div className="flex justify-end p-4">
            <button
              onClick={handleLoadMore}
              className="text-sm text-blue-600 hover:underline"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerTable;
