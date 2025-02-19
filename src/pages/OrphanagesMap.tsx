import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const OrphanagesMap: React.FC = () => {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('/orphanages').then((response) => {
            setOrphanages(response.data);
        })
    })

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate("OrphanageDetails", {
            id
        });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate("SelectMapPosition");
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -28.6242408,
                    longitude: -49.0263436,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
            >
                {
                    orphanages.map(orphanage => (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude
                            }}
                        >
                            <Callout
                                tooltip
                                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {orphanages.length} orfanatos encontrados
                </Text>

                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}
                >
                    <Feather
                        name="plus"
                        size={20}
                        color="#fff"
                    />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: '100%',
        height: '100%'
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 16,
        justifyContent: "center"
    },

    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: "nunito_700"
    },

    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: "#fff",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        elevation: 3,
    },

    footerText: {
        color: "#8fa7b3",
        fontFamily: "nunito_700"
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: "#15c3d6",
        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center"
    }
});


export default OrphanagesMap;
