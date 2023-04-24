import React, { useEffect } from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "../../store";
import Shader from "../../Shader/Shader";

import CustomNode from "./CustomNode";

const selector = (id) => (store) => ({
  primitives: store.primitives
});

export default function PrimitiveNode({ id, data }) {
  const { primitives } = useStore(selector(id), shallow);

  useEffect(()=>{
    console.log("TIENDA: ", primitives.map(p=>p.id)) 
  }, [])

  return (
    <CustomNode id={id} data={data} nInputs={0} title="Primitive" dropdownOptions={primitives.map(p=>p.id)} onChangeDropdownOption={()=>{}}/>
  );
}
