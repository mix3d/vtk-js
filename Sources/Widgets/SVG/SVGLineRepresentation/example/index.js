import 'vtk.js/Sources/favicon';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkPolyLineWidget from 'vtk.js/Sources/Widgets/Widgets3D/PolyLineWidget';
import vtkWidgetManager from 'vtk.js/Sources/Widgets/Core/WidgetManager';
import vtkSVGWidgetManager from 'vtk.js/Sources/Widgets/SVG/SVGWidgetManager';
import vtkSVGDistanceWidget from 'vtk.js/Sources/Widgets/SVG/SVGDistanceWidget';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [1, 1, 1],
});
const renderer = fullScreenRenderer.getRenderer();

// ----------------------------------------------------------------------------
// Widget manager
// ----------------------------------------------------------------------------

const widgetManager = vtkWidgetManager.newInstance();
widgetManager.setRenderer(renderer);

const svgWidgetManager = vtkSVGWidgetManager.newInstance();
svgWidgetManager.setRenderer(renderer);

const widget = vtkPolyLineWidget.newInstance();
widgetManager.addWidget(widget);

const svgWidget = vtkSVGDistanceWidget.newInstance({
  widgetState: widget.getWidgetState(),
  repLabels: {
    line: ['handles'],
  },
});
svgWidgetManager.addWidget(svgWidget);

widgetManager.grabFocus(widget);

renderer.resetCamera();
widgetManager.enablePicking();
