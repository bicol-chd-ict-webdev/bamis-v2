import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/subprograms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\SubprogramController::index
 * @see app/Http/Controllers/Budget/SubprogramController.php:29
 * @route '/budget/subprograms'
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
* @see \App\Http\Controllers\Budget\SubprogramController::store
 * @see app/Http/Controllers/Budget/SubprogramController.php:37
 * @route '/budget/subprograms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/subprograms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\SubprogramController::store
 * @see app/Http/Controllers/Budget/SubprogramController.php:37
 * @route '/budget/subprograms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubprogramController::store
 * @see app/Http/Controllers/Budget/SubprogramController.php:37
 * @route '/budget/subprograms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\SubprogramController::store
 * @see app/Http/Controllers/Budget/SubprogramController.php:37
 * @route '/budget/subprograms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SubprogramController::store
 * @see app/Http/Controllers/Budget/SubprogramController.php:37
 * @route '/budget/subprograms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
export const update = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/subprograms/{subprogram}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
update.url = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subprogram: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subprogram: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subprogram: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subprogram: typeof args.subprogram === 'object'
                ? args.subprogram.id
                : args.subprogram,
                }

    return update.definition.url
            .replace('{subprogram}', parsedArgs.subprogram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
update.put = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
update.patch = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
    const updateForm = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
        updateForm.put = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\SubprogramController::update
 * @see app/Http/Controllers/Budget/SubprogramController.php:44
 * @route '/budget/subprograms/{subprogram}'
 */
        updateForm.patch = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\SubprogramController::destroy
 * @see app/Http/Controllers/Budget/SubprogramController.php:51
 * @route '/budget/subprograms/{subprogram}'
 */
export const destroy = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/subprograms/{subprogram}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\SubprogramController::destroy
 * @see app/Http/Controllers/Budget/SubprogramController.php:51
 * @route '/budget/subprograms/{subprogram}'
 */
destroy.url = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subprogram: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subprogram: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subprogram: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subprogram: typeof args.subprogram === 'object'
                ? args.subprogram.id
                : args.subprogram,
                }

    return destroy.definition.url
            .replace('{subprogram}', parsedArgs.subprogram.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubprogramController::destroy
 * @see app/Http/Controllers/Budget/SubprogramController.php:51
 * @route '/budget/subprograms/{subprogram}'
 */
destroy.delete = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\SubprogramController::destroy
 * @see app/Http/Controllers/Budget/SubprogramController.php:51
 * @route '/budget/subprograms/{subprogram}'
 */
    const destroyForm = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SubprogramController::destroy
 * @see app/Http/Controllers/Budget/SubprogramController.php:51
 * @route '/budget/subprograms/{subprogram}'
 */
        destroyForm.delete = (args: { subprogram: number | { id: number } } | [subprogram: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const subprograms = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default subprograms