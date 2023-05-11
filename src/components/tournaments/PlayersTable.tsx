import * as React from "react";
import { RegisteredPlayersSchema } from "@/consts/tournamens/types";
import { DataGrid, GridCellParams, GridComparatorFn } from "@mui/x-data-grid";
import { useTranslation } from "next-export-i18n";
import { Link } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid/models/gridRows";

interface Props {
  players: RegisteredPlayersSchema[];
}
const playerRankComparator: GridComparatorFn<string> = (rank1, rank2) => {
  const rankOrder: string[] = ["kyu", "dan", "pro"];

  const getRankIndex = (rank: string): number => rankOrder.indexOf(rank);

  interface RankInfo {
    rank_num: number;
    rank_type: string;
  }

  const getPlayerRankInfo = (rank: string): RankInfo => {
    const [rank_num_str, rank_type] = rank.split(" ");
    const rank_num = parseInt(rank_num_str);
    return {
      rank_type,
      rank_num,
    };
  };

  const rank1Info: RankInfo = getPlayerRankInfo(rank1);
  const rank2Info: RankInfo = getPlayerRankInfo(rank2);

  const rank1Index: number = getRankIndex(rank1Info.rank_type);
  const rank2Index: number = getRankIndex(rank2Info.rank_type);

  if (rank1Index < rank2Index) {
    return -1;
  } else if (rank1Index > rank2Index) {
    return 1;
  } else {
    if (rank1Info.rank_type === "kyu") {
      if (rank1Info.rank_num < rank2Info.rank_num) {
        return 1;
      } else if (rank1Info.rank_num > rank2Info.rank_num) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (rank1Info.rank_num > rank2Info.rank_num) {
        return 1;
      } else if (rank1Info.rank_num < rank2Info.rank_num) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};

const PlayersTable: React.FC<Props> = ({ players }) => {
  const { t } = useTranslation();
  const columns = [
    {
      field: "id",
      headerName: t("registration.order"),
      flex: 1,
      minWidth: 100,
      maxWidth: 50,
    },
    {
      field: "name",
      headerName: t("registration.name"),
      flex: 3,
      minWidth: 200,
    },
    {
      field: "rank",
      headerName: t("registration.rank"),
      flex: 2,
      minWidth: 70,
      sortComparator: playerRankComparator,
    },
    {
      field: "country",
      headerName: t("registration.country"),
      flex: 2,
      minWidth: 100,
    },
    {
      field: "city_club",
      headerName: t("registration.club_city"),
      flex: 3,
      minWidth: 100,
    },
    {
      field: "pid",
      headerName: "PID",
      flex: 3,
      minWidth: 100,
      renderCell: (params: GridCellParams<GridValidRowModel, string>) => (
        <span>
          {params.value != undefined ? (
            <Link
              href={`https://www.europeangodatabase.eu/EGD/Player_Card.php?&key=${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {params.value}
            </Link>
          ) : (
            "-"
          )}
        </span>
      ),
    },
  ];
  const rows = players.map((player, index) => ({
    id: index + 1,
    name: player.first_name + " " + player.last_name,
    rank: player.rank,
    country: player.country,
    city_club: player.city_club,
    pid: player.egf_pid,
  }));

  return (
    <DataGrid
      autoHeight={true}
      columns={columns}
      rows={rows}
      disableColumnMenu={true}
      pageSizeOptions={[]}
      disableRowSelectionOnClick
      sortingOrder={["desc", "asc"]}
    />
  );
};

export default PlayersTable;
