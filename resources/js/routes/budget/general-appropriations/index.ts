import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/general-appropriations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::index
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:41
 * @route '/budget/general-appropriations'
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
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::store
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:46
 * @route '/budget/general-appropriations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/general-appropriations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::store
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:46
 * @route '/budget/general-appropriations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::store
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:46
 * @route '/budget/general-appropriations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::store
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:46
 * @route '/budget/general-appropriations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::store
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:46
 * @route '/budget/general-appropriations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
export const show = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/budget/general-appropriations/{general_appropriation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
show.url = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { general_appropriation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { general_appropriation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    general_appropriation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        general_appropriation: typeof args.general_appropriation === 'object'
                ? args.general_appropriation.id
                : args.general_appropriation,
                }

    return show.definition.url
            .replace('{general_appropriation}', parsedArgs.general_appropriation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
show.get = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
show.head = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
    const showForm = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
        showForm.get = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::show
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:53
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
        showForm.head = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
export const update = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/general-appropriations/{general_appropriation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
update.url = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { general_appropriation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { general_appropriation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    general_appropriation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        general_appropriation: typeof args.general_appropriation === 'object'
                ? args.general_appropriation.id
                : args.general_appropriation,
                }

    return update.definition.url
            .replace('{general_appropriation}', parsedArgs.general_appropriation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
update.put = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
update.patch = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
    const updateForm = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
        updateForm.put = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::update
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:76
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
        updateForm.patch = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::destroy
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:83
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
export const destroy = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/general-appropriations/{general_appropriation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::destroy
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:83
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
destroy.url = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { general_appropriation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { general_appropriation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    general_appropriation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        general_appropriation: typeof args.general_appropriation === 'object'
                ? args.general_appropriation.id
                : args.general_appropriation,
                }

    return destroy.definition.url
            .replace('{general_appropriation}', parsedArgs.general_appropriation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::destroy
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:83
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
destroy.delete = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::destroy
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:83
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
    const destroyForm = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\GeneralAppropriationController::destroy
 * @see app/Http/Controllers/Budget/GeneralAppropriationController.php:83
 * @route '/budget/general-appropriations/{general_appropriation}'
 */
        destroyForm.delete = (args: { general_appropriation: number | { id: number } } | [general_appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const generalAppropriations = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default generalAppropriations