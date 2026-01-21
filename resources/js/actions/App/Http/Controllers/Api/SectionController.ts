import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
const SectionController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SectionController.url(options),
    method: 'get',
})

SectionController.definition = {
    methods: ["get","head"],
    url: '/api/v1/sections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
SectionController.url = (options?: RouteQueryOptions) => {
    return SectionController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
SectionController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SectionController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
SectionController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SectionController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
    const SectionControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: SectionController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
        SectionControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SectionController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SectionController::__invoke
 * @see app/Http/Controllers/Api/SectionController.php:14
 * @route '/api/v1/sections'
 */
        SectionControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: SectionController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    SectionController.form = SectionControllerForm
export default SectionController