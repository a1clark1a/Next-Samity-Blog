import ThemeProvider from "providers/ThemeProvider"

import { library, config } from "@fortawesome/fontawesome-svg-core"
import {
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons"

config.autoAddCss = false // performance addon so font awesome wont need to keep adding css since we are explicitly adding the css once
library.add(
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
  faSun,
  faMoon
)

import "@fortawesome/fontawesome-svg-core/styles.css"
import "highlight.js/styles/dracula.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toggle/style.css"
import "styles/index.scss"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
