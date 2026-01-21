import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
export const generateSingleRao = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateSingleRao.url(options),
    method: 'get',
})

generateSingleRao.definition = {
    methods: ["get","head"],
    url: '/budget/export/rao-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
generateSingleRao.url = (options?: RouteQueryOptions) => {
    return generateSingleRao.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
generateSingleRao.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateSingleRao.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
generateSingleRao.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateSingleRao.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
    const generateSingleRaoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generateSingleRao.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
        generateSingleRaoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateSingleRao.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\Reports\RaoController::generateSingleRao
 * @see app/Http/Controllers/Budget/Reports/RaoController.php:31
 * @route '/budget/export/rao-report'
 */
        generateSingleRaoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateSingleRao.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generateSingleRao.form = generateSingleRaoForm
const RaoController = { generateSingleRao }

export default RaoController