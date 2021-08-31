import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {DrawerComponent} from '../../components/Drawer.component';
import {StatusBarComponent} from '../../components/StatusBar.component';

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />

            <StatusBarComponent
                open={open}
                toggleDrawer={toggleDrawer}
                title={'Dashboard'}
            />
            <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
            <Box
                component="main"
                style={{
                    backgroundColor: '#babcbf',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" style={{marginTop: '5rem'}}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                style={{
                                    padding: 16,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 160,
                                }}
                            >
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                style={{
                                    padding: 16,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 160,
                                }}
                            >
                                <Deposits />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper
                                style={{
                                    padding: 16,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 650,
                                }}
                            >
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
