import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import { makeStyles } from '../styles/HomeScreen.styles';
import Typography from '../components/Typography';

export default function HomeScreen({ navigation }) {
    const { theme, mode, toggleTheme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    
    // State til skin care tips
    const [showTip, setShowTip] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    
    // Liste af skin care tips
    const skinCareTips = [
        "💧 Husk at drikke vand for hydreret hud",
        "🌞 Brug altid solcreme - selv på skydage",
        "🧴 Mindre er mere - brug ikke for mange produkter",
        "😴 God søvn giver naturlig glød",
        "🥒 Spis grøntsager for sund hud indefra"
    ];

    const safeNavigate = (route) => {
        if (navigation && navigation.navigate) {
            try { navigation.navigate(route); } catch (e) { /* route not registered yet */ }
        }
    };

    const handleTipButton = () => {
        if (showTip) {
            // Hvis tip allerede vises, skift til næste tip
            setCurrentTipIndex((prev) => (prev + 1) % skinCareTips.length);
        } else {
            // Hvis intet tip vises, vis første tip
            setShowTip(true);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={local.logo} resizeMode="contain" />
            <Typography variant="h1" style={local.title}>ScanCare</Typography>
            <Typography variant="body" muted style={local.subtitle}>Your health, scanned and cared for.</Typography>
            <View style={{ height: theme.spacing.xl }} />
            <TouchableOpacity style={[local.button, { backgroundColor: theme.colors.primary }]} onPress={() => safeNavigate('Camera')}>
                <Typography variant="small" weight="600" style={local.buttonText}>Start Scan</Typography>
            </TouchableOpacity>
            <View style={{ height: theme.spacing.sm }} />
            <Button
                title="View History"
                onPress={() => safeNavigate('History')}
                color={theme.colors.primary}
            />
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
            
            <View style={{ height: theme.spacing.lg }} />
            
            {/* Skin Care Tips sektion */}
            <View style={local.tipContainer}>
                <Typography variant="h3" style={{ textAlign: 'center', marginBottom: theme.spacing.sm, color: theme.colors.text }}>
                    📋 Dagens Hudpleje Tip
                </Typography>
                {showTip ? (
                    <Typography variant="body" style={{ textAlign: 'center', marginBottom: theme.spacing.md, color: theme.colors.text, fontStyle: 'italic' }}>
                        {skinCareTips[currentTipIndex]}
                    </Typography>
                ) : (
                    <Typography variant="body" style={{ textAlign: 'center', marginBottom: theme.spacing.md, color: theme.colors.textMuted }}>
                        Tryk for at få et hudpleje tip 💡
                    </Typography>
                )}
                <Button
                    title={showTip ? "Næste Tip" : "Få Tip"}
                    onPress={handleTipButton}
                    color={theme.colors.primary}
                />
            </View>
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
    tipContainer: { 
        padding: 16, 
        borderRadius: 12, 
        backgroundColor: 'rgba(0,0,0,0.05)', 
        marginTop: 8,
        minHeight: 120,
        justifyContent: 'center' 
    },
});