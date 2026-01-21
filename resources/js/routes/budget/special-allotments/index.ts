import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/special-allotments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::index
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:40
 * @route '/budget/special-allotments'
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
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::store
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:45
 * @route '/budget/special-allotments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/special-allotments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::store
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:45
 * @route '/budget/special-allotments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::store
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:45
 * @route '/budget/special-allotments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::store
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:45
 * @route '/budget/special-allotments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::store
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:45
 * @route '/budget/special-allotments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
export const show = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/budget/special-allotments/{special_allotment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
show.url = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { special_allotment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { special_allotment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    special_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        special_allotment: typeof args.special_allotment === 'object'
                ? args.special_allotment.id
                : args.special_allotment,
                }

    return show.definition.url
            .replace('{special_allotment}', parsedArgs.special_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
show.get = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
show.head = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
    const showForm = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
        showForm.get = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::show
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:52
 * @route '/budget/special-allotments/{special_allotment}'
 */
        showForm.head = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
export const update = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/special-allotments/{special_allotment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
update.url = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { special_allotment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { special_allotment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    special_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        special_allotment: typeof args.special_allotment === 'object'
                ? args.special_allotment.id
                : args.special_allotment,
                }

    return update.definition.url
            .replace('{special_allotment}', parsedArgs.special_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
update.put = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
update.patch = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
    const updateForm = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
        updateForm.put = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::update
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:75
 * @route '/budget/special-allotments/{special_allotment}'
 */
        updateForm.patch = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:82
 * @route '/budget/special-allotments/{special_allotment}'
 */
export const destroy = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/special-allotments/{special_allotment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:82
 * @route '/budget/special-allotments/{special_allotment}'
 */
destroy.url = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { special_allotment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { special_allotment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    special_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        special_allotment: typeof args.special_allotment === 'object'
                ? args.special_allotment.id
                : args.special_allotment,
                }

    return destroy.definition.url
            .replace('{special_allotment}', parsedArgs.special_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:82
 * @route '/budget/special-allotments/{special_allotment}'
 */
destroy.delete = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:82
 * @route '/budget/special-allotments/{special_allotment}'
 */
    const destroyForm = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\SpecialAllotmentController::destroy
 * @see app/Http/Controllers/Budget/SpecialAllotmentController.php:82
 * @route '/budget/special-allotments/{special_allotment}'
 */
        destroyForm.delete = (args: { special_allotment: number | { id: number } } | [special_allotment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const specialAllotments = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default specialAllotments