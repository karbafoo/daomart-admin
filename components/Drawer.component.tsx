import Drawer from '@material-ui/core/Drawer';
import {useRouter} from 'next/router';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StoreIcon from '@material-ui/icons/Store';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
const drawerWidth: number = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: (props: styleProps) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!props.open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    })
);

const DrawerComponent = ({open, toggleDrawer}) => {
    const styles = useStyles({open});
    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <Drawer variant="permanent" open={open} className={styles.drawer}>
            <Toolbar
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 8,
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <Button
                        color="primary"
                        onClick={() => navigate('/dashboard/')}
                    >
                        DAOMART
                    </Button>
                </Typography>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <MainListItems />
            </List>
            <Divider />
            <List>
                <SecondaryListItems />
            </List>
            <Divider />
            <List>
                <ContractListItems />
            </List>
        </Drawer>
    );
};

export {DrawerComponent};

const MainListItems = () => {
    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div>
            <ListSubheader inset>Shop Management</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Categories"
                    onClick={() => navigate('/dashboard/categories')}
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Products"
                    onClick={() => navigate('/dashboard/products')}
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Orders"
                    onClick={() => navigate('/dashboard/orders')}
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <CollectionsBookmarkIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Collections"
                    onClick={() => navigate('/dashboard/collections')}
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PermMediaIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Archive"
                    onClick={() => navigate('/dashboard/archives')}
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Stats"
                    onClick={() => navigate('/dashboard/stats')}
                />
            </ListItem>{' '}
        </div>
    );
};

const SecondaryListItems = () => {
    return (
        <div>
            <ListSubheader inset>User Management</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Admins" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Stewards" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Plebs" />
            </ListItem>
        </div>
    );
};
const ContractListItems = () => {
    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <div>
            <ListSubheader inset>Contracts</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Contracts"
                    onClick={() => navigate('/dashboard/contracts')}
                />
            </ListItem>
        </div>
    );
};
