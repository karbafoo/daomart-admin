import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {useRouter} from 'next/router';
import WalletComponent from './Wallet.component';
interface styleProps {
    open?: boolean;
}

const drawerWidth: number = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: (props: styleProps) => ({
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            ...(props.open && {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }),
        }),
    })
);

const StatusBarComponent = ({
    open,
    toggleDrawer,
    title,
    newBtn,
}: {
    open: boolean;
    toggleDrawer: any;
    title: string;
    newBtn?: string;
}) => {
    const styles = useStyles({open});
    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <AppBar position="absolute" open={open} className={styles.appBar}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{
                        flexGrow: 1,
                    }}
                >
                    {title}

                    {newBtn ? (
                        <IconButton
                            color="inherit"
                            aria-label="new"
                            onClick={() => navigate(newBtn)}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    ) : null}
                </Typography>

                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <WalletComponent />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export {StatusBarComponent};
