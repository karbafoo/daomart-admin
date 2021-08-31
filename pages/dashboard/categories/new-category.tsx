import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {DrawerComponent} from '../../../components/Drawer.component';
import {StatusBarComponent} from '../../../components/StatusBar.component';
import {makeStyles, Paper, Divider} from '@material-ui/core';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

import {adminPostReqHandler} from '../../../network';
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
});

const initState = {
    type: '',
    name: '',
    description: '',
    avatar: '',
    tags: [],
};

function NewCategoryPage() {
    const [open, setOpen] = React.useState(true);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [newCat, setNewCat] = React.useState(initState);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();

    const onNew = () => {
        setLoading(true);
        adminPostReqHandler('category/new', newCat)
            .then((result) => {
                setSnackbarOpen(true);
                setLoading(false);
                setNewCat(initState);
                console.log('result', result);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />

            <StatusBarComponent
                open={open}
                toggleDrawer={toggleDrawer}
                title={'New Category'}
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
                            <div className={classes.formControl}>
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: 128,
                                            width: 128,
                                            border: '1px solid grey',
                                        }}
                                    ></div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload Photo
                                        <input type="file" hidden />
                                    </Button>
                                </div>
                            </div>
                            <Divider />

                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    className={classes.form}
                                    required
                                    label="Type"
                                    placeholder="Enter category type"
                                    variant="outlined"
                                    value={newCat.type}
                                    onChange={(e) =>
                                        setNewCat({
                                            ...newCat,
                                            type: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Merch'}>Merch</MenuItem>
                                    <MenuItem value={'NFT'}>NFT</MenuItem>
                                    <MenuItem value={'Kudos'}>Kudos</MenuItem>
                                </Select>
                            </FormControl>

                            <div className={classes.formControl}>
                                <TextField
                                    className={classes.form}
                                    required
                                    id="outlined-required"
                                    label="Name"
                                    placeholder="Enter category name"
                                    variant="outlined"
                                    value={newCat.name}
                                    onChange={(e) =>
                                        setNewCat({
                                            ...newCat,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <TextField
                                    className={classes.form}
                                    required
                                    id="outlined-required"
                                    label="Description"
                                    placeholder="Enter category description"
                                    variant="outlined"
                                    value={newCat.description}
                                    onChange={(e) =>
                                        setNewCat({
                                            ...newCat,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <TextField
                                    className={classes.form}
                                    id="outlined-required"
                                    label="Tags"
                                    placeholder="tags..."
                                    variant="outlined"
                                    value={newCat.tags}
                                    onChange={(e) =>
                                        setNewCat({
                                            ...newCat,
                                            tags: e.target.value,
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
                                <Button
                                    disabled={loading}
                                    onClick={onNew}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    Create
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

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity="success"
                        >
                            New category successfully created!
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <NewCategoryPage />;
}
