import Toggle from "react-toggle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ThemeToggle = ({ onChange }) => {
  return (
    <label>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon icon="sun" inverse />,
          unchecked: <FontAwesomeIcon icon="moon" inverse />,
        }}
        onChange={onChange}
      />
    </label>
  )
}

export default ThemeToggle
