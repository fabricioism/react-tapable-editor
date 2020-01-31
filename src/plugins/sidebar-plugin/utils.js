export const getNodeByOffsetKey = offsetKey => {
  return document.querySelector(`[data-block="true"][data-offset-key="${offsetKey}"]`)
}

// https://stackoverflow.com/questions/29937768/document-queryselector-multiple-data-attributes-in-one-element
// consecutive selector should not has spaces between them
export const getOffsetKeyNodeChildren = offsetKey => {
  return document.querySelectorAll(`[data-block="true"][data-offset-key="${offsetKey}"] div.sidebar-addon`)
}

export const getSelectableNodeByListenerKey = listenerKey => {
  return document.querySelector(`[data-block="true"] [data-id="${listenerKey}"] div.selectable`)
}