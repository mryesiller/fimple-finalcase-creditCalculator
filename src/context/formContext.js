import create from "zustand"
import * as yup from "yup"

const formMethods = (set, get) => ({
  handleFormSubmit: (values) => {
    const formSchema = yup.object().shape({
      creditAmount: yup.number().min(500).max(1000000).required(),
      creditPeriod: yup.number().required(),
      creditRate: yup.number().min(0.1).max(10).required(),
      creditBsmv: yup.number().min(0.1).max(20).required(),
      creditKkff: yup.number().min(0.1).max(20).required(),
      creditPeriodType: yup.string().required(),
    })

    formSchema
      .validate(values, { abortEarly: false })
      .then((valid) => {
        console.log("Valid", valid)
      })
      .catch((err) => {
        console.log("Error", err)
      })
  },
})

export const formStore = create((set, get) => ({
  ...formMethods(set, get),
}))
