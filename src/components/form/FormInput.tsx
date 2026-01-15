import { Input } from "../ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

interface FormInputProps extends FormControlProps {
  type?: React.HTMLInputTypeAttribute;
}

export function FormInput({ type, ...props }: FormInputProps) {
  const field = useFieldContext<string | number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        type={type}
      />
    </FormBase>
  );
}
