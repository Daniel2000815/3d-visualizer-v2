import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { InputMode } from "./Types/InputMode";

// import {
//   isRunning,
//   toggleAudio,
//   createAudioNode,
//   updateAudioNode,
//   removeAudioNode,
//   connect,
//   disconnect,
// } from "./Graph/audio";

export const useStore = create((set, get) => ({
  nodes: [
    { id: "primitive", type: "primitive", position: { x: 0, y: 0 } },
  ],
  edges: [
  ],
  primitives: [
    {
      id: "sphere",
      name: "Sphere",
      inputMode: InputMode.Implicit,
      input: ["x^2 + y^2 + z^2 - r", "", ""],
      parsedInput: "length(p)-r",
      parameters: [{ symbol: "r", label: "Radius", defaultVal: 1.0 }],
      fHeader: "sphere(vec3 p, float r)",
    },
    {
      id: "torus",
      name: "Torus",
      inputMode: InputMode.SDF,
      input: ["length(vec2(length(p.xz)-R,p.y)) - r", "", ""],
      parsedInput: "length(vec2(length(p.xz)-R,p.y)) - r",
      parameters: [
        { symbol: "R", label: "Radius 1", defaultVal: 2.0 },
        { symbol: "r", label: "Radius 2", defaultVal: 1.0 },
      ],
      fHeader: "torus(vec3 p, float R, float r)",
    },
    {
      id: "cube",
      name: "Cube",
      inputMode: InputMode.SDF,
      input: [
        "length(max(abs(p) - vec3(l),0.0)) + min(max(abs(p.x) - l,max(abs(p.y) - l,abs(p.z) - l)),0.0)",
        "",
        "",
      ],
      parsedInput:
        "length(max(abs(p) - vec3(l),0.0)) + min(max(abs(p.x) - l,max(abs(p.y) - l,abs(p.z) - l)),0.0)",
      parameters: [{ symbol: "l", label: "side", defaultVal: 1.0 }],
      fHeader: "cube(vec3 p, float l)",
    },
    {
      id: "ellipsoid",
      name: "Ellipsoid",
      inputMode: InputMode.Parametric,
      input: ["s", "t", "s^2+t^2"],
      parsedInput:
        "(-z + pow(x, 2.0000) + pow(y, 2.0000)) * pow(sqrt(1.0000 + 4.0000 * pow(x, 2.0000) + 4.0000 * pow(y, 2.0000)), -1.0000)",
      parameters: [],
      fHeader: "ellipsoid(vec3 p)",
    },
  ],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  createNode(type, x, y) {
    const id = nanoid();

    switch (type) {
      case "osc": {
        const data = { frequency: 440, type: "sine" };
        const position = { x: 0, y: 0 };

        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }

      case "amp": {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };

        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
    }
  },

  updateNode(id, data) {
    // update node logic -> update data

    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: Object.assign(node.data, data) }
          : node
      ),
    });
  },

  onNodesDelete(deleted) {
    for (const { id } of deleted) {
    }
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    // connect logic
    set({ edges: [edge, ...get().edges] });
  },

  onEdgesDelete(deleted) {
    for (const { source, target } of deleted) {
      // edge delete logic
    }
  },
}));
