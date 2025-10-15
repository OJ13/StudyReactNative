import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import CustomDrawer from "../components/CustomDrawer";

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
    return(
        <AppDrawer.Navigator
            drawerContent={ (props) => <CustomDrawer {...props} /> }
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#FFF',
                    padding: 10,
                    marginTop: 40
                },
                drawerActiveBackgroundColor: '#3b3dbf',
                drawerActiveTintColor: '#FFF',
                drawerInactiveBackgroundColor: '#F0F2FF',
                drawerInactiveTintColor: '#121212',
                drawerItemStyle: {
                    marginTop: 10,
                    borderRadius: 10
                }
            }}
        >
            <AppDrawer.Screen 
                name="Home" component={Home}
            />
            <AppDrawer.Screen 
                name="Registrar" component={New}
            />
            <AppDrawer.Screen 
                name="Perfil" component={Profile}
            />
        </AppDrawer.Navigator>
    )
}