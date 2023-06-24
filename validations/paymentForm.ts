import * as yup from "yup";

const schema = yup.object().shape({
  accountHolderName: yup.string().required("Enter account holder name"),
  bankName: yup.string().required("Enter bank name"),
  accountNumber: yup.string().required("Enter account number"),
  sortCode: yup.string().required("Enter sort code"),
});

export default schema;
