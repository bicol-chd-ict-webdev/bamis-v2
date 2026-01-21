import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/sections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
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
const sections = {
    index: Object.assign(index, index),
}

export default sections