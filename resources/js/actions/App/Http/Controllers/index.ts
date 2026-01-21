import Api from './Api'
import FundTrackerController from './FundTrackerController'
import Administrator from './Administrator'
import Budget from './Budget'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
FundTrackerController: Object.assign(FundTrackerController, FundTrackerController),
Administrator: Object.assign(Administrator, Administrator),
Budget: Object.assign(Budget, Budget),
Settings: Object.assign(Settings, Settings),
}

export default Controllers