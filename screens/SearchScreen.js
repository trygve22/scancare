import React, { useMemo, useState } from 'react';
import { View, SectionList, TouchableOpacity, TextInput } from 'react-native';
import { makeStyles } from '../styles/SearchScreen.styles';
import { useTheme } from '../styles/ThemeContext';
import Typography from '../components/Typography';
import { moisturizerSections } from '../data/moisturizers';

export default function SearchScreen() {
	const { theme } = useTheme();
	const styles = useMemo(() => makeStyles(theme), [theme]);
	const [query, setQuery] = useState('');
	const [selected, setSelected] = useState(null);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return moisturizerSections;
		return moisturizerSections
			.map(s => ({ title: s.title, data: s.data.filter(i => i.toLowerCase().includes(q)) }))
			.filter(s => s.data.length > 0);
	}, [query]);

	const toggle = (item) => setSelected(prev => prev === item ? null : item);

	return (
		<View style={styles.container}>
			<Typography variant="h2" align="center">Søg Produkter</Typography>
			<Typography variant="body" muted align="center">Vælg en fugtighedscreme fra listen.</Typography>
			<TextInput
				placeholder="Søg..."
				value={query}
				onChangeText={setQuery}
				style={styles.searchInput}
				autoCapitalize="none"
				autoCorrect={false}
				clearButtonMode="while-editing"
			/>
			{selected && (
				<View style={styles.selectedBar}>
					<Typography variant="small" style={styles.selectedBarText}>Valgt: {selected}</Typography>
				</View>
			)}
			<SectionList
				sections={filtered}
				keyExtractor={(item) => item}
				renderSectionHeader={({ section }) => (
					<Typography variant="h3" style={styles.sectionHeader}>{section.title}</Typography>
				)}
				renderItem={({ item }) => {
					const isSel = item === selected;
					return (
						<TouchableOpacity onPress={() => toggle(item)} style={[styles.item, isSel && styles.selectedItem]}>
							<Typography style={styles.itemText}>{item}</Typography>
						</TouchableOpacity>
					);
				}}
				stickySectionHeadersEnabled={false}
				ListEmptyComponent={<Typography muted style={styles.emptyText}>Ingen resultater</Typography>}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
