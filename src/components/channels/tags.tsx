import { Box, Button, CircularProgress, Grow, Paper, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetSourcesControlPagesQuery } from "../../features/api/sources";
import { CategoryCard, DataStructures, MainLabel } from "../shared/styles";
import { JSONtheme } from "../shared/constants";
import { JSONTree } from 'react-json-tree';
import { useGetChannelsFoldersQuery, useGetFolderTagsQuery } from "../../features/api/channels";

type TagDetails = {
    tag: string,
    folder: string
}

function Tags() {
    //Parsing our URI for variables
    let loc = location.pathname.split("/");
    const {data : controlPagesImport = [], isFetching: controlPagesFetching, isError: controlPagesError } = useGetSourcesControlPagesQuery();
    const {data: channelsImport = [], isFetching: channelsFetching, isError: channelsError} = useGetChannelsFoldersQuery();

    const [checked, setChecked] = React.useState(true);
    
    const endpointURIControlPages = "/external/assignments/rooms/"
    const endpointURIChannelFolders = "/external/channels/folders/"

    const [folder, setFolder] = React.useState<string>('');
    //It may cause a warning during the process of the folder's obtaining
    const { data: folderTagsImport = [], isFetching: folderTagsFetching, isError: isFolderTagsError} = useGetFolderTagsQuery(folder);
    const navigate = useNavigate();
    const navigateIntoSources = React.useCallback(() => navigate('/sources/' + loc[3] + '/' + loc[4] + '/'), [navigate]);
    const navigateIntoChannelFolder = React.useCallback((t: TagDetails) => navigate('/folder/'+ t.folder + '/' + t.tag + '/'
                                                                                     + loc[2] + '/' + loc[3] + '/' + loc[4] + '/', { replace: true }),  [navigate]);
    const navigateIntoLogin = React.useCallback(() => navigate('/'), [navigate]);
    const navigateIntoRooms = React.useCallback(() => navigate('/rooms/', { replace: true }),  [navigate]);
    const currentURLString = localStorage.getItem("api");
    
    const changeAIMURL = () => {
      localStorage.removeItem("api");
      navigateIntoLogin();
    }
    
    const fetching = controlPagesFetching || channelsFetching || folderTagsFetching
    const fetchError = controlPagesError || channelsError

    function findFolderByControlPage(cp: string) {
        let res = channelsImport.find((element) => {
            return (element.referenceName === cp);
          })
        return res
      }

    React.useEffect(() =>{

        if (controlPagesImport != null && channelsImport != null) {
            let loc = location.pathname.split("/")
            let ff = findFolderByControlPage(loc[2])
            if (ff != undefined) {
                setFolder(ff.referenceName)
            }
        }
      }, [controlPagesImport, channelsImport ])
    
      //Simple check for variables presented in URI
    const checkLocationVariables = () => {
        if (loc.length === 6) {
          return !(loc[2].length > 0 && loc[3].length > 0 && loc[4].length > 0)
        } else {
          return true
        }
    }

    const handleTagClick = (t: TagDetails) => {
        navigateIntoChannelFolder(t)
    }
    //Card element on the main panel
    const icon = (t: string) => {
        
        return <Paper sx={{ m: 1, width: 250, height: 100, cursor: 'pointer' }} 
                      elevation={2}
                      onClick={() => handleTagClick({folder: folder,
                                                     tag: t})}
                      >
                        <CategoryCard>
                        {t}
                        </CategoryCard>
                </Paper>
    };

    return (
        <React.Fragment>
        {fetching ? <Box sx={{ display: 'flex', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress  color="inherit"/>
                              </Box> :
        
         fetchError ? <Box sx={{ display: 'flex',  flexFlow: 'column', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                             <MainLabel>
                                Error obtained while resolving tags<br/>
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
        (folder != '' && folderTagsImport.length == 0) || (findFolderByControlPage(loc[2]) == undefined) ? <Box sx={{ display: 'flex', height: '100%', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <MainLabel>
                                No tags presented for selected folder or control page not set
                            </MainLabel>
                            <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                                      onClick={() => navigateIntoSources()}>
                                        Back
                              </Button>
                        </Box>
                        
                          :
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


                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get control pages by accessing endpoint<br/>
                                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURIControlPages}
                                  </span>

                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={controlPagesImport}/>
                                  </div>

                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get channel folders by accessing endpoint<br/>
                                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURIChannelFolders}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={channelsImport}/>
                                  </div>


                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Find channel folder in folder's array<br/> 
                                  by provided control page<br/>
                                  <span style={{color: 'red'}}>{loc[2]}</span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={findFolderByControlPage(loc[2])}/>
                                  </div>
                                  

                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get channel folder tags by folder's<br/>
                                  reference name<br/>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={folderTagsImport}/>
                                  </div>


                                  </div>
                                  <div style={{display: 'flex', marginLeft: 5, marginRight: 5, flexFlow: 'row', justifyContent: 'space-between'}}>
                                  <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 150, height: 56}}
                                      onClick={() => navigateIntoSources()}
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
                              
                                <div style={{height: '95vh', maxHeight: '95vh', position: 'absolute', top: 10, left: 440, display: 'flex', flexFlow: 'column',}}>
                                {folderTagsImport.map((tag) => {
                                    return <Box key={tag}><Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>{icon(tag)}</Grow></Box>
                                })}
                                
                                </div>
                          </div>
                        </React.Fragment>
        }
        </React.Fragment>
    )
}

export default Tags;