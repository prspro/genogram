import useTree from "./useTree";
import "./tree.sass";
import Person from "../Person/Person";

const Tree = () => {
  const { nodeDataList, linkList, stepLine, graphDimensions, nodeDimensions } =
    useTree();

  return (
    <div className="tree">
      <svg
        className="tree__link-list"
        width={graphDimensions.width}
        height={graphDimensions.height}
      >
        {/* links group */}
        <g>
          {linkList.map((link, idx) => {
            return (
              <path
                key={idx}
                d={stepLine(link)}
                className="tree__link-item"
              ></path>
            );
          })}
        </g>
        {/* parents midpoint group */}
        <g>
          {linkList
            .filter((entry) => entry.source.position.x !== entry.midpoint.x)
            .map((entry, idx) => (
              <circle
                key={idx}
                cx={entry.midpoint.x}
                cy={entry.midpoint.y}
                r={3}
                className="tree__link-midpoint"
              ></circle>
            ))}
        </g>
        {/* nodes group */}
        {/* <g>
          {nodeDataList.map((node, idx) => {
            return (
              <g key={idx}>
                <rect
                  height={nodeDimensions.size.height}
                  width={nodeDimensions.size.width}
                  rx={nodeDimensions.radius}
                  ry={nodeDimensions.radius}
                  x={node.x - nodeDimensions.size.width / 2}
                  y={node.y - nodeDimensions.size.height / 2}
                  className="tree__node tree__node--back"
                ></rect>
                <text
                  x={node.x}
                  y={node.y}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
                <rect
                  height={nodeDimensions.size.height}
                  width={nodeDimensions.size.width}
                  x={node.x - nodeDimensions.size.width / 2}
                  y={node.y - nodeDimensions.size.height / 2}
                  className="tree__node tree__node--top"
                  onClick={() => {
                    console.log(node.id);
                  }}
                ></rect>
              </g>
            );
          })}
        </g> */}
      </svg>
      <ul
        className="tree__node-list"
        style={{ width: graphDimensions.width, height: graphDimensions.height }}
      >
        {nodeDataList.map((node) => {
          return (
            <li
              key={node.id}
              className="tree__node-item"
              style={{
                width: nodeDimensions.size.width,
                // height: nodeDimensions.size.height,
                // left: (node.position?.x || 0) - nodeDimensions.size.width / 2,
                // top: (node.position?.y || 0) - nodeDimensions.size.height / 2,
                top: node.position?.y,
                left: node.position?.x
              }}
            >
              <Person person={node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tree;
