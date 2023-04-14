import * as React from "react";
import { RegisteredPlayersSchema } from "@/consts/tournamens/types";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { DataGrid, GridComparatorFn } from "@mui/x-data-grid";

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
  const { t } = useTranslation("registration");
  const columns = [
    {
      field: "id",
      headerName: t("order"),
      flex: 1,
      minWidth: 100,
      maxWidth: 50,
    },
    { field: "name", headerName: t("name"), flex: 3, minWidth: 200 },
    {
      field: "rank",
      headerName: t("rank"),
      flex: 2,
      minWidth: 60,
      sortComparator: playerRankComparator,
    },
    { field: "country", headerName: t("country"), flex: 2, minWidth: 100 },
    { field: "city_club", headerName: t("club_city"), flex: 3, minWidth: 100 },
  ];
  const rows = players.map((player, index) => ({
    id: index + 1,
    name: player.first_name + " " + player.last_name,
    rank: player.rank,
    country: player.country,
    city_club: player.city_club,
  }));
  console.log(rows);
  console.log(columns);

  return (
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 300 }}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>{t("order")}</TableCell>
    //         <TableCell>{t("name")}</TableCell>
    //         <TableCell>{t("rank")}</TableCell>
    //         <TableCell>{t("country")}</TableCell>
    //         <TableCell>{t("club_city")}</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {players.map((player, index) => (
    //         <TableRow
    //           key={index + 1}
    //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //         >
    //           <TableCell component="th" scope="row">
    //             {index + 1}
    //           </TableCell>
    //           <TableCell>
    //             {player.first_name} {player.last_name}
    //           </TableCell>
    //           <TableCell>{player.rank}</TableCell>
    //           <TableCell>{player.country}</TableCell>
    //           <TableCell>{player.city_club}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>

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
