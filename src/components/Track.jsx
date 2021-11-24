import { makeStyles } from "@material-ui/core";
import   Grid  from "@material-ui/core/Grid";
import  Typography  from '@material-ui/core/Typography'
import  Link  from '@material-ui/core/Link'
import  Box  from '@material-ui/core/Box'
import  IconButton  from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'purple',
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold'
  },
  trackContent: {
    width: 'calc(100% - 118px)'
  },
  artistPic: {
    marginRight: 20,
    position: 'relative',
    height: 0,
  },
  label: {
    width: 50,
    height: 50,
    borderRadius: 10,
    

  },
  playPause: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    // height: '100%',
    opacity: 0,

    '&:hover': {
      opacity: 1
    }
  },
  playIcon: {
    color: 'grey',
  },
  songName: {
    color: 'purple',
  },
  singer: {
    color: 'grey',
  },
  slide: {
    color: 'purple',
  },
  timeAndVolume: {
    flex: '0 0 118px'
  },
  volumeSlide: {
    color: 'purple',
    width: 100,
  },
  timer: {
    color: 'grey',
    paddingBottom: 10
  }


}))

function Track(props) {

  const classes = useStyles();
  const [isPlayed, setIsPlayed] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [value, setValue] = useState(100);
  const [progress, setProgress] = useState(0)

  const audioRef = useRef(null)
  
  const start = () => {

    const audioFiles = document.getElementsByTagName("audio")

    for (const file of audioFiles) {
      file.pause()
    }

    audioRef.current.play()

    setIsPlayed(true)
    setTrackDuration(audioRef.current.duration)
    
  }

  const pause = () => {
    audioRef.current.pause()

    setIsPlayed(false)
  }

  const changeCurrentTime = () => {
    if (audioRef.current.currentTime === audioRef.current.duration) {
      pause()
    }
    setCurrentTime(audioRef.current.currentTime)

    setProgress((audioRef.current.currentTime * 100) / audioRef.current.duration);
  }

  useEffect(()=>{

    let timer1 = setInterval(() => {
      if(!audioRef.current.paused) {
        changeCurrentTime()
      } else {
        setIsPlayed(!audioRef.current.paused)
      }
    }, 1000);

    return () => {
      clearInterval(timer1);
    };
  }, [])

  const parseTime = (audioCurrentTime) => {
   
    var minutes = "0" + Math.floor(audioCurrentTime / 60);
    var seconds = "0" +  Math.floor(audioCurrentTime - minutes * 60);
    var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur
  }

  const handleChangeVolume = (event, newValue) => {
    audioRef.current.volume = newValue / 100
    
    setValue(newValue);

  }
  const handleChangeTrack = (event, newValue) => {

    audioRef.current.currentTime =  (audioRef.current.duration * newValue) / 100;
    
    setProgress(newValue);
  }

  return (
      <Grid
        container
        justifyContent='space-between'
      >
        <Box className={classes.trackContent}>
          <Box 
            display='flex' 
            justifyContent='start'
          >
            <Box className={classes.artistPic}>
              <img
                className={classes.label}
                src={props.track.img}
                alt='artist'
              />
                <audio className='audio-file' ref={audioRef}>
                   <source    src={props.track.track}></source>
                </audio>
              <IconButton
                className={classes.playPause}
                onClick={() => !isPlayed ? start() : pause() }
              >
                 
                {isPlayed === true ? (
                  <PauseIcon 
                    className={classes.playIcon}
                    fontSize='medium'
                />
                ) : (
                    <PlayArrowIcon
                      className={classes.playIcon}
                      fontSize='medium'
                    />
                )}
                  
              </IconButton>
            </Box>
              <Box className={classes.musicInfo}>
                <Link 
                    href='#'
                    className={classes.songName}
                    variant='h5'
                    underline='none'
                  >{props.track.title}
                </Link>
                <Typography
                    className={classes.singer}
                    variant='subtitle1'
                 >{props.track.singer}
                </Typography>
              </Box>
          </Box>
            <Slider 
              className={classes.slide} 
              value={progress}
              onChange={handleChangeTrack}
            />
        </Box>
        <Box 
          className={classes.timeAndVolume}
          display='flex'
          justifyContent='flex-end'
          alignItems='end'

        >
          <Box>
            <Typography className={classes.timer}>
                {currentTime  ?  parseTime(currentTime) : '00:00'} /&nbsp;
                {trackDuration  ?  parseTime(trackDuration) : '00:00'}
            </Typography>
            <Slider 
              className={classes.volumeSlide}
              value={value}
              onChange={handleChangeVolume}
            />
          </Box>
        </Box>
      </Grid>
  )
}

export default Track