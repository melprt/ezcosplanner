import { FormControl } from "@angular/forms";

export type InferedFormGroup<T> = {
    [field in keyof T]: FormControl<T[field]>
}