import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
 */
export const index = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/obligations/{obligation}/disbursements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
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
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
 */
index.get = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
 */
index.head = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
 */
    const indexForm = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
 */
        indexForm.get = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\DisbursementController::index
 * @see app/Http/Controllers/Budget/DisbursementController.php:31
 * @route '/budget/obligations/{obligation}/disbursements'
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
* @see \App\Http\Controllers\Budget\DisbursementController::store
 * @see app/Http/Controllers/Budget/DisbursementController.php:48
 * @route '/budget/obligations/{obligation}/disbursements'
 */
export const store = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/obligations/{obligation}/disbursements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\DisbursementController::store
 * @see app/Http/Controllers/Budget/DisbursementController.php:48
 * @route '/budget/obligations/{obligation}/disbursements'
 */
store.url = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DisbursementController::store
 * @see app/Http/Controllers/Budget/DisbursementController.php:48
 * @route '/budget/obligations/{obligation}/disbursements'
 */
store.post = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\DisbursementController::store
 * @see app/Http/Controllers/Budget/DisbursementController.php:48
 * @route '/budget/obligations/{obligation}/disbursements'
 */
    const storeForm = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\DisbursementController::store
 * @see app/Http/Controllers/Budget/DisbursementController.php:48
 * @route '/budget/obligations/{obligation}/disbursements'
 */
        storeForm.post = (args: { obligation: string | number } | [obligation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
export const update = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/obligations/{obligation}/disbursements/{disbursement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
update.url = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    obligation: args[0],
                    disbursement: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        obligation: typeof args.obligation === 'object'
                ? args.obligation.id
                : args.obligation,
                                disbursement: typeof args.disbursement === 'object'
                ? args.disbursement.id
                : args.disbursement,
                }

    return update.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace('{disbursement}', parsedArgs.disbursement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
update.put = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
update.patch = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
    const updateForm = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
        updateForm.put = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\DisbursementController::update
 * @see app/Http/Controllers/Budget/DisbursementController.php:55
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
        updateForm.patch = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\DisbursementController::destroy
 * @see app/Http/Controllers/Budget/DisbursementController.php:62
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
export const destroy = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/obligations/{obligation}/disbursements/{disbursement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\DisbursementController::destroy
 * @see app/Http/Controllers/Budget/DisbursementController.php:62
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
destroy.url = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    obligation: args[0],
                    disbursement: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        obligation: typeof args.obligation === 'object'
                ? args.obligation.id
                : args.obligation,
                                disbursement: typeof args.disbursement === 'object'
                ? args.disbursement.id
                : args.disbursement,
                }

    return destroy.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace('{disbursement}', parsedArgs.disbursement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\DisbursementController::destroy
 * @see app/Http/Controllers/Budget/DisbursementController.php:62
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
destroy.delete = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\DisbursementController::destroy
 * @see app/Http/Controllers/Budget/DisbursementController.php:62
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
    const destroyForm = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\DisbursementController::destroy
 * @see app/Http/Controllers/Budget/DisbursementController.php:62
 * @route '/budget/obligations/{obligation}/disbursements/{disbursement}'
 */
        destroyForm.delete = (args: { obligation: number | { id: number }, disbursement: number | { id: number } } | [obligation: number | { id: number }, disbursement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const disbursements = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default disbursements