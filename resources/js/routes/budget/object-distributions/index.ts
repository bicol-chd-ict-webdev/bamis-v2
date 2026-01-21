import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/object-distributions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::index
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:32
 * @route '/budget/object-distributions'
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
* @see \App\Http\Controllers\Budget\ObjectDistributionController::store
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:46
 * @route '/budget/object-distributions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/object-distributions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::store
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:46
 * @route '/budget/object-distributions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::store
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:46
 * @route '/budget/object-distributions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::store
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:46
 * @route '/budget/object-distributions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::store
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:46
 * @route '/budget/object-distributions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
export const update = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/object-distributions/{object_distribution}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
update.url = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { object_distribution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    object_distribution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        object_distribution: args.object_distribution,
                }

    return update.definition.url
            .replace('{object_distribution}', parsedArgs.object_distribution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
update.put = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
update.patch = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
    const updateForm = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
        updateForm.put = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::update
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:53
 * @route '/budget/object-distributions/{object_distribution}'
 */
        updateForm.patch = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\ObjectDistributionController::destroy
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:60
 * @route '/budget/object-distributions/{object_distribution}'
 */
export const destroy = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/object-distributions/{object_distribution}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::destroy
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:60
 * @route '/budget/object-distributions/{object_distribution}'
 */
destroy.url = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { object_distribution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    object_distribution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        object_distribution: args.object_distribution,
                }

    return destroy.definition.url
            .replace('{object_distribution}', parsedArgs.object_distribution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::destroy
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:60
 * @route '/budget/object-distributions/{object_distribution}'
 */
destroy.delete = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::destroy
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:60
 * @route '/budget/object-distributions/{object_distribution}'
 */
    const destroyForm = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\ObjectDistributionController::destroy
 * @see app/Http/Controllers/Budget/ObjectDistributionController.php:60
 * @route '/budget/object-distributions/{object_distribution}'
 */
        destroyForm.delete = (args: { object_distribution: string | number } | [object_distribution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const objectDistributions = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default objectDistributions