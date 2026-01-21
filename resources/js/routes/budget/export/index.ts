import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
export const saobReport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saobReport.url(options),
    method: 'post',
})

saobReport.definition = {
    methods: ["post"],
    url: '/budget/export/saob-report',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
saobReport.url = (options?: RouteQueryOptions) => {
    return saobReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
saobReport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saobReport.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
    const saobReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saobReport.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
        saobReportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saobReport.url(options),
            method: 'post',
        })
    
    saobReport.form = saobReportForm
/**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
export const utilizationByDivisionReport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: utilizationByDivisionReport.url(options),
    method: 'post',
})

utilizationByDivisionReport.definition = {
    methods: ["post"],
    url: '/budget/export/utilization-by-division-report',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
utilizationByDivisionReport.url = (options?: RouteQueryOptions) => {
    return utilizationByDivisionReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
utilizationByDivisionReport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: utilizationByDivisionReport.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
    const utilizationByDivisionReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: utilizationByDivisionReport.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
        utilizationByDivisionReportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: utilizationByDivisionReport.url(options),
            method: 'post',
        })
    
    utilizationByDivisionReport.form = utilizationByDivisionReportForm
/**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
export const utilizationByAllotmentClassReport = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: utilizationByAllotmentClassReport.url(options),
    method: 'post',
})

utilizationByAllotmentClassReport.definition = {
    methods: ["post"],
    url: '/budget/export/utilization-by-allotment-class-report',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
utilizationByAllotmentClassReport.url = (options?: RouteQueryOptions) => {
    return utilizationByAllotmentClassReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
utilizationByAllotmentClassReport.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: utilizationByAllotmentClassReport.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
    const utilizationByAllotmentClassReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: utilizationByAllotmentClassReport.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
        utilizationByAllotmentClassReportForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: utilizationByAllotmentClassReport.url(options),
            method: 'post',
        })
    
    utilizationByAllotmentClassReport.form = utilizationByAllotmentClassReportForm
/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
export const raoReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: raoReport.url(options),
    method: 'get',
})

raoReport.definition = {
    methods: ["get","head"],
    url: '/budget/export/rao-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
raoReport.url = (options?: RouteQueryOptions) => {
    return raoReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
raoReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: raoReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
raoReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: raoReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
    const raoReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: raoReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
        raoReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: raoReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\Reports\RaoController::raoReport
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
        raoReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: raoReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    raoReport.form = raoReportForm
/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
export const accountsPayableReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accountsPayableReport.url(options),
    method: 'get',
})

accountsPayableReport.definition = {
    methods: ["get","head"],
    url: '/budget/export/accounts-payable-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
accountsPayableReport.url = (options?: RouteQueryOptions) => {
    return accountsPayableReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
accountsPayableReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accountsPayableReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
accountsPayableReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accountsPayableReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
    const accountsPayableReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: accountsPayableReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
        accountsPayableReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accountsPayableReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
        accountsPayableReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accountsPayableReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    accountsPayableReport.form = accountsPayableReportForm
const exportMethod = {
    saobReport: Object.assign(saobReport, saobReport),
utilizationByDivisionReport: Object.assign(utilizationByDivisionReport, utilizationByDivisionReport),
utilizationByAllotmentClassReport: Object.assign(utilizationByAllotmentClassReport, utilizationByAllotmentClassReport),
raoReport: Object.assign(raoReport, raoReport),
accountsPayableReport: Object.assign(accountsPayableReport, accountsPayableReport),
}

export default exportMethod