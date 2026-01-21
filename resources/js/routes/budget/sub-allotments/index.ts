import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/sub-allotments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::index
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:39
 * @route '/budget/sub-allotments'
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
* @see \App\Http\Controllers\Budget\SubAllotmentController::store
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:44
 * @route '/budget/sub-allotments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/sub-allotments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::store
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:44
 * @route '/budget/sub-allotments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::store
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:44
 * @route '/budget/sub-allotments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::store
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:44
 * @route '/budget/sub-allotments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::store
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:44
 * @route '/budget/sub-allotments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
export const show = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/budget/sub-allotments/{sub_allotment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
show.url = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sub_allotment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sub_allotment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sub_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sub_allotment: typeof args.sub_allotment === 'object'
                ? args.sub_allotment.id
                : args.sub_allotment,
                }

    return show.definition.url
            .replace('{sub_allotment}', parsedArgs.sub_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
show.get = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
show.head = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
    const showForm = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
        showForm.get = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::show
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:51
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
        showForm.head = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
export const update = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/sub-allotments/{sub_allotment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
update.url = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sub_allotment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sub_allotment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sub_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sub_allotment: typeof args.sub_allotment === 'object'
                ? args.sub_allotment.id
                : args.sub_allotment,
                }

    return update.definition.url
            .replace('{sub_allotment}', parsedArgs.sub_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
update.put = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
update.patch = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
    const updateForm = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
        updateForm.put = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::update
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:74
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
        updateForm.patch = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\SubAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:81
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
export const destroy = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/sub-allotments/{sub_allotment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:81
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
destroy.url = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sub_allotment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sub_allotment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sub_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sub_allotment: typeof args.sub_allotment === 'object'
                ? args.sub_allotment.id
                : args.sub_allotment,
                }

    return destroy.definition.url
            .replace('{sub_allotment}', parsedArgs.sub_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SubAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:81
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
destroy.delete = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:81
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
    const destroyForm = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SubAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SubAllotmentController.php:81
 * @route '/budget/sub-allotments/{sub_allotment}'
 */
        destroyForm.delete = (args: { sub_allotment: number | { id: number } } | [sub_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const subAllotments = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default subAllotments