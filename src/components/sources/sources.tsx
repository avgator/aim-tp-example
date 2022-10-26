import React, { ReactChild } from 'react';
import { assignmentsStatus, useGetRoomsAssignmentsQuery } from '../../features/api/rooms';
import { RoomCard, DataStructures, MainLabel } from '../shared/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { JSONTree } from 'react-json-tree';
import { Button, Grow, Tooltip } from '@mui/material';
import { JSONtheme } from '../shared/constants';
import { source, useGetSourcesQuery } from '../../features/api/sources';

type sourceDetails = {
    name: string, 
    icon: string | null,
    controlPage: string | null,
}

type tagDetails = {
  room: string, 
  category: string,
  controlPage: string,
}

function Sources() {
  //Parsing our URI for variables
  const loc = location.pathname.split("/")
  const {data : sourcesImport = [], isFetching: sourcesFetching, isError: sourcesError } = useGetSourcesQuery();
  const {data : assignmentsImport = [], isFetching: assignmentsFetching, isError: assignmentsError } = useGetRoomsAssignmentsQuery();
  const [sources, setSources] = React.useState<source[]>([])
  const [filteredAssignments, setFilteredAssignments] = React.useState<assignmentsStatus[]>([])
  const endpointURIAssignments = "/external/assignments/rooms/"
  const endpointURISources = "/external/sources/categories/list/"
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();
  const navigateIntoCategories = React.useCallback((s:string) => navigate('/categories/' + s + '/'), [navigate]);
  const navigateIntoTags = React.useCallback((s:tagDetails) => navigate('/tags/'+ s.controlPage + '/' + s.room + '/' + s.category + '/'), [navigate]);
  const navigateIntoRooms = React.useCallback(() => navigate('/rooms/', { replace: true }),  [navigate]);
  const navigateIntoLogin = React.useCallback(() => navigate('/'), [navigate]);
  const currentURLString = localStorage.getItem("api");
  const changeAIMURL = () => {
    localStorage.removeItem("api");
    navigateIntoLogin();
  }
  //Searching for the room's assignments in the rooms array by room's reference name
  //which should be uniq
  function findAssignmentByRoom(r: string) {
    let res = assignmentsImport.find((element) => {
        return (element.referenceName === r);
      })
    return res
  }

  React.useEffect(() => {
    //If we got all the data we need...
    if (assignmentsImport != null && sourcesImport != null) {
        let a = findAssignmentByRoom(loc[2])
        let array:source[] = []
        if (a != undefined) {
            //Searching for non-null assignments of the selected room
            let filteredData = a.assignments.filter(sourceAssignment => {
                if (sourceAssignment.status != null && sourceAssignment.status != '') 
                   return (
                    sourceAssignment
                     )
                 }
            )
            if (filteredData.length > 0 ) {
              //For demo purpose only
              setFilteredAssignments(filteredData)
                //Filtering non-null assignments of the selected room by selected tag
                filteredData.forEach((element) =>{
                    let ss = sourcesImport.filter(s => {
                        if (s.category.includes(loc[3]) && s.referenceName === element.referenceName)
                        return (
                            s
                        )
                    })
                    if (ss.length > 0){
                        array.push(ss[0])
                    }
                } )
            }

        }
        //Setting resulting array
        setSources(array)
    }
  }, [sourcesFetching, assignmentsFetching]);
  
  //Simple check for variables presented in URI
  const checkLocationVariables = () => {
    if (loc.length === 5) {
      return !(loc[2].length > 0 && loc[3].length > 0)
    } else {
      return true
    }
  }

  const handleBackClick = () => {
    navigateIntoCategories(loc[2])
  }

  const handleSourceClick = (cp: string | null) => {
      if (!cp) {
        cp = ''
      }
      navigateIntoTags({room: loc[2], category: loc[3], controlPage: cp})
  }
  //Card element on the main panel
  const icon = (s: sourceDetails) => {
    return <Paper sx={{ m: 1, width: 250, height: 250, cursor: 'pointer' }} 
                  elevation={2}
                  onClick={() => handleSourceClick(s.controlPage)}
                  >
                    <RoomCard>
                    <img 
        src={`${s.icon}?w=24&fit=crop&auto=format`}
        srcSet={`${s.icon}?w=24&fit=crop&auto=format&dpr=2 2x`}
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
        {
        sourcesFetching || assignmentsFetching ? <Box sx={{ display: 'flex', height: '100%',  justifyContent: 'center', alignItems: 'center'}}><CircularProgress  color="inherit"/></Box> :
         sourcesError || assignmentsError ? <Box sx={{ display: 'flex',  flexFlow: 'column', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                             <MainLabel>
                                Error obtained while resolving room assignments<br/>
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
        sources.length === 0 ? <Box sx={{ display: 'flex', height: '100%', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <MainLabel>
                                No sources presented for selected room
                            </MainLabel>
                            <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                                      onClick={() => handleBackClick()}>
                                        Back
                              </Button>
                        </Box>  :

        <React.Fragment>
          <div style={{display: 'flex', flexFlow: 'row'}}>
            <DataStructures>      <div style={{maxHeight: '800px', overflowY: 'auto'}}>
                                  <Tooltip title={"Click to change AIM base URL"}>
                                    <p style={{marginLeft: '3px', marginRight: '3px', fontFamily: '"Roboto", sans-serif', fontWeight: 100, fontSize: '16px', color: '#8E8E93'}}>
                                      AIM URL is  &nbsp;
                                                  <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                                                  {currentURLString}
                                                  </span>
                                      </p>
                                  </Tooltip>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get room assignments by accessing endpoint<br/>
                                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURIAssignments}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={assignmentsImport}/>
                                  </div>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Filter assignments array by provided room<br/>
                                  <span style={{color: 'red'}}>{loc[2]}</span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={findAssignmentByRoom(loc[2])}/>
                                  </div>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Filter room assignments by <br/>
                                  status, which should be equal to <span style={{color: 'red'}}>
                                    view
                                    </span>
                                    &nbsp;or&nbsp;
                                    <span style={{color: 'red'}}>
                                      control
                                    </span> 
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={filteredAssignments}/>
                                  </div>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get sources by accessing endpoint<br/>
                                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURISources}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={sourcesImport}/>
                                  </div>
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Find intersection between filtered<br/>room's assignments and sources</p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={sources}/>
                                  </div>
                                  </div>
                                  <div style={{display: 'flex', marginLeft: 5, marginRight: 5, flexFlow: 'row', justifyContent: 'space-between'}}>
                                  <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 150, height: 56}}
                                      onClick={() => handleBackClick()}>
                                        Back
                                  </Button>
                                  <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 150, height: 56}}
                                      onClick={() => navigateIntoRooms()}>
                                        Home
                                  </Button>
                                  </div>
            </DataStructures>
                <div style={{height: '95vh', maxHeight: '95vh', position: 'absolute', top: 10, left: 440}}>
                    {sources.map((source) => {
                                return <Box key={source.referenceName} sx={{display: 'inline-block', margin: 'auto'}}><Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>{icon({name: source.referenceName,
                                                                                                                                                                                        icon: source.iconURL,
                                                                                                                                                                                        controlPage: source.controlPage})}</Grow></Box>
                    })}
                </div>
          </div>
        </React.Fragment>
        }
        
     </React.Fragment>
  
  );
}

export default Sources;