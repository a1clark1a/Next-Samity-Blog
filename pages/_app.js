import { library, config } from "@fortawesome/fontawesome-svg-core"
import {
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons"

config.autoAddCss = false // performance addon so font awesome wont need to keep adding css since we are explicitly adding the css once
library.add(faBorderAll, faList, faSortNumericDown, faSortNumericUp)

import "@fortawesome/fontawesome-svg-core/styles.css"
import "styles/globals.css"
import "highlight.js/styles/dracula.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "styles/index.scss"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
