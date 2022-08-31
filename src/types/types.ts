export interface IPerson {
  id: string;
  name: string;
  middleName?: string;
  surName: string;
  birthday?: Date;
  sex: "male" | "female";
  parents: string[];
  position?: IPoint;
  isRemovable: boolean;
}

export interface IPersonEdge {
  sourceID: string;
  targetID: string;
}

export interface IPersonLink {
  source: {
    id: string;
    position: IPoint;
  };
  midpoint: IPoint;
  target: {
    id: string;
    position: IPoint;
  };
}

// export interface INodeData extends dagre.Node, IPerson {}

export interface IGraphData {
    nodeDataList: IPerson[];
    graphDimensions: ISize;
}

export interface INodeDimensions {
  size: ISize;
  radius: number;
  scale: IScale;
}

export interface IScale {
  h: number;
  v: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}
