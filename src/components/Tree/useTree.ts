import { useState, useEffect } from "react";
import dagre from "dagre";
import {
  IGraphData,
  INodeDimensions,
  IPerson,
  IPersonEdge,
  IPersonLink,
  IPoint,
  ISize,
} from "../../types/types";

import { useSelector } from "react-redux"
import type { RootState } from "../../store";

interface IUseTree {
  nodeDataList: IPerson[];
  linkList: IPersonLink[];
  stepLine: (arg: IPersonLink) => string;
  graphDimensions: ISize;
  nodeDimensions: INodeDimensions;
}

export default function useTree(): IUseTree {
  // const [personList, setPersonList] = useState<IPerson[]>([
  //   {
  //     id: "root",
  //     name: "Root",
  //     surName: "Person",
  //     sex: "male",
  //     parents: ["ascendant1", "ascendant2"],
  //   },
  //   {
  //     id: "ascendant1",
  //     name: "1",
  //     surName: "parent",
  //     sex: "female",
  //     parents: [],
  //   },
  //   {
  //     id: "ascendant2",
  //     name: "2",
  //     surName: "parent",
  //     sex: "male",
  //     parents: [],
  //     birthday: new Date(1995, 11, 17),
  //   },
  // ]);

  const personList = Array.from(useSelector((state: RootState) => state.personList.personList));

  const nodeDimensions: INodeDimensions = {
    size: {
      width: 170,
      height: 60,
    },
    radius: 5,
    scale: {
      h: 1.1,
      v: 1.3,
    },
  };

  const midpoint = (point1: IPoint, point2: IPoint): IPoint => {
    return { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 };
  };

  const stepLine = (link: IPersonLink): string => {
    return `M${link.source.position.x},${link.source.position.y}H${
      link.midpoint.x
    }V${
      link.source.position.y +
      (link.target.position.y - link.source.position.y) / 2
    }H${link.target.position.x}V${link.target.position.y}`;
  };

  const getEdgesData = (personList: IPerson[]): IPersonEdge[] => {
    // copy person list;
    const personListCopy = personList.map((entry) => {
      return { ...entry };
    });

    const EdgesList: IPersonEdge[] = [];

    personListCopy.forEach((person) => {
      //if person has parents, add parent-child edge
      if (person.parents) {
        person.parents.forEach((parentID) => {
          EdgesList.push({
            sourceID: parentID,
            targetID: person.id,
          });
        });
      }
    });

    return EdgesList;
  };

  const getLinksData = (personDataList: IPerson[]): IPersonLink[] => {
    // copy person list;
    const personDataListCopy = personDataList.map((entry) => {
      return { ...entry };
    });

    const linkList: IPersonLink[] = [];

    personDataListCopy.forEach((person) => {
      if (person.parents.length > 0) {
        if (person.parents.length > 1) {
          //two parents case
          person.parents.forEach((parentID) => {
            const parent = personDataListCopy.find(
              (entry) => entry.id === parentID
            );
            const parentPartner = personDataListCopy.find((entry) => {
              return (
                entry.id ===
                person.parents.find((partnerID) => partnerID !== parentID)
              );
            });
            if (
              parent &&
              parentPartner &&
              parent.position &&
              parentPartner.position &&
              person.position
            ) {
              linkList.push({
                source: {
                  id: parent.id,
                  position: { x: parent.position.x, y: parent.position.y },
                },
                midpoint: midpoint(
                  { x: parent.position.x, y: parent.position.y },
                  { x: parentPartner.position.x, y: parentPartner.position.y }
                ),
                target: {
                  id: person.id,
                  position: { x: person.position.x, y: person.position.y },
                },
              });
            }
          });
        } else {
          //one parent case
          const parent = personDataListCopy.find(
            (entry) => entry.id === person.parents[0]
          );
          if (parent && parent.position && person.position) {
            linkList.push({
              source: {
                id: parent.id,
                position: { x: parent.position.x, y: parent.position.y },
              },
              midpoint: { x: parent.position.x, y: parent.position.y },
              target: {
                id: person.id,
                position: { x: person.position.x, y: person.position.y },
              },
            });
          }
        }
      }
    });

    return linkList;
  };

  const getGraphData = (personList: IPerson[]): IGraphData => {
    const edgeList = getEdgesData(personList);

    // Create a new directed graph
    const graph = new dagre.graphlib.Graph();

    // Set an object for the graph label
    graph.setGraph({});

    // Default to assigning a new object as a label for each new edge.
    graph.setDefaultEdgeLabel(function () {
      return {};
    });

    //add nodes to the graph
    personList.forEach((entry) => {
      graph.setNode(entry.id, {
        label: entry.name,
        width: nodeDimensions.size.width * nodeDimensions.scale.h,
        height: nodeDimensions.size.height * nodeDimensions.scale.v,
      });
    });

    //add edges to the graph
    edgeList.forEach((entry) => {
      graph.setEdge(entry.sourceID, entry.targetID);
    });

    //layout calculation
    dagre.layout(graph);

    return {
      nodeDataList: graph.nodes().map((nodeID) => {
        //if no person is finded, get first person
        const personData =
          personList.find((person) => person.id === nodeID) || personList[0];

        return {
          id: nodeID,
          name: personData.name,
          surName: personData.surName,
          parents: personData.parents,
          sex: personData.sex,
          birthday: personData.birthday,
          position: {
            x: graph.node(nodeID).x,
            y: graph.node(nodeID).y,
          },
          ...graph.node(nodeID),
        };
      }),
      graphDimensions: {
        width: graph?.graph().width || 0,
        height: graph?.graph().width || 0,
      },
    };
  };

  const { nodeDataList, graphDimensions } = getGraphData(personList);

  const linkList = getLinksData(nodeDataList);

  return {
    nodeDataList,
    linkList,
    stepLine,
    graphDimensions,
    nodeDimensions,
  };
}
