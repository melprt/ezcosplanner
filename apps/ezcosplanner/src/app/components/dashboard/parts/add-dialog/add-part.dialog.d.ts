export type AddPartDialogRes =
  | {
      status: true;
      formValue: {
        name: string;
      }
    }
  | {
      status: false;
    };
