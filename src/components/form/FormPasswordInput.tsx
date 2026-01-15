import { PasswordInput } from "../ui/password-input";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

export function FormPasswordInput(props: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <div className="relative">
        <PasswordInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={props.placeholder || "********"}
          required={props.required}
        />
      </div>
    </FormBase>
  );
}
