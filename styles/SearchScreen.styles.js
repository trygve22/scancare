import { StyleSheet } from 'react-native';

export const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.lg, backgroundColor: theme.colors.background },
  sectionHeader: { fontSize: theme.typography.h3, fontWeight: '600', backgroundColor: theme.colors.surfaceAlt, paddingVertical: 6, paddingHorizontal: 10, borderRadius: theme.radius.md, marginTop: theme.spacing.lg, color: theme.colors.text },
  item: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.surface },
  itemText: { fontSize: theme.typography.body, color: theme.colors.text },
  selectedItem: { backgroundColor: theme.colors.primaryMuted },
  searchInput: { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text, borderRadius: theme.radius.lg, paddingHorizontal: 12, paddingVertical: 10, marginBottom: theme.spacing.md, fontSize: theme.typography.body },
  selectedBar: { padding: theme.spacing.sm, backgroundColor: theme.colors.primary, borderRadius: theme.radius.lg, marginBottom: theme.spacing.sm },
  selectedBarText: { color: '#fff', fontWeight: '500', fontSize: theme.typography.small },
  emptyText: { textAlign: 'center', color: theme.colors.textMuted, marginTop: theme.spacing.xl },
});

export default makeStyles;
