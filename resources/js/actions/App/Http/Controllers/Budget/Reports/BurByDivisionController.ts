import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
const BurByDivisionController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: BurByDivisionController.url(options),
    method: 'post',
})

BurByDivisionController.definition = {
    methods: ["post"],
    url: '/budget/export/utilization-by-division-report',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
BurByDivisionController.url = (options?: RouteQueryOptions) => {
    return BurByDivisionController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
BurByDivisionController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: BurByDivisionController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
    const BurByDivisionControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: BurByDivisionController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\BurByDivisionController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByDivisionController.php:16
 * @route '/budget/export/utilization-by-division-report'
 */
        BurByDivisionControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: BurByDivisionController.url(options),
            method: 'post',
        })
    
    BurByDivisionController.form = BurByDivisionControllerForm
export default BurByDivisionController