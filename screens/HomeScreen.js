import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import { makeStyles } from '../styles/HomeScreen.styles';
import Typography from '../components/Typography';

export default function HomeScreen({ navigation }) {
    const { theme, mode, toggleTheme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const safeNavigate = (route) => {
        if (navigation && navigation.navigate) {
            try { navigation.navigate(route); } catch (e) { /* route not registered yet */ }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={local.logo} resizeMode="contain" />
            <Typography variant="h1" style={local.title}>ScanCare</Typography>
            <Typography variant="body" muted style={local.subtitle}>Your health, scanned and cared for.</Typography>
            <View style={{ height: theme.spacing.xl }} />
            <TouchableOpacity style={[local.button, { backgroundColor: theme.colors.primary }]} onPress={() => safeNavigate('Scan')}>
                <Typography variant="small" weight="600" style={local.buttonText}>Start Scan</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={[local.secondaryButton, { borderColor: theme.colors.primary }]} onPress={() => safeNavigate('History')}>
                <Typography variant="small" weight="500" style={[local.secondaryButtonText, { color: theme.colors.primary }]}>View History</Typography>
            </TouchableOpacity>
            <View style={{ height: theme.spacing.lg }} />
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Toggle dark mode"
                onPress={toggleTheme}
                style={[local.toggleButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}
            >
                <Typography variant="small" weight="500" style={{ color: theme.colors.text }}>
                    {mode === 'light' ? 'Skift til mørk tilstand' : 'Skift til lys tilstand'}
                </Typography>
            </TouchableOpacity>
        </View>
    );
}

const local = StyleSheet.create({
    logo: { width: 120, height: 120, marginBottom: 32 },
    title: { marginBottom: 8 },
    subtitle: { textAlign: 'center', marginTop: 4 },
    button: { paddingVertical: 14, paddingHorizontal: 40, borderRadius: 8, marginBottom: 16 },
    buttonText: { color: '#fff' },
    secondaryButton: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 36, borderRadius: 8 },
    secondaryButtonText: { fontSize: 16 },
    toggleButton: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, borderWidth: 1 },
});