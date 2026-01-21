import divisions from './divisions'
import sections from './sections'
import accounts from './accounts'
import allotmentClasses from './allotment-classes'
import projectTypes from './project-types'
import appropriations from './appropriations'
import appropriationTypes from './appropriation-types'
import programClassifications from './program-classifications'
const administrator = {
    divisions: Object.assign(divisions, divisions),
sections: Object.assign(sections, sections),
accounts: Object.assign(accounts, accounts),
allotmentClasses: Object.assign(allotmentClasses, allotmentClasses),
projectTypes: Object.assign(projectTypes, projectTypes),
appropriations: Object.assign(appropriations, appropriations),
appropriationTypes: Object.assign(appropriationTypes, appropriationTypes),
programClassifications: Object.assign(programClassifications, programClassifications),
}

export default administrator