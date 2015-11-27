(function() {
'use strict';

var Zoom = Darkroom.Transformation.extend({
  applyTransformation: function(canvas, image, next) {
    var newZoom = canvas.getZoom() + this.options.factor;
    canvas.zoomToPoint({ x: 0, y: 0 }, newZoom);

    // canvas.centerObject(image);
    // image.setCoords();
    canvas.renderAll();

    next();
  }
});

Darkroom.plugins['zoom'] = Darkroom.Plugin.extend({

  initialize: function InitDarkroomZoomPlugin() {
    var buttonGroup = this.darkroom.toolbar.createButtonGroup();

    var zoomInButton = buttonGroup.createButton({
      image: 'zoom-in'
    });

    var zoomOutButton = buttonGroup.createButton({
      image: 'zoom-out'
    });

    zoomInButton.addEventListener('click', this.zoomIn.bind(this));
    zoomOutButton.addEventListener('click', this.zoomOut.bind(this));
  },

  zoomIn: function zoomIn() {
    this.zoom(-0.1);
  },

  zoomOut: function zoomOut() {
    this.zoom(0.1);
  },

  zoom: function zoom(factor) {
    this.darkroom.applyTransformation(
      new Zoom({factor: factor})
    );
  }

});

})();
