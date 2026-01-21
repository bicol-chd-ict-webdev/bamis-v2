import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
const FundTrackerController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: FundTrackerController.url(options),
    method: 'get',
})

FundTrackerController.definition = {
    methods: ["get","head"],
    url: '/fund-tracker',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
FundTrackerController.url = (options?: RouteQueryOptions) => {
    return FundTrackerController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
FundTrackerController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: FundTrackerController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
FundTrackerController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: FundTrackerController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
    const FundTrackerControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: FundTrackerController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
        FundTrackerControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: FundTrackerController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FundTrackerController::__invoke
 * @see app/Http/Controllers/FundTrackerController.php:19
 * @route '/fund-tracker'
 */
        FundTrackerControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: FundTrackerController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    FundTrackerController.form = FundTrackerControllerForm
export default FundTrackerController