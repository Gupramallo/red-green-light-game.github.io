declare module '@mui/material/styles' {
  interface CommonColors {
    gold: string
    silver: string
    bronze: string
  }
  interface Palette {
    common: CommonColors
  }

  interface PaletteOptions {
    medal?: {
      gold?: string
      silver?: string
      bronze?: string
    }
  }
}
