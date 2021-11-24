import {  makeStyles } from "@material-ui/core";
import  Typography  from '@material-ui/core/Typography'
import  Container  from '@material-ui/core/Container'
import Track from "./Track";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'purple',
    textAlign: 'center',
    paddingTop: 25,
    paddingBottom: 25,
    fontWeight: 'bold',
    fontSize: 35,
  }
}))

function Songs(props) {

  const classes = useStyles();

  return (
    <Container>
      <Typography
        className={classes.title}
        variant='h6'
      >
        New Songs
      </Typography>
      {props.filteredResults.map((track, index) => {
        return (
          <Track track={track} key={track.title} />
        )
      })}
    </Container>
  )
}

export default Songs