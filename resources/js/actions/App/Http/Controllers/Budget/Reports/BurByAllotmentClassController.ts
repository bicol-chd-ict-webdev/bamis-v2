import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
const BurByAllotmentClassController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: BurByAllotmentClassController.url(options),
    method: 'post',
})

BurByAllotmentClassController.definition = {
    methods: ["post"],
    url: '/budget/export/utilization-by-allotment-class-report',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
BurByAllotmentClassController.url = (options?: RouteQueryOptions) => {
    return BurByAllotmentClassController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
BurByAllotmentClassController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: BurByAllotmentClassController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
    const BurByAllotmentClassControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: BurByAllotmentClassController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\BurByAllotmentClassController::__invoke
 * @see app/Http/Controllers/Budget/Reports/BurByAllotmentClassController.php:16
 * @route '/budget/export/utilization-by-allotment-class-report'
 */
        BurByAllotmentClassControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: BurByAllotmentClassController.url(options),
            method: 'post',
        })
    
    BurByAllotmentClassController.form = BurByAllotmentClassControllerForm
export default BurByAllotmentClassController