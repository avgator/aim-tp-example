import { Box, Button, CircularProgress, Grow, Paper, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetSourcesCategoriesQuery } from "../../features/api/sources";
import { CategoryCard, CategoriesPage, DataStructures, MainLabel } from "../shared/styles";
import { JSONtheme } from "../shared/constants";
import { JSONTree } from 'react-json-tree';

type RoomSources = {
    room: string,
    category: string
}

function Categories() {
    //Parsing our URI for variables
    const loc = location.pathname.split("/");
    const {data : categoriesImport = [], isFetching: categoriesFetching, isError: categoriesError } = useGetSourcesCategoriesQuery();
    const [checked, setChecked] = React.useState(true);
    const endpointURI = "/external/sources/categories/list/"
    const navigate = useNavigate();
    const navigateIntoSources = React.useCallback((s: RoomSources) => navigate('/sources/' + s.room + '/' + s.category + '/'), [navigate]);
    const navigateIntoRooms = React.useCallback(() => navigate('/rooms/', { replace: true }),  [navigate]);
    const navigateIntoLogin = React.useCallback(() => navigate('/'), [navigate]);
    const currentURLString = localStorage.getItem("api");
    const changeAIMURL = () => {
      localStorage.removeItem("api");
      navigateIntoLogin();
    }

    const handleSourceClick = (categoryName: string) => {
        navigateIntoSources({room: decodeURI(loc[2]), category: categoryName})
    }

    //Simple check for variables presented in URI
    const checkLocationVariables = () => {
        if (loc.length == 4) {
          return !(loc[2].length > 0)
        } else {
          return true
        }
    }

    //Card element on the main panel
    const icon = (categoryName: string) => {
        return <Paper sx={{ m: 1, width: 250, height: 100, cursor: 'pointer' }} 
                      elevation={2}
                      onClick={() => handleSourceClick(categoryName)}
                      >
                        <CategoryCard>
                        {categoryName}
                        </CategoryCard>
                </Paper>
      };

    return (
        <React.Fragment>
        {        
        categoriesFetching ? <Box sx={{ display: 'flex', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress  color="inherit"/>
                              </Box> :
         categoriesError ? <Box sx={{ display: 'flex', flexFlow:'column', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
                             <MainLabel>
                                Error obtained while resolving categories<br/>
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
        categoriesImport != null && categoriesImport.length == 0 ? <Box sx={{ display: 'flex', flexFlow: 'column', height: '100%',  justifyContent: 'center', alignItems: 'center'}}>
            
                            <MainLabel>
                                No categories presented<br/>
                                Current AIM URL is {currentURLString}. &nbsp;
                              <span style={{color: '#039be5', cursor: 'pointer', borderBottom: '2px dotted #039be5'}} onClick={() => changeAIMURL()}>
                                Change it?
                              </span>
                            </MainLabel>
                            <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                                      onClick={() => navigateIntoRooms()}>
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
                                  <p style={{marginLeft: '3px', marginRight: '3px'}}>Get categories list by accessing endpoint<br/>
                                  <span style={{color: '#039be5', fontSize: '18px', marginLeft: '3px', marginRight: '3px'}}>
                                        {currentURLString + endpointURI}
                                  </span>
                                  </p>
                                  <div style={{width: '390px', maxHeight: '800px', overflowY: 'auto', margin: 'auto'}}>
                                  <JSONTree hideRoot={true} theme={JSONtheme} data={categoriesImport}/>
                                  </div>
                                  <Button variant="outlined" 
                                      sx={{marginTop: 2, marginBottom: 2, width: 300, height: 56}}
                                      onClick={() => navigateIntoRooms()}>
                                        Back
                                  </Button>
                                </DataStructures>
                                <div style={{height: '95vh', maxHeight: '95vh', position: 'absolute', top: 10, left: 440, display: 'flex', flexFlow: 'column',}}>
                                {categoriesImport.map((category) => {
                                    return <Box key={category.label}><Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>{icon(category.label)}</Grow></Box>
                                })}
                                
                                </div>
                          </div>
                        </React.Fragment>
        }
        </React.Fragment>
    )
}

export default Categories;