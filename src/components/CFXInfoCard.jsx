import React from 'react';
import InformationCard from '@bit/clui.nui-ui.ui.common.information-card';
import Box from '@bit/clui.nui-ui.ui.common.box';
import Typography from '@bit/clui.nui-ui.ui.common.typography';
import ThemeProvider from '@bit/clui.nui-ui.themes.prepl';

export default function CFXInfoCard(props) {
    return (
        <ThemeProvider>
            <InformationCard bgcolor="lightgrey">
                <Box p={5}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        textTransform="uppercase"
                    >
                        {props.ip}
                    </Typography>
                    <Typography>
                        Players: {props.clients}/{props.maxclients}
                    </Typography>
                    <Typography>Server OS: {props.os}</Typography>
                    <Typography>OneSync Enabled: {props.onesync}</Typography>
                    <Typography>
                        Server Owner:&nbsp;
                        <a href={props.profileurl}>{props.profilename}</a>
                    </Typography>
                    <center>
                        <img
                            className="pfp"
                            src={props.profilepic}
                            alt={props.profilename}
                        ></img>
                    </center>
                </Box>
            </InformationCard>
        </ThemeProvider>
    );
}
