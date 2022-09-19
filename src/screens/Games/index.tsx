import {SafeAreaView} from 'react-native-safe-area-context';
import {Background} from '../../components/Background';
import { Entypo } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native'

import logo from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import {styles} from './styles';

import { GameParams } from '../../@types/navigation';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import { useEffect, useState } from 'react';
import { DuoMatch } from '../../components/DuoMatch';


export function Games() {

    const [discorDuoSelected, setDiscordDuoSelected] = useState('');

    const [duos, setduos] = useState<DuoCardProps[]>([]);

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

   const route = useRoute();
   const game = route.params as GameParams;

   async function getDiscordUser(adsId: string){
        fetch(`http:///192.168.15.12:3333/ads/${adsId}/discord`)
        .then(response => response.json())
        .then(data => setDiscordDuoSelected(data.discord));
   }


   useEffect(() => {
    fetch(`http:///192.168.15.12:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setduos(data));

}, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View  style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                        name='chevron-thin-left'
                        color={THEME.COLORS.CAPTION_300}
                        size={20}
                        />
                    </TouchableOpacity>

                    <Image
                    source={logo}
                    style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                <Image
                style={styles.cover}
                source={{uri: game.bannerUrl}}
                resizeMode="cover"
                 />

                <Heading title={game.title} subtitle={'Conecte-se e comece a jogar!'}/>

                <FlatList 
                data={duos}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <DuoCard 
                data={item}
                onConnect={() => getDiscordUser(item.id)}
                />
                
                )}
                horizontal
                contentContainerStyle={[duos.length > 0 ? styles.contenList : styles.emptyListContent, ]}
                showsHorizontalScrollIndicator={false}
                style={styles.containerList}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>
                        Não há anúncios publicados ainda.
                    </Text>
                )}
                />

                <DuoMatch
                onClose={() => setDiscordDuoSelected('')}
                visible={discorDuoSelected.length > 0}
                discord={discorDuoSelected}
                />

            </SafeAreaView>
        </Background>
    );
}
