import React, { useState } from 'react'
import List from '@mui/material/List';
import { ListItem, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import Details from './Details';
import Switch from '@mui/material/Switch';
const black = { borderBottom: '.7px solid rgba(76,89,118,.2)', "&:hover": { cursor: 'pointer' }, backgroundColor: '#34495e', color: 'white' }
const white = { borderBottom: '.7px solid rgba(76,89,118,.2)', "&:hover": { cursor: 'pointer', backgroundColor: '#ecf0f1 !important' } }
export default function SearchBox({ searchHandler, searchValue, resetSearchHandler, datas, selectHandler, selectedMode, pType, address }) {
    const [toggleTheme, setToggleTheme] = useState(true)

    const switchHandler = (e) => {
        setToggleTheme(p => !toggleTheme)
    }
    console.log(toggleTheme)
    return <Box display="flex" flexDirection="column" position="relative">
        <TextField id="outlined-basic" variant="outlined" placeholder='search Location' value={searchValue} onChange={searchHandler} />
        {searchValue && <Box position="absolute" right="10px" top="15px">
            <CloseIcon onClick={resetSearchHandler} sx={{ "&:hover": { cursor: 'pointer' } }} />
        </Box>}
        {(datas && datas.length) && !selectedMode && searchValue ? <List sx={{ boxShadow: '3px 4px 10px -4px rgb(0 0 0 / 35%)', overflow: "auto", height: '400px' }} >

            <Switch onChange={switchHandler} checked={toggleTheme} />
            {
                datas.map(data => <ListItem key={data.id} sx={toggleTheme ? black : white}
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
        </List> : null
        }
        <Details pType={pType} address={address} />
    </Box >
}
