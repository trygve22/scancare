import React, { useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from '../styles/ProductDetailScreen.styles';
import { useTheme } from '../styles/ThemeContext';
import Typography from '../components/Typography';

export default function ProductDetailScreen({ route }) {
	const navigation = useNavigation();
	const { theme } = useTheme();
	const styles = useMemo(() => makeStyles(theme), [theme]);
	const { product } = route.params || {};

	// Debug log
	console.log('ProductDetailScreen - navigation:', !!navigation);
	console.log('ProductDetailScreen - product:', product?.name);

	if (!product) {
		return (
			<View style={styles.container}>
				<Typography variant="h2" align="center">Produkt ikke fundet</Typography>
			</View>
		);
	}

	// Extract category emoji
	const categoryEmoji = product.category.match(/^[\u{1F300}-\u{1F9FF}]/u)?.[0] || '🧴';

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
			{/* Header with back button */}
			<View style={styles.header}>
				<TouchableOpacity 
					style={styles.backButton} 
					onPress={() => {
						console.log('Back button pressed');
						if (navigation && navigation.goBack) {
							navigation.goBack();
						} else {
							console.log('Navigation not available');
						}
					}}
				>
					<Ionicons name="arrow-back" size={24} color={theme.colors.text} />
				</TouchableOpacity>
				<Typography variant="h3" style={styles.headerTitle}>Produkt Detaljer</Typography>
				<View style={styles.headerSpacer} />
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* Product Hero Section */}
				<View style={styles.heroSection}>
					<View style={styles.productIcon}>
						<Typography variant="h1" style={styles.iconText}>{categoryEmoji}</Typography>
					</View>
					<Typography variant="h2" style={styles.productName}>{product.name}</Typography>
					<Typography variant="body" muted style={styles.categoryText}>{product.category}</Typography>
				</View>

				{/* Product Info Cards */}
				<View style={styles.infoSection}>
					<View style={styles.infoCard}>
						<View style={styles.infoHeader}>
							<Ionicons name="information-circle" size={20} color={theme.colors.primary} />
							<Typography variant="h3" style={styles.infoTitle}>Om Produktet</Typography>
						</View>
						<Typography variant="body" style={styles.infoText}>
							Dette er en populær fugtighedscreme fra kategorien {product.category.replace(/^[\u{1F300}-\u{1F9FF}]/u, '').trim()}.
						</Typography>
					</View>

					<View style={styles.infoCard}>
						<View style={styles.infoHeader}>
							<Ionicons name="star" size={20} color={theme.colors.primary} />
							<Typography variant="h3" style={styles.infoTitle}>Anbefalinger</Typography>
						</View>
						<Typography variant="body" style={styles.infoText}>
							Denne fugtighedscreme er velegnet til daglig brug og kan hjælpe med at holde huden hydreret.
						</Typography>
					</View>

					<View style={styles.infoCard}>
						<View style={styles.infoHeader}>
							<Ionicons name="leaf" size={20} color={theme.colors.primary} />
							<Typography variant="h3" style={styles.infoTitle}>Ingredienser</Typography>
						</View>
						<Typography variant="body" style={styles.infoText}>
							Indeholder typisk hyaluronsyre, ceramider og andre fugtgivende ingredienser.
						</Typography>
					</View>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionSection}>
					<TouchableOpacity style={styles.primaryButton}>
						<Typography variant="body" weight="600" style={styles.primaryButtonText}>
							Tilføj til Favoritter
						</Typography>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.secondaryButton}>
						<Typography variant="body" weight="500" style={styles.secondaryButtonText}>
							Del Produkt
						</Typography>
					</TouchableOpacity>
				</View>
			</ScrollView>
			</View>
		</SafeAreaView>
	);
}
