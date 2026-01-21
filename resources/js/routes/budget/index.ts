import dashboard from './dashboard'
import accountsPayables from './accounts-payables'
import reports from './reports'
import lineItems from './line-items'
import expenditures from './expenditures'
import programs from './programs'
import subprograms from './subprograms'
import generalAppropriations from './general-appropriations'
import subAllotments from './sub-allotments'
import specialAllotments from './special-allotments'
import objectDistributions from './object-distributions'
import officeAllotments from './office-allotments'
import obligations from './obligations'
import exportMethod from './export'
const budget = {
    dashboard: Object.assign(dashboard, dashboard),
accountsPayables: Object.assign(accountsPayables, accountsPayables),
reports: Object.assign(reports, reports),
lineItems: Object.assign(lineItems, lineItems),
expenditures: Object.assign(expenditures, expenditures),
programs: Object.assign(programs, programs),
subprograms: Object.assign(subprograms, subprograms),
generalAppropriations: Object.assign(generalAppropriations, generalAppropriations),
subAllotments: Object.assign(subAllotments, subAllotments),
specialAllotments: Object.assign(specialAllotments, specialAllotments),
objectDistributions: Object.assign(objectDistributions, objectDistributions),
officeAllotments: Object.assign(officeAllotments, officeAllotments),
obligations: Object.assign(obligations, obligations),
export: Object.assign(exportMethod, exportMethod),
}

export default budget