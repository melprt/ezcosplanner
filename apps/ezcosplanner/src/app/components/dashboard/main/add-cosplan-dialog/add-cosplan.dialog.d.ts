import { CosplanForm } from '../../../../services/cosplan.service';

export type AddCosplanDialogRes =
  | {
      status: true;
      formValue: CosplanForm;
    }
  | {
      status: false;
    };
