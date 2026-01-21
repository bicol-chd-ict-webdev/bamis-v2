import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
const ReportController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ReportController.url(options),
    method: 'get',
})

ReportController.definition = {
    methods: ["get","head"],
    url: '/budget/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
ReportController.url = (options?: RouteQueryOptions) => {
    return ReportController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
ReportController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ReportController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
ReportController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ReportController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
    const ReportControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ReportController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
        ReportControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ReportController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\Reports\ReportController::__invoke
 * @see app/Http/Controllers/Budget/Reports/ReportController.php:14
 * @route '/budget/reports'
 */
        ReportControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ReportController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ReportController.form = ReportControllerForm
export default ReportController