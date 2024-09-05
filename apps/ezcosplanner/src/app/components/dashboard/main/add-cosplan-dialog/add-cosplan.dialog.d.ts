import { CosplanForm } from '../../../../types/cosplan-form';

export type AddCosplanDialogRes =
  | {
      status: true;
      formValue: CosplanForm;
    }
  | {
      status: false;
    };
