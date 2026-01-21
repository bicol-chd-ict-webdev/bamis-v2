import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
export const index = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/obligations/{obligation}/dues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
index.url = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { obligation: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    obligation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        obligation: args.obligation,
                }

    return index.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
index.get = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
index.head = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
    const indexForm = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
        indexForm.get = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\DueController::index
 * @see app/Http/Controllers/Budget/DueController.php:31
 * @route '/budget/obligations/{obligation}/dues'
 */
        indexForm.head = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Budget\DueController::store
 * @see app/Http/Controllers/Budget/DueController.php:47
 * @route '/budget/obligations/{obligation}/dues'
 */
export const store = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/obligations/{obligation}/dues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\DueController::store
 * @see app/Http/Controllers/Budget/DueController.php:47
 * @route '/budget/obligations/{obligation}/dues'
 */
store.url = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { obligation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { obligation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    obligation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        obligation: typeof args.obligation === 'object'
                ? args.obligation.id
                : args.obligation,
                }

    return store.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DueController::store
 * @see app/Http/Controllers/Budget/DueController.php:47
 * @route '/budget/obligations/{obligation}/dues'
 */
store.post = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\DueController::store
 * @see app/Http/Controllers/Budget/DueController.php:47
 * @route '/budget/obligations/{obligation}/dues'
 */
    const storeForm = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\DueController::store
 * @see app/Http/Controllers/Budget/DueController.php:47
 * @route '/budget/obligations/{obligation}/dues'
 */
        storeForm.post = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
export const update = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/obligations/{obligation}/dues/{due}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
update.url = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    obligation: args[0],
                    due: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        obligation: typeof args.obligation === 'object'
                ? args.obligation.id
                : args.obligation,
                                due: typeof args.due === 'object'
                ? args.due.id
                : args.due,
                }

    return update.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace('{due}', parsedArgs.due.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
update.put = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
update.patch = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
    const updateForm = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
        updateForm.put = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\DueController::update
 * @see app/Http/Controllers/Budget/DueController.php:54
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
        updateForm.patch = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\DueController::destroy
 * @see app/Http/Controllers/Budget/DueController.php:61
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
export const destroy = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/obligations/{obligation}/dues/{due}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\DueController::destroy
 * @see app/Http/Controllers/Budget/DueController.php:61
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
destroy.url = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    obligation: args[0],
                    due: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        obligation: typeof args.obligation === 'object'
                ? args.obligation.id
                : args.obligation,
                                due: typeof args.due === 'object'
                ? args.due.id
                : args.due,
                }

    return destroy.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace('{due}', parsedArgs.due.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DueController::destroy
 * @see app/Http/Controllers/Budget/DueController.php:61
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
destroy.delete = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\DueController::destroy
 * @see app/Http/Controllers/Budget/DueController.php:61
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
    const destroyForm = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\DueController::destroy
 * @see app/Http/Controllers/Budget/DueController.php:61
 * @route '/budget/obligations/{obligation}/dues/{due}'
 */
        destroyForm.delete = (args: { obligation: number | { id: number }, due: number | { id: number } } | [obligation: number | { id: number }, due: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const DueController = { index, store, update, destroy }

export default DueController