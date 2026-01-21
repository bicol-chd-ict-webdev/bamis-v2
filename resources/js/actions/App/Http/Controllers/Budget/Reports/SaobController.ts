import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
const SaobController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: SaobController.url(options),
    method: 'post',
})

SaobController.definition = {
    methods: ["post"],
    url: '/budget/export/saob-report',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
SaobController.url = (options?: RouteQueryOptions) => {
    return SaobController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
SaobController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: SaobController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
    const SaobControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: SaobController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\SaobController::__invoke
 * @see app/Http/Controllers/Budget/Reports/SaobController.php:17
 * @route '/budget/export/saob-report'
 */
        SaobControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: SaobController.url(options),
            method: 'post',
        })
    
    SaobController.form = SaobControllerForm
export default SaobController