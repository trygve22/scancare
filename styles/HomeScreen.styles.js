import { StyleSheet } from 'react-native';

export const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl, backgroundColor: theme.colors.background },
});

export default makeStyles;
