import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/allotment-classes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::index
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:24
 * @route '/administrator/allotment-classes'
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
* @see \App\Http\Controllers\Administrator\AllotmentClassController::store
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:31
 * @route '/administrator/allotment-classes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/allotment-classes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::store
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:31
 * @route '/administrator/allotment-classes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::store
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:31
 * @route '/administrator/allotment-classes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::store
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:31
 * @route '/administrator/allotment-classes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::store
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:31
 * @route '/administrator/allotment-classes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
export const update = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/allotment-classes/{allotment_class}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
update.url = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { allotment_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    allotment_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        allotment_class: args.allotment_class,
                }

    return update.definition.url
            .replace('{allotment_class}', parsedArgs.allotment_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
update.put = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
update.patch = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
    const updateForm = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
        updateForm.put = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::update
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:38
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
        updateForm.patch = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Administrator\AllotmentClassController::destroy
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:45
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
export const destroy = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/administrator/allotment-classes/{allotment_class}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::destroy
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:45
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
destroy.url = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { allotment_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    allotment_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        allotment_class: args.allotment_class,
                }

    return destroy.definition.url
            .replace('{allotment_class}', parsedArgs.allotment_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::destroy
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:45
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
destroy.delete = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::destroy
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:45
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
    const destroyForm = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AllotmentClassController::destroy
 * @see app/Http/Controllers/Administrator/AllotmentClassController.php:45
 * @route '/administrator/allotment-classes/{allotment_class}'
 */
        destroyForm.delete = (args: { allotment_class: string | number } | [allotment_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const allotmentClasses = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default allotmentClasses