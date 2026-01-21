import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/divisions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DivisionController::__invoke
 * @see app/Http/Controllers/Api/DivisionController.php:14
 * @route '/api/v1/divisions'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const divisions = {
    index: Object.assign(index, index),
}

export default divisions