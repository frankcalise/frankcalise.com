import Typography from "typography"
import "../fonts/fonts.css"

export const fonts = {
  regular: "PragmataPro",
}

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [fonts.regular, "sans-serif"],
  bodyFontFamily: [fonts.regular, "sans-serif"],
})

export default typography
