import { PhoneInput } from "../ui/phone-input";
import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

export function FormPhoneInput(props: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <PhoneInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(value) => field.handleChange(value || "")}
        aria-invalid={isInvalid}
        placeholder={props.placeholder}
        defaultCountry="MY"
      />
    </FormBase>
  );
}
