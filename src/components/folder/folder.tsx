import { Box, Button, CircularProgress, Grow, Paper, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DataStructures, MainLabel, RoomCard } from "../shared/styles";
import { JSONtheme } from "../shared/constants";
import { JSONTree } from 'react-json-tree';
import { channel, useGetChannelsFoldersQuery } from "../../features/api/channels";

type channelDetails = {
    name: string, 
    icon: string | null,
}
function Folder() {
    //Parsing our URI for variables
    const loc = location.pathname.split("/");
    const endpointURIChannels = "/external/channels/folders/"   
    const {data: channelsImport = [], isFetching: channelsFetching, isError: channelsError} = useGetChannelsFoldersQuery();
    const [channels, setChannels] = React.useState<channel[]>([])
    const [checked, setChecked] = React.useState(true);
    const [media, setMedia] = React.useState<string>('');
    const navigate = useNavigate();
    const navigateIntoTags = React.useCallback(() => navigate('/tags/'+ loc[4] + '/' + loc[5] + '/' + loc[6] + '/', { replace: true }),  [navigate]);
    const navigateIntoRooms = React.useCallback(() => navigate('/rooms/', { replace: true }),  [navigate]);
    const navigateIntoLogin = React.useCallback(() => navigate('/'), [navigate]);
    const currentURLString = localStorage.getItem("api");
    const changeAIMURL = () => {
      localStorage.removeItem("api");
      navigateIntoLogin();
    }

    //Simple check for variables presented in URI
    const checkLocationVariables = () => {
        if (loc.length === 8) {
          return !(loc[2].length > 0 && loc[3].length > 0 && loc[4].length > 0&& loc[5].length > 0&& loc[6].length > 0)
        } else {
          return true
        }
    }

    const filterFoldersArray = () => {
        let filteredChannelFolder = channelsImport.filter(channelFolder => {
            if (channelFolder.referenceName === loc[2])
               return (
                channelFolder
                 )
             }
        )
        return filteredChannelFolder
    }


    React.useEffect(() =>{
        if (channelsImport != null) {
            let filteredChannelFolder = channelsImport.filter(channelFolder => {
                if (channelFolder.referenceName === loc[2])
                   return (
                    channelFolder.includedChannels
                     )
                 }
            )

            if(filteredChannelFolder.length > 0 && filteredChannelFolder[0].includedChannels != null){
                setMedia(filteredChannelFolder[0].mediaURL)
                let c = decodeURI(loc[3])
                let channels = filteredChannelFolder[0].includedChannels.filter(ch => {
                    if (ch.category.includes(c)) return (ch)
                        }
                    )
                setChannels(channels)
            }



        }            
    }, [channelsImport ])

    //Card element on the main panel
    const icon = (s: channelDetails) => {
        return <Paper sx={{ m: 1, width: 250, height: 250, cursor: 'pointer' }} 
                      elevation={2}
                      >
                        <RoomCard>
                        <img 
            src={`${media + s.icon}?w=24&fit=crop&auto=format`}
            srcSet={`${media + s.icon}?w=24&fit=crop&auto=format&dpr=2 2x`}
            alt='logo'
            loading="lazy"
            style={{maxWidth: '60px'}} 
            />
                            {s.name}
                        </RoomCard>
                </Paper>
    };

    return (
        <React.Fragment>
        {channelsFetching ? <Box sx={{ display: 'flex', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress  color="inherit"/>
                              </Box> :
         channelsError ? <Box sx={{ display: 'flex',  flexFlow: 'column', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                             <MainLabel>
                                Error obtained while resolving channels<br/>
                                Current AIM URL is {currentURLString}. &nbsp;
                              <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                                Change it?
                              </span>
                             </MainLabel>
                             <Button variant="outlined" 
                    sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                    onClick={() => navigateIntoRooms()}>
                      Home
                             </Button>
                        </Box> :
                        checkLocationVariables() ?
                        <Box sx={{ display: 'flex', flexFlow: 'column', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
          
                          <MainLabel>
                              Something went wrong<br/>
                              Current AIM URL is {currentURLString}. &nbsp;
                            <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                              Change it?
                            </span>
                          </MainLabel>
                          <Button variant="outlined" 
                                    sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                                    onClick={() => navigateIntoRooms()}>
                                      Home
                          </Button>
              
                      </Box>
                      :
        channels.length == 0 ? <Box sx={{ display: 'flex', height: '100%', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <MainLabel>
                                No channels presented
                            </MainLabel>
                            <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                                      onClick={() => navigateIntoTags()}>
                                        Back
                              </Button>
                        </Box>
                        
                          :
                          <React.Fragment>
                          <div style={{display: 'flex', flexFlow: 'row'}}>
                          <DataStructures>
                                  <Tooltip title={"Click to change AIM base URL"}>
                                    <p style={{marginLeft: '3px', marginRight: '3px', fontFamily: '"Roboto", sans-serif', fontWeight: 100, fontSize: '16px', color: '#8E8E93'}}>
                                      AIM URL is  &nbsp;
                                                  <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                                                  {currentURLString}
                                                  </span>
                                      </p>
                                  </Tooltip>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get channel's folders array by accessing endpoint<br/>
                                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURIChannels}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={channelsImport}/>
                                  </div>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Filter obtained array with given folder's reference name<br/>
                                  <span style={{color: 'red'}}>
                                        {loc[2]}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={filterFoldersArray()}/>
                                  </div>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Filter channel's array category with given tag<br/>
                                  <span style={{color: 'red'}}>
                                        {decodeURI(loc[3])}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={channels}/>
                                  </div>
                                  <div style={{display: 'flex', marginLeft: 5, marginRight: 5, flexFlow: 'row', justifyContent: 'space-between'}}>
                                  <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 150, height: 56}}
                                      onClick={() => navigateIntoTags()}
                                      >
                                        Back
                                  </Button>
                                  <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 150, height: 56}}
                                      onClick={() => navigateIntoRooms()}
                                      >
                                        Home
                                  </Button>
                                  </div>
                                </DataStructures>
                                <div style={{height: '95vh', maxHeight: '95vh', position: 'absolute', top: 10, left: 440, display: 'flex', flexFlow: 'row',}}>
                                {channels.map((channel) => {
                                    return <Box key={channel.referenceName}><Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>{icon({name: channel.referenceName, icon: channel.icon})}</Grow></Box>
                                })}
                                
                                </div>
                          </div>
                        </React.Fragment>
        }
        </React.Fragment>
    )
}

export default Folder;