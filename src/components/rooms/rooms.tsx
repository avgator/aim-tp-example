import React, { ReactChild } from 'react';
import { useGetRoomsQuery } from '../../features/api/rooms';
import { RoomCard, DataStructures, MainLabel } from '../shared/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import  {JSONtheme}  from '../shared/constants';
import { JSONTree } from 'react-json-tree';
import { Grow, Tooltip } from '@mui/material';


function Rooms() {
  const {data : roomsImport = [], isFetching: roomsFetching, isError: roomsError } = useGetRoomsQuery();
  const [checked, setChecked] = React.useState(true);
  const endpointURI = "/external/rooms/"
  const navigate = useNavigate();
  const navigateIntoRoom = React.useCallback((s:string) => navigate('/categories/'+ s +'/'), [navigate]);
  const navigateIntoLogin = React.useCallback(() => navigate('/'), [navigate]);
  const currentURLString = localStorage.getItem("api");
  
  const changeAIMURL = () => {
    localStorage.removeItem("api");
    navigateIntoLogin();
  }

  //Card element on the main panel
  const icon = (roomReferenceName: string) => {
    return <Paper sx={{ m: 1, width: 250, height: 250, cursor: 'pointer' }} 
                  elevation={2}
                  onClick={() => navigateIntoRoom(roomReferenceName)}
                  >
                    <RoomCard>
                    {roomReferenceName}
                    </RoomCard>
            </Paper>
  };


  return (
        <React.Fragment>
        {roomsFetching ? <Box sx={{ display: 'flex', height: '100%',  justifyContent: 'center', alignItems: 'center'}}><CircularProgress  color="inherit"/></Box> :
         roomsError ? <Box sx={{ display: 'flex', height: '100%',  flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
                             <MainLabel>
                                Error obtained while resolving rooms<br/>
                                Current AIM URL is {currentURLString}. &nbsp;
                              <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                                Change it?
                              </span>
                             </MainLabel>
                        </Box> :
        roomsImport != null && roomsImport.length == 0 ? <Box sx={{ display: 'flex', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                            <MainLabel>
                                No rooms presented<br/>
                                Current AIM URL is {currentURLString}. &nbsp;
                              <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                                Change it?
                              </span>
                            </MainLabel>
                        </Box>  :
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
                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get room list by accessing endpoint<br/>
                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURI}
                                  </span>
                  </p>
                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                  <JSONTree hideRoot={true} theme={JSONtheme} data={roomsImport}/>
                  </div>
                </DataStructures>
                <div style={{height: '95vh', maxHeight: '95vh', position: 'absolute', top: 10, left: 440}}>
                    
                    {roomsImport.map((room) => {
                                return <Box key={room.referenceName} sx={{display: 'inline-block', margin: 'auto'}}><Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>{icon(room.referenceName)}</Grow></Box>
                    })}
                </div>
          </div>
        </React.Fragment>
        }
        
     </React.Fragment>
  
  );
}

export default Rooms;