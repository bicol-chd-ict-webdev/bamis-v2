import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import disbursements from './disbursements'
import dues from './dues'
/**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/obligations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\ObligationController::index
 * @see app/Http/Controllers/Budget/ObligationController.php:39
 * @route '/budget/obligations'
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
* @see \App\Http\Controllers\Budget\ObligationController::store
 * @see app/Http/Controllers/Budget/ObligationController.php:72
 * @route '/budget/obligations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/obligations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\ObligationController::store
 * @see app/Http/Controllers/Budget/ObligationController.php:72
 * @route '/budget/obligations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObligationController::store
 * @see app/Http/Controllers/Budget/ObligationController.php:72
 * @route '/budget/obligations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\ObligationController::store
 * @see app/Http/Controllers/Budget/ObligationController.php:72
 * @route '/budget/obligations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObligationController::store
 * @see app/Http/Controllers/Budget/ObligationController.php:72
 * @route '/budget/obligations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
export const update = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/obligations/{obligation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
update.url = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
update.put = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
update.patch = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
    const updateForm = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
        updateForm.put = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\ObligationController::update
 * @see app/Http/Controllers/Budget/ObligationController.php:79
 * @route '/budget/obligations/{obligation}'
 */
        updateForm.patch = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\ObligationController::destroy
 * @see app/Http/Controllers/Budget/ObligationController.php:86
 * @route '/budget/obligations/{obligation}'
 */
export const destroy = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/obligations/{obligation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\ObligationController::destroy
 * @see app/Http/Controllers/Budget/ObligationController.php:86
 * @route '/budget/obligations/{obligation}'
 */
destroy.url = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObligationController::destroy
 * @see app/Http/Controllers/Budget/ObligationController.php:86
 * @route '/budget/obligations/{obligation}'
 */
destroy.delete = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\ObligationController::destroy
 * @see app/Http/Controllers/Budget/ObligationController.php:86
 * @route '/budget/obligations/{obligation}'
 */
    const destroyForm = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObligationController::destroy
 * @see app/Http/Controllers/Budget/ObligationController.php:86
 * @route '/budget/obligations/{obligation}'
 */
        destroyForm.delete = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Budget\ObligationController::cancel
 * @see app/Http/Controllers/Budget/ObligationController.php:93
 * @route '/budget/obligations/{obligation}/cancel'
 */
export const cancel = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: cancel.url(args, options),
    method: 'put',
})

cancel.definition = {
    methods: ["put"],
    url: '/budget/obligations/{obligation}/cancel',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Budget\ObligationController::cancel
 * @see app/Http/Controllers/Budget/ObligationController.php:93
 * @route '/budget/obligations/{obligation}/cancel'
 */
cancel.url = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{obligation}', parsedArgs.obligation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObligationController::cancel
 * @see app/Http/Controllers/Budget/ObligationController.php:93
 * @route '/budget/obligations/{obligation}/cancel'
 */
cancel.put = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: cancel.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Budget\ObligationController::cancel
 * @see app/Http/Controllers/Budget/ObligationController.php:93
 * @route '/budget/obligations/{obligation}/cancel'
 */
    const cancelForm = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObligationController::cancel
 * @see app/Http/Controllers/Budget/ObligationController.php:93
 * @route '/budget/obligations/{obligation}/cancel'
 */
        cancelForm.put = (args: { obligation: number | { id: number } } | [obligation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cancel.form = cancelForm
const obligations = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
cancel: Object.assign(cancel, cancel),
disbursements: Object.assign(disbursements, disbursements),
dues: Object.assign(dues, dues),
}

export default obligations