import React from 'react';
import d3 from 'd3';

const line = d3.svg.line()
  .interpolate('cardinal-closed')
  .tension(0.25);

function getWidth(h) {
  return (Math.sqrt(3) / 2) * h;
}

function getPoints(h) {
  const w = getWidth(h);
  const points = [
    [w * 0.5, 0],
    [w, 0.25 * h],
    [w, 0.75 * h],
    [w * 0.5, h],
    [0, 0.75 * h],
    [0, 0.25 * h]
  ];

  return line(points);
}


export default function NodeShapeHex({onlyHighlight, highlighted, size, color}) {
  const pathProps = v => ({
    d: getPoints(size * v * 2),
    transform: `rotate(90) translate(-${size * getWidth(v)}, -${size * v})`
  });

  const hightlightNode = <path className="highlighted" {...pathProps(0.7)} />;

  if (onlyHighlight) {
    return (
      <g className="shape">
        {highlighted && hightlightNode}
      </g>
    );
  }

  return (
    <g className="shape">
      {highlighted && hightlightNode}
      <path className="border" stroke={color} {...pathProps(0.5)} />
      <path className="shadow" {...pathProps(0.45)} />
      <circle className="node" r={Math.max(2, (size * 0.125))} />
    </g>
  );
}
