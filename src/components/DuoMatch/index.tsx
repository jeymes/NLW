import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    ModalProps,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons'
import {styles} from './styles';
import {THEME} from '../../theme';
import {Heading} from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest} : Props) {

    const [isCopping, setIsCopping] = useState(false);

    async function handleCopyDiscordToClipboard(){
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord copiado', 'Cole no seu discord e jogue com seu amigo!')
        setIsCopping(false)
    }

    return (
        <Modal 
        animationType='fade'
        transparent 
        statusBarTranslucent {...rest}>
            <View style={
                styles.container
            }>
                <View style={
                    styles.content
                }>
                    <TouchableOpacity onPress={onClose}
                        style={
                            styles.closeIcon
                    }>
                        <MaterialIcons name='close'
                            size={20}
                            color={
                                THEME.COLORS.CAPTION_500
                            }/>
                    </TouchableOpacity>

                    <FontAwesome name="check-circle"
                        size={64}
                        color={
                            THEME.COLORS.SUCCESS
                        }/>

                    <Heading title={'Let´s play!'}
                        subtitle={'Agora é só começa a jogar!'}
                        style={
                            {
                                alignItems: 'center',
                                marginTop: 24
                            }
                        }/>

                    <Text style={
                        styles.label
                    }>
                        Adicione o Discord
                    </Text>

                    <TouchableOpacity
                    style={styles.discordButton}
                    onPress={handleCopyDiscordToClipboard}
                    disabled={isCopping}
                    >
                        <Text style={
                            styles.discord
                        }>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
