import { FormBase, FormControlProps } from "@/components/form/FormBase";
import { useFieldContext } from "@/components/form/hooks";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";

export function FormCountryDropdown(props: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleChange = (country: Country) => {
    field.handleChange(country.alpha3);
  };

  return (
    <FormBase {...props}>
      <CountryDropdown
        placeholder={props.label || "Select a country"}
        defaultValue={field.state.value || "DNK"}
        onChange={handleChange}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
