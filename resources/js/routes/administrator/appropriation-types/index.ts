import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/appropriation-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::index
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:24
 * @route '/administrator/appropriation-types'
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
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::store
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:31
 * @route '/administrator/appropriation-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/appropriation-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::store
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:31
 * @route '/administrator/appropriation-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::store
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:31
 * @route '/administrator/appropriation-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::store
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:31
 * @route '/administrator/appropriation-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::store
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:31
 * @route '/administrator/appropriation-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
export const update = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/appropriation-types/{appropriation_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
update.url = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appropriation_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    appropriation_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appropriation_type: args.appropriation_type,
                }

    return update.definition.url
            .replace('{appropriation_type}', parsedArgs.appropriation_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
update.put = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
update.patch = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
    const updateForm = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
        updateForm.put = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::update
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:38
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
        updateForm.patch = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:45
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
export const destroy = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/administrator/appropriation-types/{appropriation_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:45
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
destroy.url = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appropriation_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    appropriation_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appropriation_type: args.appropriation_type,
                }

    return destroy.definition.url
            .replace('{appropriation_type}', parsedArgs.appropriation_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:45
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
destroy.delete = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:45
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
    const destroyForm = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AppropriationTypeController::destroy
 * @see app/Http/Controllers/Administrator/AppropriationTypeController.php:45
 * @route '/administrator/appropriation-types/{appropriation_type}'
 */
        destroyForm.delete = (args: { appropriation_type: string | number } | [appropriation_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const appropriationTypes = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default appropriationTypes