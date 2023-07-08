import { useState } from "react";

export function useFormFields(initialState: { email?: string; password?: string; confirmPassword?: string; confirmationCode?: string; name?: string; storage?: string; code?: string; oldPassword?: string; }) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: { target: { id: any; value: any; }; }) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}