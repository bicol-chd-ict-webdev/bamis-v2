import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/line-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\LineItemController::index
 * @see app/Http/Controllers/Budget/LineItemController.php:24
 * @route '/budget/line-items'
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
* @see \App\Http\Controllers\Budget\LineItemController::store
 * @see app/Http/Controllers/Budget/LineItemController.php:31
 * @route '/budget/line-items'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/line-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\LineItemController::store
 * @see app/Http/Controllers/Budget/LineItemController.php:31
 * @route '/budget/line-items'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\LineItemController::store
 * @see app/Http/Controllers/Budget/LineItemController.php:31
 * @route '/budget/line-items'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\LineItemController::store
 * @see app/Http/Controllers/Budget/LineItemController.php:31
 * @route '/budget/line-items'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\LineItemController::store
 * @see app/Http/Controllers/Budget/LineItemController.php:31
 * @route '/budget/line-items'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
export const update = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/line-items/{line_item}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
update.url = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { line_item: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    line_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        line_item: args.line_item,
                }

    return update.definition.url
            .replace('{line_item}', parsedArgs.line_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
update.put = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
update.patch = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
    const updateForm = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
        updateForm.put = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\LineItemController::update
 * @see app/Http/Controllers/Budget/LineItemController.php:38
 * @route '/budget/line-items/{line_item}'
 */
        updateForm.patch = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\LineItemController::destroy
 * @see app/Http/Controllers/Budget/LineItemController.php:45
 * @route '/budget/line-items/{line_item}'
 */
export const destroy = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/line-items/{line_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\LineItemController::destroy
 * @see app/Http/Controllers/Budget/LineItemController.php:45
 * @route '/budget/line-items/{line_item}'
 */
destroy.url = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { line_item: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    line_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        line_item: args.line_item,
                }

    return destroy.definition.url
            .replace('{line_item}', parsedArgs.line_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\LineItemController::destroy
 * @see app/Http/Controllers/Budget/LineItemController.php:45
 * @route '/budget/line-items/{line_item}'
 */
destroy.delete = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\LineItemController::destroy
 * @see app/Http/Controllers/Budget/LineItemController.php:45
 * @route '/budget/line-items/{line_item}'
 */
    const destroyForm = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\LineItemController::destroy
 * @see app/Http/Controllers/Budget/LineItemController.php:45
 * @route '/budget/line-items/{line_item}'
 */
        destroyForm.delete = (args: { line_item: string | number } | [line_item: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const lineItems = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default lineItems