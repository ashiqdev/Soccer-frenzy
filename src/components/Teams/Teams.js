import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';
import Team from '../Team/Team';
import { store } from '../../store/store';
import { getTeamsAction } from '../../store/action/actions';
import Banner from '../Banner/Banner';

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },

  background: {
    background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    minHeight: '100vh',
  },

  minHeight: {
    background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    height: '100vh',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Teams = () => {
  //   const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const {
    dispatch,
    state: { teams },
  } = useContext(store);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      const url =
        'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League';
      const { data } = await axios.get(url);
      dispatch(getTeamsAction(data.teams));
    };
    loadTeams()
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <Banner />
      <div className={!loading ? classes.background : classes.minHeight}>
        <Container maxWidth='lg'>
          <Grid container className={classes.root} spacing={2}>
            <Box m={18} />
            <Grid item xs={12}>
              <Grid container justify='center' spacing={2}>
                {loading && (
                  <ScaleLoader
                    loading={loading}
                    color='rgb(75, 85, 99)'
                    css={override}
                    size={15}
                  />
                )}
                {teams.map((team) => (
                  <Grid xs={12} sm={6} lg={4} key={team.idTeam} item>
                    <Team {...team} />
                    <Box m={4} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Teams;
