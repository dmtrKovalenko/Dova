const docNode = window.Node.DOCUMENT_NODE;
const docFragmentNode = window.Node.DOCUMENT_FRAGMENT_NODE;

const isDocument = (obj: Node): obj is Document => {
  try {
    let node = obj as Node;

    return node?.nodeType === docNode || node?.nodeType === docFragmentNode;
  } catch (error) {
    return false;
  }
};

// does this document have a currently active window (defaultView)
const hasActiveWindow = (doc) => {
  return !!doc.defaultView;
};

const getDocumentFromElement = (el: Node): Document => {
  if (isDocument(el)) {
    return el;
  }

  return el.ownerDocument as Document;
};

export { isDocument, hasActiveWindow, getDocumentFromElement };
