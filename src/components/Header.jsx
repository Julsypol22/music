import {  makeStyles } from "@material-ui/core";
import  Typography  from '@material-ui/core/Typography'
import  Container  from '@material-ui/core/Container'
import  AppBar  from '@material-ui/core/AppBar'
import  Box  from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase';
import { useState } from "react";
import { songsData } from "../Songs/songsData";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'purple',
    padding: 10,
    
  },
  logo: {
    color: '#98ee0d'
  },
  searchBox: {
    backgroundColor:'#fff',
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 2,
  },
}))

function Header(props) {

  const [searchInput, setSearchInput] = useState('')

  const classes = useStyles();

  const searchMusic = (searchValue) => {
    setSearchInput(searchValue)
    
    if (searchValue !== '') {
        const filteredData = songsData.filter((item) => {
            return item.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        props.setFilteredResults(filteredData)
    }
    else{
        props.setFilteredResults(songsData)
    }
  }

  return (
    <AppBar
      className={classes.header}
      position= 'static'
    >
      <Container maxWidth='lg'>
        <Box 
          display='flex' 
          justifyContent='space-between'>
          <Box className={classes.logoBox}>
            <Typography
              className={classes.logo}
              variant='h6'
              component='div'
            >CoolMusic</Typography>
          </Box>  
          <Box className={classes.search}>
            <InputBase
              value={searchInput}
              placeholder='Search track'
              className={classes.searchBox}
              onChange={(e) => searchMusic(e.target.value)}
            />
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header