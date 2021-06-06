/* Function creates an element and append it to the parent
 *
 * @param {HTMLElement} appendElement
 * @param {string} typeElement
 * @param {string} string
 * @param {string} string
 *
 * @return {HTMLElement}
 *
 */
export function createAndAppendHtmlElement(
  appendElement: HTMLElement,
  typeElement: string,
  classElement?: string,
  value?: string
): HTMLElement {
  const element = document.createElement(typeElement);
  if (typeof classElement !== "undefined") element.classList.add(classElement);
  if (typeof value !== "undefined") element.innerText = value;
  appendElement.appendChild(element);
  return element;
}
