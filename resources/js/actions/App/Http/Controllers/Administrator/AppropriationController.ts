import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/appropriations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AppropriationController::index
 * @see app/Http/Controllers/Administrator/AppropriationController.php:24
 * @route '/administrator/appropriations'
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
* @see \App\Http\Controllers\Administrator\AppropriationController::store
 * @see app/Http/Controllers/Administrator/AppropriationController.php:31
 * @route '/administrator/appropriations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/appropriations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::store
 * @see app/Http/Controllers/Administrator/AppropriationController.php:31
 * @route '/administrator/appropriations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::store
 * @see app/Http/Controllers/Administrator/AppropriationController.php:31
 * @route '/administrator/appropriations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationController::store
 * @see app/Http/Controllers/Administrator/AppropriationController.php:31
 * @route '/administrator/appropriations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationController::store
 * @see app/Http/Controllers/Administrator/AppropriationController.php:31
 * @route '/administrator/appropriations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
export const update = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/appropriations/{appropriation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
update.url = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appropriation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appropriation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appropriation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appropriation: typeof args.appropriation === 'object'
                ? args.appropriation.id
                : args.appropriation,
                }

    return update.definition.url
            .replace('{appropriation}', parsedArgs.appropriation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
update.put = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
update.patch = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
    const updateForm = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
        updateForm.put = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\AppropriationController::update
 * @see app/Http/Controllers/Administrator/AppropriationController.php:38
 * @route '/administrator/appropriations/{appropriation}'
 */
        updateForm.patch = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Administrator\AppropriationController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationController.php:45
 * @route '/administrator/appropriations/{appropriation}'
 */
export const destroy = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/administrator/appropriations/{appropriation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationController.php:45
 * @route '/administrator/appropriations/{appropriation}'
 */
destroy.url = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appropriation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appropriation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appropriation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appropriation: typeof args.appropriation === 'object'
                ? args.appropriation.id
                : args.appropriation,
                }

    return destroy.definition.url
            .replace('{appropriation}', parsedArgs.appropriation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationController.php:45
 * @route '/administrator/appropriations/{appropriation}'
 */
destroy.delete = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationController.php:45
 * @route '/administrator/appropriations/{appropriation}'
 */
    const destroyForm = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationController.php:45
 * @route '/administrator/appropriations/{appropriation}'
 */
        destroyForm.delete = (args: { appropriation: number | { id: number } } | [appropriation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AppropriationController = { index, store, update, destroy }

export default AppropriationController