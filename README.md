# ScanCare

En simpel start på ScanCare appen med 3 views (faner) via React Navigation:

Faner:
- Hjem (introduktion)
- Søg (kommende søgefunktion til produkter)
- Reviews (kommende produktanmeldelser)

## Kom i gang
Installer dependencies (hvis ikke allerede):
```
npm install
```
Start udviklingsserver:
```
npm start
```
Scan QR med Expo Go (iOS kamera / Android Expo Go app) eller tryk `i` / `a` / `w` i terminalen for simulator/web.

## Struktur
```
App.js                Navigation container + Tab navigator
screens/
  HomeScreen.js
  SearchScreen.js
  ReviewsScreen.js
```

## Næste skridt (idéer)
- Tilføj søgefelt og API kald til produktdatabase
- Implementer kamera/barcode scanner (expo-barcode-scanner)
- Tilføj state management (Zustand eller Redux) hvis nødvendigt
- Gem favoritprodukter lokalt (AsyncStorage / SQLite)


