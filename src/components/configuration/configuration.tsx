import { Box, Button, CircularProgress, Paper, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Configuration() {
    const [webBaseURL, setWebBaseURL] = React.useState('')
    const [fillError, setFillError] = React.useState(false)
    const [sending, setSending] = React.useState(false)
    const navigate = useNavigate();
    const navigateToRooms = React.useCallback(() => navigate('/rooms/'), [navigate]);
    
    const handleFormSubmit = () => {
        if (webBaseURL == ''){
            setFillError(true)
        } else {
            localStorage.setItem("api", webBaseURL);
            setSending(true);
                      setTimeout(() => {
                        setSending(false);
                        navigateToRooms();                
                    }, 400);

        }
    }
return(
    <div style={{display: 'flex', flexFlow:'column', alignItems: 'center', height: '95vh', maxHeight: '95vh', justifyContent: 'center'}}>
        <Paper sx={{ m: 1, width: 450, height: 350, display: 'flex', flexFlow:'column', alignItems: 'center' }} 
                  elevation={2}
                  >
                  <p style={{fontFamily: '"Roboto", sans-serif', 
                             fontWeight: 400, 
                             fontSize: '16px',
                             marginTop: '45px', 
                             letterSpacing: '0.35px', 
                             textAlign: 'center',
                             marginLeft: 20,
                             marginRight: 20}} >
                    Enter AIM URL below. It should looks like http://192.168.1.1:8080<br/>
                    with full protocol and port notation
                    </p>
                    <Tooltip title={"AIM URL shouldn't be empty"}
                        arrow
                        open={fillError}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener     
                        placement="left">
                  <TextField
                                  id={"webBaseURL"} 
                                  required
                                  error={fillError}
                                  sx={{marginBottom: 3, width: 313, height: 56, marginTop: 2}}
                                  label={"AIM URL"} 
                                  name={"webBaseURL"}
                                  value={webBaseURL}
                                  onChange={(e) => setWebBaseURL(e.target.value)}
                                  onFocus={() => setFillError(false)}
                              />
                </Tooltip>
                <Box sx={{ m: 1 }}>
                    <Button variant="contained" 
                                    sx={{width: 313, height: 56}}
                                    disabled={sending}
                                    onClick={() => handleFormSubmit()}
                                    >
                                    {sending ? "" : 
                                        "Proceed"}
                                    </Button>
                                    {sending && (
                                        <CircularProgress
                                        size={24}
                                        sx={{
                                            color: '#FFFFFF',
                                            position: 'absolute',
                                            top: '63%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                        />
                                        )}
                </Box>
                </Paper>
    </div>
)
};
export default Configuration;