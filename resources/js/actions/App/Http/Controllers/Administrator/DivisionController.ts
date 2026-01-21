import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/divisions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\DivisionController::index
 * @see app/Http/Controllers/Administrator/DivisionController.php:24
 * @route '/administrator/divisions'
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
* @see \App\Http\Controllers\Administrator\DivisionController::store
 * @see app/Http/Controllers/Administrator/DivisionController.php:31
 * @route '/administrator/divisions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/divisions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\DivisionController::store
 * @see app/Http/Controllers/Administrator/DivisionController.php:31
 * @route '/administrator/divisions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\DivisionController::store
 * @see app/Http/Controllers/Administrator/DivisionController.php:31
 * @route '/administrator/divisions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\DivisionController::store
 * @see app/Http/Controllers/Administrator/DivisionController.php:31
 * @route '/administrator/divisions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\DivisionController::store
 * @see app/Http/Controllers/Administrator/DivisionController.php:31
 * @route '/administrator/divisions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
export const update = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/divisions/{division}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
update.url = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { division: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { division: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    division: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        division: typeof args.division === 'object'
                ? args.division.id
                : args.division,
                }

    return update.definition.url
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
update.put = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
update.patch = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
    const updateForm = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
        updateForm.put = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\DivisionController::update
 * @see app/Http/Controllers/Administrator/DivisionController.php:38
 * @route '/administrator/divisions/{division}'
 */
        updateForm.patch = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Administrator\DivisionController::destroy
 * @see app/Http/Controllers/Administrator/DivisionController.php:45
 * @route '/administrator/divisions/{division}'
 */
export const destroy = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/administrator/divisions/{division}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\DivisionController::destroy
 * @see app/Http/Controllers/Administrator/DivisionController.php:45
 * @route '/administrator/divisions/{division}'
 */
destroy.url = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { division: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { division: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    division: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        division: typeof args.division === 'object'
                ? args.division.id
                : args.division,
                }

    return destroy.definition.url
            .replace('{division}', parsedArgs.division.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\DivisionController::destroy
 * @see app/Http/Controllers/Administrator/DivisionController.php:45
 * @route '/administrator/divisions/{division}'
 */
destroy.delete = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\DivisionController::destroy
 * @see app/Http/Controllers/Administrator/DivisionController.php:45
 * @route '/administrator/divisions/{division}'
 */
    const destroyForm = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\DivisionController::destroy
 * @see app/Http/Controllers/Administrator/DivisionController.php:45
 * @route '/administrator/divisions/{division}'
 */
        destroyForm.delete = (args: { division: number | { id: number } } | [division: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const DivisionController = { index, store, update, destroy }

export default DivisionController