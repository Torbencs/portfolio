import { Vertices, Common, Body, Bodies } from "matter-js";
export function Quad(x, y, sides, radius, options) {
  options = options || {};

  var theta = Math.PI / 2 / sides,
    path = "",
    offset = theta * 0.5;

  for (var i = 0; i < sides; i += 1) {
    var angle = offset + i * theta,
      xx = Math.cos(angle) * radius,
      yy = Math.sin(angle) * radius;

    path += xx.toFixed(3) + " " + yy.toFixed(3) + " ";

    if (i + 1 == sides) {
      path += xx.toFixed(3) + " " + (yy - radius).toFixed(3) + " ";
    }
  }

  var polygon = {
    label: "Polygon Body",
    position: { x: x, y: y },
    vertices: Vertices.fromPath(path),
  };

  if (options.chamfer) {
    var chamfer = options.chamfer;
    polygon.vertices = Vertices.chamfer(
      polygon.vertices,
      chamfer.radius,
      chamfer.quality,
      chamfer.qualityMin,
      chamfer.qualityMax
    );
    delete options.chamfer;
  }

  return Body.create(Common.extend({}, polygon, options));
}

export function SemiCircle(x, y, sides, radius, options) {
  options = options || {};

  var theta = Math.PI / sides,
    path = "",
    offset = theta * 0.5;

  for (var i = 0; i < sides; i += 1) {
    var angle = offset + i * theta,
      xx = Math.cos(angle) * radius,
      yy = Math.sin(angle) * radius;

    path += xx.toFixed(3) + " " + yy.toFixed(3) + " ";
  }

  var polygon = {
    label: "Polygon Body",
    position: { x: x, y: y },
    vertices: Vertices.fromPath(path),
  };

  if (options.chamfer) {
    var chamfer = options.chamfer;
    polygon.vertices = Vertices.chamfer(
      polygon.vertices,
      chamfer.radius,
      chamfer.quality,
      chamfer.qualityMin,
      chamfer.qualityMax
    );
    delete options.chamfer;
  }

  return Body.create(Common.extend({}, polygon, options));
}

export function Tri(x, y, height, options) {
  options = options || {};

  let path = "";
  path += x.toFixed(3) + " " + y.toFixed(3) + " ";
  path += (x + height).toFixed(3) + " " + (y + height).toFixed(3) + " ";
  path += x.toFixed(3) + " " + (y + height).toFixed(3) + " ";

  var polygon = {
    label: "Polygon Body",
    position: { x: x, y: y },
    vertices: Vertices.fromPath(path),
  };

  if (options.chamfer) {
    var chamfer = options.chamfer;
    polygon.vertices = Vertices.chamfer(
      polygon.vertices,
      chamfer.radius,
      chamfer.quality,
      chamfer.qualityMin,
      chamfer.qualityMax
    );
    delete options.chamfer;
  }

  return Body.create(Common.extend({}, polygon, options));
}

export function Arch(x, y, sides, radius, innerWidth, options) {
  Common.setDecomp(require("poly-decomp"));

  options = options || {};

  var theta = Math.PI / sides,
    path = "",
    offset = theta * 0.5;

  for (var i = 0; i < sides; i += 1) {
    var angle = offset + i * theta,
      xx = Math.cos(angle) * radius,
      yy = Math.sin(angle) * radius;

    path += +xx.toFixed(3) + " " + yy.toFixed(3) + " ";
  }

  offset = -offset;

  for (var i = sides; i > 0; i -= 1) {
    var angle = offset + i * theta,
      xx = Math.cos(angle) * radius * innerWidth,
      yy = Math.sin(angle) * radius * innerWidth;

    path += +xx.toFixed(3) + " " + yy.toFixed(3) + " ";
  }

  var polygon = {
    label: "Polygon Body",
    position: { x: x, y: y },
    vertices: Vertices.fromPath(path),
  };

  if (options.chamfer) {
    var chamfer = options.chamfer;
    polygon.vertices = Vertices.chamfer(
      polygon.vertices,
      chamfer.radius,
      chamfer.quality,
      chamfer.qualityMin,
      chamfer.qualityMax
    );
    delete options.chamfer;
  }

  let arch = Bodies.fromVertices(x, y, polygon.vertices, options, true);
  Body.setCentre(arch, { x: 0, y: -14 }, true);

  return arch;
}
