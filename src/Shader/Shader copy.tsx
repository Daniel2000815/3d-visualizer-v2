//@flow
import React, { memo, useEffect } from "react";

import { useStore } from "../store";
import { shallow } from "zustand/shallow";

import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import { fs } from "./fragmentShader";

// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  helloGL: {
    // This is our first fragment shader in GLSL language (OpenGL Shading Language)
    // (GLSL code gets compiled and run on the GPU)
    frag: GLSL`
precision highp float;
varying vec2 uv;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}
`,
    // the main() function is called FOR EACH PIXELS
    // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
    // we set in output the pixel color using the vec4(r,g,b,a) format.
    // see GLSL_ES_Specification_1.0.17
  },
});

const selector = () => (store: any) => ({
  savedPrimitives: store.primitives.map(
    (p: any) => `
    float ${p.fHeader}{
      float x = p.r;
      float y = p.g;
      float z = p.b;

      return ${p.parsedInput};
    }\n
  `
  ),
});

function Shader(props: {
  sdf: string;
  primitives: string;
}) {
  const { savedPrimitives } = useStore(selector(), shallow);

  useEffect(() => {
    console.log("PRIMITIVES: ", savedPrimitives);
  }, []);
  function CreateShader(sdf: string, primitives: string) {
    return Shaders.create({
      helloGL: {
        // This is our first fragment shader in GLSL language (OpenGL Shading Language)
        // (GLSL code gets compiled and run on the GPU)
        frag: GLSL`${fs(sdf, String(savedPrimitives).concat(primitives))}`,
        // the main() function is called FOR EACH PIXELS
        // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
        // we set in output the pixel color using the vec4(r,g,b,a) format.
        // see GLSL_ES_Specification_1.0.17
      },
    });
  }

  return (
    <Surface width={180} height={100}>
      <Node
        shader={shaders.helloGL}
        // uniforms={{
        //   u_resolution: [0,0],
        //   u_mouse: [0, 0],
        //   u_specular: [0,0,0],
        //   u_diffuse: [0,0,0],
        //   u_ambient: [0,0,0],
        //   u_smoothness: 0.0,
        //   u_cameraAng: 0.0,
        //   u_zoom: 0.0,
        // }}
      />
    </Surface>
  );
}

export default memo(Shader);
