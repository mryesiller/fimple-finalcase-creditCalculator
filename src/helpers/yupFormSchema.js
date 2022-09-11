import * as yup from "yup"
import { Trans } from "react-i18next"

export const formSchema = yup.object().shape({
  creditPeriodType: yup.string().required(),
  creditAmount: yup
    .number()
    .when("creditPeriodType", {
      is: "year",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required()
        .min(10000, <Trans>min-amount-error-year</Trans>) // 10.000 TL min/year
        .max(10000000, <Trans>max-amount-error-year</Trans>), // 10.000.000TL max/year
    })
    .when("creditPeriodType", {
      is: "month",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required()
        .min(1000, <Trans>min-amount-error-month</Trans>) // 1.000 TL min/month
        .max(1000000, <Trans>max-amount-error-month</Trans>), // 1.000.000 TL max/month
    })
    .when("creditPeriodType", {
      is: "week",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required()
        .min(500, <Trans>min-amount-error-week</Trans>) // 500 TL min/week
        .max(100000, <Trans>max-amount-error-week</Trans>), // 100.000 TL max/week
    }),
  creditRate: yup
    .number()
    .when("creditPeriodType", {
      is: "week",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required()
        .min(0.01, <Trans>min-rate-error-week</Trans>) // 0.01% min/week
        .max(5, <Trans>max-rate-error-week</Trans>), // 5% max/week
    })
    .when("creditPeriodType", {
      is: "year",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required()
        .min(0.1, <Trans>min-rate-error-year</Trans>) // 0,1% min/year
        .max(50, <Trans>max-rate-error-year</Trans>), // 50% max/year
    })
    .when("creditPeriodType", {
      is: "month",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required()
        .min(0.01, <Trans>min-rate-error-month</Trans>) // 0.01% min/month
        .max(15, <Trans>max-rate-error-month</Trans>), // 15% max/month
    }),
  creditPeriod: yup
    .number()
    .when("creditPeriodType", {
      is: "week",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required(<Trans>empty-value-error</Trans>)
        .min(4, <Trans>min-period-error-week</Trans>) // 4 week min
        .max(52, <Trans>max-period-error-week</Trans>), // 52 week max
    })
    .when("creditPeriodType", {
      is: "year",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required(<Trans>empty-value-error</Trans>)
        .min(1, <Trans>min-period-error-year</Trans>) // 1 year min
        .max(30, <Trans>max-period-error-year</Trans>), // 30 year max
    })
    .when("creditPeriodType", {
      is: "month",
      then: yup
        .number()
        .typeError(<Trans>empty-value-error</Trans>)
        .required(<Trans>empty-value-error</Trans>)
        .min(3, <Trans>min-period-error-month</Trans>) // 3 month min
        .max(120, <Trans>max-period-error-month</Trans>), // 120 month max
    }),
  creditBsmv: yup
    .number()
    .typeError(<Trans>empty-value-error</Trans>)
    .required(<Trans>empty-value-error</Trans>)
    .min(0.1, <Trans>min-bsmv-error</Trans>)
    .max(50, <Trans>max-bsmv-error</Trans>),
  creditKkdf: yup
    .number()
    .typeError(<Trans>empty-value-error</Trans>)
    .required(<Trans>empty-value-error</Trans>)
    .min(0.1, <Trans>min-kkdf-error</Trans>)
    .max(50, <Trans>max-kkdf-error</Trans>),
})
