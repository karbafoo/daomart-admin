import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {DrawerComponent} from '../../../components/Drawer.component';
import {StatusBarComponent} from '../../../components/StatusBar.component';
import {makeStyles} from '@material-ui/core';
import {getFetcher} from '../../../network';
import useSWR from 'swr';
function createData(
    name: string,
    description: string,
    avatar: string,
    productCount: number
) {
    return {name, description, avatar, productCount};
}

const rows = [
    createData(
        'Merch',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Merch.png',
        24
    ),
    createData(
        'NFT',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'NFT.png',
        64
    ),
    createData(
        'Kudos',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Kudos.png',
        12
    ),
];
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function CategoryContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();
    const {data, error} = useSWR('category', getFetcher);

    const els =
        data &&
        data.success &&
        data.data.map((c) => <CategoryCard key={c.category_id} category={c} />);
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />

            <StatusBarComponent
                open={open}
                toggleDrawer={toggleDrawer}
                title={'Categories'}
                newBtn={'/dashboard//categories/new-category'}
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
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Tags</TableCell>
                                    <TableCell align="left">
                                        Product Count
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{els}</TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <CategoryContent />;
}

const CategoryCard = ({category}) => {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {category.type}
            </TableCell>
            <TableCell align="left">{category.name}</TableCell>
            <TableCell align="left">{category.productCount}</TableCell>

            <TableCell align="left">{category.tags}</TableCell>
        </TableRow>
    );
};
