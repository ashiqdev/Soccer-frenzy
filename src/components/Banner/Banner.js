import {Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import banner from '../../banner.jpg';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    position: 'fixed',
    zIndex: '100',
  },

  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const Banner = ({team}) => {
  const classes = useStyles();

  const style = {
    full: {
      position: 'relative',
      color: '#fff',
      width: '100vw',
      height: '200px',
      margin: '0',
      padding: '0',
      backgroundImage: ` url(${banner})`,
      backgroundPosition: 'center',
    },

    banner: {
      position: 'relative',
      color: '#fff',
      width: '100vw',
      height: '200px',
      margin: '0',
      padding: '0',
      backgroundImage: ` url(${team && team.strTeamBanner})`,

      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  };

  return (
    <div className={classes.root}>
      <Paper style={team?.strTeamBanner ? style.banner : style.full}>
        {!team?.strTeamBanner ? (
          <Typography
            className={classes.center}
            gutterBottom
            variant='h3'
            component='h2'
          >
            Soccer Frenzy
          </Typography>
        ) : (
            <Typography
            className={classes.center}
            gutterBottom
            variant='h3'
            component='h2'
          >
            <img
              style={{
                height: '150px',
              }}
              src={team.strTeamBadge}
              alt='logo'
            />
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default Banner;
