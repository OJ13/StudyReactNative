import { useContext } from "react";
import { View, Text, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import logo from '../../assets/Logo.png';
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image source={logo} style={{ width: 90, height: 90 }} resizeMode="contain" />

                 <Text style={{ fontSize: 18, marginTop: 14 }}>
                    Bem-Vindo
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 14, paddingHorizontal: 20 }}
                    numberOfLines={1}
                >
                    {user && user.name}
                </Text>
            </View>
           
            <DrawerItemList {...props} />

            <DrawerItem 
                {...props}
                label="Sair do App"
                onPress={() => signOut() }
            />
        </DrawerContentScrollView>
    );
}