import { Textarea } from "../ui/textarea";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

interface FormTextareaProps extends FormControlProps {
  rows?: number;
  placeholder?: string;
}

export function FormTextarea(props: FormTextareaProps) {
  const { rows, placeholder, ...baseProps } = props;
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...baseProps}>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        rows={rows}
        placeholder={placeholder}
        required={props.required}
      />
    </FormBase>
  );
}
