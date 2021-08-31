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
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

import {adminPostReqHandler, getFetcher} from '../../../network';
import useSWR from 'swr';
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
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 64 * 4.5 + 8,
            width: 250,
        },
    },
};

const initState = {
    category: '',
    name: '',
    description: '',
    code: '',
    price: {
        type: 'ETH',
        amount: 0,
    },
    avatar: '',
    tags: [],
};

const constTags = ['Retro', 'Futuristic', 'Robot', 'Moonshot'];

function NewProductPage() {
    const [open, setOpen] = React.useState(true);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [newProduct, setNewProduct] = React.useState(initState);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();
    const {data: categories, error} = useSWR('category', getFetcher);

    const onNew = () => {
        setLoading(true);
        adminPostReqHandler('product/new', newProduct)
            .then((result) => {
                setSnackbarOpen(true);
                setLoading(false);
                setNewProduct(initState);
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
                title={'New Product'}
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
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    className={classes.form}
                                    required
                                    label="Type"
                                    placeholder="Enter product category"
                                    variant="outlined"
                                    value={newProduct.category}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            category: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {(categories && categories.success
                                        ? categories.data
                                        : []
                                    ).map((c) => (
                                        <MenuItem value={c.category_id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div className={classes.formControl}>
                                <TextField
                                    className={classes.form}
                                    required
                                    id="outlined-required"
                                    label="Name"
                                    placeholder="Enter product name"
                                    variant="outlined"
                                    value={newProduct.name}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
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
                                    id="outlined-required"
                                    label="Code  or db id if empty"
                                    placeholder="Enter product code or db id"
                                    variant="outlined"
                                    value={newProduct.code}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            code: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>{' '}
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <TextField
                                    type="number"
                                    className={classes.form}
                                    id="outlined-required"
                                    label="Price in eth"
                                    placeholder="Enter product price"
                                    variant="outlined"
                                    value={newProduct.price.amount}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            price: {
                                                ...newProduct.price,
                                                amount:
                                                    e.target.value > 0
                                                        ? e.target.value
                                                        : 0,
                                            },
                                        })
                                    }
                                />
                            </FormControl>{' '}
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <TextField
                                    className={classes.form}
                                    required
                                    id="outlined-required"
                                    label="Description"
                                    placeholder="Enter product description"
                                    variant="outlined"
                                    value={newProduct.description}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel id="demo-mutiple-checkbox-label">
                                    Tag
                                </InputLabel>
                                <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={newProduct.tags}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            tags: e.target.value,
                                        })
                                    }
                                    input={<Input />}
                                    renderValue={(selected) => (
                                        <div
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {(selected as string[]).map(
                                                (value) => (
                                                    <Chip
                                                        label={value}
                                                        className={classes.chip}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {constTags.map((value) => (
                                        <MenuItem key={value} value={value}>
                                            <Checkbox
                                                checked={
                                                    newProduct.tags.indexOf(
                                                        value
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={value} />
                                        </MenuItem>
                                    ))}
                                </Select>
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
                            New product successfully created!
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <NewProductPage />;
}
