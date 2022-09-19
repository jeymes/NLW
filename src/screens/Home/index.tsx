import React, {useEffect, useState} from 'react';
import {styles} from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png';
import {GameCard, GameCardProps} from '../../components/GameCard';
import {Heading} from '../../components/Heading';
import { Background } from '../../components/Background';


export function Home() {

    const [games, setGames] = useState<GameCardProps[]>([])

    const navigation = useNavigation();

    function handleOpenGame({id, title, bannerUrl}:GameCardProps){
        navigation.navigate('games', {id, title, bannerUrl})
    }

   

    useEffect(() => {
        fetch('http:///192.168.15.12:3333/games')
        .then(response => response.json())
        .then(data => setGames(data));

    }, [])

    return (
        <Background>
        <SafeAreaView style={
            styles.container
        }>
            <Image source={logoImg}
                style={
                    styles.logo
                }/>

            <Heading title='Encontre seu Duo!' subtitle='Selecione o game que deseja jogar...'/>

            <FlatList data={games}
                keyExtractor={
                    Item => Item.id
                }
                renderItem={
                    ({item}) => (
                        <GameCard 
                        data={item}
                        onPress={() => handleOpenGame(item)}
                        />
                    )
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
                />


        </SafeAreaView>
        </Background>
    );
}
