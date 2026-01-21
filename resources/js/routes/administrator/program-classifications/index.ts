import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/program-classifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::index
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:24
 * @route '/administrator/program-classifications'
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
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::store
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:31
 * @route '/administrator/program-classifications'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/program-classifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::store
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:31
 * @route '/administrator/program-classifications'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::store
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:31
 * @route '/administrator/program-classifications'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::store
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:31
 * @route '/administrator/program-classifications'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::store
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:31
 * @route '/administrator/program-classifications'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
export const update = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/program-classifications/{program_classification}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
update.url = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program_classification: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    program_classification: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program_classification: args.program_classification,
                }

    return update.definition.url
            .replace('{program_classification}', parsedArgs.program_classification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
update.put = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
update.patch = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
    const updateForm = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
        updateForm.put = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::update
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:38
 * @route '/administrator/program-classifications/{program_classification}'
 */
        updateForm.patch = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::destroy
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:45
 * @route '/administrator/program-classifications/{program_classification}'
 */
export const destroy = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/administrator/program-classifications/{program_classification}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::destroy
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:45
 * @route '/administrator/program-classifications/{program_classification}'
 */
destroy.url = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program_classification: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    program_classification: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program_classification: args.program_classification,
                }

    return destroy.definition.url
            .replace('{program_classification}', parsedArgs.program_classification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::destroy
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:45
 * @route '/administrator/program-classifications/{program_classification}'
 */
destroy.delete = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::destroy
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:45
 * @route '/administrator/program-classifications/{program_classification}'
 */
    const destroyForm = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\ProgramClassificationController::destroy
 * @see app/Http/Controllers/Administrator/ProgramClassificationController.php:45
 * @route '/administrator/program-classifications/{program_classification}'
 */
        destroyForm.delete = (args: { program_classification: string | number } | [program_classification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const programClassifications = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default programClassifications