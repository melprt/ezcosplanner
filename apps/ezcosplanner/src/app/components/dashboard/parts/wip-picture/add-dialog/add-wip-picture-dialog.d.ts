export type AddWipPictureDialogRes =
  | {
      status: true;
      formValue: {
        title: string|null;
        smallDesc: string|null;
        fileId?: number|null;
      }
    }
  | {
      status: false;
    };
