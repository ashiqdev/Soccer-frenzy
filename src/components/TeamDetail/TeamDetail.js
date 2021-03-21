import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Banner from '../Banner/Banner';
import { Link } from 'react-router-dom';
import soccer from '../../soccer.svg';
import others from '../../others.svg';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';

import OutlinedFlagOutlinedIcon from '@material-ui/icons/OutlinedFlagOutlined';

import SportsSoccerOutlinedIcon from '@material-ui/icons/SportsSoccerOutlined';

import WcOutlinedIcon from '@material-ui/icons/WcOutlined';

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '70%', // 16:9
  },

  margin: {
    marginTop: '2rem',
  },

  center: {
    marginTop: '5rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  padding: {
    paddingTop: '2rem',
    paddingLeft: '2rem',
    color: '#fff',
    pointerEvents: 'none',
  },

  mr: {
    marginRight: '1rem',
    fontSize: '2rem',
    color: '#ccc',

    '&:hover': {
      color: '#eee',
    },
  },

  bg: {
    background: 'linear-gradient(to right, #396afc, #2948ff)',
    // color: 'white',
  },

  gray: {
    color: '#eee',
  },

  background: {
    background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    minHeight: '100vh',
  },

  minHeight: {
    background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    height: '100vh',
  },

  title: {
    paddingBottom: '1rem',
  },

  align: {
    display: 'flex',
    paddingBottom: '1rem',
  },

  space: {
    marginLeft: '1rem',
  },
});

const TeamDetail = () => {
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState({});
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const loadTeam = async () => {
      setLoading(true);
      const url = ` https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;
      const { data } = await axios.get(url);
      setTeam(data.teams[0]);
    };
    loadTeam()
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [id]);

  const {
    strTeam,
    intFormedYear,
    strCountry,
    strSport,
    strStadiumDescription,
    strDescriptionEN,
    strFacebook,
  } = team;

  return (
    <>
      <Banner team={team} />
      {loading && (
        <ScaleLoader
          loading={loading}
          color='rgb(75, 85, 99)'
          css={override}
          size={15}
        />
      )}

      <div className={!loading ? classes.background : classes.minHeight}>
        <Container maxWidth='lg'>
          <Box p={16} />
          {team.strTeam && (
            <Card className={` ${classes.padding} ${classes.bg}`}>
              <CardActionArea>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item xs={12} sm={7} lg={9}>
                    <CardContent className={classes.content}>
                      <Typography
                        className={` ${classes.title} ${classes.align}`}
                        variant={'h4'}
                      >
                        {strTeam}
                      </Typography>

                      <Typography className={classes.align} variant={'body1'}>
                        <HomeWorkOutlinedIcon />
                        <span className={classes.space}>
                          Founded: {intFormedYear}
                        </span>
                      </Typography>

                      <Typography className={classes.align} variant={'body1'}>
                        <OutlinedFlagOutlinedIcon />
                        <span className={classes.space}>
                          Country: {strCountry}
                        </span>
                      </Typography>

                      <Typography className={classes.align} variant={'body1'}>
                        <SportsSoccerOutlinedIcon />
                        <span className={classes.space}>
                          Sport Type: {strSport}
                        </span>
                      </Typography>

                      <Typography variant={'body1'} className={classes.align}>
                        <WcOutlinedIcon />
                        <span className={classes.space}>
                          Gender: {team.strGender}
                        </span>
                      </Typography>
                    </CardContent>
                  </Grid>

                  <Grid item xs={12} sm={5} lg={3}>
                    <CardMedia
                      className={classes.media}
                      image={team.strGender === 'Male' ? soccer : others}
                      title='post'
                    />
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          )}

          <div className={classes.margin}>
            <Typography className={classes.gray} variant={'body2'}>
              {strStadiumDescription &&
                ` ${strStadiumDescription.substr(0, 800)}...`}
            </Typography>

            <Typography
              style={{ color: '#eee', paddingTop: '2rem' }}
              variant={'body2'}
            >
              {strDescriptionEN && ` ${strDescriptionEN.substr(0, 800)}...`}
            </Typography>
          </div>

          {strFacebook && (
            <Typography className={classes.center}>
              <Link
                to={{ pathname: ` https://${team.strFacebook}` }}
                target='_blank'
              >
                <FontAwesomeIcon className={classes.mr} icon={faFacebook} />
              </Link>

              <Link
                to={{ pathname: ` https://${team.strTwitter}` }}
                target='_blank'
              >
                <FontAwesomeIcon className={classes.mr} icon={faTwitter} />
              </Link>

              <Link
                to={{ pathname: ` https://${team.strYoutube}` }}
                target='_blank'
              >
                <FontAwesomeIcon className={classes.mr} icon={faYoutube} />
              </Link>
            </Typography>
          )}
        </Container>
      </div>
    </>
  );
};

export default TeamDetail;
