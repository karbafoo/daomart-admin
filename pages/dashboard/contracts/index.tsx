import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {DrawerComponent} from '../../../components/Drawer.component';
import {StatusBarComponent} from '../../../components/StatusBar.component';
import {makeStyles} from '@material-ui/core';
import {adminPostReqHandler, getFetcher} from '../../../network';
import useSWR from 'swr';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import {ethers} from 'ethers';
import {Paper, Divider} from '@material-ui/core';
import {GitcoinContext} from '../../../store';
import Web3 from 'web3';
import {deployContract} from '../../../contracts';
declare const window: any;
function createData(
    name: string,
    description: string,
    avatar: string,
    productCount: number
) {
    return {name, description, avatar, productCount};
}
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    form: {
        width: '100%',
    },
    formControl: {
        width: '100%',

        margin: '0.5rem 0',
    },
    input: {
        width: '100%',
    },
    proggressBar: {},
    chip: {
        margin: '0 0.375rem',
    },
});
function ContractContent() {
    const {state, dispatch} = React.useContext(GitcoinContext);
    const [candyContract, setCandyContract] = React.useState({
        address: '',
        chain: state.chain_id,
    });
    const [moonshotContract, setMoonshotContract] = React.useState({
        address: '',
        chain: state.chain_id,
    });
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();

    React.useEffect(() => {
        console.log('state.chain_id', state.chain_id);
        adminPostReqHandler('contract', {chain: state.chain_id})
            .then((data) => {
                const d = data && data.success ? data.data : {};

                if (d['candy']) {
                    setCandyContract(d['candy']);
                }
                if (d['moonshot']) {
                    setMoonshotContract(d['moonshot']);
                }
            })
            .catch(console.log);
    }, []);

    const onUpdateCandyContract = () => {
        setLoading(true);

        adminPostReqHandler('contract/candy', {
            address: candyContract.address,
            chain: state.chain_id,
        })
            .then((result) => {
                console.log('result', result);
                setSnackbarOpen(true);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    const onUpdateMoonshotContract = () => {
        setLoading(true);

        adminPostReqHandler('contract/moonshot', {
            address: moonshotContract.address,
            chain: state.chain_id,
        })
            .then((result) => {
                console.log('result', result);
                setSnackbarOpen(true);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleAccountsChanged = (accounts: string[]) => {
        dispatch({
            type: 'SET_WALLETS',
            payload: accounts,
        });
        let myweb3: any = new Web3(window.ethereum);

        dispatch({
            type: 'SET_PROVIDER',
            payload: myweb3.currentProvider,
        });
    };

    const handleChainChanged = (chainId: number) => {
        dispatch({
            type: 'SET_CHAIN_ID',
            //@ts-ignore
            payload: parseInt(chainId, 16).toString(),
        });
    };
    const _stup = async () => {
        if (!window.ethereum) {
            return;
        }
        let myweb3: any = new Web3(window.ethereum);
        const accounts = window.ethereum
            .request({
                method: 'eth_accounts',
            })
            .then(handleAccountsChanged)
            .catch((err: any) => console.error(err));
        //@ts-ignore
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        window.ethereum.on('chainChanged', handleChainChanged);

        // let myweb3: any = new Web3(window.ethereum);

        dispatch({
            type: 'SET_CHAIN_ID',
            payload: (await myweb3.eth.net.getId()).toString(),
        });
    };

    React.useEffect(() => {
        let myweb3: any = new Web3(window.ethereum);
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            'any'
        );
        dispatch({
            type: 'SET_PROVIDER',
            payload: myweb3.currentProvider,
        });
        _stup();

        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener(
                    'accountsChanged',
                    handleAccountsChanged
                );
                window.ethereum.removeListener(
                    'chainChanged',
                    handleChainChanged
                );
            }
        };
    }, []);

    const onRedeploy = (name: string, args: any[]) => {
        deployContract(state.chain, name, args)
            .then((res) => {
                console.log('deploy res', res);

                if (name === 'Candy') {
                    setCandyContract({...candyContract, address: res});
                    onUpdateCandyContract();
                } else {
                    setMoonshotContract({...moonshotContract, address: res});
                    onUpdateMoonshotContract();
                }
            })
            .catch(console.log);
    };
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />

            <StatusBarComponent
                open={open}
                toggleDrawer={toggleDrawer}
                title={'Products'}
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
                    <Paper style={{padding: 16}}>
                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                        >
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <TextField
                                    id="demo-simple-select-outlined"
                                    className={classes.form}
                                    required
                                    label="   Candy Contract"
                                    variant="outlined"
                                    value={candyContract.address}
                                    onChange={(e) =>
                                        setCandyContract({
                                            ...candyContract,
                                            candyContract: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>

                            <div
                                className={classes.formControl}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <p>{`CHAIN: ${candyContract.chain}`}</p>
                                <Button
                                    disabled={loading}
                                    onClick={() =>
                                        onRedeploy('Candy', ['Candy', 'RWD'])
                                    }
                                    variant="contained"
                                    component="label"
                                    color="secondary"
                                    style={{margin: '0 1rem'}}
                                >
                                    Redeploy
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.proggressBar}
                                        />
                                    )}
                                </Button>

                                <Button
                                    disabled={loading}
                                    onClick={() => onUpdateCandyContract()}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    UPDATE ADDRESS
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.proggressBar}
                                        />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Paper>

                    <Paper style={{padding: 16, marginTop: 32}}>
                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                        >
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <TextField
                                    id="demo-simple-select-outlined"
                                    className={classes.form}
                                    required
                                    label="   MoonshotBot Contract"
                                    variant="outlined"
                                    value={moonshotContract.address}
                                    onChange={(e) =>
                                        setMoonshotContract({
                                            ...moonshotContract,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>

                            <div
                                className={classes.formControl}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <p>{`CHAIN: ${moonshotContract.chain}`}</p>
                                <Button
                                    disabled={loading}
                                    onClick={() =>
                                        onRedeploy('Moonshot', [
                                            candyContract.address,
                                        ])
                                    }
                                    variant="contained"
                                    component="label"
                                    color="secondary"
                                    style={{margin: '0 1rem'}}
                                >
                                    Redeploy
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.proggressBar}
                                        />
                                    )}
                                </Button>

                                <Button
                                    disabled={loading}
                                    onClick={() => onUpdateMoonshotContract()}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    UPDATE ADDRESS
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.proggressBar}
                                        />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </Container>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity="success"
                    >
                        New product successfully created!
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Dashboard() {
    return <ContractContent />;
}
