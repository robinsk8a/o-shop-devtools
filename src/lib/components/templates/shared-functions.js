
/**
 * Selects the entire text in a text input field.
 *
 * @param {Event} event - The event object triggered by the text input field.
 * @return {void}
 */
export function textSelect(event) {
  event.target.select();
}

/**
 * Injects a CSS string into the document's head.
 *
 * @param {string} css - The CSS string to be injected.
 * @return {void}
 */
export function injectCss(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
/**
 * Injects a JavaScript string into the document's body.
 *
 * @param {string} js - The JavaScript string to be injected.
 * @return {void}
 */
export function injectJs(js) {
  const script = document.createElement('script');
  script.textContent = js;
  document.body.appendChild(script);
}

/**
 * Removes HTML, CSS and JavaScript comments from a string.
 *
 * @param {string} source - The string to be cleaned.
 * @return {string} The cleaned string.
 */
export function removeComments(text) {
    // Remove HTML comments
    text = text.replace(/<!--[\s\S]*?-->/g, '');
  
    // Remove CSS comments
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    
    
    return text;
}
