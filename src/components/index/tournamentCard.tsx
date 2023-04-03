import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { TournamentListSchema } from "../../consts/tournamens/types";

interface Props {
  tournament: TournamentListSchema;
}

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {tournament.name}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography variant="body2">
          {tournament.start_date}
          {tournament.end_date !== null && (
            <span> - {tournament.end_date}</span>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/tournaments/${tournament.id}`}>Obczaj</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
