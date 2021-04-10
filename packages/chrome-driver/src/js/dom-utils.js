import { isDocument } from "./document";
import { detectVisibility } from "./transform";

const verifyTagNameIs = (el) => (value) => {
  const tagName = el.tagName || "";

  return tagName.toLowerCase() === value;
};

export const isBody = verifyTagNameIs("body");
export const isHtml = verifyTagNameIs("html");
export const isOption = verifyTagNameIs("option");
export const isOptionGroup = verifyTagNameIs("optgroup");

export const elHasStyle = (element, style, value) =>
  window.getComputedStyle(element)[style] === value;

const elHasOverflowHidden = (el) => {
  return (
    elHasStyle(el, "overflow", "hidden") ||
    elHasStyle(el, "overflow-y", "hidden") ||
    elHasStyle(el, "overflow-x", "hidden")
  );
};

const isZeroLengthAndTransformNone = (width, height, transform) => {
  // From https://github.com/cypress-io/cypress/issues/5974,
  // we learned that when an element has non-'none' transform style value like "translate(0, 0)",
  // it is visible even with `height: 0` or `width: 0`.
  // That's why we're checking `transform === 'none'` together with elOffsetWidth/Height.

  return (
    (width <= 0 && transform === "none") ||
    (height <= 0 && transform === "none")
  );
};

const isZeroLengthAndOverflowHidden = (width, height, overflowHidden) => {
  return (width <= 0 && overflowHidden) || (height <= 0 && overflowHidden);
};

export const elHasNoEffectiveWidthOrHeight = (el) => {
  // Is the element's CSS width OR height, including any borders,
  // padding, and vertical scrollbars (if rendered) less than 0?
  //
  // elOffsetWidth:
  // If the element is hidden (for example, by setting style.display
  // on the element or one of its ancestors to "none"), then 0 is returned.

  // $el[0].getClientRects().length:
  // For HTML <area> elements, SVG elements that do not render anything themselves,
  // display:none elements, and generally any elements that are not directly rendered,
  // an empty list is returned.
  const style = getComputedStyle(el);
  const transform = style.getPropertyValue("transform");
  const width = el.offsetWidth;
  const height = el.elOffsetHeight;
  const overflowHidden = elHasStyle(el, "overflow", "hidden");

  return (
    isZeroLengthAndTransformNone(width, height, transform) ||
    isZeroLengthAndOverflowHidden(width, height, overflowHidden) ||
    el.getClientRects().length <= 0
  );
};

// TODO fixme
export const isTransformedToZero = (el) => detectVisibility(el) !== "visible";

const isRootElement = (el) => {
  return !el || isBody(el) || isHtml(el) || isDocument(el);
};

const getAllParents = (el, untilSelectorOrEl) => {
  const collectParents = (parents, node) => {
    const parent = node.parentElement;

    if (!parent || (untilSelectorOrEl && parent === untilSelectorOrEl)) {
      return parents;
    }

    return collectParents(parents.concat(parent), parent);
  };

  return collectParents([], el);
};

const elDescendentsHavePositionFixedOrAbsolute = function ($parent, $child) {
  // create an array of all elements between $parent and $child
  // including child but excluding parent
  // and check if these have position fixed|absolute
  const parents = getAllParents($child[0], $parent);

  return [$child, ...parents].some((el) => {
    const position = window.getComputedStyle(el)["position"];
    return position === "fixed" || position === "absolute";
  });
};

/** @type {(el: HTMLElement, ancestor: HTMLElement) => boolean} */
const canClipContent = (el, ancestor) => {
  // can't clip without overflow properties
  if (
    !Object.keys(window.getComputedStyle(ancestor)).some((key) =>
      key.includes("overflow")
    )
  ) {
    return false;
  }

  // the closest parent with position relative, absolute, or fixed
  const offsetParent = el.offsetParent;

  // even if ancestors' overflow is clippable, if the element's offset parent
  // is a parent of the ancestor, the ancestor will not clip the element
  // unless the element is position relative
  if (
    !elHasStyle(el, "position", "relative") &&
    getAllParents(el).includes(offsetParent)
  ) {
    return false;
  }

  // even if ancestors' overflow is clippable, if the element's offset parent
  // is a child of the ancestor, the ancestor will not clip the element
  // unless the ancestor has position absolute
  if (
    elHasStyle(el, "position", "absolute") &&
    el.children.includes(offsetParent)
  ) {
    return false;
  }

  return true;
};

export const elIsHiddenByAncestors = (el, checkOpacity, origEl = el) => {
  // walk up to each parent until we reach the body
  // if any parent has opacity: 0
  // or has an effective offsetHeight of 0
  // and its set overflow: hidden then our child element
  // is effectively hidden
  // -----UNLESS------
  // the parent or a descendent has position: absolute|fixed
  const parent = el.parentElement;

  // stop if we've reached the body or html
  // in case there is no body
  // or if parent is the document which can
  // happen if we already have an <html> element
  if (isRootElement(parent)) {
    return false;
  }

  // a child can never have a computed opacity
  // greater than that of its parent
  // so if the parent has an opacity of 0, so does the child
  if (elHasStyle(el, "opacity", "0")) {
    return true;
  }

  if (canClipContent(el, parent)) {
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    // target el is out of bounds
    if (
      // target el is to the right of the ancestor's visible area
      elRect.left > parentRect.width + parentRect.left ||
      // target el is to the left of the ancestor's visible area
      elRect.left + elRect.width < parentRect.left ||
      // target el is under the ancestor's visible area
      elRect.top > parentRect.height + parentRect.top ||
      // target el is above the ancestor's visible area
      elRect.top + elRect.height < parentRect.top
    ) {
      return true;
    }
  }

  if (elHasOverflowHidden(parent) && elHasNoEffectiveWidthOrHeight(parent)) {
    // if any of the elements between the parent and origEl
    // have fixed or position absolute
    if (!elDescendentsHavePositionFixedOrAbsolute(parent, origEl)) {
      return true;
    }
  }

  // continue to recursively walk up the chain until we reach body or html
  return elIsHiddenByAncestors(parent, checkOpacity, origEl);
};

