import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Map from './Map';
import SearchBox from './SearchBox';
import { useEffect } from 'react';

export default function App() {

  const [position, setPosition] = useState([51.505, -0.09])
  const [searchValue, setSearchValue] = useState('')
  const [datas, setDatas] = useState([])
  const [selectedMode, setSelectedMode] = useState(false)
  const [pType, setPType] = useState('')
  const [address, setAddress] = useState('')
  useEffect(() => {
    if (searchValue) {
      fetch(`https://barikoi.xyz/v1/api/search/autocomplete/MzY1MzpJS1hOMDRKWjFS/place?q=${searchValue}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          setDatas(response.places)
        }
        )
    }
  }, [searchValue])


  const selectHandler = (value) => {
    const { latitude, longitude, address, pType } = value
    setSearchValue(address)
    setSelectedMode(true)
    setPosition([latitude, longitude])
    setPType(pType)
    setAddress(address)
  }
  const searchHandler = (e) => {
    if (selectedMode) {
      setSelectedMode(false)
    }
    setSearchValue(e.target.value)

  }

  const resetSearchHandler = () => {
    setSearchValue('')
    setAddress('')
    setPType('')
  }
  console.log(datas)
  return <Box sx={{ flexGrow: 1 }} height="100vh">
    <Grid container spacing={2}>
      <Grid item xs={5} height="100vh">
        <SearchBox searchHandler={searchHandler}
          resetSearchHandler={resetSearchHandler}
          datas={datas}
          searchValue={searchValue}
          selectedMode={selectedMode}
          selectHandler={selectHandler}
          pType={pType}
          address={address}
        />
        {/* <Box display="flex" flexDirection="column" position="relative">
          <TextField id="outlined-basic" variant="outlined" placeholder='search Location' value={searchValue} onChange={searchHandler} />
          {searchValue && <Box position="absolute" right="10px" top="15px">
            <CloseIcon onClick={resetSearchHandler} sx={{ "&:hover": { cursor: 'pointer' } }} />
          </Box>}
          {(datas && datas.length) && !selectedMode && searchValue ? <List sx={{ boxShadow: '3px 4px 10px -4px rgb(0 0 0 / 35%)', overflow: "auto", height: '400px' }} >
            {
              datas.map(data => <ListItem key={data.id} sx={{ borderBottom: '.7px solid rgba(76,89,118,.2)', "&:hover": { cursor: 'pointer', backgroundColor: '#ecf0f1' } }}
                onClick={() => selectHandler(data)}
              >
                <Box>
                  <LocationOnIcon />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Box>
                    <Typography fontWeight="600">{data.address}</Typography>
                    <Typography fontWeight="200">{data.area}</Typography>


                    <span style={{ backgroundColor: 'rgba(69,79,99,.08)', borderRadius: '4px', fontSize: '14px', fontWeight: '200', opacity: '0.9', display: "inline-block", padding: '3px 3px' }}>{data.pType}</span>
                  </Box>
                </Box>
              </ListItem>)
            }
          </List> : null}

        </Box> */}

      </Grid>
      <Grid item xs={7}>
        <Map position={position} pType={pType} />
      </Grid>

    </Grid>
  </Box>
}
