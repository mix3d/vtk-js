import macro from 'vtk.js/Sources/macro';
import vtkSVGRepresentation from 'vtk.js/Sources/Widgets/SVG/SVGRepresentation';

// ----------------------------------------------------------------------------
// vtkSVGLandmarkRepresentation
// ----------------------------------------------------------------------------

function vtkSVGLandmarkRepresentation(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkSVGLandmarkRepresentation');

  model.root = vtkSVGRepresentation.createElement('g');
  model.elements.push(model.root);

  publicAPI.requestData = (inData, outData) => {
    const list = publicAPI.getRepresentationStates(inData[0]);

    const coords = [];
    for (let i = 0; i < list.length; i++) {
      coords.push(list[i].getOrigin());
    }

    publicAPI.worldPointsToPixelSpace(coords).then((result) => {
      const points2d = result[0];
      const winSize = result[3];
      const a = [];
      for (let i = 0; i < points2d.length; i++) {
        const xy = points2d[i];
        const x = xy[0];
        const y = winSize.vsize - xy[1];
        a.push(`
<circle
cx="${x}" cy="${y}"
r="25" stroke-width="10" stroke="green" fill="none" />
<text x="${x + 25}" y="${y - 25}" fill="white">Label ${i}</text>
`);
      }
      model.root.innerHTML = a.join('');
    });
  };
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
  vtkSVGLandmarkRepresentation(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'vtkSVGLandmarkRepresentation'
);

// ----------------------------------------------------------------------------

export default { extend, newInstance };
