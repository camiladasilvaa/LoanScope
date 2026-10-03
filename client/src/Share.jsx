import { useState } from "react"

export default function Share({principal, apr, monthly}) {
  const [copyURL, setCopyURL] = useState(false)

  function generateURL() {
    // const windowUrl = window.location.search;
    const searchParams = new URLSearchParams({principal, apr, monthly}).toString();

    // https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/
    const url = window.location.origin + window.location.pathname + '?' + searchParams

    // copy to clipboard
    // https://www.geeksforgeeks.org/reactjs/how-to-copy-text-to-the-clipboard-in-react-js/
    navigator.clipboard.writeText(url)
    setCopyURL(true)
  }

  return (
    <div>
      <button onClick={generateURL}>Share Scenario</button>
      {copyURL && (
        <p>URL Copied to Clipboard</p>
      )}
    </div>
  )
}