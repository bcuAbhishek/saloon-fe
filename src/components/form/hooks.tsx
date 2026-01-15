import { FormCountryDropdown } from "@/components/form/FormCountryDropdown";
import { FormPhoneInput } from "@/components/form/FormPhoneInput";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FilesUpload } from "./FilesUpload";
import { FormCheckbox } from "./FormCheckbox";
import { FormInput } from "./FormInput";
import { FormPasswordInput } from "./FormPasswordInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
import { FormUpload } from "./FormUpload";
import { VideoUpload } from "./VideoUpload";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    PhoneInput: FormPhoneInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
    Upload: FormUpload,
    VideoUpload: VideoUpload,
    FilesUpload: FilesUpload,
    CountryDropdown: FormCountryDropdown,
    PasswordInput: FormPasswordInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
