import DivisionController from './DivisionController'
import SectionController from './SectionController'
import AccountController from './AccountController'
import AllotmentClassController from './AllotmentClassController'
import ProjectTypeController from './ProjectTypeController'
import AppropriationController from './AppropriationController'
import AppropriationTypeController from './AppropriationTypeController'
import ProgramClassificationController from './ProgramClassificationController'
const Administrator = {
    DivisionController: Object.assign(DivisionController, DivisionController),
SectionController: Object.assign(SectionController, SectionController),
AccountController: Object.assign(AccountController, AccountController),
AllotmentClassController: Object.assign(AllotmentClassController, AllotmentClassController),
ProjectTypeController: Object.assign(ProjectTypeController, ProjectTypeController),
AppropriationController: Object.assign(AppropriationController, AppropriationController),
AppropriationTypeController: Object.assign(AppropriationTypeController, AppropriationTypeController),
ProgramClassificationController: Object.assign(ProgramClassificationController, ProgramClassificationController),
}

export default Administrator