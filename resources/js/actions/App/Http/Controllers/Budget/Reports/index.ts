import ReportController from './ReportController'
import SaobController from './SaobController'
import BurByDivisionController from './BurByDivisionController'
import BurByAllotmentClassController from './BurByAllotmentClassController'
import RaoController from './RaoController'
import AccountsPayableController from './AccountsPayableController'
const Reports = {
    ReportController: Object.assign(ReportController, ReportController),
SaobController: Object.assign(SaobController, SaobController),
BurByDivisionController: Object.assign(BurByDivisionController, BurByDivisionController),
BurByAllotmentClassController: Object.assign(BurByAllotmentClassController, BurByAllotmentClassController),
RaoController: Object.assign(RaoController, RaoController),
AccountsPayableController: Object.assign(AccountsPayableController, AccountsPayableController),
}

export default Reports