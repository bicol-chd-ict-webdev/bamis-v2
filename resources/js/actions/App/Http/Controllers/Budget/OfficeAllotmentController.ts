import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/budget/office-allotments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::index
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:32
 * @route '/budget/office-allotments'
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
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::store
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:46
 * @route '/budget/office-allotments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/budget/office-allotments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::store
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:46
 * @route '/budget/office-allotments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::store
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:46
 * @route '/budget/office-allotments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::store
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:46
 * @route '/budget/office-allotments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::store
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:46
 * @route '/budget/office-allotments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
export const update = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/budget/office-allotments/{office_allotment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
update.url = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { office_allotment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    office_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        office_allotment: args.office_allotment,
                }

    return update.definition.url
            .replace('{office_allotment}', parsedArgs.office_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
update.put = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
update.patch = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
    const updateForm = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
        updateForm.put = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::update
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:53
 * @route '/budget/office-allotments/{office_allotment}'
 */
        updateForm.patch = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::destroy
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:60
 * @route '/budget/office-allotments/{office_allotment}'
 */
export const destroy = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/budget/office-allotments/{office_allotment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::destroy
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:60
 * @route '/budget/office-allotments/{office_allotment}'
 */
destroy.url = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { office_allotment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    office_allotment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        office_allotment: args.office_allotment,
                }

    return destroy.definition.url
            .replace('{office_allotment}', parsedArgs.office_allotment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::destroy
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:60
 * @route '/budget/office-allotments/{office_allotment}'
 */
destroy.delete = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::destroy
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:60
 * @route '/budget/office-allotments/{office_allotment}'
 */
    const destroyForm = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Budget\OfficeAllotmentController::destroy
 * @see app/Http/Controllers/Budget/OfficeAllotmentController.php:60
 * @route '/budget/office-allotments/{office_allotment}'
 */
        destroyForm.delete = (args: { office_allotment: string | number } | [office_allotment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const OfficeAllotmentController = { index, store, update, destroy }

export default OfficeAllotmentController