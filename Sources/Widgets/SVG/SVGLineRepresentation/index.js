// import macro from 'vtk.js/Sources/macro';

import vtkSVGRepresentation from 'vtk.js/Sources/Widgets/SVG/SVGRepresentation';

// const { vtkErrorMacro } = macro;

// ----------------------------------------------------------------------------

function buildRepresentation() {
  const root = vtkSVGRepresentation.createSVGGroup();

  const circle = document.createElement('circle');
  circle.setAttribute('cx', 40);
  circle.setAttribute('cy', 40);
  circle.setAttribute('r', 25);

  root.appendChild(circle);

  return { root, circle };
}

// ----------------------------------------------------------------------------
// vtkSVGLineRepresentation
// ----------------------------------------------------------------------------

function vtkSVGLineRepresentation(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkSVGLineRepresentation');

  const { root, circle } = buildRepresentation();
  model.root = root;
  model.circle = circle;

  model.elements.push(root);

  publicAPI.requestData = (inData, outData) => {};
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  vtkSVGRepresentation.extend(publicAPI, model, initialValues);

  // Object specific methods
  vtkSVGLineRepresentation(publicAPI, model);
}

// ----------------------------------------------------------------------------

export default { extend };
