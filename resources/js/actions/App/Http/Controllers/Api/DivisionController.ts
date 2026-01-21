import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
const DivisionController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DivisionController.url(options),
    method: 'get',
})

DivisionController.definition = {
    methods: ["get","head"],
    url: '/api/v1/divisions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
DivisionController.url = (options?: RouteQueryOptions) => {
    return DivisionController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
DivisionController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DivisionController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
DivisionController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DivisionController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
    const DivisionControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: DivisionController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
        DivisionControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: DivisionController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
        DivisionControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: DivisionController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    DivisionController.form = DivisionControllerForm
export default DivisionController