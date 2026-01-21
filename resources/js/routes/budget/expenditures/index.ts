import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/expenditures',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\ExpenditureController::index
 * @see app/Http/Controllers/Budget/ExpenditureController.php:29
 * @route '/budget/expenditures'
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
/**
* @see \App\Http\Controllers\Budget\ExpenditureController::store
 * @see app/Http/Controllers/Budget/ExpenditureController.php:37
 * @route '/budget/expenditures'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/expenditures',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::store
 * @see app/Http/Controllers/Budget/ExpenditureController.php:37
 * @route '/budget/expenditures'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::store
 * @see app/Http/Controllers/Budget/ExpenditureController.php:37
 * @route '/budget/expenditures'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\ExpenditureController::store
 * @see app/Http/Controllers/Budget/ExpenditureController.php:37
 * @route '/budget/expenditures'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ExpenditureController::store
 * @see app/Http/Controllers/Budget/ExpenditureController.php:37
 * @route '/budget/expenditures'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
export const update = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/expenditures/{expenditure}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
update.url = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expenditure: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { expenditure: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    expenditure: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expenditure: typeof args.expenditure === 'object'
                ? args.expenditure.id
                : args.expenditure,
                }

    return update.definition.url
            .replace('{expenditure}', parsedArgs.expenditure.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
update.put = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
update.patch = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
    const updateForm = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
        updateForm.put = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\ExpenditureController::update
 * @see app/Http/Controllers/Budget/ExpenditureController.php:44
 * @route '/budget/expenditures/{expenditure}'
 */
        updateForm.patch = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Budget\ExpenditureController::destroy
 * @see app/Http/Controllers/Budget/ExpenditureController.php:51
 * @route '/budget/expenditures/{expenditure}'
 */
export const destroy = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/expenditures/{expenditure}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::destroy
 * @see app/Http/Controllers/Budget/ExpenditureController.php:51
 * @route '/budget/expenditures/{expenditure}'
 */
destroy.url = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expenditure: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { expenditure: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    expenditure: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expenditure: typeof args.expenditure === 'object'
                ? args.expenditure.id
                : args.expenditure,
                }

    return destroy.definition.url
            .replace('{expenditure}', parsedArgs.expenditure.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ExpenditureController::destroy
 * @see app/Http/Controllers/Budget/ExpenditureController.php:51
 * @route '/budget/expenditures/{expenditure}'
 */
destroy.delete = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\ExpenditureController::destroy
 * @see app/Http/Controllers/Budget/ExpenditureController.php:51
 * @route '/budget/expenditures/{expenditure}'
 */
    const destroyForm = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ExpenditureController::destroy
 * @see app/Http/Controllers/Budget/ExpenditureController.php:51
 * @route '/budget/expenditures/{expenditure}'
 */
        destroyForm.delete = (args: { expenditure: number | { id: number } } | [expenditure: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const expenditures = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default expenditures