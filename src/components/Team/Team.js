import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    transition: 'transform 0.15s ease-in-out',

    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)',
    },
  },
  media: {
    height: 0,
    width: 200,
    paddingTop: '56.25%', // 16:9
    marginTop: '2rem',
  },

  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    color: '#0082c8',
    fontWeight: '600',
  },
});

const Team = (props) => {
  const history = useHistory();
  console.log(props);
  const { idTeam, strTeam, strSport, strTeamBadge } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.center}>
        <CardMedia
          className={classes.media}
          image={strTeamBadge}
          title='team'
        />
        <CardContent className={classes.center}>
          <Typography gutterBottom variant='h5' component='h2'>
            {strTeam}
          </Typography>
          <Typography gutterBottom variant='body1' component='h3'>
            Sports type: {strSport}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          className={classes.btn}
          onClick={() => history.push(`/team/${idTeam}`)}
        >
          Explore <ArrowForwardOutlinedIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Team;
