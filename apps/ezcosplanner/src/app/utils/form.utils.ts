import { FormControl } from "@angular/forms";

// TODO move into util file like form.ts
export type InferedFormGroup<T> = {
    [field in keyof T]: FormControl<T[field]>
}