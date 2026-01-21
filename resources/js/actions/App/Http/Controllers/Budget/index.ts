import BudgetDashboardController from './BudgetDashboardController'
import AccountsPayableController from './AccountsPayableController'
import Reports from './Reports'
import LineItemController from './LineItemController'
import ExpenditureController from './ExpenditureController'
import ProgramController from './ProgramController'
import SubprogramController from './SubprogramController'
import GeneralAppropriationController from './GeneralAppropriationController'
import SubAllotmentController from './SubAllotmentController'
import SpecialAllotmentController from './SpecialAllotmentController'
import ObjectDistributionController from './ObjectDistributionController'
import OfficeAllotmentController from './OfficeAllotmentController'
import ObligationController from './ObligationController'
import DisbursementController from './DisbursementController'
import DueController from './DueController'
import ReportDownloadController from './ReportDownloadController'
const Budget = {
    BudgetDashboardController: Object.assign(BudgetDashboardController, BudgetDashboardController),
AccountsPayableController: Object.assign(AccountsPayableController, AccountsPayableController),
Reports: Object.assign(Reports, Reports),
LineItemController: Object.assign(LineItemController, LineItemController),
ExpenditureController: Object.assign(ExpenditureController, ExpenditureController),
ProgramController: Object.assign(ProgramController, ProgramController),
SubprogramController: Object.assign(SubprogramController, SubprogramController),
GeneralAppropriationController: Object.assign(GeneralAppropriationController, GeneralAppropriationController),
SubAllotmentController: Object.assign(SubAllotmentController, SubAllotmentController),
SpecialAllotmentController: Object.assign(SpecialAllotmentController, SpecialAllotmentController),
ObjectDistributionController: Object.assign(ObjectDistributionController, ObjectDistributionController),
OfficeAllotmentController: Object.assign(OfficeAllotmentController, OfficeAllotmentController),
ObligationController: Object.assign(ObligationController, ObligationController),
DisbursementController: Object.assign(DisbursementController, DisbursementController),
DueController: Object.assign(DueController, DueController),
ReportDownloadController: Object.assign(ReportDownloadController, ReportDownloadController),
}

export default Budget