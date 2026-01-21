import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\BudgetDashboardController::index
 * @see app/Http/Controllers/Budget/BudgetDashboardController.php:19
 * @route '/budget/dashboard'
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
const dashboard = {
    index: Object.assign(index, index),
}

export default dashboard