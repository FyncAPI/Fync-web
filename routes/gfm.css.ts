import { Handlers } from "$fresh/server.ts";
import { gfm } from "../utils/markdown.ts";
const CSS = `${gfm.CSS}

ol.nested {
	counter-reset: item;
}

ol.nested li {
	display: block;
}

ol.nested li:before {
	font-feature-settings: "kern" 1, "tnum" 1;
	-webkit-font-feature-settings: "kern" 1, "tnum" 1;
	-ms-font-feature-settings: "kern" 1, "tnum" 1;
	-moz-font-feature-settings: "kern" 1, "tnum" 1;
	content: counters(item, ".") ". ";
	counter-increment: item;
}

.markdown-body ul {
  list-style: disc;
}

.markdown-body ol {
  list-style: numeric;
}

.toggle:checked + .toggled {
	display: block;
}

.markdown-body a {
  color: #f43f68;
}

.markdown-body {
  font-family: Outfit, sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #e5e7eb;
  padding: 1rem;
}

.markdown-body code {
  font-family: 'Courier New', monospace; /* Specify your preferred monospaced font */
  background-color: #2b2b2b; /* Background color for code blocks */
  color: #f8f8f2; /* Text color for code */
  padding: 0.2em 0.4em; /* Padding around code */
  border-radius: 4px; /* Rounded corners for code blocks */
}

/* Additional styles for code blocks inside backticks */
.markdown-body pre code {
  display: block;
  padding: 1em;
  overflow-x: auto;
  background-color: #1e1e1e; /* Background color for code blocks with scroll */
  border-radius: 6px; /* Rounded corners for code blocks with scroll */
  border: 1px solid #444; /* Border color for code blocks with scroll */
}


`;

export const handler: Handlers = {
  GET: () => {
    return new Response(CSS, {
      headers: {
        "content-type": "text/css",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  },
};
