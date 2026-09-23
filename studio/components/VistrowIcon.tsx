import icon from "./vistrow-icon.png";

// Replaces the default Sanity workspace icon (studio tab favicon + the
// square mark next to the workspace switcher) with the real Vistrow mark -
// same file used as the site's own app icon/favicon.
export function VistrowIcon() {
  return <img src={icon} alt="Vistrow" style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
}
