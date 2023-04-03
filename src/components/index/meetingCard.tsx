import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {GetServerSideProps, GetStaticProps} from "next";
import Link from "next/link";


export type MeetingListSchema = {
  id: number,
  name: string,
  date: string,
  start_time: string,
  end_time: string,
  address: string,
}

interface Props {
  meeting: MeetingListSchema;
}

const TournamentCard: React.FC<Props> = ({meeting}) => {
  return (
    <Card sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 16}} color="text.primary" gutterBottom>
          {meeting.name}
        </Typography>
        <Typography variant="body2" component="div">
          <span>{meeting.address}</span>
        </Typography>
        <Typography variant="body2" component="div">
          {meeting.date}
        </Typography>
        <Typography variant="body2">
          Godzina:
          {meeting.start_time}
          {meeting.end_time !== null && (
            <span> - {meeting.end_time}</span>
          )}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/meetings/${meeting.id}`}>Obczaj</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default TournamentCard;


